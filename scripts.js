const calendar = document.getElementById("calendar");

function generateCalendar() {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Очистить календарь
  calendar.innerHTML = '';

  // Заполняем календарь днями месяца
  for (let i = 1; i <= daysInMonth; i++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = i;
    calendar.appendChild(dayButton);
  }
}

generateCalendar();  // Генерация календаря при загрузке страницы
