import { supplementalQuestions } from "./supplement";
import type { InterviewQuestion, QuestionCategory, QuestionDifficulty } from "../../types/interview";

type SeedEntry = {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  tags: string[];
  frequencyScore: number;
  ru: string;
  en: string;
  shortRu: string;
  shortEn: string;
  detailRu: string;
  detailEn: string;
  followRu: string;
  followEn: string;
  followAnswerRu: string;
  followAnswerEn: string;
  mistakesRu?: string[];
  mistakesEn?: string[];
  keywords: string[];
  relatedQuestions?: string[];
};

const expectationRu = [
  "Дать короткое определение без ухода в документацию.",
  "Показать практический сценарий применения.",
  "Назвать ограничение или типичную ошибку."
];

const expectationEn = [
  "Give a short definition without turning it into documentation.",
  "Show a practical use case.",
  "Mention one limitation or common mistake."
];

const defaultMistakesRu = [
  "Отвечать слишком академично и терять главный смысл.",
  "Не связывать концепт с реальным кодом.",
  "Игнорировать ограничения и trade-offs."
];

const defaultMistakesEn = [
  "Answering too academically and missing the core point.",
  "Not connecting the concept to real code.",
  "Ignoring limitations and trade-offs."
];

function q(entry: SeedEntry): InterviewQuestion {
  return {
    id: entry.id,
    category: entry.category,
    difficulty: entry.difficulty,
    tags: entry.tags,
    frequencyScore: entry.frequencyScore,
    question: { ru: entry.ru, en: entry.en },
    shortAnswer: { ru: entry.shortRu, en: entry.shortEn },
    detailedAnswer: { ru: entry.detailRu, en: entry.detailEn },
    followUpQuestion: { ru: entry.followRu, en: entry.followEn },
    followUpAnswer: { ru: entry.followAnswerRu, en: entry.followAnswerEn },
    interviewerExpectation: { ru: expectationRu, en: expectationEn },
    commonMistakes: {
      ru: entry.mistakesRu ?? defaultMistakesRu,
      en: entry.mistakesEn ?? defaultMistakesEn
    },
    keywords: entry.keywords,
    relatedQuestions: entry.relatedQuestions ?? []
  };
}

