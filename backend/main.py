from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.product import Product
from database import product_collection
from bson import ObjectId
from slugify import slugify
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
frontend_url = os.getenv("FRONTEND_URL")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("Frontend URL:", frontend_url)


def product_helper(product) -> dict:
    return {
        "id": str(product["_id"]),
        "slug": product["slug"],
        "name": product["name"],
        "tagline": product.get("tagline", ""),
        "price": product["price"],
        "imageUrl": product["imageUrl"],
        "galleryImages": product.get("galleryImages", []),
        "description": product.get("description", ""),
        "details": product.get("details", []),
        "sizeGuide": product.get("sizeGuide", []),
        "category": product.get("category", ""),
        "newest": product.get("newest", False),
        "bestseller": product.get("bestseller", False),
        "stock": product.get("stock", 0),
    }


@app.get("/")
async def home():
    return "hellow world"


@app.get("/products")
async def get_products():
    products = []
    async for product in product_collection.find():
        products.append(product_helper(product))
    return products


@app.get("/products/{slug}")
async def get_product(slug: str):
    product = await product_collection.find_one({"slug": slug})
    if product:
        return product_helper(product)
    raise HTTPException(status_code=404, detail="Product not found")


@app.post("/products")
async def create_products(product: Product):
    slug = slugify(product.name)

    existing_product = await product_collection.find_one({"slug": slug})
    if existing_product:
        raise HTTPException(
            status_code=400, detail="Product with this name already exists"
        )
    product_dict = product.dict()
    product_dict["slug"] = slug

    result = await product_collection.insert_one(product_dict)
    new_product = await product_collection.find_one({"_id": result.inserted_id})

    return product_helper(new_product)


@app.put("/products/{slug}")
async def update_product(slug: str, product: Product):
    existing_product = await product_collection.find_one({"slug": slug})
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    update_data = product.dict(exclude_unset=True)
    if "name" in update_data:
        update_data["slug"] = slugify(update_data["name"])
    await product_collection.update_one({"slug": slug}, {"$set": update_data})

    updated_product = await product_collection.find_one(
        {"slug": update_data.get("slug", slug)}
    )
    return product_helper(updated_product)


@app.delete("/products/{slug}")
async def delete_product(slug: str):
    delete_result = await product_collection.delete_one({"slug": slug})
    if delete_result.deleted_count == 1:
        return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")