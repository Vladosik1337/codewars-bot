import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import { challenges } from "./challenges.js";
import { buildChallengeMessage } from "./templates/challengeMessage.js";

dotenv.config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const CHANNEL = process.env.SLACK_CHANNEL_ID!;
const HISTORY_LIMIT = 200;

async function getBotUserId() {
  const auth = await client.auth.test();
  return auth.user_id;
}

async function getUsedChallengeUrls(channelId: string, botUserId: string) {
  const used = new Set<string>();

  const history = await client.conversations.history({
    channel: channelId,
    limit: HISTORY_LIMIT,
  });

  const messages = (history.messages ?? []) as any[];

  for (const msg of messages) {
    const text = (msg.text || "") as string;

    if (msg.user !== botUserId) continue;

    const match = text.match(/https?:\/\/\S*codewars\.com\/kata\/\S*/i);
    if (!match) continue;

    const url = match[0].replace(/[>\)\]\.,]+$/, "");
    used.add(url);
  }

  return used;
}

export async function postRandomChallenge() {
  if (!CHANNEL) {
    throw new Error("SLACK_CHANNEL_ID is not set");
  }

  const botUserId = await getBotUserId();
  const usedUrls = await getUsedChallengeUrls(CHANNEL!, botUserId!);

  console.log("[postRandomChallenge] Used URLs:", usedUrls);

  const unused = challenges.filter((ch) => !usedUrls.has(ch.url));

  if (unused.length === 0) {
    console.error("[postRandomChallenge] ❌ No unused challenges left!");
    throw new Error("All challenges have already been used. Add new ones.");
  }

  const idx = Math.floor(Math.random() * unused.length);
  const challenge = unused[idx];

  const message = buildChallengeMessage(challenge);

  const res = await client.chat.postMessage({
    channel: CHANNEL,
    text: message,
    mrkdwn: true,
  });

  console.log(
    "[postRandomChallenge] Sent challenge:",
    challenge.title,
    "ts =",
    res.ts
  );
}
