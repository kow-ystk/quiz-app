const quiz = [
  {
    question: "アイスランドの首都はどれ？",
    choices: ["レイキャビク", "アークレイリ", "ケプラビーク", "へプン"],
    answer: "レイキャビク",
  },
  {
    question: "スウェーデンの首都はどれ？",
    choices: ["ヨーテボリ", "ストックホルム", "マルメ", "ウプサラ"],
    answer: "ストックホルム",
  },
  {
    question: "デンマークの首都はどれ？",
    choices: ["オーゼンセ", "オーフス", "ビルン", "コペンハーゲン"],
    answer: "コペンハーゲン",
  },
  {
    question: "フィンランドの首都はどれ？",
    choices: ["タンペレ", "トゥルク", "オウル", "ヘルシンキ"],
    answer: "ヘルシンキ",
  },
  {
    question: "ノルウェーの首都はどれ？",
    choices: ["オスロ", "ベルゲン", "トロンハイム", "スタヴァンゲル"],
    answer: "オスロ",
  },
];

const $window = window;
const $doc = document;
const $question = $doc.querySelector('[data-js="js-question"]');
const $answer = $doc.querySelector('[data-js="js-answer"]');
const $buttons = $doc.querySelectorAll('[data-js="js-btn"]');

const quizLen = quiz.length;
let quizCount = 0;
let score = 0;

const init = () => {
  $question.textContent = quiz[quizCount].question;

  const buttonLen = $buttons.length;
  let btnIndex = 0;

  while (btnIndex < buttonLen) {
    $buttons[btnIndex].textContent = quiz[quizCount].choices[btnIndex];
    btnIndex++;
  }
};

const goToNext = () => {
  quizCount++;
  if (quizCount < quizLen) {
    init(quizCount);
  } else {
    // $window.alert('クイズ終了！');
    showEnd();
  }
};

const judge = (elm) => {
  if (elm.textContent === quiz[quizCount].answer) {
    $answer.textContent = `正解！答えは${quiz[quizCount].answer}です`;
    score++;
  } else {
    $answer.textContent = `残念！不正解...答えは${quiz[quizCount].answer}です`;
  }
  goToNext();
};

const showEnd = () => {
  $question.textContent = `終了！あなたのスコアは ${Math.floor(
    (score / quizLen) * 100
  )}です`;

  const $items = $doc.getElementById("js-items");
  $items.style.visibility = "hidden";
};

init();

let choicesIndex = 0;
let choicesLen = quiz[quizCount].choices.length;

while (choicesIndex < choicesLen) {
  $buttons[choicesIndex].addEventListener("click", (e) => {
    judge(e.target);
  });
  choicesIndex++;
}
