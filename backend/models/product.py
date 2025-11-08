from pydantic import BaseModel
from typing import List, Optional


class SizeGuide(BaseModel):
    size: str
    chest: str
    length: str


class Product(BaseModel):
    id: Optional[str]
    name: str
    tagline: str
    price: float
    imageUrl: str
    galleryImages: List[str]
    description: str
    details: List[str]
    sizeGuide: List[SizeGuide]
    category: str
    newest: Optional[bool] = False
    bestseller: Optional[bool] = False
    stock: Optional[int] = 0
