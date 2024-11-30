const calendarDays = document.getElementById("calendar-days");
const monthYearDisplay = document.getElementById("month-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const timeModal = document.getElementById("time-modal");
const closeModalButton = document.getElementById("close-modal");
const confirmBookingButton = document.getElementById("confirm-booking");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const bookingsList = document.getElementById("bookings-list"); // Новый элемент для отображения списка броней

// Массив с названиями месяцев
const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

let currentDate = new Date();
let selectedDay = null;

// Структура для хранения информации о бронированиях
let bookings = {};

// Функция генерации календаря
function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Отображаем название месяца и год
  monthYearDisplay.textContent = `${months[month]} ${year}`;

  // Очистка старых данных
  calendarDays.innerHTML = '';

  // Генерация кнопок для дней месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = i;

    // Если для этого дня есть бронирование, добавляем класс для выделения
    if (bookings[i] && bookings[i].length > 0) {
      dayButton.classList.add("booked");
    }

    // Добавляем обработчик клика для открытия модального окна
    dayButton.addEventListener("click", () => openTimeModal(i));
    calendarDays.appendChild(dayButton);
  }
}

// Функция открытия модального окна для выбора времени
function openTimeModal(day) {
  selectedDay = day; // Запоминаем выбранный день

  // Очищаем список броней
  bookingsList.innerHTML = "";

  // Если на этот день есть брони, отображаем их
  if (bookings[day] && bookings[day].length > 0) {
    bookings[day].forEach((booking, index) => {
      const bookingItem = document.createElement("div");
      bookingItem.textContent = `${index + 1}. ${booking.startTime} - ${booking.endTime}`;
      bookingsList.appendChild(bookingItem);
    });
  } else {
    const noBookingsItem = document.createElement("div");
    noBookingsItem.textContent = "Нет броней на этот день.";
    bookingsList.appendChild(noBookingsItem);
  }

  timeModal.style.display = "flex"; // Показываем модальное окно
}

// Закрытие модального окна
closeModalButton.addEventListener("click", () => {
  timeModal.style.display = "none";
  startTimeInput.value = "";
  endTimeInput.value = "";
});

// Подтверждение бронирования
confirmBookingButton.addEventListener("click", () => {
  const startTime = startTimeInput.value.trim();
  const endTime = endTimeInput.value.trim();

  if (startTime && endTime) {
    // Проверка пересечений с существующими бронями
    if (bookings[selectedDay]) {
      for (const booking of bookings[selectedDay]) {
        if (
          (startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime) ||
          (startTime <= booking.startTime && endTime >= booking.endTime)
        ) {
          alert("Выбранное время пересекается с существующей бронью.");
          return;
        }
      }
    } else {
      bookings[selectedDay] = [];
    }

    // Сохраняем новую бронь
    bookings[selectedDay].push({ startTime, endTime });

    // Закрываем модальное окно и очищаем поля
    alert(`Вы успешно забронировали ${selectedDay} ${months[currentDate.getMonth()]} с ${startTime} до ${endTime}`);
    timeModal.style.display = "none";
    startTimeInput.value = "";
    endTimeInput.value = "";

    // Перегенерировать календарь для обновления отображения забронированных дней
    generateCalendar(currentDate);
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

// Инициализация с текущего месяца
generateCalendar(currentDate);
