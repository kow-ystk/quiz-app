const quiz = [
  {
    question: "アイスランド",
    choices: ["レイキャビク", "アークレイリ", "ケプラビーク", "へプン"],
    answer: "レイキャビク",
    image: "https://kow-ystk.github.io/quiz-app/images/reykjavik.jpg",
  },
  {
    question: "スウェーデン",
    choices: ["ヨーテボリ", "ストックホルム", "マルメ", "ウプサラ"],
    answer: "ストックホルム",
    image: "https://kow-ystk.github.io/quiz-app/images/stockholm.jpg",
  },
  {
    question: "デンマーク",
    choices: ["オーゼンセ", "オーフス", "ビルン", "コペンハーゲン"],
    answer: "コペンハーゲン",
    image: "https://kow-ystk.github.io/quiz-app/images/copenhagen.jpg",
  },
  {
    question: "フィンランド",
    choices: ["タンペレ", "トゥルク", "オウル", "ヘルシンキ"],
    answer: "ヘルシンキ",
    image: "https://kow-ystk.github.io/quiz-app/images/helsinki.jpg",
  },
  {
    question: "ノルウェー",
    choices: ["オスロ", "ベルゲン", "トロンハイム", "スタヴァンゲル"],
    answer: "オスロ",
    image: "https://kow-ystk.github.io/quiz-app/images/oslo.jpg",
  },
];

const $window = window;
const $doc = document;
const $question = $doc.querySelector('[data-js="js-question"]');
const $answer = $doc.querySelector('[data-js="js-answer"]');
const $buttons = $doc.querySelectorAll('[data-js="js-btn"]');
const $image = $doc.querySelector('[data-js="js-image"]');
const $contents = $doc.querySelector('[data-js="js-contents"]');

const $start = $doc.querySelector('[data-js="js-start"]');
const $wrapper = $doc.querySelector('[data-js="js-wrapper"]');
const $end = $doc.querySelector('[data-js="js-end"]');

const $startBtn = $doc.querySelector('[data-js="js-startBtn"]');
const $retryBtn = $doc.querySelector('[data-js="js-retryBtn"]');

const $endTxt = $doc.querySelector('[data-js="js-endTxt"]');

const quizLen = quiz.length;
let quizCount = 0;
let score = 0;

const startGame = () => {
  $start.classList.remove("quiz__start--active");
  $start.classList.add("quiz__start");

  $wrapper.classList.add("quiz__wrapper--active");
};

const init = () => {
  $question.innerHTML = `問題${quizCount + 1}:<br>${
    quiz[quizCount].question
  }の<br>首都はどれ？`;

  $image.innerHTML = `<img class="quizImage__capitalImg" src='${quiz[quizCount].image}' alt='首都の写真'>`;

  const buttonLen = $buttons.length;
  let btnIndex = 0;

  while (btnIndex < buttonLen) {
    $buttons[btnIndex].textContent = quiz[quizCount].choices[btnIndex];
    btnIndex++;
  }
};

const goToNext = () => {
  const buttonLen = $buttons.length;
  let btnIndex = 0;

  while (btnIndex < buttonLen) {
    $buttons[btnIndex].classList.remove("quizContents__choices--correct");
    $buttons[btnIndex].classList.remove("quizContents__choices--incorrect");
    $buttons[btnIndex].disabled = false;
    btnIndex++;
  }

  $answer.textContent = "";
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
    $answer.innerHTML = `正解！問題${quizCount + 1}の答えは<br>${
      quiz[quizCount].answer
    }です`;
    score++;
  } else {
    $answer.innerHTML = `残念！不正解...問題${quizCount + 1}の答えは<br>${
      quiz[quizCount].answer
    }です`;
  }

  const buttonLen = $buttons.length;
  let btnIndex = 0;

  while (btnIndex < buttonLen) {
    if ($buttons[btnIndex].textContent === quiz[quizCount].answer) {
      $buttons[btnIndex].classList.add("quizContents__choices--correct");
    } else {
      $buttons[btnIndex].classList.add("quizContents__choices--incorrect");
    }

    $buttons[btnIndex].disabled = true;

    btnIndex++;
  }

  setTimeout("goToNext()", 3000);
};

const showEnd = () => {
  $endTxt.textContent = `終了！あなたのスコアは ${Math.floor(
    (score / quizLen) * 100
  )}です`;

  $wrapper.classList.remove("quiz__wrapper--active");
  $wrapper.classList.add("quiz__wrapper");

  $end.classList.add("quiz__end--active");
};

const reload = () => {
  document.location.reload();
};

$startBtn.addEventListener("click", startGame);

init();

$retryBtn.addEventListener("click", reload);

let choicesIndex = 0;
let choicesLen = quiz[quizCount].choices.length;

while (choicesIndex < choicesLen) {
  $buttons[choicesIndex].addEventListener("click", (e) => {
    judge(e.target);
  });
  choicesIndex++;
}
