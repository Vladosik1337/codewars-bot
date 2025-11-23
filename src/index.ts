import { startScheduler } from "./scheduler.js"; // або твій файл

async function main() {
  console.log("Starting Slack CodeWars bot scheduler...");
  startScheduler();
}

main().catch((err) => {
  console.error("Fatal error in bot:", err);
  process.exit(1);
});
