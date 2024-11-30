from aiogram import Bot, Dispatcher, Router
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo, Update
from aiogram.fsm.storage.memory import MemoryStorage
from aiohttp import web
from aiogram import F
import asyncio

BOT_TOKEN = "7953304064:AAFpvix8oyAMgrwZ1U_UHBTa7FwFptObJJY"

# Создаем бота и диспетчер
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(storage=MemoryStorage())
router = Router()

@router.message(F.text == "/start")
async def send_calendar_link(message: Message):
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

# Регистрация маршрутов
dp.include_router(router)

async def handle_webhook(request):
    """Обработка запросов от Telegram через вебхук"""
    data = await request.json()
    update = Update.to_object(data)
    await dp.feed_update(bot, update)
    return web.Response()

async def main():
    # Запускаем приложение aiohttp
    app = web.Application()
    app.router.add_post("/webhook", handle_webhook)  # Слушаем /webhook

    # Устанавливаем webhook в Telegram
    webhook_url = "https://billiard-romashkovo.onrender.com"  # Укажите URL вашего сервера
    await bot.set_webhook(webhook_url)

    # Запускаем aiohttp
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, host="0.0.0.0", port=4000)
    await site.start()

    print(f"Бот запущен на {webhook_url}")
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
