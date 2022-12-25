import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  areaForInputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      refs.btnStart.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled', '');
    }
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(refs.areaForInputDate, options);

const timer = {
  timerId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    const selectedDate = fp.selectedDates[0];
    this.isActive = true;

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      const time = convertMs(deltaTime);
      console.log(time);
      updateClockFace(time);

      if (deltaTime < 1000) {
        clearInterval(this.timerId);
        this.isActive = false;
        Notiflix.Notify.info('Time is over');
      }
    }, 1000);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

refs.btnStart.addEventListener('click', () => {
  timer.start();
});

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
