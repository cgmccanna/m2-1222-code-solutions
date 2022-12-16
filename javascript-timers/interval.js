var countdown = document.querySelector('.countdown-display');

var countdownTimer = 4;

function startCountdown() {
  countdownTimer--;
  if (countdownTimer > 0) {
    countdown.textContent = countdownTimer;
  } else if (countdownTimer <= 0) {
    countdown.textContent = '~Earth Beeeelooowww Us~';
    clearInterval(timerID);
  }
}

var timerID = setInterval(startCountdown, 1000);
