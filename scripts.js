/* Общие стили */
body {
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: white;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Вместо center, чтобы был естественный скроллинг */
  min-height: 100vh;
}

header {
  background-color: #D9B91A; /* Цвет заголовка */
  text-align: center;
  padding: 20px;
  font-size: 2rem;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

.calendar-container {
  width: 100%; /* Календарь занимает всю доступную ширину */
  padding: 0 10px; /* Отступы, чтобы предотвратить обрезание */
  box-sizing: border-box; /* Учитываем padding и border в ширине */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.month-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.nav-button {
  background-color: #333;
  color: white;
  border: 1px solid #444;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin: 0 10px;
}

.nav-button:hover {
  background-color: #555;
}

.month-year {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 100%; /* Используем всю доступную ширину */
  max-width: 500px; /* Максимальная ширина */
  margin-top: 20px;
  box-sizing: border-box; /* Учитываем padding и border */
}

.calendar-days button {
  background-color: #333;
  color: white;
  border: 1px solid #444;
  padding: 20px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

.calendar-days button:hover {
  background-color: #555;
}

/* Стили для модального окна */
.modal {
  display: none; /* Скрыто по умолчанию */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  width: 90%; /* Используем процентное значение */
  max-width: 400px; /* Максимальная ширина */
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

input[type="time"] {
  background-color: #444;
  border: 1px solid #555;
  color: white;
  padding: 5px;
  margin: 10px 0;
}

button {
  background-color: #D9B91A;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #a17e12;
}

button.booked {
  background-color: #ff6347; /* Красный цвет для забронированных дней */
  color: white;
}

/* Адаптация для малых экранов */
@media (max-width: 480px) {
  .nav-button {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .calendar-days button {
    padding: 10px;
    font-size: 1rem;
  }

  .month-year {
    font-size: 1.2rem;
  }
}
