export interface Collection {
  title: string;
  description: string;
  imageUrl: string;
}
export interface Product {
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

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  total: number;
  avatarUrl: string;
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
  basePrice: number;
  colors: { name: string; hex: string }[];
  mockups: {
    colorName: string;
    imageUrl: string;
  };
  printableArea: {
    width: number; // percentage of parent
    height: number; // percentage of parent
    top: number; // percentage of parent
    left: number; // percentage of parent
  };
}

export interface Design {
  imageUrl: string;
  position: { x: number; y: number }; // percentages
  scale: number; // 0.1 to 2
  rotation: number; // degrees
}
export interface Review {
  id: number;
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
