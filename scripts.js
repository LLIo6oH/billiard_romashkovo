const calendarDays = document.getElementById("calendar-days");
const monthYearDisplay = document.getElementById("month-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

let currentDate = new Date();

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Получаем количество дней в месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Обновляем отображение месяца и года
  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  monthYearDisplay.textContent = `${months[month]} ${year}`;
  
  // Очистка старых данных
  calendarDays.innerHTML = '';

  // Генерация кнопок для дней месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = i;
    calendarDays.appendChild(dayButton);
  }
}

// Навигация по месяцам
prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

// Инициализация с текущего месяца
generateCalendar(currentDate);
