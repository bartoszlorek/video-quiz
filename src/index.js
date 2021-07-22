import {decodeBase64} from './base64';
import {createElement, removeAllChildren} from './element';
import {exitFullscreen, isFullscreen} from './fullscreen';
import {createTimestampHandler} from './video';

const videoQuizData = decodeBase64(__QUESTIONS_DATA__);
const videoElement = document.querySelector('video');
const overlayElement = document.querySelector('.overlay');
const wrapperElement = document.querySelector('.wrapper');

videoElement.ontimeupdate = createTimestampHandler(timestamp => {
  const data = videoQuizData[timestamp];

  if (data) {
    if (isFullscreen()) {
      exitFullscreen();
    }
    enterQuestion(data);
  }
});

function enterQuestion(data) {
  wrapperElement.appendChild(
    createElement('fragment', {
      children: [
        createElement('div', {
          className: 'question',
          innerText: data.question,
        }),
        createElement('div', {
          className: 'answers',
          children: data.answers.map(createAnswerElement),
        }),
      ],
    })
  );

  overlayElement.style.display = 'flex';
  videoElement.pause();
}

function createAnswerElement({text, correct}) {
  return createElement('button', {
    innerText: text,
    onclick: e => {
      e.target.classList.add(correct ? 'correct' : 'wrong');

      if (correct) {
        wrapperElement.appendChild(
          createElement('button', {
            innerText: 'next question',
            onclick: exitQuestion,
          })
        );
      }
    },
  });
}

function exitQuestion() {
  overlayElement.style.display = 'none';
  removeAllChildren(wrapperElement);
  videoElement.play();
}
