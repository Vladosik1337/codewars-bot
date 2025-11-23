import type { Challenge } from "../challenges.js";
import { getNextMondayDateString } from "../utils/dateUtils.js";
import { getRandomGreeting, getRandomOutro } from "../utils/textUtils.js";

export function buildChallengeMessage(challenge: Challenge): string {
  const deadlineDate = getNextMondayDateString();
  const greeting = getRandomGreeting();
  const outro = getRandomOutro();

  return `
@here
${greeting}
:dart: *CodeWars Challenge стартує!*

:brain: *Рівень:* ${challenge.level}
:alarm_clock: *Дедлайн:* до понеділка, ${deadlineDate}, 12:00 (Europe/Kyiv)

:paperclip: *Посилання на задачу:*
${challenge.url}

*Назва задачі:* ${challenge.title}

*Опис задачі:*
${challenge.description}

\`\`\`
${challenge.examples}
\`\`\`

:joystick: *Як взяти участь:*
:one: Перейдіть за лінком на CodeWars.
:two: Розвʼяжіть задачу.
:three: Киньте скрін коду і *Passed Tests* у тред.

Якщо щось буде незрозуміло — питайте.
${outro}
Успіхів! :heart:
`.trim();
}
