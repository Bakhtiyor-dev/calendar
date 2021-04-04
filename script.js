/* A.Bakhtiyor  */
const date = new Date();
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const day_count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let curr_month = date.getMonth();
let curr_year = date.getFullYear();

showCalendar(curr_year, curr_month);

select_month = document.getElementById('calendar__month');
months.forEach((month, key) => {
    option = document.createElement('option');
    option.setAttribute('value', key);
    if (curr_month == key)
        option.setAttribute('selected', 'selected');
    option.innerText = month;
    select_month.appendChild(option);
});

select_year = document.getElementById('calendar__year');
for (var i = 1960; i < 2050; i++) {
    option = document.createElement('option');
    option.setAttribute('value', i);
    if (curr_year == i)
        option.setAttribute('selected', 'selected');
    option.innerText = i;
    select_year.appendChild(option);
}


function startDay(firstDay, month) {
    let start_day;
    left_day = firstDay - 1;
    if (month == 0)
        start_day = day_count[11] - left_day + 1;
    else
        start_day = day_count[month - 1] - left_day + 1;

    return start_day;
}


function showCalendar(year, month) {
    year = parseInt(year);
    month = parseInt(month);

    curr_year = year;
    curr_month = month;

    if (year % 4 == 0)
        day_count[1] = 29;
    else
        day_count[1] = 28;

    let firstDay = (new Date(year, month)).getDay();
    let calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    start_day = startDay(firstDay, month);
    days = 1;
    let muted = false;

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 7; j++) {
            row = document.createElement('div');
            row.classList.add('calendar__date');
            

            if(days==date.getDate() && curr_year==date.getFullYear() && curr_month==date.getMonth())
                row.classList.add('selected');

            cell = document.createElement('span');
            if (i == 0 && j < firstDay - 1) {
                cell.innerText = start_day++;
                cell.classList.add('calendar__date--grey');
            }
            else {
                if (days > day_count[month]) {
                    days = 1;
                    muted = true;
                }
                if (muted)
                    cell.classList.add('calendar__date--grey');
                cell.innerText = days;
                days++;
            }
            row.appendChild(cell);
            calendar.appendChild(row);
        }

    }
}
