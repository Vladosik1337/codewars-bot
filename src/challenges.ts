export interface Challenge {
  title: string;
  url: string;
  level: string;
  description: string;
  examples: string;
  solution: {
    code: string;
    explanation: string;
    analysis: {
      timeComplexity: string;
      spaceComplexity: string;
      optimalBecause: string[];
      alternatives: {
        method: string;
        whyBad: string;
      }[];
      edgeCases: string[];
      commonMistakes: string[];
    };
  };
}

export const challenges: Challenge[] = [
  {
    title: "Maximum subarray sum",
    url: "https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c",
    level: "5 kyu",
    description:
      "Знайдіть максимальну суму підмасиву (послідовних елементів). Якщо всі числа відʼємні — результат 0.",
    examples: `
  maxSequence([])            → 0
  maxSequence([-1, -2, -3])  → 0
  maxSequence([1, 2, 3])     → 6
  maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]) → 6
      `.trim(),
    solution: {
      code: `
  export function maxSequence(arr: number[]): number {
    let maxSoFar = 0;
    let current = 0;
  
    for (const x of arr) {
      current = Math.max(0, current + x);
      maxSoFar = Math.max(maxSoFar, current);
    }
  
    return maxSoFar;
  }
        `.trim(),
      explanation:
        "Класичний алгоритм Кадане: ми йдемо по масиву, накопичуємо поточну суму та обнуляємо її, якщо вона стала відʼємною. maxSoFar зберігає найкращий результат, який ми бачили. Якщо всі числа відʼємні, ми ніколи не піднімемося вище 0, тому результатом і буде 0.",
      analysis: {
        timeComplexity: "O(n) — один прохід по масиву.",
        spaceComplexity: "O(1) — зберігаємо тільки кілька змінних.",
        optimalBecause: [
          "Вимагає лише один прохід без вкладених циклів.",
          "Не потребує додаткових структур даних.",
          "Коректно обробляє випадок з усіма відʼємними числами.",
        ],
        alternatives: [
          {
            method: "Перебір усіх підмасивів подвійним циклом",
            whyBad:
              "O(n²) або O(n³) час, легко впасти у таймаут на великих вхідних даних.",
          },
          {
            method: "Префіксні суми з подвійним циклом",
            whyBad: "Все ще O(n²) по часу, хоч і трохи простіше для розуміння.",
          },
        ],
        edgeCases: [
          "Порожній масив → 0.",
          "Усі елементи відʼємні → 0.",
          "Один елемент у масиві.",
        ],
        commonMistakes: [
          "Повернення максимальної суми, навіть якщо вона відʼємна, замість 0.",
          "Неправильна ініціалізація maxSoFar як -Infinity без додаткової логіки.",
        ],
      },
    },
  },
  {
    title: "Human Readable Time",
    url: "https://www.codewars.com/kata/52685f7382004e774f0001f7",
    level: "5 kyu",
    description:
      "Перетворити кількість секунд (0–359999) у формат часу HH:MM:SS з лідирувальними нулями.",
    examples: `
  humanReadable(0)      → "00:00:00"
  humanReadable(59)     → "00:00:59"
  humanReadable(60)     → "00:01:00"
  humanReadable(3599)   → "00:59:59"
  humanReadable(86399)  → "23:59:59"
      `.trim(),
    solution: {
      code: `
  export function humanReadable(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    const pad = (n: number) => n.toString().padStart(2, "0");
  
    return \`\${pad(hours)}:\${pad(minutes)}:\${pad(secs)}\`;
  }
        `.trim(),
      explanation:
        "Розбиваємо секунди на години, хвилини та секунди через цілочисельне ділення й модуль. Для форматування використовуємо padStart(2, '0'), щоб завжди мати два символи. Потім конкатенуємо у форматі HH:MM:SS.",
      analysis: {
        timeComplexity:
          "O(1) — фіксована кількість арифметичних операцій незалежно від вхідних даних.",
        spaceComplexity: "O(1) — лише кілька чисел та рядків.",
        optimalBecause: [
          "Немає зайвих циклів та проміжних структур.",
          "Використовує примітивні й максимально швидкі операції.",
        ],
        alternatives: [
          {
            method: "Перетворення через Date",
            whyBad:
              "Потребує мапінгу на час UTC/локальний час, що додає складність і потенційні баги.",
          },
        ],
        edgeCases: [
          "seconds = 0 → '00:00:00'.",
          "seconds = 359999 (максимум) — перевірка верхньої межі.",
        ],
        commonMistakes: [
          "Забути додати лідирувальні нулі.",
          "Неправильне використання ділення та модуля (плутають порядок).",
        ],
      },
    },
  },
  {
    title: "RGB To Hex Conversion",
    url: "https://www.codewars.com/kata/513e08acc600c94f01000001",
    level: "5 kyu",
    description:
      "Конвертувати значення R, G, B (0–255) у шістнадцятковий колірний код у форматі RRGGBB.",
    examples: `
  rgb(0, 0, 0)       → "000000"
  rgb(255, 255, 255) → "FFFFFF"
  rgb(255, 255, 300) → "FFFFFF"   // значення обрізаємо до 255
  rgb(148, 0, 211)   → "9400D3"
      `.trim(),
    solution: {
      code: `
  function clamp(v: number): number {
    if (v < 0) return 0;
    if (v > 255) return 255;
    return v;
  }
  
  function toHex(v: number): string {
    return clamp(v).toString(16).toUpperCase().padStart(2, "0");
  }
  
  export function rgb(r: number, g: number, b: number): string {
    return \`\${toHex(r)}\${toHex(g)}\${toHex(b)}\`;
  }
        `.trim(),
      explanation:
        "Спочатку обмежуємо значення кожного каналу діапазоном [0, 255]. Потім переводимо число в шістнадцяткову систему, приводимо до верхнього регістру й додаємо лідирувальний нуль, якщо довжина 1. Наприкінці просто конкатенуємо три частини.",
      analysis: {
        timeComplexity:
          "O(1) — обробляємо фіксовану кількість значень (три канали).",
        spaceComplexity: "O(1).",
        optimalBecause: [
          "Проста і читабельна функція без надлишкової логіки.",
          "Чітко виділені helper-и clamp та toHex для повторного використання.",
        ],
        alternatives: [
          {
            method: "Рядкова конкатенація без clamp",
            whyBad:
              "Легко пропустити вихід за межі 0–255 і отримати некоректний колір.",
          },
        ],
        edgeCases: [
          "Значення < 0 або > 255 — мають бути обрізані.",
          "Мінімальні/максимальні значення каналів.",
        ],
        commonMistakes: [
          "Забути padStart(2, '0') і отримати рядки довжини 1.",
          "Використання нижнього регістру замість верхнього, якщо тести чутливі до регістру.",
        ],
      },
    },
  },
  {
    title: "Human readable duration format",
    url: "https://www.codewars.com/kata/52742f58faf5485cae000b9a",
    level: "4 kyu",
    description:
      "Перетворити кількість секунд у «людяний» формат тривалісті (years, days, hours, minutes, seconds) з правильними множинами та комами.",
    examples: `
  formatDuration(1)        → "1 second"
  formatDuration(62)       → "1 minute and 2 seconds"
  formatDuration(3662)     → "1 hour, 1 minute and 2 seconds"
  formatDuration(0)        → "now"
      `.trim(),
    solution: {
      code: `
  const UNITS = [
    { name: "year",   secs: 365 * 24 * 60 * 60 },
    { name: "day",    secs: 24 * 60 * 60 },
    { name: "hour",   secs: 60 * 60 },
    { name: "minute", secs: 60 },
    { name: "second", secs: 1 },
  ];
  
  export function formatDuration(seconds: number): string {
    if (seconds === 0) return "now";
  
    const parts: string[] = [];
  
    for (const { name, secs } of UNITS) {
      const qty = Math.floor(seconds / secs);
      if (qty > 0) {
        parts.push(qty + " " + name + (qty > 1 ? "s" : ""));
        seconds %= secs;
      }
    }
  
    if (parts.length === 1) return parts[0];
    const last = parts.pop()!;
    return parts.join(", ") + " and " + last;
  }
        `.trim(),
      explanation:
        "Ми зберігаємо одиниці часу в масиві із їхньою «вартістю» в секундах і йдемо від найбільшої до найменшої. Для кожної одиниці беремо цілу кількість разів, додаємо у parts з правильною формою слова (однина/множина). Потім форматуємо список: якщо елемент один — повертаємо його, якщо більше — зʼєднуємо через кому, а перед останнім додаємо 'and'.",
      analysis: {
        timeComplexity:
          "O(1) — фіксована кількість одиниць (5), цикл не росте з вхідними даними.",
        spaceComplexity: "O(1) — максимум 5 частин у масиві.",
        optimalBecause: [
          "Алгоритм не залежить від розміру числа секунд, лише від кількості типів одиниць.",
          "Код залишається простим та розширюваним (можна додати тижні/місяці).",
        ],
        alternatives: [
          {
            method: "Поступове віднімання в while-циклах",
            whyBad: "Легко зробити O(n) по секундах, що абсолютно не потрібно.",
          },
        ],
        edgeCases: [
          "0 секунд → 'now'.",
          "Дуже великі значення секунд, де є всі типи одиниць.",
        ],
        commonMistakes: [
          "Неправильне форматування ком і 'and'.",
          "Неправильна обробка множини (years/day vs days).",
        ],
      },
    },
  },
  {
    title: "Sum of Pairs",
    url: "https://www.codewars.com/kata/54d81488b981293527000c8f",
    level: "5 kyu",
    description:
      "Знайти першу пару чисел у списку, яка дає задану суму. «Першу» в сенсі найменшого правого індексу.",
    examples: `
  sumPairs([11, 3, 7, 5], 10)           → [3, 7]
  sumPairs([4, 3, 2, 3, 4], 6)          → [4, 2]
  sumPairs([0, 0, -2, 3], 2)            → undefined
  sumPairs([10, 5, 2, 3, 7, 5], 10)     → [3, 7]
      `.trim(),
    solution: {
      code: `
  export function sumPairs(
    ints: number[],
    s: number
  ): [number, number] | undefined {
    const seen = new Set<number>();
  
    for (const x of ints) {
      const needed = s - x;
      if (seen.has(needed)) {
        return [needed, x];
      }
      seen.add(x);
    }
  
    return undefined;
  }
        `.trim(),
      explanation:
        "Ідемо зліва направо і тримаємо в Set усі вже бачені числа. Для кожного елемента x перевіряємо, чи бачили ми s - x. Якщо так — ця пара перша за умовою задачі (ми рухаємося зліва направо). Якщо пройшли масив і не знайшли пари — повертаємо undefined.",
      analysis: {
        timeComplexity: "O(n) — один прохід, операції з Set у середньому O(1).",
        spaceComplexity:
          "O(n) — у найгіршому випадку зберігаємо майже всі елементи.",
        optimalBecause: [
          "Використовує хеш-структуру замість вкладених циклів.",
          "Гарантовано знаходить саме першу пару за індексом справа.",
        ],
        alternatives: [
          {
            method: "Подвійний цикл з перевіркою всіх пар",
            whyBad:
              "O(n²) по часу, повільно на великих масивах, складніше контролювати правило «найменший правий індекс».",
          },
        ],
        edgeCases: [
          "Порожній масив.",
          "Немає жодної пари з відповідною сумою.",
          "Дублікати чисел, де важливо, яку саме пару повернути.",
        ],
        commonMistakes: [
          "Повернення останньої підходящої пари, а не першої.",
          "Не враховують випадок, коли результат має бути undefined.",
        ],
      },
    },
  },
  {
    title: "The Hashtag Generator",
    url: "https://www.codewars.com/kata/52449b062fb80683ec000024",
    level: "5 kyu",
    description:
      "Створіть хештег з рядка: кожне слово з великої літери, пробіли видаляються, на початку '#'. Якщо результат порожній або довший за 140 символів — повернути false.",
    examples: `
  generateHashtag(" Hello there thanks for trying my Kata")
  → "#HelloThereThanksForTryingMyKata"
  
  generateHashtag("    ") → false
      `.trim(),
    solution: {
      code: `
  export function generateHashtag(str: string): string | false {
    const words = str
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  
    if (words.length === 0) return false;
  
    const body = words
      .map(
        w => w[0].toUpperCase() + (w.length > 1 ? w.slice(1).toLowerCase() : "")
      )
      .join("");
  
    const result = "#" + body;
    return result.length > 140 ? false : result;
  }
        `.trim(),
      explanation:
        "Очищаємо рядок, розбиваємо на слова через будь-які пробіли, фільтруємо порожні. Якщо слів немає — повертаємо false. Для кожного слова робимо Capitalize, конкатенуємо, додаємо '#'. Наприкінці перевіряємо довжину на обмеження 140 символів.",
      analysis: {
        timeComplexity:
          "O(n) — залежить від довжини вхідного рядка та кількості слів.",
        spaceComplexity: "O(n) — створюємо масив слів і вихідний рядок.",
        optimalBecause: [
          "Використовує єдиний прохід по рядку через split/map/join.",
          "Чітко дотримується умов по довжині та пустому рядку.",
        ],
        alternatives: [
          {
            method: "Побуквений мануальний парсинг",
            whyBad:
              "Стає менш читабельним, легше допустити помилку з пробілами та регістром.",
          },
        ],
        edgeCases: [
          "Рядок лише з пробілів.",
          "Дуже довгі рядки, що на межі 140 символів.",
        ],
        commonMistakes: [
          "Забути обрізати пробіли на початку/в кінці.",
          "Не конвертувати решту слова в lowerCase.",
          "Перевіряти довжину до додавання '#'.",
        ],
      },
    },
  },
  {
    title: "String incrementer",
    url: "https://www.codewars.com/kata/54a91a4883a7de5d7800009c",
    level: "5 kyu",
    description:
      "Інкрементувати число в кінці рядка, зберігаючи кількість нулів. Якщо числа немає — додати '1'.",
    examples: `
  incrementString("foo")        → "foo1"
  incrementString("foobar23")   → "foobar24"
  incrementString("foo0042")    → "foo0043"
  incrementString("foo9")       → "foo10"
  incrementString("foo099")     → "foo100"
      `.trim(),
    solution: {
      code: `
  const tailNumberRegex = /(\\d*)$/;
  
  export function incrementString(str: string): string {
    const match = str.match(tailNumberRegex);
    const numberPart = match ? match[0] : "";
    const prefix = str.slice(0, str.length - numberPart.length);
  
    if (numberPart === "") {
      return prefix + "1";
    }
  
    const length = numberPart.length;
    const incremented = (parseInt(numberPart, 10) + 1)
      .toString()
      .padStart(length, "0");
  
    return prefix + incremented;
  }
        `.trim(),
      explanation:
        "Через regex забираємо лише числовий хвіст рядка. Префікс — це все до нього. Якщо хвоста немає — просто додаємо '1'. Якщо є — парсимо число, інкрементуємо та форматумо назад з тією ж кількістю цифр (padStart). Так ми не ламаємо лідирувальні нулі.",
      analysis: {
        timeComplexity:
          "O(n) — один прохід regex + операції перетворення числа в рядок.",
        spaceComplexity: "O(n) — створюємо новий рядок і кілька проміжних.",
        optimalBecause: [
          "Регулярка дозволяє елегантно взяти саме числовий хвіст.",
          "Не потрібно вручну йти з кінця циклом.",
        ],
        alternatives: [
          {
            method: "Ручний цикл з кінця рядка",
            whyBad:
              "Більше коду, легше помилитися, хоча за складністю він такий самий.",
          },
        ],
        edgeCases: [
          "Рядки без числа в кінці.",
          "Великі числа, що змінюють довжину (наприклад, 099 → 100).",
        ],
        commonMistakes: [
          "Втратити лідирувальні нулі.",
          "Неправильно обробити порожній рядок.",
        ],
      },
    },
  },
  {
    title: "Scramblies",
    url: "https://www.codewars.com/kata/55c04b4cc56a697bb0000048",
    level: "5 kyu",
    description:
      "Перевірити, чи можна переставити частину символів str1 так, щоб отримати str2 (з урахуванням кількості повторень).",
    examples: `
  scramble("rkqodlw", "world")      → true
  scramble("cedewaraaossoqqyt", "codewars") → true
  scramble("katas", "steak")        → false
      `.trim(),
    solution: {
      code: `
  export function scramble(str1: string, str2: string): boolean {
    if (str2.length > str1.length) return false;
  
    const counts = new Map<string, number>();
  
    for (const ch of str1) {
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  
    for (const ch of str2) {
      const current = counts.get(ch) ?? 0;
      if (current === 0) return false;
      counts.set(ch, current - 1);
    }
  
    return true;
  }
        `.trim(),
      explanation:
        "Рахуємо частоти символів у str1 у Map. Потім ідемо по str2 і для кожного символа зменшуємо лічильник. Якщо в якийсь момент потрібного символа немає (0) — повертаємо false. Якщо пройшли рядок str2 до кінця — str1 містить достатньо символів для побудови str2.",
      analysis: {
        timeComplexity:
          "O(n + m), де n — довжина str1, m — довжина str2. Це оптимально.",
        spaceComplexity:
          "O(k), де k — кількість унікальних символів у str1 (верхня межа — O(n)).",
        optimalBecause: [
          "Використовує підрахунок частот замість сортування або пошуку щоразу.",
          "Працює лінійно щодо довжини рядків.",
        ],
        alternatives: [
          {
            method: "Сортування обох рядків і порівняння",
            whyBad: "O(n log n), повільніше й вимагає більше памʼяті.",
          },
        ],
        edgeCases: [
          "str2 довший за str1.",
          "Повторювані символи, де важлива саме кількість.",
        ],
        commonMistakes: [
          "Перевіряти тільки наявність символа, ігноруючи скільки разів він зʼявляється.",
          "Забути ранню перевірку довжини str2 > str1.",
        ],
      },
    },
  },
  {
    title: "ROT13",
    url: "https://www.codewars.com/kata/530e15517bc88ac656000716",
    level: "5 kyu",
    description:
      "Реалізувати шифр ROT13 для латинських літер. Нелатинські символи залишаються без змін.",
    examples: `
  rot13("test")        → "grfg"
  rot13("Test")        → "Grfg"
  rot13("Hello, World!") → "Uryyb, Jbeyq!"
      `.trim(),
    solution: {
      code: `
  export function rot13(message: string): string {
    const shift = (code: number, base: number) =>
      String.fromCharCode(((code - base + 13) % 26) + base);
  
    let result = "";
  
    for (const ch of message) {
      const code = ch.charCodeAt(0);
  
      if (code >= 65 && code <= 90) {
        // A-Z
        result += shift(code, 65);
      } else if (code >= 97 && code <= 122) {
        // a-z
        result += shift(code, 97);
      } else {
        result += ch;
      }
    }
  
    return result;
  }
        `.trim(),
      explanation:
        "Переводимо кожен символ у charCode. Якщо це A–Z або a–z, зміщуємо на 13 позицій у межах алфавіту та конвертуємо назад у символ. Інші символи (пробіли, знаки пунктуації, цифри) лишаємо без змін.",
      analysis: {
        timeComplexity:
          "O(n) — один прохід по рядку з O(1) операціями на символ.",
        spaceComplexity: "O(n) — створюємо новий рядок тієї ж довжини.",
        optimalBecause: [
          "Працює напряму з charCode, без важких структур.",
          "Чітко обробляє верхній і нижній регістр окремо.",
        ],
        alternatives: [
          {
            method: "Використання попередньо згенерованих мап літер",
            whyBad:
              "Більше коду й памʼяті, немає виграшу в продуктивності для такого простого шифру.",
          },
        ],
        edgeCases: ["Порожній рядок.", "Рядок без букв."],
        commonMistakes: [
          "Не зберегти регістр літер.",
          "Некоректне модульне додавання (вихід за межі алфавіту).",
        ],
      },
    },
  },
  {
    title: "Calculating with Functions",
    url: "https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39",
    level: "5 kyu",
    description:
      "Реалізувати функції zero..nine та plus, minus, times, dividedBy так, щоб вирази типу seven(times(five())) працювали як звичайні обчислення.",
    examples: `
  seven(times(five()))      → 35
  four(plus(nine()))        → 13
  eight(minus(three()))     → 5
  six(dividedBy(two()))     → 3
      `.trim(),
    solution: {
      code: `
  type Op = ((right: number) => number) | undefined;
  
  function makeNumber(n: number) {
    return (op?: Op) => (op ? op(n) : n);
  }
  
  export const zero = makeNumber(0);
  export const one = makeNumber(1);
  export const two = makeNumber(2);
  export const three = makeNumber(3);
  export const four = makeNumber(4);
  export const five = makeNumber(5);
  export const six = makeNumber(6);
  export const seven = makeNumber(7);
  export const eight = makeNumber(8);
  export const nine = makeNumber(9);
  
  function makeOp(
    fn: (left: number, right: number) => number,
    right: number
  ): (left: number) => number {
    return (left: number) => fn(left, right);
  }
  
  export const plus = (right: number) => makeOp((l, r) => l + r, right);
  export const minus = (right: number) => makeOp((l, r) => l - r, right);
  export const times = (right: number) => makeOp((l, r) => l * r, right);
  export const dividedBy = (right: number) =>
    makeOp((l, r) => Math.floor(l / r), right);
        `.trim(),
      explanation:
        "Числа — це функції, які приймають опціональну операцію. Якщо операції немає, вони просто повертають своє значення. Операція — це функція, яка вже знає правий операнд і чекає на лівий. Коли ми пишемо seven(times(five())), спочатку викликається five(), повертає число 5, times(5) створює функцію-операцію, а seven(...) передає своє значення як лівий операнд.",
      analysis: {
        timeComplexity: "O(1) для кожного виразу — фіксований набір викликів.",
        spaceComplexity:
          "O(1) — створюємо кілька функцій, але це не залежить від введення.",
        optimalBecause: [
          "Використовує чисті функції й замикання без зайвих структур.",
          "Розділяє відповідальність: числа і операції окремо.",
        ],
        alternatives: [
          {
            method: "Зберігати операцію у глобальному стані",
            whyBad:
              "Нечитабельно, важко розширювати, легко зламати при паралельних обчисленнях.",
          },
        ],
        edgeCases: [
          "Виклик number() без операції (наприклад, four()).",
          "Ділення з округленням донизу для відʼємних чисел (залежить від вимог задачі).",
        ],
        commonMistakes: [
          "Плутати порядок операндів (left/right).",
          "Не обробити case, коли функцію-число викликають без операції.",
        ],
      },
    },
  },
  {
    title: "Primes in numbers",
    url: "https://www.codewars.com/kata/54d512e62a5e54c96200019e",
    level: "5 kyu",
    description:
      "Зробити просте розкладання натурального числа n > 1 на прості множники у вигляді рядка '(p1**n1)(p2**n2)...'.",
    examples: `
  primeFactors(7775460) → "(2**2)(3**3)(5)(7)(11**2)"
      `.trim(),
    solution: {
      code: `
  export function primeFactors(n: number): string {
    const factors: Array<[number, number]> = [];
  
    let divisor = 2;
    while (divisor * divisor <= n) {
      let count = 0;
      while (n % divisor === 0) {
        n /= divisor;
        count++;
      }
      if (count > 0) {
        factors.push([divisor, count]);
      }
      divisor++;
    }
  
    if (n > 1) {
      factors.push([n, 1]);
    }
  
    return factors
      .map(([p, exp]) => (exp === 1 ? \`(\${p})\` : \`(\${p}**\${exp})\`))
      .join("");
  }
        `.trim(),
      explanation:
        "Класичне просте розкладання через ділення. Ділимо n на всі можливі дільники від 2 до √n, рахуємо, скільки разів кожен ділить n, і зберігаємо (просте, степінь). Після циклу, якщо n > 1 — це останній простий множник. Форматуємо за специфікацією: без '**exp' для степеня 1.",
      analysis: {
        timeComplexity:
          "O(√n) у найгіршому випадку, бо перевіряємо дільники до кореня.",
        spaceComplexity:
          "O(k), де k — кількість різних простих множників (зазвичай мало).",
        optimalBecause: [
          "Немає потреби попередньо генерувати всі прості числа до n.",
          "Використовує той факт, що після видалення малих множників верхня межа зменшується.",
        ],
        alternatives: [
          {
            method:
              "Розкладання через попередньо побудований список простих (решето)",
            whyBad:
              "Решето вигідне тільки якщо потрібно розкладати багато чисел; для одиничного виклику сповільнює і ускладнює рішення.",
          },
        ],
        edgeCases: [
          "n — вже просте число.",
          "Степені з великими експонентами (наприклад, 2^k).",
        ],
        commonMistakes: [
          "Забути додати залишок n > 1 як останній множник.",
          "Неправильний формат рядка ('**1' для степеня 1).",
        ],
      },
    },
  },
  {
    title: "Product of consecutive Fib numbers",
    url: "https://www.codewars.com/kata/5541f58a944b85ce6d00006a",
    level: "5 kyu",
    description:
      "Знайти два сусідні числа Фібоначчі F(n) та F(n+1), добуток яких дорівнює або вперше перевищує prod.",
    examples: `
  productFib(714)   → [21, 34, true]   // 21 * 34 = 714
  productFib(800)   → [34, 55, false]  // 34 * 55 = 1870 > 800
      `.trim(),
    solution: {
      code: `
  export function productFib(
    prod: number
  ): [number, number, boolean] {
    let a = 0;
    let b = 1;
  
    while (a * b < prod) {
      const next = a + b;
      a = b;
      b = next;
    }
  
    return [a, b, a * b === prod];
  }
        `.trim(),
      explanation:
        "Починаємо зі стандартної послідовності Фібоначчі (0, 1). Обчислюємо добуток сусідніх чисел a * b. Поки добуток менший за prod — рухаємося далі в послідовності. Коли добуток стає ≥ prod, повертаємо поточну пару і прапорець, чи був добуток рівний prod.",
      analysis: {
        timeComplexity:
          "O(k), де k — індекс числа Фібоначчі, на якому добуток перевищить prod. k росте повільно (логарифмічно за значенням prod).",
        spaceComplexity: "O(1) — тримаємо тільки два останні числа.",
        optimalBecause: [
          "Використовує властивість Фібоначчі, не зберігаючи весь масив.",
          "Добуток зростає досить швидко, тому цикл короткий навіть для великих prod.",
        ],
        alternatives: [
          {
            method: "Генерувати масив Фібоначчі наперед",
            whyBad:
              "Зайва памʼять, хоча час приблизно той самий, але рішення стає важчим для читання.",
          },
        ],
        edgeCases: [
          "prod = 0.",
          "Малі значення prod, де пара знаходиться дуже рано.",
        ],
        commonMistakes: [
          "Плутати порядок оновлення a та b.",
          "Неправильна умова циклу (≤ замість <).",
        ],
      },
    },
  },
  {
    title: "Weight for weight",
    url: "https://www.codewars.com/kata/55c6126177c9441a570000cc",
    level: "5 kyu",
    description:
      "Відсортувати числа в рядку за «вагою» — сумою їхніх цифр. Якщо сума однакова — порівнювати лексикографічно як рядки.",
    examples: `
  orderWeight("103 123 4444 99 2000")
  → "2000 103 123 4444 99"
      `.trim(),
    solution: {
      code: `
  function weightOf(numStr: string): number {
    return numStr.split("").reduce((sum, ch) => sum + Number(ch), 0);
  }
  
  export function orderWeight(str: string): string {
    const nums = str.trim().split(/\s+/).filter(Boolean);
  
    return nums
      .slice()
      .sort((a, b) => {
        const wa = weightOf(a);
        const wb = weightOf(b);
        if (wa !== wb) return wa - wb;
        return a.localeCompare(b);
      })
      .join(" ");
  }
        `.trim(),
      explanation:
        "Спочатку розбиваємо рядок на числа як рядки. Функція weightOf рахує суму цифр кожного числа. Сортуємо масив за вагою, а при рівній вазі — через localeCompare за самим рядком. Наприкінці зʼєднуємо через пробіл.",
      analysis: {
        timeComplexity:
          "O(n log n), де n — кількість чисел; під час порівняння рахуємо вагу (додатковий O(k)). Можна кешувати, якщо потрібно.",
        spaceComplexity:
          "O(n) — зберігаємо масив чисел і проміжні представлення.",
        optimalBecause: [
          "Виконує стандартне сортування з адаптованою функцією порівняння.",
          "Легко оптимізується кешуванням ваг, якщо потрібно.",
        ],
        alternatives: [
          {
            method: "Сортування без урахування лексикографічного тай-брейка",
            whyBad:
              "Порушує умови задачі; результат може не збігатися з очікуваним.",
          },
        ],
        edgeCases: [
          "Порожній рядок.",
          "Багато пробілів між числами.",
          "Числа з однаковою вагою.",
        ],
        commonMistakes: [
          "Ігнорування тай-брейка за рядком.",
          "Не фільтрують порожні елементи після split.",
        ],
      },
    },
  },
  {
    title: "First non-repeating character",
    url: "https://www.codewars.com/kata/52bc74d4ac05d0945d00054e",
    level: "5 kyu",
    description:
      "Повернути перший символ у рядку, який ніде більше не повторюється (з урахуванням регістру). Якщо такого немає — повернути порожній рядок.",
    examples: `
  firstNonRepeatingLetter("a")        → "a"
  firstNonRepeatingLetter("stress")   → "t"
  firstNonRepeatingLetter("sTreSS")   → "T"
      `.trim(),
    solution: {
      code: `
  export function firstNonRepeatingLetter(str: string): string {
    const lower = str.toLowerCase();
    const counts = new Map<string, number>();
  
    for (const ch of lower) {
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  
    for (let i = 0; i < str.length; i++) {
      if (counts.get(lower[i]) === 1) {
        return str[i];
      }
    }
  
    return "";
  }
        `.trim(),
      explanation:
        "Щоб ігнорувати регістр при підрахунку частот, створюємо lower-версію рядка і рахуємо частоти в ній. Потім вдруге проходимо по оригінальному рядку та шукаємо перший символ, чия нижньорегістрова версія має частоту 1. Повертаємо символ з оригінального рядка, щоб зберегти регістр.",
      analysis: {
        timeComplexity:
          "O(n) — два послідовні проходи по рядку (підрахунок і пошук).",
        spaceComplexity:
          "O(k), де k — кількість унікальних символів (обмежений алфавітом).",
        optimalBecause: [
          "Лінійний час без вкладених циклів.",
          "Окремі проходи роблять код простим і прозорим.",
        ],
        alternatives: [
          {
            method: "Для кожного символу перевіряти indexOf / lastIndexOf",
            whyBad:
              "Може стати O(n²) на великих рядках, бо кожен indexOf — додатковий прохід.",
          },
        ],
        edgeCases: ["Немає жодного унікального символа.", "Порожній рядок."],
        commonMistakes: [
          "Не враховувати вимогу ігнорувати регістр при порівнянні.",
          "Повернення lowercase-версії замість оригінального символа.",
        ],
      },
    },
  },
  {
    title: "Tic-Tac-Toe Checker",
    url: "https://www.codewars.com/kata/525caa5c1bf619d28c000335",
    level: "5 kyu",
    description:
      "Перевірити стан гри в хрестики-нулики на полі 3×3: хто виграв, чи гра ще триває, чи нічия.",
    examples: `
  isSolved([
    [1, 1, 1],
    [0, 2, 2],
    [0, 0, 0],
  ]) → 1   // виграв гравець 1
  
  isSolved([
    [2, 1, 1],
    [1, 2, 1],
    [1, 1, 2],
  ]) → 2   // виграв гравець 2
  
  isSolved([
    [0, 0, 1],
    [0, 1, 2],
    [2, 1, 0],
  ]) → -1  // гра ще триває
  
  isSolved([
    [1, 2, 1],
    [2, 1, 2],
    [2, 1, 2],
  ]) → 0   // нічия
      `.trim(),
    solution: {
      code: `
  type Board = number[][]; // 0 = порожньо, 1 або 2 — гравці
  
  export function isSolved(board: Board): number {
    const lines: number[][] = [];
  
    // Рядки і колонки
    for (let i = 0; i < 3; i++) {
      lines.push([board[i][0], board[i][1], board[i][2]]);
      lines.push([board[0][i], board[1][i], board[2][i]]);
    }
  
    // Діагоналі
    lines.push([board[0][0], board[1][1], board[2][2]]);
    lines.push([board[0][2], board[1][1], board[2][0]]);
  
    for (const line of lines) {
      if (line[0] !== 0 && line[0] === line[1] && line[1] === line[2]) {
        return line[0]; // 1 або 2
      }
    }
  
    const hasEmpty = board.some(row => row.some(cell => cell === 0));
    return hasEmpty ? -1 : 0;
  }
        `.trim(),
      explanation:
        "Формуємо всі можливі лінії: три рядки, три колонки та дві діагоналі. Якщо у будь-якій лінії всі три клітинки однакові і не 0 — відповідний гравець переміг. Якщо переможця немає, перевіряємо, чи лишилися порожні клітинки (0). Якщо є — гра ще не завершена (-1), якщо немає — нічия (0).",
      analysis: {
        timeComplexity: "O(1) — кількість клітинок і ліній фіксована (3×3).",
        spaceComplexity:
          "O(1) — створюємо невеликий масив ліній фіксованого розміру.",
        optimalBecause: [
          "Не використовує зайвих структур на щось настільки маленьке.",
          "Код дуже явно відображає всі можливі виграшні лінії.",
        ],
        alternatives: [
          {
            method: "Алгоритм, що масштабується на N×N",
            whyBad: "Надлишкова складність для задачі, де поле завжди 3×3.",
          },
        ],
        edgeCases: [
          "Одразу кілька виграшних ліній (залежить від тестів, зазвичай такого бути не повинно).",
          "Повністю порожнє поле.",
        ],
        commonMistakes: [
          "Забути перевірити одну з діагоналей.",
          "Не розрізняти стан «гра не закінчена» та «нічия».",
        ],
      },
    },
  },
];
