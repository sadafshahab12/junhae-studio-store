from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "junhae-edits")  # fallback to default

client = AsyncIOMotorClient(MONGO_URI)
database = client[DATABASE_NAME]          # database
product_collection = database["junhae-edits"]  # collection for products
