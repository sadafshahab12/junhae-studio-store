import {
  Article,
  Author,
  CartItem,
  CartProduct,
  Collection,
  Customer,
  CustomizableProduct,
  FaqTopic,
  Order,
  Post,
} from "./types";

export const COLLECTIONS: Collection[] = [
  {
    title: "The Minimal Edit",
    description: "Neutral streetwear for clean, timeless living.",
    imageUrl:
      "/featured collections/Our Best-Selling Moon Collection — bold print, everyday comfort, ready to wear now..png",
  },
  {
    title: "Street Print Drop",
    description: "Bold graphics. Urban mood. Full expression.",
    imageUrl: "/featured collections/my dreams are out of this world.png",
  },
  {
    title: "Junhae Essentials",
    description: "Timeless pieces for modern life.",
    imageUrl:
      "/featured collections/junhae-essentials-timeless-everyday-minimalist-tshirt-cafe-shot.jpg",
  },
];

export const NAV_LINKS = [
  {
    id: 1,
    label: "Home",
    link: "/",
  },
  {
    id: 2,
    label: "Junhae Edits",
    link: "/junhae-edits",
  },
  {
    id: 3,
    label: "Our Story",
    link: "/our-story",
  },
  {
    id: 4,
    label: "Blog",
    link: "/blog",
  },
  {
    id: 5,
    label: "FAQ",
    link: "/faq",
  },
  {
    id: 6,
    label: "Create",
    link: "/create",
  },
  {
    id: 7,
    label: "Contact",
    link: "/contact",
  },
];

export const CATEGORIES = ["All", "Tees", "Hoodies", "Tops", "Custom Prints"];

export const BLOG_CATEGORIES = [
  "All",
  "Design",
  "Sustainability",
  "Behind the Prints",
  "Drops",
  "Culture",
];

