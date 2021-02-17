"use strict";

window.onload = function () {
  var enterDay = document.getElementById("day"),
      enterMonth = document.getElementById("month"),
      enterYear = document.getElementById("year"),
      week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      fullMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novmber", "December"],
      monthAsIndex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      monthResult,
      old = document.getElementById("main"),
      result = document.getElementById("result"),
      btn = document.getElementById("btn");

  old.onchange = function () {
    for (var i = 0; i <= 11; i += 1) {
      if (enterMonth.value == fullMonth[i]) {
        monthResult = monthAsIndex[i];
      }
    }
  };

  btn.onclick = function () {
    return getAge(enterDay.value, monthResult, enterYear.value);
  };

  for (var i = 1; i <= 31; i += 1) {
    var node = document.createElement("option"),
        att = document.createAttribute("value"),
        textNode = document.createTextNode(i);
    att.value = i;
    node.setAttributeNode(att);
    node.appendChild(textNode);
    enterDay.appendChild(node);
  }

  for (var _i = 0; _i <= 11; _i += 1) {
    var _node = document.createElement("option"),
        _att = document.createAttribute("value"),
        _textNode = document.createTextNode(fullMonth[_i]);

    _att.value = fullMonth[_i];

    _node.setAttributeNode(_att);

    _node.appendChild(_textNode);

    enterMonth.appendChild(_node);
  }

  for (var _i2 = new Date().getFullYear(); _i2 >= 1900; _i2 -= 1) {
    var _node2 = document.createElement("option"),
        _att2 = document.createAttribute("value"),
        _textNode2 = document.createTextNode(_i2);

    _att2.value = _i2;

    _node2.setAttributeNode(_att2);

    _node2.appendChild(_textNode2);

    enterYear.appendChild(_node2);
  }

  function getAge(day, month, year) {
    var date = new Date(),
        setYear = new Date(year, month, day),
        weekDay = setYear.getDay(),
        currentMonthDays = new Date(parseInt(year), parseInt(month) + 1, 0).getDate(),
        currentDay = new Date().getDate();
    date.getFullYear();

    var getAgeYear = Math.floor((date - setYear) / 1000 / 60 / 60 / 24 / 365.25),
        getAgeMonth = Math.floor((date - setYear) / 1000 / 60 / 60 / 24 / 365.25 * 12 % 12),
        getAgeDay = function getAgeDay() {
      if (currentDay >= day) {
        var dayResult = currentDay - day;

        if (dayResult < 10) {
          return "0" + dayResult;
        } else {
          return dayResult;
        }
      } else {
        var dayResult2 = currentMonthDays - (day - currentDay);

        if (dayResult2 < 10) {
          return "0" + dayResult2;
        } else {
          return dayResult2;
        }
      }
    };

    if (getAgeMonth < 10) {
      getAgeMonth = "0" + getAgeMonth;
    }

    ;

    if (getAgeYear < 10) {
      getAgeYear = "0" + getAgeYear;
    }

    ;

    if (parseInt(day) > currentMonthDays || enterYear.value == "year" || enterMonth == "month" || enterDay == "day") {
      result.innerHTML = "Please enter a valid date...";
      result.style.color = "red";
      result.style.opacity = "1";
      result.style.visibility = "visible";
      result.style.border = "2px solid red";
    } else {
      result.style.color = "";
      result.style.opacity = "1";
      result.style.visibility = "visible";
      result.style.border = "";
      result.innerHTML = "Your age is ".concat(getAgeYear, " Years: ").concat(getAgeMonth, " Months : ").concat(getAgeDay(), " Days on ").concat(week[weekDay], ".");
    }
  }
};