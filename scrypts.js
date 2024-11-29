type Booking = {
    date: string;
    time: string;
    user: string; // Placeholder for user info
};

const bookings: Record<string, Booking> = JSON.parse(localStorage.getItem('bookings') || '{}');
const calendar = document.getElementById('calendar')!;
const modal = document.getElementById('modal')!;
const modalText = document.getElementById('modal-text')!;
const confirmBtn = document.getElementById('confirm-btn')!;
const cancelBtn = document.getElementById('cancel-btn')!;
let selectedDate: string | null = null;

function renderCalendar() {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${day}`;
        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = day.toString();

        if (bookings[date]) {
            dateElement.classList.add('unavailable');
        }

        dateElement.addEventListener('click', () => handleDateClick(date));
        calendar.appendChild(dateElement);
    }
}

function handleDateClick(date: string) {
    if (bookings[date]) {
        selectedDate = date;
        modalText.textContent = `Вы точно хотите снять бронь с ${date}?`;
        modal.classList.remove('hidden');
    } else {
        const time = prompt('Введите период времени (чч:мм - чч:мм):');
        if (time) {
            bookings[date] = { date, time, user: 'current-user' }; // Replace with actual user data
            localStorage.setItem('bookings', JSON.stringify(bookings));
            alert(`Вы забронировали ${date} ${time}`);
            location.reload();
        }
    }
}

confirmBtn.addEventListener('click', () => {
    if (selectedDate) {
        delete bookings[selectedDate];
        localStorage.setItem('bookings', JSON.stringify(bookings));
        alert(`Бронь снята с ${selectedDate}`);
        location.reload();
    }
});

cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    selectedDate = null;
});

renderCalendar();
