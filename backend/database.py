from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

mongodb_url = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(mongodb_url)
database = client.junhaeStore
product_collection = database["junhae-edits"]