export const BLOG_POSTS: Article[] = [
  {
    id: 1,
    title: "From Sketch to Streetwear: The Making of a Junhae Print",
    excerpt:
      "Dive deep into our creative process and discover how a simple idea evolves into a piece of wearable art.",
    imageUrl: "https://picsum.photos/id/10/1200/800",
    category: "Behind the Prints",
    author: "Junhae Kim",
    date: "October 26, 2023",
    featured: true,
  },
  {
    id: 2,
    title: "Korean Minimalism Meets Modern Street Style",
    excerpt:
      "Explore the philosophies of simplicity, balance, and authenticity that inspire every collection we release.",
    imageUrl: "https://picsum.photos/id/101/1200/800",
    category: "Design",
    author: "Studio Team",
    date: "October 22, 2023",
    featured: true,
  },
  {
    id: 3,
    title: "The Future of Sustainable Print-On-Demand Fashion",
    excerpt:
      "We believe in conscious creation. Learn how our on-demand model is helping reduce waste and build a better future.",
    imageUrl: "https://picsum.photos/id/103/1200/800",
    category: "Sustainability",
    author: "Lena Park",
    date: "October 18, 2023",
    featured: true,
  },
  {
    id: 4,
    title: "Autumn Drop: The 'Seoul Silence' Collection is Here",
    excerpt:
      "Introducing our latest collection, inspired by the quiet moments and serene landscapes of urban life.",
    imageUrl: "https://picsum.photos/id/212/1200/800",
    category: "Drops",
    author: "Studio Team",
    date: "October 15, 2023",
  },
  {
    id: 5,
    title: "5 Artists Who Inspire Our Work",
    excerpt:
      "A look into the painters, photographers, and thinkers whose work fuels our creative engine.",
    imageUrl: "https://picsum.photos/id/240/1200/800",
    category: "Culture",
    author: "Junhae Kim",
    date: "October 11, 2023",
  },
  {
    id: 6,
    title: "Why We Choose Organic Cotton for Our Tees",
    excerpt:
      "It's about more than just feel. Discover the environmental and ethical reasons behind our fabric choices.",
    imageUrl: "https://picsum.photos/id/250/1200/800",
    category: "Sustainability",
    author: "Lena Park",
    date: "October 07, 2023",
  },
  {
    id: 7,
    title: "A Day in the Studio: Capturing the Perfect Shot",
    excerpt:
      "Go behind the scenes of our latest lookbook photoshoot and see how the Junhae vibe comes to life.",
    imageUrl: "https://picsum.photos/id/305/1200/800",
    category: "Behind the Prints",
    author: "Studio Team",
    date: "October 02, 2023",
  },
];
export const FAQ_TOPICS: FaqTopic[] = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long will my order take to arrive?",
        answer:
          "Since every item is printed on-demand just for you, it typically takes 3-5 business days for production. After that, standard shipping times apply (usually 5-7 business days for domestic orders). You'll receive a tracking number as soon as it ships!",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we do! International shipping times and costs vary by location. All applicable duties and taxes are the responsibility of the customer. We recommend checking your local customs regulations for more information.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Because our products are made to order, we have a very small window to make changes. If you need to alter or cancel an order, please contact us within 2 hours of placing it. We'll do our best to accommodate your request, but we can't make any promises after the production process has begun.",
      },
    ],
  },
  {
    category: "Print & Product Info",
    questions: [
      {
        question: "How does print-on-demand work?",
        answer:
          "Print-on-demand means your item is created only after you place an order. This allows us to offer a wide variety of designs without creating excess stock. It’s a more sustainable approach to fashion that reduces waste and ensures every piece is made intentionally.",
      },
      {
        question: "Are your materials sustainable?",
        answer:
          "We prioritize sustainability in our material choices. Most of our apparel is made from 100% organic cotton or recycled blends. We partner with suppliers who share our commitment to ethical production and environmentally friendly practices.",
      },
      {
        question: "What if my print looks slightly different from the preview?",
        answer:
          "We strive for perfect color accuracy, but slight variations can occur between on-screen previews and the final printed product due to monitor settings and ink properties. This is a natural part of the digital printing process and adds to the unique character of your piece.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What’s your return policy?",
        answer:
          "As each item is custom-made, we do not accept returns or exchanges for size, color, or change of mind. We encourage you to consult our sizing charts carefully before ordering. However, if your item has a manufacturing defect, we are here to help.",
      },
      {
        question: "What if I receive a damaged item?",
        answer:
          "In the unlikely event that your item arrives damaged or with a print defect, please contact us within 7 days of delivery with a photo of the issue. We will arrange for a replacement to be sent to you as quickly as possible.",
      },
    ],
  },
  {
    category: "Customization & Design",
    questions: [
      {
        question: "Can I upload my own design?",
        answer:
          'Absolutely! Our "Create Your Own" feature is at the heart of Junhae Studio. You can upload your artwork, add text, and design a piece that is 100% you. Please ensure your design adheres to our content guidelines.',
      },
      {
        question: "Do you offer bulk or custom collaborations?",
        answer:
          "We love collaborating with artists, brands, and organizations! For bulk orders or special projects, please reach out to us through our contact page with details about your idea, and our team will get back to you.",
      },
    ],
  },
];
export const ORDERS: Order[] = [
  {
    id: "JH-8435",
    customerName: "Liam Johnson",
    customerEmail: "liam@example.com",
    productName: "Midnight Bloom Hoodie",
    quantity: 1,
    status: "Shipped",
    date: "2023-10-28",
    total: 85.0,
    avatarUrl: "https://i.pravatar.cc/150?u=liam",
  },
  {
    id: "JH-8434",
    customerName: "Olivia Smith",
    customerEmail: "olivia@example.com",
    productName: "Seoul Silence Tee",
    quantity: 2,
    status: "Processing",
    date: "2023-10-28",
    total: 90.0,
    avatarUrl: "https://i.pravatar.cc/150?u=olivia",
  },
  {
    id: "JH-8433",
    customerName: "Noah Williams",
    customerEmail: "noah@example.com",
    productName: "Future Forward Cap",
    quantity: 1,
    status: "Delivered",
    date: "2023-10-27",
    total: 30.0,
    avatarUrl: "https://i.pravatar.cc/150?u=noah",
  },
  {
    id: "JH-8432",
    customerName: "Emma Brown",
    customerEmail: "emma@example.com",
    productName: "The Minimalist Tote",
    quantity: 1,
    status: "Delivered",
    date: "2023-10-26",
    total: 35.0,
    avatarUrl: "https://i.pravatar.cc/150?u=emma",
  },
  {
    id: "JH-8431",
    customerName: "Ava Jones",
    customerEmail: "ava@example.com",
    productName: "Concrete Dream Tee",
    quantity: 1,
    status: "Cancelled",
    date: "2023-10-25",
    total: 45.0,
    avatarUrl: "https://i.pravatar.cc/150?u=ava",
  },
  {
    id: "JH-8430",
    customerName: "James Miller",
    customerEmail: "james@example.com",
    productName: "Sage Comfort Hoodie",
    quantity: 1,
    status: "Shipped",
    date: "2023-10-24",
    total: 90.0,
    avatarUrl: "https://i.pravatar.cc/150?u=james",
  },
];

