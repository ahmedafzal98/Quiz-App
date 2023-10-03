import QuizData from "./data.js";

let counter = 0;
let listContainer;
let liElement;
let choiceItems;

function loadData() {
  displayRemainingQuest();
}
function displayRemainingQuest() {
  let remainingQuestion = document.querySelector(".question-length");
  remainingQuestion.innerHTML = `QUESTION ${counter} / ${QuizData.length}`;

  displayQuestion();
}
function displayQuestion() {
  let question = document.querySelector(".question");
  question.innerText = QuizData[counter].question;
  createElementsAndTypes();
}
function createElementsAndTypes() {
  let choices = QuizData[counter].options;
  let isNull = QuizData[counter].selectedIndex == null;

  console.log(counter, isNull);
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

const buttonNext = document.querySelector(".btnNext");
const buttonPrev = document.querySelector(".btnPrevious");
buttonNext.addEventListener("click", nextQuestion);
buttonPrev.addEventListener("click", prevQuestion);

function btnFunctionality() {
  if (listContainer.hasChildNodes()) {
    let element = listContainer.children;
    listContainer.remove(element);
    let formData = document.querySelector(".choice-list");
    let ulElement = document.createElement("ul");
    ulElement.classList.add("choice-container");
    formData.appendChild(ulElement);
    loadData();
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
  btnFunctionality();
  // disableQuestion();
}
function prevQuestion() {
  btnFunctionality();
  // disableQuestion();
  counter--;
}
function disableQuestion() {
  if (counter < 1) {
    buttonPrev.disabled = true;
  } else if (counter > 1) {
    buttonPrev.disabled = false;
  }
}

loadData();
