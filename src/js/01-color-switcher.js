const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onDisabled() {
  btnStart.disabled = true;
  btnStop.disabled = false;
}

btnStart.addEventListener('click', () => {
  onDisabled();

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);

  onDisabled();
});
