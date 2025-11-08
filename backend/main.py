from fastapi import FastAPI, HTTPException, status
from models.product import Product
from database import product_collection
from bson import ObjectId
from slugify import slugify

app = FastAPI()


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
    new_product = await product_collection.find_one({"id": result.inserted_id})

    return product_helper(new_product)
