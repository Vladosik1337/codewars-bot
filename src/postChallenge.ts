import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import fs from "fs";
import { challenges } from "./challenges.js";
import { buildChallengeMessage } from "./templates/challengeMessage.js";

dotenv.config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN);
const STATE_PATH = "./src/state/lastMessage.json";

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf-8"));
  } catch {
    return { used: [] };
  }
}

function saveState(state: any) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf-8");
}

export async function postRandomChallenge() {
  const state = loadState();
  const used: number[] = state.used ?? [];

  if (used.length >= challenges.length) {
    used.length = 0;
  }

  let idx: number;
  const available = challenges
    .map((ch, i) => i)
    .filter((i) => !used.includes(i));

  idx = available[Math.floor(Math.random() * available.length)];

  used.push(idx);
  state.used = used;

  const challenge = challenges[idx];
  const message = buildChallengeMessage(challenge);

  const res = await client.chat.postMessage({
    channel: process.env.SLACK_CHANNEL_ID!,
    text: message,
    parse: "full", // замість mrkdwn (фікс твоєї помилки)
  });

  // Зберігаємо ts + used + challengeIndex
  saveState({ ts: res.ts, used, challengeIndex: idx });

  console.log("Challenge posted:", challenge.title);
  console.log("Saved ts:", res.ts);
  console.log("Saved challengeIndex:", idx);
}
