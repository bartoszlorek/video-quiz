import {decodeQuestions} from './questions';

const videoQuizData = {
  '00:00:05': {
    question: 'What is this land?',
    answers: [
      {text: 'Poland'},
      {text: 'Ireland'},
      {text: 'Iceland', correct: true},
      {text: 'Disneyland'},
    ],
  },
  '00:00:11': {
    question: 'How many horses do you see?',
    answers: [
      {text: 'three'},
      {text: 'four'},
      {text: 'five'},
      {text: 'six', correct: true},
    ],
  },
};

var previousTimestamp;
var overlayElement = document.querySelector('.overlay');
var playerElement = document.querySelector('.player');
var questionElement = document.querySelector('.question');
var answersElement = document.querySelector('.answers');
var nextElement = document.querySelector('.next');

function displayQuestion(data) {
  overlayElement.style.display = 'flex';
  nextElement.style.display = 'none';
  exitFullScreen();

  // fill-in
  questionElement.innerText = data.question;
  removeAllChildNodes(answersElement);

  data.answers.forEach(function (answerData) {
    var elem = document.createElement('button');

    elem.innerText = answerData.text;
    elem.onclick = function () {
      elem.classList.add(answerData.correct ? 'correct' : 'wrong');

      if (answerData.correct) {
        nextElement.style.display = 'block';
      }
    };

    answersElement.appendChild(elem);
  });
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

nextElement.onclick = function () {
  overlayElement.style.display = 'none';
  playerElement.play();
};

playerElement.ontimeupdate = function () {
  var timestamp = new Date(playerElement.currentTime * 1000)
    .toISOString()
    .substr(11, 8);

  if (previousTimestamp !== timestamp) {
    previousTimestamp = timestamp;

    var data = videoQuizData[timestamp];
    if (data) {
      displayQuestion(data);
      playerElement.pause();
    }
  }
};

console.log(decodeQuestions(__QUESTIONS_DATA__));
