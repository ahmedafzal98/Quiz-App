import QuizData from "./data.js";

// DOM Elements
const buttonNext = document.querySelector(".btnNext");
const buttonPrev = document.querySelector(".btnPrevious");
const questionContainer = document.querySelector(".question");
const choiceContainer = document.querySelector(".choice-container");
const resultsContainer = document.querySelector(".results");
const footer = document.querySelector(".footer");
const timer = document.querySelectorAll("h3")[1];
const feedbackSpan = document.querySelectorAll("span")[3];

// Quiz State
let counter = 0;
let correctAns = 0;
let timeRemaining = 20;

// Initialize the quiz
function initQuiz() {
  loadData();
  addEventListeners();
  displayRemainingQuest();
  quizTimer(timeRemaining);
}

// Display the remaining questions
function displayRemainingQuest() {
  const remainingQuestion = document.querySelector(".question-length");
  remainingQuestion.innerHTML = `QUESTION ${counter} / ${QuizData.length - 1}`;
}

// Display the current question
function displayQuestion() {
  const currentQuestion = QuizData[counter];
  questionContainer.textContent = currentQuestion.question;
  createChoiceElements(currentQuestion.options, currentQuestion.selectedIndex);
}

// Create choice elements
function createChoiceElements(choices, selectedIndex) {
  let options = [];
  let radios = [];
  choiceContainer.innerHTML = "";
  choices.forEach((choice, index) => {
    const inputRadio = createRadioInput(index, selectedIndex);
    const label = createLabel(choice.text);
    const listItem = document.createElement("li");

    listItem.appendChild(inputRadio);
    listItem.appendChild(label);
    choiceContainer.appendChild(listItem);
    options.push(listItem);
    radios.push(inputRadio);
    if (index === selectedIndex) {
      listItem.classList.add("selected");
    }
    listItem.addEventListener("click", () => {
      onOptionClick(index, inputRadio, options, radios, listItem);
    });
  });
}

// Create a radio input element
function createRadioInput(index, selectedIndex) {
  const inputRadio = document.createElement("input");
  inputRadio.type = "radio";
  inputRadio.id = "opt_1";
  inputRadio.checked = index === selectedIndex;

  return inputRadio;
}

// Create a label element
function createLabel(text) {
  const label = document.createElement("label");
  label.textContent = text;
  return label;
}

// Handle option click
function onOptionClick(index, inputRadio, options, radios, listItem) {
  removePrevSelectedOption(options);
  removePrevSelectedRadios(radios);

  listItem.classList.add("selected");
  inputRadio.checked = true;
  const currentQuestion = QuizData[counter];
  currentQuestion.selectedIndex = index;
  disableQuestion();
}

function removePrevSelectedOption(options) {
  options.forEach((item) => {
    item.classList.remove("selected");
  });
}
function removePrevSelectedRadios(radios) {
  radios.forEach((item) => {
    item.checked = false;
  });
}

// Add event listeners
function addEventListeners() {
  buttonNext.addEventListener("click", nextQuestion);
  buttonPrev.addEventListener("click", prevQuestion);
}

// Navigate to the next question
function nextQuestion() {
  counter++;
  if (counter < QuizData.length) {
    displayRemainingQuest();
    displayQuestion();
  } else {
    showResults();
  }
  disableQuestion();
}

// Navigate to the previous question
function prevQuestion() {
  if (counter > 0) {
    counter--;
    displayRemainingQuest();
    displayQuestion();
    disableQuestion();
  }
}

// Handle question disabling and button text
function disableQuestion() {
  if (counter >= 10) {
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

// Show quiz results
function showResults() {
  QuizData.forEach((item) => {
    if (item.selectedIndex === item.answerIndex) {
      correctAns++;
    }
    return;
  });

  resultsContainer.style.display = "flex";
  const percentage = ((correctAns / QuizData.length) * 100).toFixed(2);
  const feedback = getFeedback(percentage);
  feedbackSpan.textContent = `"You scored ${correctAns} out of ${QuizData.length} (${percentage}%) - ${feedback}"`;
  footer.style.display = "none";
  choiceContainer.style.display = "none";
  questionContainer.style.display = "none";
  displayRemainingQuest();
}

// Get feedback based on percentage
function getFeedback(percentage) {
  if (percentage >= 0 && percentage <= 20) {
    return "Keep Learning!";
  } else if (percentage >= 21 && percentage <= 40) {
    return "Progressing!";
  } else if (percentage >= 41 && percentage <= 60) {
    return "Good Effort!";
  } else if (percentage >= 61 && percentage <= 80) {
    return "Well Done!";
  } else {
    return "Excellent!";
  }
}

// Quiz timer
function quizTimer(timeRemaining) {
  let intervalID = setInterval(() => {
    if (timeRemaining === 0) {
      showResults();
      clearInterval(intervalID);
    } else {
      timeRemaining--;
      timer.innerText = timeRemaining;
    }
  }, 1000);

  return;
}

// Load initial data
function loadData() {
  displayRemainingQuest();
  displayQuestion();
  disableQuestion();
}

// Initialize the quiz
initQuiz();
