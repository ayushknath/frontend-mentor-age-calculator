class BirthDate {
  constructor(day, month, year) {
    this.day = +day;
    this.month = +month;
    this.year = +year;
  }
}

class Validation {
  static isEmpty(dayValue, monthValue, yearValue) {
    if (dayValue === "" || monthValue === "" || yearValue === "") {
      if (dayValue === "") {
        UI.showError("This field is required", "day");
      }
      if (monthValue === "") {
        UI.showError("This field is required", "month");
      }
      if (yearValue === "") {
        UI.showError("This field is required", "year");
      }

      return true;
    }

    return false;
  }

  static isOutOfRange({ day, month, year }) {
    let returnValue = false;
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (day > 31 || day < 1) {
      UI.showError("Must be a valid day", "day");
      returnValue = true;
    }

    if (month > 12 || month < 1) {
      UI.showError("Must be a valid month", "month");
      returnValue = true;
    }

    if (year > currentYear) {
      UI.showError("Must be in the past", "year");
      returnValue = true;
    }

    return returnValue;
  }

  static isInvalidDate({ day, month, year }) {
    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (year === currentYear && (month > currentMonth || day > currentDay)) {
      UI.showError("Must be a valid date", "day");
      UI.showError("", "month");
      UI.showError("", "year");

      return true;
    }

    return false;
  }
}

class CalculateAge {
  static age(birthDate) {
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let dayDifference;
    let monthDifference;
    let yearDifference;

    if (currentDay < birthDate.day) {
      currentMonth--;
      currentDay += CalculateAge.daysInAMonth(currentMonth, currentYear);
      dayDifference = currentDay - birthDate.day;
    } else {
      dayDifference = currentDay - birthDate.day;
    }

    if (currentMonth < birthDate.month) {
      currentYear--;
      currentMonth += 12;
      monthDifference = currentMonth - birthDate.month;
    } else {
      monthDifference = currentMonth - birthDate.month;
    }

    yearDifference = currentYear - birthDate.year;

    return {
      dayDifference,
      monthDifference,
      yearDifference,
    };
  }

  static daysInAMonth(month, year) {
    let days;

    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        days = 31;
        break;
      case 2:
        days = year % 4 === 0 ? 29 : 28;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30;
        break;
    }

    return days;
  }
}

class UI {
  static showAge({ dayDifference, monthDifference, yearDifference }) {
    document
      .querySelectorAll('#output > div[class|="output"] > span:first-child')
      .forEach((field, index) => {
        if (index === 0) {
          field.textContent = yearDifference;
        } else if (index === 1) {
          field.textContent = monthDifference;
        } else {
          field.textContent = dayDifference;
        }
      });
  }

  static showError(errorMessage, inputID) {
    document
      .querySelectorAll('#input > form div[class|="field"]')
      .forEach((field) => {
        if (field.children[1].id === inputID) {
          field.classList.add("error");
          field.children[2].textContent = errorMessage;

          setTimeout(() => {
            field.classList.remove("error");
            field.children[2].textContent = "";
          }, 3000);
        }
      });
  }
}

document.querySelector("#input > form").addEventListener("submit", (e) => {
  e.preventDefault();

  const dayValue = document.querySelector("input#day").value;
  const monthValue = document.querySelector("input#month").value;
  const yearValue = document.querySelector("input#year").value;

  if (Validation.isEmpty(dayValue, monthValue, yearValue)) {
    return;
  }

  const birthDate = new BirthDate(dayValue, monthValue, yearValue);

  if (Validation.isOutOfRange(birthDate)) {
    return;
  }

  if (Validation.isInvalidDate(birthDate)) {
    return;
  }

  UI.showAge(CalculateAge.age(birthDate));
});