const baseQuestions: InterviewQuestion[] = [
  q({
    id: "js-event-loop",
    category: "javascript",
    difficulty: "junior_plus",
    tags: ["event-loop", "async"],
    frequencyScore: 99,
    ru: "Что такое event loop в JavaScript?",
    en: "What is the event loop in JavaScript?",
    shortRu: "Event loop координирует call stack, microtasks и macrotasks, чтобы асинхронный код выполнялся после освобождения стека.",
    shortEn: "The event loop coordinates the call stack, microtasks, and macrotasks so async code runs after the stack is free.",
    detailRu: "Синхронный код идёт в call stack. Promise callbacks попадают в microtask queue, timers and events — в macrotask queue. После стека сначала выполняются microtasks.",
    detailEn: "Synchronous code runs on the call stack. Promise callbacks go to the microtask queue, timers and events to the macrotask queue. After the stack clears, microtasks run first.",
    followRu: "Что выполнится раньше: Promise.then или setTimeout 0?",
    followEn: "What runs first: Promise.then or setTimeout 0?",
    followAnswerRu: "Promise.then, потому что microtasks выполняются перед macrotasks.",
    followAnswerEn: "Promise.then, because microtasks run before macrotasks.",
    keywords: ["event loop", "microtask", "macrotask", "promise", "setTimeout"]
  }),
  q({
    id: "js-closures",
    category: "javascript",
    difficulty: "junior",
    tags: ["closures", "scope"],
    frequencyScore: 98,
    ru: "Что такое замыкание?",
    en: "What is a closure?",
    shortRu: "Замыкание — это функция, которая помнит переменные из внешней области видимости после завершения этой области.",
    shortEn: "A closure is a function that remembers variables from its outer scope after that scope has finished.",
    detailRu: "Замыкания полезны для инкапсуляции, фабрик функций и callbacks. Функция хранит ссылку на lexical environment, а не копию значения.",
    detailEn: "Closures are useful for encapsulation, function factories, and callbacks. The function keeps a reference to the lexical environment, not a copied value.",
    followRu: "Почему замыкания могут приводить к утечкам памяти?",
    followEn: "Why can closures cause memory leaks?",
    followAnswerRu: "Если замыкание удерживает ссылку на большой объект, сборщик мусора не сможет его освободить.",
    followAnswerEn: "If a closure keeps a reference to a large object, the garbage collector cannot release it.",
    keywords: ["closure", "lexical scope", "scope", "memory"]
  }),
  q({
    id: "js-var-let-const",
    category: "javascript",
    difficulty: "junior",
    tags: ["scope", "variables"],
    frequencyScore: 95,
    ru: "Чем отличаются var, let и const?",
    en: "What is the difference between var, let, and const?",
    shortRu: "var имеет function scope и hoisting. let и const имеют block scope; const запрещает переназначение binding.",
    shortEn: "var is function-scoped and hoisted. let and const are block-scoped; const prevents rebinding.",
    detailRu: "let и const находятся в temporal dead zone до объявления. const не делает объект неизменяемым, он запрещает только присвоить новую ссылку.",
    detailEn: "let and const are in the temporal dead zone before declaration. const does not make objects immutable; it only prevents assigning a new reference.",
    followRu: "Можно ли изменить объект, объявленный через const?",
    followEn: "Can you mutate an object declared with const?",
    followAnswerRu: "Да, можно менять свойства. Нельзя переназначить саму переменную.",
    followAnswerEn: "Yes, properties can change. You cannot reassign the variable itself.",
    keywords: ["var", "let", "const", "hoisting", "tdz"]
  }),
  q({
    id: "js-this",
    category: "javascript",
    difficulty: "junior_plus",
    tags: ["this", "functions"],
    frequencyScore: 93,
    ru: "Как определяется this в JavaScript?",
    en: "How is this determined in JavaScript?",
    shortRu: "this зависит от способа вызова функции: method call, plain call, constructor, bind/call/apply. Arrow functions берут this лексически.",
    shortEn: "this depends on how a function is called: method call, plain call, constructor, bind/call/apply. Arrow functions capture this lexically.",
    detailRu: "Важно смотреть не на место объявления, а на call site. Исключение — arrow function: у неё нет собственного this.",
    detailEn: "Look at the call site, not where the function is declared. The exception is an arrow function: it has no own this.",
    followRu: "Почему this теряется при передаче метода как callback?",
    followEn: "Why is this lost when passing a method as a callback?",
    followAnswerRu: "Метод вызывается уже как обычная функция, без объекта слева от вызова.",
    followAnswerEn: "The method is called as a plain function, without the object on the left side.",
    keywords: ["this", "bind", "call", "apply", "arrow"]
  }),
  q({
    id: "js-prototypes",
    category: "javascript",
    difficulty: "junior_plus",
    tags: ["prototype", "oop"],
    frequencyScore: 91,
    ru: "Что такое prototype chain?",
    en: "What is the prototype chain?",
    shortRu: "Prototype chain — цепочка объектов, по которой JavaScript ищет свойство, если его нет на самом объекте.",
    shortEn: "The prototype chain is the chain JavaScript walks when a property is not found on the object itself.",
    detailRu: "Объект ссылается на prototype. Поиск идёт вверх до null. Classes в JS — синтаксис поверх прототипного наследования.",
    detailEn: "An object points to a prototype. Lookup continues upward until null. JS classes are syntax over prototype-based inheritance.",
    followRu: "Чем __proto__ отличается от prototype?",
    followEn: "How is __proto__ different from prototype?",
    followAnswerRu: "__proto__ — ссылка объекта на прототип. prototype — свойство функции-конструктора для будущих экземпляров.",
    followAnswerEn: "__proto__ is an object's prototype reference. prototype is a constructor function property used for future instances.",
    keywords: ["prototype", "prototype chain", "class", "inheritance"]
  }),
  q({
    id: "js-promise",
    category: "javascript",
    difficulty: "junior",
    tags: ["promise", "async"],
    frequencyScore: 96,
    ru: "Что такое Promise?",
    en: "What is a Promise?",
    shortRu: "Promise — объект, представляющий будущий результат асинхронной операции: fulfilled, rejected или pending.",
    shortEn: "A Promise is an object representing a future result of an async operation: fulfilled, rejected, or pending.",
    detailRu: "Promise позволяет цеплять then/catch/finally и избегать callback hell. Ошибки пробрасываются по цепочке до catch.",
    detailEn: "Promises allow then/catch/finally chaining and avoid callback hell. Errors propagate through the chain until catch.",
    followRu: "Что вернёт then?",
    followEn: "What does then return?",
    followAnswerRu: "Новый Promise, поэтому цепочки можно продолжать.",
    followAnswerEn: "A new Promise, which is why chaining works.",
    keywords: ["promise", "then", "catch", "async"]
  }),
  q({
    id: "js-async-await",
    category: "javascript",
    difficulty: "junior",
    tags: ["async-await", "promise"],
    frequencyScore: 95,
    ru: "Что делает async/await?",
    en: "What does async/await do?",
    shortRu: "async/await — синтаксис поверх Promise, который делает асинхронный код похожим на синхронный.",
    shortEn: "async/await is syntax over Promises that makes async code read like synchronous code.",
    detailRu: "async функция всегда возвращает Promise. await приостанавливает выполнение внутри функции до settled результата.",
    detailEn: "An async function always returns a Promise. await pauses execution inside that function until the awaited result settles.",
    followRu: "Как ловить ошибки в async/await?",
    followEn: "How do you handle errors with async/await?",
    followAnswerRu: "Через try/catch или catch на возвращённом Promise.",
    followAnswerEn: "With try/catch or by calling catch on the returned Promise.",
    keywords: ["async", "await", "promise", "try catch"]
  }),
  q({
    id: "js-map-filter-reduce",
    category: "javascript",
    difficulty: "junior",
    tags: ["arrays", "functional"],
    frequencyScore: 88,
    ru: "Когда использовать map, filter и reduce?",
    en: "When should you use map, filter, and reduce?",
    shortRu: "map преобразует элементы, filter отбирает элементы, reduce сворачивает массив в одно значение.",
    shortEn: "map transforms items, filter selects items, reduce folds an array into a single value.",
    detailRu: "Хороший ответ — назвать намерение. Если reduce ухудшает читаемость, лучше явный цикл или специализированный метод.",
    detailEn: "A good answer names the intent. If reduce hurts readability, prefer a loop or a more specific method.",
    followRu: "Почему reduce часто критикуют?",
    followEn: "Why is reduce often criticized?",
    followAnswerRu: "Его легко использовать для всего подряд, делая код менее читаемым.",
    followAnswerEn: "It is easy to overuse it and make code less readable.",
    keywords: ["map", "filter", "reduce", "array"]
  }),
  q({
    id: "js-equality",
    category: "javascript",
    difficulty: "junior",
    tags: ["equality", "coercion"],
    frequencyScore: 90,
    ru: "Чем отличаются == и ===?",
    en: "What is the difference between == and ===?",
    shortRu: "=== сравнивает без приведения типов. == сначала делает coercion, поэтому может давать неожиданные результаты.",
    shortEn: "=== compares without type coercion. == coerces types first, which can produce surprising results.",
    detailRu: "В production-коде почти всегда используют ===. == допустим редко, когда coercion намеренный и очевидный.",
    detailEn: "Production code almost always uses ===. == is acceptable rarely, when coercion is intentional and obvious.",
    followRu: "Почему null == undefined возвращает true?",
    followEn: "Why does null == undefined return true?",
    followAnswerRu: "Это специальное правило loose equality: null и undefined равны только друг другу.",
    followAnswerEn: "It is a special loose equality rule: null and undefined are equal only to each other.",
    keywords: ["equality", "coercion", "strict equality"]
  }),
  q({
    id: "js-debounce-throttle",
    category: "javascript",
    difficulty: "junior_plus",
    tags: ["performance", "events"],
    frequencyScore: 89,
    ru: "Чем отличаются debounce и throttle?",
    en: "What is the difference between debounce and throttle?",
    shortRu: "Debounce ждёт паузу перед вызовом. Throttle разрешает вызов не чаще заданного интервала.",
    shortEn: "Debounce waits for a pause before calling. Throttle allows calls at most once per interval.",
    detailRu: "Debounce подходит для поиска при вводе. Throttle — для scroll/resize, где нужны регулярные обновления.",
    detailEn: "Debounce fits search input. Throttle fits scroll/resize where regular updates are needed.",
    followRu: "Что выбрать для autocomplete?",
    followEn: "What would you choose for autocomplete?",
    followAnswerRu: "Обычно debounce, чтобы не отправлять запрос на каждую клавишу.",
    followAnswerEn: "Usually debounce, to avoid sending a request on every keystroke.",
    keywords: ["debounce", "throttle", "performance", "events"]
  })
];

export const interviewQuestions: InterviewQuestion[] = [...baseQuestions, ...supplementalQuestions];
