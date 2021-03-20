window.onload = function () {

    let enterDay = document.getElementById("day"),
        enterMonth = document.getElementById("month"),
        enterYear = document.getElementById("year"),
        week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        fullMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novmber", "December"],
        monthAsIndex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        monthResult,
        old = document.getElementById("main"),
        result = document.getElementById("result"),
        btn = document.getElementById("btn");

    old.onchange = () => {
        for (let i = 0; i <= 11; i += 1) {
            if (enterMonth.value == fullMonth[i]) {
                monthResult = monthAsIndex[i];
            }
        }
    }

    // Generate Days Options
    for (let i = 1; i <= 31; i += 1) {
        let node = document.createElement("option"),
            att = document.createAttribute("value"),
            textNode = document.createTextNode(i);
        att.value = i;
        node.setAttributeNode(att);
        node.appendChild(textNode);
        enterDay.appendChild(node);
    };

    // Generate Months Options
    for (let i = 0; i <= 11; i += 1) {
        let node = document.createElement("option"),
            att = document.createAttribute("value"),
            textNode = document.createTextNode(fullMonth[i]);
        att.value = fullMonth[i];
        node.setAttributeNode(att);
        node.appendChild(textNode);
        enterMonth.appendChild(node);
    };

    // Generate Years Options
    for (let i = new Date().getFullYear(); i >= 1900; i -= 1) {
        let node = document.createElement("option"),
            att = document.createAttribute("value"),
            textNode = document.createTextNode(i);
        att.value = i;
        node.setAttributeNode(att);
        node.appendChild(textNode);
        enterYear.appendChild(node);
    };

    // Get the age
    function getAge(day, month, year) {

        let date = new Date(),
            setYear = new Date(year, month, day),
            weekDay = setYear.getDay(),
            currentMonthDays = new Date(parseInt(year), parseInt(month) + 1, 0).getDate(),
            currentDay = new Date().getDate();

        date.getFullYear(); // Get current year

        let getAgeYear = Math.floor((date - setYear) / 1000 / 60 / 60 / 24 / 365.25), // Get age year
            getAgeMonth = Math.floor(((date - setYear) / 1000 / 60 / 60 / 24 / 365.25) * 12 % 12), // Get age month

            // Get age day
            getAgeDay = () => {
                if (currentDay >= day) {
                    let dayResult = currentDay - day;
                    if (dayResult < 10) {
                        return "0" + dayResult;
                    } else {
                        return dayResult
                    }
                } else {
                    let dayResult2 = currentMonthDays - (day - currentDay);
                    if (dayResult2 < 10) {
                        return "0" + dayResult2;
                    } else {
                        return dayResult2;
                    }
                }
            }

        if (getAgeMonth < 10 && getAgeMonth >= 0) {
            getAgeMonth = "0" + getAgeMonth;
        }
        if (getAgeYear < 10) {
            getAgeYear = "0" + getAgeYear;
        };
        if (parseInt(day) > currentMonthDays || enterYear.value == "year" || enterMonth.value == "month" || enterDay.value == "Day" || getAgeDay() < 0 || getAgeMonth < 0) {

            Object.assign(result.style, {
                color: "red",
                opacity: "1",
                visibility: "visible",
                border: "2px solid red"
            })

            result.innerHTML = `Please enter a valid date...`;

        } else {

            Object.assign(result.style, {
                color: "",
                opacity: "1",
                visibility: "visible",
                border: ""
            })

            result.innerHTML = `Your age is ${getAgeYear} Years: ${getAgeMonth} Months : ${getAgeDay()} Days on ${week[weekDay]}.`;
            console.log(getAgeMonth);
        }
    }

    // Event Listner
    btn.addEventListener('click', () => getAge(enterDay.value, monthResult, enterYear.value));
};
