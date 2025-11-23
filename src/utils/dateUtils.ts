export function getNextMondayDateString(): string {
  const now = new Date();

  const today = now.getDay();
  let daysUntilMonday = (1 + 7 - today) % 7;

  if (daysUntilMonday === 0) {
    daysUntilMonday = 7;
  }

  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilMonday
  );

  const formatter = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Kyiv",
  });

  return formatter.format(target); // наприклад: "24.11.2025"
}
