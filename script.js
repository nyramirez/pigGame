'use strict';

// NOTE Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

// NOTE Generated Values
let diceValue, currentScore, activePlayer, scores, playing;

// NOTE Functions
const randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};
const changingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const gameSetting = function () {
  diceValue = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

gameSetting();

// // NOTE Starting conditions
// NOTE We commented this, becuase is done on the function "gameSetting".
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// diceElement.classList.add('hidden');

// NOTE User Roll Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    diceValue = randomNumber();
    // console.log(diceValue);

    // 2. Display Dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceValue}.png`;

    // 3. Check if rolled 1: if true, switch to next player.
    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      changingPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to scores list
    scores[activePlayer] += currentScore;
    // console.log(currentScore);
    // console.log(scores);

    // 2. Display score to the screen on global score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 3. Check if player score is >= 100
    if (scores[activePlayer] < 100) {
      // 4. Change player
      changingPlayers();
    } else {
      // 5. Finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } WINS !!!!!!`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
});

btnNew.addEventListener('click', gameSetting);
