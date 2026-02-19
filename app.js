"use strict";

// ---------- HELPERS ----------
function normalizeYesNo(input) {
  if (!input) return "";
  const answer = input.trim().toLowerCase();

  // Accept y/n or yes/no only
  if (answer === "y" || answer === "yes") return "yes";
  if (answer === "n" || answer === "no") return "no";
  return "";
}

function askYesNoQuestion(questionText, correctAnswerYesOrNo) {
  let userAnswer = "";

  while (userAnswer === "") {
    const raw = prompt(`${questionText} (y/n or yes/no)`);
    userAnswer = normalizeYesNo(raw);

    if (userAnswer === "") {
      alert("Please answer with y/n or yes/no.");
    }
  }

  const isCorrect = userAnswer === correctAnswerYesOrNo;


  console.log(`Q: ${questionText} | Correct? ${isCorrect}`);

  if (isCorrect) {
    alert("Correct!");
  } else {
    alert("Not quite — thanks for guessing!");
  }

  return isCorrect;
}

// ---------- APP ----------
const welcomeMessageEl = document.getElementById("welcome-message");
const startBtn = document.getElementById("btn-start");
const resultsEl = document.getElementById("results");
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function startGame() {
  const name = prompt("What’s your name?");
  const displayName = name && name.trim() ? name.trim() : "friend";

  if (welcomeMessageEl) {
    welcomeMessageEl.textContent = `Welcome, ${displayName}! Let’s play a quick About Me guessing game.`;
  }

  let score = 0;

  // Exactly five yes/no questions
  if (askYesNoQuestion("According to Neal deGrasse Tyson, is space hotter than you think?", "yes")) score++;
  if (askYesNoQuestion("Do you enjoy films about AI, Future Worlds, and Dystopian themes?", "yes")) score++;
  if (askYesNoQuestion("Have I worked in media/production roles before?", "yes")) score++;
  if (askYesNoQuestion("Do I still relish Vaporwave Aesthetics and Memphis-style grahics?", "yes")) score++;
  if (askYesNoQuestion("Is my favorite background style usually stark white l,with dark text?", "no")) score++; // example “fun” one
 
  alert(`Thanks for playing, ${displayName}! Your score: ${score}/5`);

  if (resultsEl) {
    resultsEl.textContent = `Final score for ${displayName}: ${score}/5`;
  }
}

if (startBtn) {
  startBtn.addEventListener("click", startGame);
}

---------------------------------

/*
----------------------------------
Question 7 - film guessing game |
---------------------------------
*/

// All possible answers
const possibleAnswers = ["blade runner", "artificial intelligence", "fifth element", "arrival", "1984", "logan's run", "invitation to hell", "killbots", "Halloween 3", "the lottery"];

// Pick ONE random correct answer from the array
const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
const secretAnswer = possibleAnswers[randomIndex];

// Let’s show all possible choices to the user
const visibleChoices = possibleAnswers.map(films => films[0].toUpperCase() + films.slice(1)).join(", ");

// Max number of attempts
const maxTries = 6;

let userGotIt = false; // starts at 0

// The guessing loop
for (let round = 1; round <= maxTries; round++) {
  const guess = prompt(
    `I'm thinking of a movie I want to watch, can you guess which one it is from the list? \n\nChoices are: ${visibleChoices}\n\nAttempt ${round} of ${maxTries}:`
  );

  if (guess === null) {
    alert("Couldn't choose just one, huh? We'll hold the popcorn for now and We'll give it another shot soon!");
    break;
  }

  const cleanedGuess = guess.trim().toLowerCase();

  if (cleanedGuess === "") {
    alert("Ahhh, I'm definitely in the mood to watch something from the list. This attempt won't count, but make a real guess.");
    round--;
    continue;
  }

  if (cleanedGuess === secretAnswer) {
    alert(`Correct! The answer is "${secretAnswer}". You got it in ${round} attempt(s)!`);
    userGotIt = true;
    score++; // adds a point for a correct answer
    break;
  } else {
    const remaining = maxTries - round;
    if (remaining > 0) {
      alert(`"${guess}" isn’t quite it. Give it another shot! (${remaining} attempt(s) left)`);
    } else {
      alert(`Looks like that's the end of the road and we've got no more to give... The correct answer was "${secretAnswer}".`);
    }
  }
}

// if (!userGotIt) {
  console.log(`The film I was thinking of was - "${secretAnswer}".`);
// }

