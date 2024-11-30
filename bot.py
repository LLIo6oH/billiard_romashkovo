from aiogram import Bot, Dispatcher, Router
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.fsm.storage.memory import MemoryStorage
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
                        web_app=WebAppInfo(url="https://llio6oh.github.io/billiard_romashkovo")  # или ngrok-ссылка
                    )
                ]
            ]
        )
    )

# Регистрация маршрутов
dp.include_router(router)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())