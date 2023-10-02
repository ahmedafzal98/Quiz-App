import QuizData from "./data.js";

let counter = 0;
let listContainer;

function loadData() {
  displayRemainingQuest();
  displayQuestion();
}
function displayRemainingQuest() {
  let remainingQuestion = document.querySelector(".question-length");
  remainingQuestion.innerHTML = `QUESTION ${counter} / ${QuizData.length}`;
}
function displayQuestion() {
  let question = document.querySelector(".question");
  question.innerText = QuizData[counter].question;
  createElementsAndTypes();
}
function createElementsAndTypes() {
  let inputRadio = document.createElement("input");
  let liElement = document.createElement("li");
  let label = document.createElement("label");
  inputRadio.type = "radio";
  inputRadio.id = "opt_1";
  let choices = QuizData[counter].options;
  listContainer = document.querySelector(".choice-container");
  appendElements(liElement, inputRadio, label);
  displayChoices(choices, label);
}

function appendElements(liElement, inputRadio, label) {
  liElement.appendChild(inputRadio);
  liElement.appendChild(label);
  listContainer.appendChild(liElement);
}
function displayChoices(choices, label) {
  for (const choice of choices) {
    let key = Object.keys(choice);
    label.innerText = choice[key];
    // createElementsAndTypes();
  }
}

const buttonNext = document.querySelector(".btnNext");
const buttonPrev = document.querySelector(".btnPrevious");
buttonNext.addEventListener("click", btnFunctionality);
buttonPrev.addEventListener("click", btnFunctionality);

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
function nextQuestion() {
  counter++;
  btnFunctionality();
}
function prevQuestion() {
  counter--;
  btnFunctionality();
}

loadData();