export const CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Liam Johnson",
    email: "liam@example.com",
    totalOrders: 5,
    joinDate: "2023-01-15",
    avatarUrl: "https://i.pravatar.cc/150?u=liam",
  },
  {
    id: 2,
    name: "Olivia Smith",
    email: "olivia@example.com",
    totalOrders: 8,
    joinDate: "2022-11-20",
    avatarUrl: "https://i.pravatar.cc/150?u=olivia",
  },
  {
    id: 3,
    name: "Noah Williams",
    email: "noah@example.com",
    totalOrders: 2,
    joinDate: "2023-03-10",
    avatarUrl: "https://i.pravatar.cc/150?u=noah",
  },
  {
    id: 4,
    name: "Emma Brown",
    email: "emma@example.com",
    totalOrders: 12,
    joinDate: "2021-07-22",
    avatarUrl: "https://i.pravatar.cc/150?u=emma",
  },
  {
    id: 5,
    name: "Ava Jones",
    email: "ava@example.com",
    totalOrders: 1,
    joinDate: "2023-09-05",
    avatarUrl: "https://i.pravatar.cc/150?u=ava",
  },
  {
    id: 6,
    name: "James Miller",
    email: "james@example.com",
    totalOrders: 7,
    joinDate: "2022-05-30",
    avatarUrl: "https://i.pravatar.cc/150?u=james",
  },
];
export const GARMENT_COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#212121" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Sage", hex: "#B2AC88" },
  { name: "Blush", hex: "#E6C4C4" },
];

export const CUSTOMIZABLE_PRODUCTS: CustomizableProduct[] = [
  {
    id: "tee",
    name: "Classic Tee",
    basePrice: 25.0,
    colors: GARMENT_COLORS,
    mockups: {
      front:
        "https://static.vecteezy.com/system/resources/previews/070/936/718/non_2x/white-t-shirt-on-transparent-background-free-png.png",
      back: "https://www.nicepng.com/png/detail/286-2864869_white-t-shirt-png-plain-white-t-shirt.png",
    },
    printableArea: { width: 35, height: 45, top: 28, left: 32.5 },
  },
  {
    id: "hoodie",
    name: "Cozy Hoodie",
    basePrice: 45.0,
    colors: GARMENT_COLORS.filter((c) => c.name !== "Blush"),
    mockups: {
      front: "https://pngimg.com/d/hoodie_PNG4.png",
      back: "https://pngimg.com/d/hoodie_PNG5.png",
    },
    printableArea: { width: 33, height: 35, top: 27, left: 33.5 },
  },
  {
    id: "sweatshirt",
    name: "Sweatshirt",
    basePrice: 30.0,
    colors: GARMENT_COLORS,
    mockups: {
      front:
        "https://img.freepik.com/premium-photo/png-crew-neck-transparent-mockup-unisex-streetwear-apparel_53876-1020648.jpg?semt=ais_hybrid",
      back: "https://framerusercontent.com/images/nsWoh4IcUBiJz8OLAckpizXBoI.png?width=500&height=500",
    },
    printableArea: { width: 35, height: 40, top: 25, left: 32.5 },
  },
];

const author: Author = {
  name: "Hana Kim",
  avatarUrl: "https://i.pravatar.cc/150?u=hana-kim",
  bio: "Hana is the creative director at Junhae Studio, exploring the intersection of minimalist design and personal expression.",
};

