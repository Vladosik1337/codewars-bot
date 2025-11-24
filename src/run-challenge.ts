import { postRandomChallenge } from "./postChallenge";

(async () => {
  try {
    console.log("[run-challenge] Starting at", new Date().toISOString());

    await postRandomChallenge();

    console.log("[run-challenge] Finished successfully");
    process.exit(0);
  } catch (err) {
    console.error("[run-challenge] Error:", err);
    process.exit(1);
  }
})();
