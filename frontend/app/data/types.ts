export interface Collection {
  title: string;
  description: string;
  imageUrl: string;
}
export interface Product {
  id: string;
  _id?: string;
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  category: string;
  details: string[];
  sizeGuide: { size: string; chest: string; length: string }[];
  newest?: boolean;
  bestseller?: boolean;
  stock?: number;
  colors?: string[];
}
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  featured?: boolean;
}
export interface Faq {
  question: string;
  answer: string;
}

export interface FaqTopic {
  category: string;
  questions: Faq[];
}

export interface OrderProduct {
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string; // MongoDB ObjectId as string
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  products: OrderProduct[];
  shippingMethod: "standard" | "express";
  shippingDays?: number;
  tax?: number;
  total: number;
  paymentMethod: string;
  paymentProof?: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  totalOrders: number;
  joinDate: string;
  avatarUrl: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}
export interface CustomizableProduct {
  id: string;
  name: string;
  colors: { name: string; hex: string }[];
  mockups: { front: string; back: string };
  printableArea: { top: number; left: number; width: number; height: number };
  basePrice: number;
}

export interface Design {
  imageUrl: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  side?: "front" | "back"; // New: front/back
}

export interface Patch extends Design {
  id: string; // Unique ID for multiple patches
}

export interface Review {
  _id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  date: string;
  text: string;
}
export interface Author {
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Comment {
  author: string;
  avatarUrl: string;
  date: string;
  text: string;
}

export interface RelatedPost {
  title: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

export interface BlogProduct {
  name: string;
  imageUrl: string;
}

export interface Post {
  category: string;
  title: string;
  author: Author;
  publishDate: string;
  readTime: number;
  heroImageUrl: string;
  content: string;
  shopTheLook: BlogProduct[];
  comments: Comment[];
  relatedPosts: RelatedPost[];
}
export interface CartProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export interface CartItem extends CartProduct {
  size: string;
  color: string;
  quantity: number;
}
