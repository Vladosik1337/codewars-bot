export function getRandomGreeting(): string {
  const greetings = [
    ":rocket: *Готові до нового виклику?*",
    ":rocket: *Кидаємо собі новий виклик?*",
    ":rocket: *Час прокачати мозок новою задачкою!*",
    ":rocket: *Поїхали ламати мізки над новою ката!*",
  ];

  const idx = Math.floor(Math.random() * greetings.length);
  return greetings[idx];
}

export function getRandomOutro(): string {
  const outros = [
    "Памʼятайте: *найкращий ріст — у складних задачах* :muscle:",
    "Памʼятайте: *кожна ката — це +1 до вашого скіла* :muscle:",
    "Памʼятайте: *ідеальний код не пишеться без кількох фейлів* :muscle:",
  ];

  const idx = Math.floor(Math.random() * outros.length);
  return outros[idx];
}
