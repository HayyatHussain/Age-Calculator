// Get the DOM elements
const inputYear = document.getElementById("year"),
  inputMonth = document.getElementById("month"),
  inputDay = document.getElementById("day"),
  svgButton = document.querySelector(".svg"),
  outputYears = document.getElementById("years"),
  outputMonths = document.getElementById("months"),
  outputDays = document.getElementById("days");

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

svgButton.addEventListener("click", () => {
  outputYears.innerText = 0;
  outputMonths.innerText = 0;
  outputDays.innerText = 0;

  outputY = currentYear - Number(inputYear.value);
  outputM = currentMonth - Number(inputMonth.value);
  outputD = currentDay - Number(inputDay.value);
  setInterval(() => {
    if (outputYears.innerText != outputY) {
      outputYears.innerText++;
    }
  }, 80);
  setInterval(() => {
    if (outputMonths.innerText != outputM) {
      outputMonths.innerText++;
    }
  }, 80);
  setInterval(() => {
    if (outputDays.innerText != outputD) {
      outputDays.innerText++;
    }
  }, 80);
});
