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
  if (askYesNoQuestion("Do I work in media/production now?", "no")) score++;
  if (askYesNoQuestion("Do I relish Vaporwave Aesthetics and Memphis-style grahics?", "yes")) score++;
  if (askYesNoQuestion("Is accessibility important to how I build websites?", "yes")) score++; // example “fun” one
 
  // ---------- Question 6: Number Guess ----------
  const correctNumber = 7; // <-- change this number to whatever you want
  let gotNumber = false;

  for (let attempt = 1; attempt <= 4; attempt++) {
    const rawGuess = prompt(`Question 6: Guess my number (1-10). Attempt ${attempt} of 4:`);

    if (rawGuess === null) {
      alert("No guess entered — moving on!");
      break;
    }

    const guessNum = Number(rawGuess);

    if (Number.isNaN(guessNum)) {
      alert("That isn't a number. Try again.");
      attempt--;
      continue;
    }

    if (guessNum === correctNumber) {
      alert("Correct! You got the number!");
      console.log(`Q6: Correct on attempt ${attempt}`);
      score++;
      gotNumber = true;
      break;
    } else if (guessNum < correctNumber) {
      alert("Too low!");
      console.log(`Q6: Too low (guess=${guessNum})`);
    } else {
      alert("Too high!");
      console.log(`Q6: Too high (guess=${guessNum})`);
    }
  }

  if (!gotNumber) {
    alert(`The correct number was ${correctNumber}.`);
    console.log(`Q6: User did not guess it. Correct=${correctNumber}`);
  }

  // ---------- Question 7: Movie Guess (Array) ----------
  const possibleAnswers = [
    "blade runner",
    "artificial intelligence",
    "fifth element",
    "arrival",
    "1984",
    "logan's run",
    "invitation to hell",
    "killbots",
    "halloween 3",
    "the lottery",
  ];

  // Show all possible answers to the user (WITHOUT join)
  let choicesText = "";
  for (let i = 0; i < possibleAnswers.length; i++) {
    const film = possibleAnswers[i];
    const titled = film[0].toUpperCase() + film.slice(1);
    choicesText = i === 0 ? titled : choicesText + ", " + titled;
  }

  let gotMovie = false;

  for (let attempt = 1; attempt <= 6; attempt++) {
    const guess = prompt(
      `Question 7: Guess a movie from this list:\n\n${choicesText}\n\nAttempt ${attempt} of 6:`
    );

    if (guess === null) {
      alert("No guess entered — moving on!");
      break;
    }

    const cleanedGuess = guess.trim().toLowerCase();

    if (cleanedGuess === "") {
      alert("Blank doesn't count — try again.");
      attempt--;
      continue;
    }

    // Check WITHOUT includes()
    let isMatch = false;
    for (let i = 0; i < possibleAnswers.length; i++) {
      if (cleanedGuess === possibleAnswers[i]) {
        isMatch = true;
      }
    }

    if (isMatch) {
      alert("Correct! That is one of my possible answers.");
      console.log(`Q7: Correct guess="${cleanedGuess}"`);
      score++;
      gotMovie = true;
      break;
    } else {
      alert("Not on the list — try again!");
      console.log(`Q7: Wrong guess="${cleanedGuess}"`);
    }
  }

  if (!gotMovie) {
    alert(`Possible correct answers were:\n${choicesText}`);
    console.log("Q7: User did not guess correctly.");
  }

 alert(`Thanks for playing, ${displayName}! Your score: ${score}/7`);

  if (resultsEl) {
    resultsEl.textContent = `Final score for ${displayName}: ${score}/7`; 
  }
}

if (startBtn) {
  startBtn.addEventListener("click", startGame);
}
