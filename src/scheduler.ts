import cron from "node-cron";
import { postRandomChallenge } from "./postChallenge.js";
import { markAsFinished } from "./updateMessage.js";

export function startScheduler() {
  cron.schedule("00 18 * * *", () => {
    console.log("Running test CodeWars challenge at 17:10...");
    postRandomChallenge();
  });

  cron.schedule("05 18 * * *", () => {
    console.log("Marking as finished…");
    markAsFinished();
  });
}
