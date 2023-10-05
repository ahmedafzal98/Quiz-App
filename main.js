import QuizData from "./data.js";

let counter = 0;
let correctAns = 0;
let listContainer;
let liElement;
let choiceItems;
let question;

const buttonNext = document.querySelector(".btnNext");
const buttonPrev = document.querySelector(".btnPrevious");

function loadData() {
  displayRemainingQuest();
}
function displayRemainingQuest() {
  let remainingQuestion = document.querySelector(".question-length");
  remainingQuestion.innerHTML = `QUESTION ${counter} / ${QuizData.length - 1}`;

  displayQuestion();
}
function displayQuestion() {
  if (counter < 11) {
    question = document.querySelector(".question");
    question.innerText = QuizData[counter].question;
    createElementsAndTypes();
  }
}
function createElementsAndTypes() {
  let choices = QuizData[counter].options;
  let isNull = QuizData[counter].selectedIndex == null;

  for (const choice of choices) {
    let inputRadio = document.createElement("input");
    liElement = document.createElement("li");
    let label = document.createElement("label");
    inputRadio.type = "radio";
    inputRadio.id = "opt_1";

    listContainer = document.querySelector(".choice-container");
    let key = Object.keys(choice);
    label.innerText = choice[key];
    appendElements(liElement, inputRadio, label);
  }
  if (!isNull) {
    onOptionClick(null, QuizData[counter].selectedIndex);
  }
  onOptionSelect();
}

function appendElements(liElement, inputRadio, label) {
  liElement.appendChild(inputRadio);
  liElement.appendChild(label);
  listContainer.appendChild(liElement);
}

function btnFunctionality() {
  if (listContainer.hasChildNodes()) {
    let element = listContainer.children;
    listContainer.remove(element);
    let formData = document.querySelector(".choice-list");
    let ulElement = document.createElement("ul");
    ulElement.classList.add("choice-container");
    formData.appendChild(ulElement);
    loadData();
    // disableQuestion();
  }
}

function onOptionSelect() {
  choiceItems = Array.from(document.querySelectorAll("li"));
  choiceItems.forEach((item, index) => {
    item.addEventListener("click", onOptionClick.bind(null, item, index));
  });
}

function onOptionClick(item, index) {
  let choiceList = getChoiceList();
  let radioList = getRadioList();

  choiceList.forEach((options) => {
    options.classList.remove("selected");
  });
  radioList.forEach((radioBtn) => {
    radioBtn.checked = false;
  });
  saveSelectedOption(index, choiceList, radioList);
}

buttonNext.addEventListener("click", nextQuestion);
buttonPrev.addEventListener("click", prevQuestion);

function saveSelectedOption(index, choiceList, radioList) {
  let selectedOption = choiceList[index];
  let radio = radioList[index];
  selectedOption.classList.add("selected");
  radio.checked = true;
  QuizData[counter].selectedIndex = index;
}

function getRadioList() {
  let radioList = Array.from(document.querySelectorAll("#opt_1"));
  return radioList;
}
function getChoiceList() {
  let choiceList = Array.from(document.querySelectorAll("li"));
  return choiceList;
}
function nextQuestion() {
  counter++;
  if (counter < 11) {
    btnFunctionality();
  }
  disableQuestion();

  let btnText = buttonNext.innerHTML;
  if (btnText === "END QUIZ") {
    buttonNext.addEventListener("click", showResults);
  }
}
function prevQuestion() {
  counter--;
  btnFunctionality();
  disableQuestion();
}
function disableQuestion() {
  if (counter >= 10) {
    // buttonNext.disabled = false;
    buttonPrev.disabled = false;
    buttonNext.innerHTML = "END QUIZ";
  } else if (counter < 1) {
    buttonPrev.disabled = true;
    buttonNext.disabled = false;
    buttonNext.innerHTML = "NEXT QUESTION";
  } else if (counter < 10) {
    buttonNext.disabled = false;
    buttonPrev.disabled = false;
    buttonNext.innerHTML = "NEXT QUESTION";
  }
}

function showResults() {
  QuizData.forEach((item) => {
    if (item.selectedIndex === item.answerIndex) {
      correctAns++;
    }
  });
  listContainer.style.display = "none";
  question.style.display = "none";
  let results = document.querySelector(".results");
  let footer = document.querySelector(".footer");
  let span = document.querySelectorAll("span")[3];
  let percentage = ((correctAns / QuizData.length) * 100).toFixed(2);
  let feedback;
  if (percentage >= 0 && percentage <= 20) {
    feedback = "Keep Learning!";
  } else if (percentage >= 21 && percentage <= 40) {
    feedback = "Progressing!";
  } else if (percentage >= 41 && percentage <= 60) {
    feedback = "Good Effort!";
  } else if (percentage >= 61 && percentage <= 80) {
    feedback = "Well Done!";
  } else {
    feedback = "Excellent!";
  }
  span.innerText = `"You scored ${correctAns} out of 11 (${percentage}%) - ${feedback}"`;
  footer.style.display = "none";
  results.style.display = "flex";
}
// quizTimer(20);

function quizTimer(timeRemaining) {
  let timer = document.querySelectorAll("h3")[1];
  console.log(timer);
  setInterval(() => {
    if (timeRemaining != 0) {
      timeRemaining--;
      timer.innerText = timeRemaining;
    } else {
      showResults();
      return;
    }
  }, 1000);
}

loadData();
