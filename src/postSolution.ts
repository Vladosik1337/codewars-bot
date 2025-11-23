import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import { Challenge } from "./challenges";

dotenv.config();

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function postSolution(challenge: Challenge, parentTs: string) {
  if (!challenge?.solution) {
    throw new Error("Challenge solution is missing");
  }

  const analysis = challenge.solution.analysis;

  const message = `
:star2: *Best Solution (auto-generated)*

*Оптимальний код:*
\`\`\`js
${challenge.solution.code}
\`\`\`

*Пояснення:*
${challenge.solution.explanation}

*Технічний аналіз:*
• *Time Complexity:* ${analysis.timeComplexity}
• *Space Complexity:* ${analysis.spaceComplexity}

*Чому це найкраще рішення:*
${analysis.optimalBecause.map((v) => `• ${v}`).join("\n")}

*Альтернативи та чому вони гірші:*
${analysis.alternatives.map((a) => `• *${a.method}:* ${a.whyBad}`).join("\n")}

*Edge Cases:*
${analysis.edgeCases.map((x) => `• ${x}`).join("\n")}

*Типові помилки кандидатів:*
${analysis.commonMistakes.map((x) => `• ${x}`).join("\n")}
`.trim();

  await client.chat.postMessage({
    channel: process.env.SLACK_CHANNEL_ID!,
    thread_ts: parentTs,
    text: message,
  });
}
