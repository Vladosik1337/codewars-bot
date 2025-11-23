import cron from "node-cron";
import { postRandomChallenge } from "./postChallenge.js";
import { markAsFinished } from "./updateMessage.js";

export function startScheduler() {
  cron.schedule(
    "17 18 * * *",
    async () => {
      console.log("Running test CodeWars challenge at 18:10 Europe/Kyiv");
      await postRandomChallenge();
    },
    {
      timezone: "Europe/Kiev", // або "Europe/Kyiv" залежно від версії tz
    }
  );

  cron.schedule(
    "18 18 * * *",
    async () => {
      console.log("Marking as finished at 18:11 Europe/Kyiv");
      await markAsFinished();
    },
    {
      timezone: "Europe/Kiev",
    }
  );
}
