class BirthDate {
  constructor(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
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
      currentDay += CalculateAge.daysInAMonth(currentMonth);
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

  static daysInAMonth(month) {
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
        days = currentYear % 4 === 0 ? 29 : 28;
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
}

document.querySelector("#input > form").addEventListener("submit", (e) => {
  e.preventDefault();

  const dayValue = document.querySelector("input#day").value;
  const monthValue = document.querySelector("input#month").value;
  const yearValue = document.querySelector("input#year").value;

  if (dayValue === "" || monthValue === "" || yearValue === "") {
    return;
  }

  const birthDate = new BirthDate(
    parseInt(dayValue),
    parseInt(monthValue),
    parseInt(yearValue)
  );

  UI.showAge(CalculateAge.age(birthDate));
});
