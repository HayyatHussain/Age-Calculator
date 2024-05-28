const inputYear = document.getElementById("year");
const inputMonth = document.getElementById("month");
const inputDay = document.getElementById("day");
const svgButton = document.querySelector(".svg");
const outputYears = document.getElementById("years");
const outputMonths = document.getElementById("months");
const outputDays = document.getElementById("days");
const labelText1 = document.getElementById("l-text-1");
const labelText2 = document.getElementById("l-text-2");
const labelText3 = document.getElementById("l-text-3");
const invalidPTexts = document.querySelectorAll(".invalid-text");
const invalidPText1 = document.getElementById("invalid-text-1");
const invalidPText2 = document.getElementById("invalid-text-2");
const invalidPText3 = document.getElementById("invalid-text-3");

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const inputArray = [inputDay, inputMonth, inputYear];
const labelText = [labelText1, labelText2, labelText3];

inputArray.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      svgButton.click();
    }
  });
});

const validateInputByMonth1 = (value) => {
  return (
    value == 1 ||
    value == 3 ||
    value == 5 ||
    value == 7 ||
    value == 8 ||
    value == 10 ||
    value == 12
  );
};

const validateInputByMonth2 = (value) => {
  return value == 4 || value == 6 || value == 9 || value == 11;
};

const validateFebruary = (month, day) => {
  return month == 2 && day > 28;
};

const updateUI = (array1, array2) => {
  array1.forEach((inputBox) => {
    inputBox.classList.add("invalid-input");
  });
  array2.forEach((label) => {
    label.classList.add("label-invalid-text");
  });
};

const resetUI = (array1, array2) => {
  array1.forEach((inputBox) => {
    inputBox.classList.remove("invalid-input");
  });
  array2.forEach((label) => {
    label.classList.remove("label-invalid-text");
  });
};

const updateInvalidText1 = (para1, para2, para3, text1, text2, text3) => {
  para1.innerText = text1;
  para2.innerText = text2;
  para3.innerText = text3;
};

const resetInvalidText = (para1, para2, para3) => {
  para1.innerText = "";
  para2.innerText = "";
  para3.innerText = "";
};

svgButton.addEventListener("click", () => {
  const valueYear = inputYear.value;
  const valueMonth = inputMonth.value;
  const valueDay = inputDay.value;

  if (valueYear == "" || valueMonth == "" || valueDay == "") {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "This field is required",
      "This field is required",
      "This field is required"
    );
    return;
  }

  if (valueYear > currentYear || valueYear < 0) {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "",
      "",
      "Must be in the past"
    );
    return;
  } else if (
    (valueYear == currentYear && valueMonth > currentMonth) ||
    valueMonth < 1 ||
    valueMonth > 12
  ) {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "",
      "Must be a valid month",
      ""
    );

    return;
  } else if (
    valueYear == currentYear &&
    valueMonth == currentMonth &&
    valueDay > currentDay
  ) {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "Must be a valid day",
      "",
      ""
    );
    return;
  }

  if ((validateInputByMonth1(valueMonth) && valueDay > 31) || valueDay < 1) {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "Must be a valid day",
      "",
      ""
    );
    return;
  }
  if ((validateInputByMonth2(valueMonth) && valueDay > 30) || valueDay < 1) {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "Must be a valid day",
      "",
      ""
    );
    return;
  }
  if (validateFebruary(valueMonth, valueDay) || valueDay < 1) {
    updateUI(inputArray, labelText);
    updateInvalidText1(
      invalidPText1,
      invalidPText2,
      invalidPText3,
      "Must be a valid date",
      "",
      ""
    );
    return;
  }

  resetUI(inputArray, labelText);
  resetInvalidText(invalidPText1, invalidPText2, invalidPText3);

  outputYears.innerText = 0;
  outputMonths.innerText = 0;
  outputDays.innerText = 0;

  let outputY = currentYear - Number(valueYear);
  let outputM = currentMonth - Number(valueMonth);
  let outputD = currentDay - Number(valueDay);

  const updateOutputs = () => {
    const increments = [outputYears, outputMonths, outputDays];
    const outputs = [outputY, outputM, outputD];

    for (let i = 0; i < increments.length; i++) {
      const output = outputs[i];
      const increment = increments[i];

      if (increment.innerText != output) {
        increment.innerText++;
      }
    }

    // Check if all increments are completed
    if (
      outputYears.innerText != outputY ||
      outputMonths.innerText != outputM ||
      outputDays.innerText != outputD
    ) {
      // Schedule the next update
      requestAnimationFrame(updateOutputs);
    }
  };

  if (outputM == 0 && outputY == 0) {
    updateOutputs();
    return; //Return
  } else {
    
  if (outputM < 1) {
    outputY--;
    outputM += 12;
  }
  if (outputD < 1 && validateInputByMonth1(outputM)) {
    outputM--;
    outputD += 31;
  }
  if (outputD < 1 && validateInputByMonth2(outputM)) {
    outputM--;
    outputD += 30;
  }
  if (outputD < 1 && outputM == 2) {
    outputM--;
    outputD += 28;
  }
  }
  // Call the updateOutputs function immediately to avoid initial delay
  updateOutputs();
});
