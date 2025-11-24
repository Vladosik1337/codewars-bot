import { markAsFinished } from "./updateMessage";

(async () => {
  try {
    console.log("[run-finished] Starting at", new Date().toISOString());

    await markAsFinished();

    console.log("[run-finished] Finished successfully");
    process.exit(0);
  } catch (err) {
    console.error("[run-finished] Error:", err);
    process.exit(1);
  }
})();
