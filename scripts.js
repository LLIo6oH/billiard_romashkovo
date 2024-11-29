const bookings = JSON.parse(localStorage.getItem("bookings") || "{}");
const calendar = document.getElementById("calendar");
const timeModal = document.getElementById("time-modal");
const confirmModal = document.getElementById("confirm-modal");
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");
const confirmText = document.getElementById("confirm-text");
const saveTimeBtn = document.getElementById("save-time-btn");
const closeTimeBtn = document.getElementById("close-time-btn");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");
let selectedDate = null;
let currentUser = "current-user"; // Имя текущего пользователя

function renderCalendar() {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${day}`;
    const dateElement = document.createElement("div");
    dateElement.className = "date";
    dateElement.textContent = day.toString();

    dateElement.addEventListener("click", () => handleDateClick(date));
    calendar.appendChild(dateElement);
  }
}

function handleDateClick(date) {
  selectedDate = date;

  if (bookings[date]) {
    const booking = bookings[date].find((b) => b.user === currentUser);
    if (booking) {
      confirmText.textContent = `Вы точно хотите снять бронь на ${booking.startTime} - ${booking.endTime}?`;
      confirmModal.classList.remove("hidden");
    } else {
      alert("Это время уже забронировано другим пользователем.");
    }
  } else {
    timeModal.classList.remove("hidden");
  }
}

saveTimeBtn.addEventListener("click", () => {
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;

  if (!startTime || !endTime) {
    alert("Пожалуйста, выберите время.");
    return;
  }

  if (!bookings[selectedDate]) bookings[selectedDate] = [];

  bookings[selectedDate].push({ date: selectedDate, startTime, endTime, user: currentUser });
  localStorage.setItem("bookings", JSON.stringify(bookings));
  timeModal.classList.add("hidden");
  alert(`Вы успешно забронировали ${selectedDate} ${startTime} - ${endTime}`);
  location.reload();
});

closeTimeBtn.addEventListener("click", () => {
  timeModal.classList.add("hidden");
});

confirmBtn.addEventListener("click", () => {
  bookings[selectedDate] = bookings[selectedDate].filter((b) => b.user !== currentUser);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  confirmModal.classList.add("hidden");
  alert(`Бронь снята.`);
  location.reload();
});

cancelBtn.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", renderCalendar);
