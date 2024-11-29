const calendarDays = document.getElementById("calendar-days");
const monthYearDisplay = document.getElementById("month-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const timeModal = document.getElementById("time-modal");
const closeModalButton = document.getElementById("close-modal");
const confirmBookingButton = document.getElementById("confirm-booking");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");

let currentDate = new Date();
let selectedDay = null;

// Функция генерации календаря
function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearDisplay.textContent = `${months[month]} ${year}`;

  // Очистка старых данных
  calendarDays.innerHTML = '';

  // Генерация кнопок для дней месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = i;
    dayButton.addEventListener("click", () => openTimeModal(i));
    calendarDays.appendChild(dayButton);
  }
}

// Функция открытия модального окна для выбора времени
function openTimeModal(day) {
  selectedDay = day; // Запоминаем выбранный день
  timeModal.style.display = "flex"; // Показываем модальное окно
}

// Закрытие модального окна
closeModalButton.addEventListener("click", () => {
  timeModal.style.display = "none";
  startTimeInput.value = "";
  endTimeInput.value = "";
});

// Функция для получения полного названия месяца по номеру месяца
function getMonthName(monthIndex) {
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return months[monthIndex];
}

// Обработчик подтверждения
confirmButton.addEventListener("click", function() {
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();

    if (startTime && endTime) {
        const monthName = getMonthName(currentMonth); // Получаем название месяца
        alert(`Вы успешно забронировали ${selectedDay} ${monthName} с ${startTime} до ${endTime}`);

        // Закрываем модальное окно и очищаем поля
        timeModal.style.display = "none";
        startTimeInput.value = "";
        endTimeInput.value = "";
    } else {
        alert("Пожалуйста, выберите оба времени.");
    }
});

// Навигация по месяцам
prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

// Массив с названиями месяцев
const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

// Инициализация с текущего месяца
generateCalendar(currentDate);
