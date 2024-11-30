from aiogram import Bot, Dispatcher, Router
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo, Update
from aiogram.fsm.storage.memory import MemoryStorage
from aiohttp import web
from aiogram import F
import asyncio
import asyncpg
from datetime import datetime, date

# Конфигурация
BOT_TOKEN = "7953304064:AAFpvix8oyAMgrwZ1U_UHBTa7FwFptObJJY"

# Настройки подключения к базе данных
db_config = {
    'host': 'dpg-ct5l2ujtq21c7399jbag-a',
    'user': 'billiardromashkovo_user',
    'password': 'US1b3ybv3DGEbyXnDl09PCWwslf715aC',
    'database': 'billiardromashkovo'
}

# Создаем бота и диспетчер
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(storage=MemoryStorage())
router = Router()

# Функции для работы с базой данных
async def create_db_pool():
    """Создаёт пул соединений с базой данных."""
    return await asyncpg.create_pool(**db_config)

async def create_bookings_table(pool):
    """Создаёт таблицу для бронирований, если её нет."""
    async with pool.acquire() as conn:
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                start_time TIME NOT NULL,
                end_time TIME NOT NULL
            );
        ''')

async def save_booking(pool, booking_date, start_time, end_time):
    """Сохраняет бронирование в базу данных."""
    async with pool.acquire() as conn:
        await conn.execute('''
            INSERT INTO bookings (date, start_time, end_time)
            VALUES ($1, $2, $3)
        ''', booking_date, start_time, end_time)

async def get_bookings_for_day(pool, booking_date):
    """Получает все бронирования для указанного дня."""
    async with pool.acquire() as conn:
        return await conn.fetch('''
            SELECT start_time, end_time FROM bookings
            WHERE date = $1
        ''', booking_date)

async def delete_old_bookings(pool):
    """Удаляет устаревшие бронирования (до текущей даты)."""
    async with pool.acquire() as conn:
        await conn.execute('''
            DELETE FROM bookings WHERE date < CURRENT_DATE
        ''')

# Хендлеры
@router.message(F.text == "/start")
async def send_calendar_link(message: Message):
    """Отправляет ссылку на веб-приложение календаря."""
    await message.answer(
        "Откройте календарь:",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="Открыть календарь",
                        web_app=WebAppInfo(url="https://llio6oh.github.io/billiard_romashkovo")
                    )
                ]
            ]
        )
    )

@router.message(F.text.startswith("/book"))
async def handle_booking(message: Message):
    """Обрабатывает бронирование через команду /book."""
    pool = await create_db_pool()
    parts = message.text.split()
    
    if len(parts) != 4:
        await message.answer("Формат команды: /book YYYY-MM-DD HH:MM HH:MM")
        return

    try:
        booking_date = date.fromisoformat(parts[1])
        start_time = parts[2]
        end_time = parts[3]
        
        # Проверяем пересечения бронирований
        existing_bookings = await get_bookings_for_day(pool, booking_date)
        for booking in existing_bookings:
            if (
                (start_time >= booking["start_time"] and start_time < booking["end_time"]) or
                (end_time > booking["start_time"] and end_time <= booking["end_time"])
            ):
                await message.answer("Выбранное время пересекается с существующим бронированием.")
                return

        # Сохраняем бронирование
        print(f"Сохраняем бронирование: {booking_date}, {start_time}, {end_time}")
        await save_booking(pool, booking_date, start_time, end_time)
        await message.answer(f"Бронирование успешно создано: {booking_date} с {start_time} до {end_time}")
    except ValueError:
        await message.answer("Некорректный формат даты или времени. Используйте YYYY-MM-DD HH:MM HH:MM")
    finally:
        await pool.close()

# Вебхук
async def handle_webhook(request):
    """Обрабатывает запросы от Telegram через вебхук."""
    try:
        # Логируем входящий запрос
        print("Получен запрос на /webhook")
        
        # Получаем JSON данные из запроса
        data = await request.json()
        print(f"Полученные данные: {data}")
        
        # Преобразуем данные в объект Update
        update = Update(**data)  # Преобразуем JSON в объект Update
        
        # Обрабатываем обновление
        await dp.feed_update(bot, update)
        
    except Exception as e:
        # Логируем ошибки
        print(f"Ошибка обработки вебхука: {e}")
        return web.Response(status=500)  # Возвращаем ошибку 500 для Telegram
        
    return web.Response(status=200)  # Ответ успешной обработки

async def main():
    print(f"Main Start")
    # Создаём пул соединений с базой данных
    pool = await create_db_pool()

    # Создаём таблицу, если её нет
    await create_bookings_table(pool)

    # Удаляем устаревшие бронирования
    await delete_old_bookings(pool)

    # Включаем маршруты
    dp.include_router(router)

    # Устанавливаем вебхук
    webhook_url = "https://billiard-romashkovo.onrender.com/webhook"  # Укажите ваш URL
    await bot.set_webhook(webhook_url)

    # Создаём приложение aiohttp
    app = web.Application()
    app.router.add_post("/webhook", handle_webhook)
    print("Web service is running and listening on /webhook")

    # Запускаем сервер
    runner = web.AppRunner(app)
    await runner.setup()
    port = int(os.getenv("PORT", 4000))  # Если порт не задан, используем 4000 по умолчанию
    site = web.TCPSite(runner, host="0.0.0.0", port=port)
    await site.start()

    print(f"Бот запущен на {webhook_url}")
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
