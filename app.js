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

  // DEV: comment this out before final submission if requested
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
  if (askYesNoQuestion("Is my favorite background style usually stark with dark text?", "no")) score++; // example “fun” one
 
  alert(`Thanks for playing, ${displayName}! Your score: ${score}/5`);

  if (resultsEl) {
    resultsEl.textContent = `Final score for ${displayName}: ${score}/5`;
  }
}

if (startBtn) {
  startBtn.addEventListener("click", startGame);
}