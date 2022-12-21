import Notiflix from 'notiflix';

const btnCreatePromise = document.querySelector('button[type="submit"]');
const step = document.querySelector('input[name="step"]');
const delay = document.querySelector('input[name="delay"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');


function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
           // Fulfill
        resolve({ position, delay });
      } else {
         // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или отклоняется через delay времени. Значением промиса должен быть объект, в котором будут свойства position и delay со значениями одноименных параметров. Используй начальный код функции для выбора того, что нужно сделать с промисом - выполнить или отклонить.
form.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);


  for (let i = 0; i < amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});



