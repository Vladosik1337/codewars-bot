import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import { challenges } from "./challenges.js";
import { postSolution } from "./postSolution.js";

dotenv.config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const CHANNEL = process.env.SLACK_CHANNEL_ID!;

export async function markAsFinished() {
  if (!CHANNEL) {
    throw new Error("SLACK_CHANNEL_ID is not set");
  }

  console.log("[markAsFinished] Starting at", new Date().toISOString());

  const auth = await client.auth.test();
  const botUserId = auth.user_id;

  const history = await client.conversations.history({
    channel: CHANNEL,
    limit: 100,
  });

  const messages = (history.messages ?? []) as any[];

  const challengeMsg = messages.find((m) => {
    const text = (m.text || "") as string;
    return m.user === botUserId && /codewars/i.test(text);
  });

  if (!challengeMsg || !challengeMsg.ts) {
    console.log(
      "[markAsFinished] No CodeWars message found, nothing to update"
    );
    return;
  }

  const ts = challengeMsg.ts as string;
  const oldText = (challengeMsg.text || "") as string;

  if (!oldText.includes("UPD: Finished")) {
    const updatedText = `*UPD: Finished:white_check_mark:*\n\n${oldText}`;

    await client.chat.update({
      channel: CHANNEL,
      ts,
      text: updatedText,
    });

    console.log("[markAsFinished] Main message updated");
  } else {
    console.log("[markAsFinished] Message already marked as finished");
  }

  const urlMatch = oldText.match(/https?:\/\/\S*codewars\.com\/kata\/\S*/i);

  if (!urlMatch) {
    console.log(
      "[markAsFinished] No CodeWars URL in message, skipping solution"
    );
    return;
  }

  const url = urlMatch[0].replace(/[>\)\]\.,]+$/, "");

  const challengeIndex = challenges.findIndex((c) => c.url === url);

  if (challengeIndex === -1) {
    console.log("[markAsFinished] Challenge not found by URL:", url);
    return;
  }

  const challenge = challenges[challengeIndex];

  if (!challenge.solution) {
    console.log(
      "[markAsFinished] Challenge has no solution field, skipping solution"
    );
    return;
  }

  await postSolution(challenge, ts);

  console.log("[markAsFinished] Solution sent in thread for ts =", ts);
}
