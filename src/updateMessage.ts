import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import fs from "fs";
import { challenges } from "./challenges.js";
import { postSolution } from "./postSolution.js";

dotenv.config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const STATE_PATH = "./src/state/lastMessage.json";

export async function markAsFinished() {
  if (!fs.existsSync(STATE_PATH)) return;

  const state = JSON.parse(fs.readFileSync(STATE_PATH, "utf-8"));
  const { ts, challengeIndex } = state;

  if (!ts) return;

  // 1. Додаємо UPD у головне повідомлення
  const original = await client.conversations.replies({
    channel: process.env.SLACK_CHANNEL_ID!,
    ts,
    limit: 1,
  });

  const oldText = original.messages?.[0]?.text || "";

  const updatedText = `
*UPD: Finished :white_check_mark:*
${oldText}
`.trim();

  await client.chat.update({
    channel: process.env.SLACK_CHANNEL_ID!,
    ts,
    text: updatedText,
  });

  console.log("Challenge marked as finished.");

  // 2. Тепер надсилаємо solution у тред
  if (challengeIndex === undefined || challengeIndex === null) {
    console.error("challengeIndex is missing in state");
    return;
  }

  const challenge = challenges[challengeIndex];
  if (!challenge) {
    console.error(`Challenge at index ${challengeIndex} not found`);
    return;
  }

  if (!challenge.solution) {
    console.error(`Challenge at index ${challengeIndex} has no solution`);
    return;
  }

  await postSolution(challenge, ts);

  console.log("Solution sent in thread.");
}
