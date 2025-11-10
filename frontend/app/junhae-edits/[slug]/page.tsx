"use client";
import AccordionItem from "@/app/components/productDetailPageComp/AccordionItem";
import ImageGallery from "@/app/components/productDetailPageComp/ImageGallery";
import ProductCard from "@/app/components/shopPageComp/ProductCard";
import Toast from "@/app/components/ui/Toast";
import { REVIEWS } from "@/app/data/constants";
import { useProduct } from "@/app/context/ProductContext";
import { Product, Review, CartItem } from "@/app/data/types";
import MinusIcon from "@/app/icons/MinusIcon";
import PlusIcon from "@/app/icons/PlusIcon";
import StarIcon from "@/app/icons/StarIcon";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

interface ReviewsProps {
  reviews: Review[];
  productId: number;
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews: initialReviews,
  productId,
}) => {
  // ✅ FIXED: Initialized state from localStorage during the first render to avoid useEffect warning.
  const [reviews, setReviews] = useState<Review[]>(() => {
    let combinedReviews = initialReviews;
    try {
      const storedReviews = localStorage.getItem(
        `product_${productId}_reviews`
      );
      if (storedReviews) {
        const parsed = JSON.parse(storedReviews);
        if (Array.isArray(parsed)) {
          combinedReviews = [...initialReviews, ...parsed];
        }
      }
    } catch (error) {
      console.error("Failed to load reviews from localStorage", error);
    }
    return combinedReviews;
  }); // END OF FIX
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: "",
    author: "",
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.text.trim() || !newReview.author.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      author: newReview.author,
      avatarUrl:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(newReview.author),
      rating: newReview.rating,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      text: newReview.text,
    };

    setReviews([...reviews, review]);
    setNewReview({ rating: 5, text: "", author: "" });
    setShowReviewForm(false); // Save to localStorage

    const storedReviews = localStorage.getItem(`product_${productId}_reviews`);
    const allReviews = storedReviews ? JSON.parse(storedReviews) : [];
    allReviews.push(review);
    localStorage.setItem(
      `product_${productId}_reviews`,
      JSON.stringify(allReviews)
    );
  };

  return (
    <section className="py-16 sm:py-24 border-t border-gray-200">
           {" "}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               {" "}
        <div className="flex items-center justify-between">
                   {" "}
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Customer Reviews          {" "}
          </h2>
                   {" "}
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-sm font-medium"
          >
                        {showReviewForm ? "Cancel" : "Write a Review"}         {" "}
          </button>
                 {" "}
        </div>
               {" "}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mt-6 p-6 bg-gray-50 rounded-lg"
          >
                       {" "}
            <div className="mb-4">
                           {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name              {" "}
              </label>
                           {" "}
              <input
                type="text"
                value={newReview.author}
                onChange={(e) =>
                  setNewReview({ ...newReview, author: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
                         {" "}
            </div>
                       {" "}
            <div className="mb-4">
                           {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating              {" "}
              </label>
                           {" "}
              <div className="flex gap-2">
                               {" "}
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="focus:outline-none"
                  >
                                       {" "}
                    <StarIcon
                      filled={rating <= newReview.rating}
                      className="text-yellow-400 w-6 h-6"
                    />
                                     {" "}
                  </button>
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="mb-4">
                           {" "}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review              {" "}
              </label>
                           {" "}
              <textarea
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
                         {" "}
            </div>
                       {" "}
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-sm font-medium"
            >
                            Submit Review            {" "}
            </button>
                     {" "}
          </form>
        )}
               {" "}
        <div className="mt-4 flex items-center">
                   {" "}
          <div className="flex items-center">
                       {" "}
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                filled={i < Math.round(averageRating)}
                className="text-yellow-400"
              />
            ))}
                     {" "}
          </div>
                   {" "}
          <p className="ml-2 text-sm text-gray-600">
                        {averageRating > 0 ? averageRating.toFixed(1) : "No"}{" "}
            out of 5          {" "}
          </p>
                   {" "}
          <p className="ml-4 pl-4 border-l border-gray-200 text-sm text-gray-600">
                        {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}         {" "}
          </p>
                 {" "}
        </div>
               {" "}
        <div className="mt-10 space-y-10">
                   {" "}
          {reviews.length === 0 ? (
            <p className="text-gray-500">
                            No reviews yet. Be the first to review!            {" "}
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="flex flex-col sm:flex-row gap-6">
                               {" "}
                <div className="shrink-0">
                                   {" "}
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={review.avatarUrl}
                    alt={review.author}
                    width={1000}
                    height={1000}
                  />
                                 {" "}
                </div>
                               {" "}
                <div>
                                   {" "}
                  <div className="flex items-center">
                                       {" "}
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < review.rating}
                        className="text-yellow-400"
                      />
                    ))}
                                     {" "}
                  </div>
                                   {" "}
                  <p className="mt-4 text-base text-gray-600">{review.text}</p> 
                                 {" "}
                  <p className="mt-4 text-sm font-medium text-gray-900">
                                        {review.author}                 {" "}
                  </p>
                                   {" "}
                  <p className="text-sm text-gray-500">{review.date}</p>       
                         {" "}
                </div>
                             {" "}
              </div>
            ))
          )}
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </section>
  );
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { products} = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Default");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const slug = params.slug as string;
        setIsLoading(true);

        const res = await fetch(`/api/products/${slug}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
        router.push("/junhae-edits"); // redirect to shop page if not found
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug, router]);

  if (isLoading || !product) {
    return (
      <div className="pt-16 bg-white min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>     {" "}
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.tagline,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pt-50 bg-white">
           {" "}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
               {" "}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column: Image Gallery */}         {" "}
          <ImageGallery
            images={product.galleryImages}
            productName={product.name}
          />
                    {/* Right Column: Product Info */}         {" "}
          <div className="lg:sticky lg:top-24 self-start">
                       {" "}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                            {product.name}           {" "}
            </h1>
                       {" "}
            <p className="mt-2 text-lg text-gray-500">{product.tagline}</p>     
                 {" "}
            <p className="mt-4 text-3xl font-medium text-gray-900">
                            ${product.price.toFixed(2)}           {" "}
            </p>
                       {" "}
            <div className="mt-8">
                           {" "}
              <h3 className="text-sm font-semibold text-gray-800">
                                Select Size              {" "}
              </h3>
                           {" "}
              <div className="mt-2 flex gap-2">
                               {" "}
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 w-12 h-12 flex items-center justify-center border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                                        {size}                 {" "}
                  </button>
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="mt-8">
                           {" "}
              <h3 className="text-sm font-semibold text-gray-800">
                                Select Color              {" "}
              </h3>
                           {" "}
              <div className="mt-2 flex gap-2">
                               {" "}
                {["Default", "Black", "White", "Gray"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                                        {color}                 {" "}
                  </button>
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="mt-8">
                           {" "}
              <h3 className="text-sm font-semibold text-gray-800">Quantity</h3> 
                         {" "}
              <div className="mt-2 flex items-center border border-gray-300 rounded-md w-fit">
                               {" "}
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-500 hover:bg-gray-100 rounded-l-md"
                >
                                    <MinusIcon />               {" "}
                </button>
                               {" "}
                <span className="px-4 font-medium">{quantity}</span>           
                   {" "}
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-gray-500 hover:bg-gray-100 rounded-r-md"
                >
                                    <PlusIcon />               {" "}
                </button>
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="mt-8 flex gap-4">
                           {" "}
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors"
              >
                                Add to Cart              {" "}
              </button>
                           {" "}
              <Link
                href="/cart"
                className="flex-1 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-colors text-center"
              >
                                View Cart              {" "}
              </Link>
                         {" "}
            </div>
                       {" "}
            <div className="mt-10">
                           {" "}
              <p className="text-base text-gray-700">{product.description}</p> 
                       {" "}
            </div>
                       {" "}
            <div className="mt-8">
                           {" "}
              <AccordionItem title="Details & Care" defaultOpen={true}>
                               {" "}
                <ul className="list-disc list-inside">
                                   {" "}
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                                 {" "}
                </ul>
                             {" "}
              </AccordionItem>
                           {" "}
              <AccordionItem title="Size Guide">
                               {" "}
                <table className="w-full text-left">
                                   {" "}
                  <thead>
                                       {" "}
                    <tr>
                                           {" "}
                      <th className="font-semibold">Size</th>                   
                        <th className="font-semibold">Chest</th>               
                            <th className="font-semibold">Length</th>           
                             {" "}
                    </tr>
                                     {" "}
                  </thead>
                                   {" "}
                  <tbody>
                                       {" "}
                    {product.sizeGuide.map((guide) => (
                      <tr key={guide.size}>
                                                <td>{guide.size}</td>           
                                    <td>{guide.chest}</td>                     
                          <td>{guide.length}</td>                     {" "}
                      </tr>
                    ))}
                                     {" "}
                  </tbody>
                                 {" "}
                </table>
                             {" "}
              </AccordionItem>
                           {" "}
              <AccordionItem title="Shipping & Returns">
                               {" "}
                <p>
                                    Free shipping on orders over $100. We accept
                  returns on unworn                   items within 30 days of
                  delivery. As a print-on-demand studio,                   some
                  items may be final sale.                {" "}
                </p>
                             {" "}
              </AccordionItem>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </main>
            <Reviews reviews={REVIEWS} productId={parseInt(product.id, 10)} /> 
          {/* Related Products */}     {" "}
      <section className="py-16 sm:py-24 bg-stone-50 border-t border-gray-200">
               {" "}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                   {" "}
          <h2 className="text-2xl font-bold tracking-tight text-center text-gray-900">
                        You May Also Like          {" "}
          </h2>
                   {" "}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                       {" "}
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </section>
           {" "}
      <Toast
        message={`${product.name} added to cart!`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
         {" "}
    </div>
  );
};

export default ProductDetailPage;
