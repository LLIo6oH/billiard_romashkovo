const calendar = document.getElementById("calendar");
const timeModal = document.getElementById("time-modal");
const confirmModal = document.getElementById("confirm-modal");
const modalOverlay = document.getElementById("modal-overlay");

let selectedDate = null;
let reservations = {};

function generateCalendar() {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Очистить календарь
  calendar.innerHTML = '';

  for (let i = 1; i <= daysInMonth; i++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = i;
    dayButton.onclick = () => handleDayClick(i);
    calendar.appendChild(dayButton);
  }
}

function handleDayClick(day) {
  if (reservations[day]) {
    showConfirmModal(day);
  } else {
    showTimeModal(day);
  }
}

function showTimeModal(day) {
  selectedDate = day;
  timeModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
}

function showConfirmModal(day) {
  const confirmText = document.getElementById("confirm-text");
  confirmText.textContent = `Вы точно хотите снять бронь на ${day}?`;
  confirmModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
}

function hideModals() {
  timeModal.classList.add("hidden");
  confirmModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
}

document.getElementById("save-time-btn").addEventListener("click", () => {
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  
  if (!startTime || !endTime) {
    alert("Пожалуйста, выберите время.");
    return;
  }

  reservations[selectedDate] = { startTime, endTime };
  alert(`Вы забронировали ${selectedDate} с ${startTime} до ${endTime}`);
  hideModals();
  generateCalendar();
});

document.getElementById("close-time-btn").addEventListener("click", () => {
  hideModals();
});

document.getElementById("confirm-btn").addEventListener("click", () => {
  delete reservations[selectedDate];
  alert(`Бронь на ${selectedDate} снята.`);
  hideModals();
  generateCalendar();
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  hideModals();
});

generateCalendar();  // Генерация календаря при загрузке страницы