export const blogPost: Post = {
  category: "Studio Stories",
  title: "The Art of Minimalism: Finding Your Vibe in Simplicity",
  author: author,
  publishDate: "October 26, 2023",
  readTime: 7,
  heroImageUrl: "https://picsum.photos/id/1015/1920/1080",
  content: `
    <p class="text-lg text-gray-700 leading-relaxed mb-6">In a world saturated with noise, minimalism is more than an aesthetic; it’s a mindset. At Junhae Studio, we believe that simplicity is the ultimate form of sophistication. It’s about stripping away the non-essential to let your true self shine through. This philosophy is woven into every design we create, empowering you to print your vibe with clarity and confidence.</p>
    <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-4">Embracing the Blank Canvas</h2>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">Our design process always starts with a blank canvas. It’s a space of infinite possibility, where a single line or a subtle splash of color can make a powerful statement. We draw inspiration from Korean minimalism—its clean lines, neutral palettes, and focus on form. The goal is to create pieces that are not just clothes, but extensions of your personality.</p>
    <blockquote class="border-l-4 border-gray-300 pl-6 py-4 my-8">
      <p class="text-xl italic text-gray-800">“Simplicity is about subtracting the obvious and adding the meaningful.”</p>
      <cite class="block text-right text-gray-600 mt-2">— John Maeda</cite>
    </blockquote>
    <figure class="my-10">
      <img src="https://picsum.photos/id/431/1200/800" alt="Minimalist design process" class="rounded-lg shadow-md w-full" />
      <figcaption class="text-center text-sm text-gray-500 mt-2">Our moodboard for the 'Minimal Edit' collection.</figcaption>
    </figure>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">Every piece in our collection is designed to be versatile. A simple, well-crafted t-shirt can be the foundation of a dozen different outfits. It’s about creating a wardrobe that works for you, not the other way around. By choosing quality over quantity, you build a more sustainable and meaningful relationship with your clothes.</p>
  `,
  shopTheLook: [
    {
      name: "Essential Crew Tee",
      imageUrl: "https://picsum.photos/id/1025/400/500",
    },
    {
      name: "Relaxed Fit Trousers",
      imageUrl: "https://picsum.photos/id/1027/400/500",
    },
    {
      name: "Canvas Tote Bag",
      imageUrl: "https://picsum.photos/id/1080/400/500",
    },
  ],
  comments: [
    {
      author: "Alex Chen",
      avatarUrl: "https://i.pravatar.cc/150?u=alex-chen",
      date: "2 days ago",
      text: "This really resonates with my personal style philosophy. Beautifully written!",
    },
    {
      author: "Sophie Dubois",
      avatarUrl: "https://i.pravatar.cc/150?u=sophie-dubois",
      date: "1 day ago",
      text: "I love the moodboard picture! It’s so inspiring. Can’t wait for the next drop.",
    },
  ],
  relatedPosts: [
    {
      title: "Behind the Print: The Making of Our Street Drop",
      category: "Design Process",
      imageUrl: "https://picsum.photos/id/103/800/600",
      readTime: 5,
    },
    {
      title: "Sustainable Style: Our Commitment to the Planet",
      category: "Sustainability",
      imageUrl: "https://picsum.photos/id/152/800/600",
      readTime: 4,
    },
    {
      title: "Styling Guide: 5 Ways to Wear the Essential Tee",
      category: "Fashion",
      imageUrl: "https://picsum.photos/id/219/800/600",
      readTime: 3,
    },
  ],
};
export const MOCK_CART: CartItem[] = [
  {
    id: "prod_1",
    name: "Vibe Check Tee",
    description: "Heavyweight Cotton",
    price: 42.0,
    imageUrl: "https://picsum.photos/id/327/400/500",
    size: "M",
    color: "Off-White",
    quantity: 1,
  },
  {
    id: "prod_2",
    name: "Seoul Searching Hoodie",
    description: "Fleece-Lined Comfort",
    price: 88.0,
    imageUrl: "https://picsum.photos/id/357/400/500",
    size: "L",
    color: "Heather Grey",
    quantity: 2,
  },
];

export const RECOMMENDED_PRODUCTS: CartProduct[] = [
  {
    id: "rec_1",
    name: "Essential Tote",
    price: 35.0,
    imageUrl: "https://picsum.photos/id/404/400/500",
  },
  {
    id: "rec_2",
    name: "Minimalist Cap",
    price: 28.0,
    imageUrl: "https://picsum.photos/id/500/400/500",
  },
  {
    id: "rec_3",
    name: "Artisan Socks",
    price: 16.0,
    imageUrl: "https://picsum.photos/id/600/400/500",
  },
  {
    id: "rec_4",
    name: "Studio Beanie",
    price: 30.0,
    imageUrl: "https://picsum.photos/id/651/400/500",
  },
];
