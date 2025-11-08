"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { Order } from "../data/types";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import LockClosedIcon from "../icons/LockClosedIcon";
import Link from "next/link";
import { CartItem } from "../data/types";

interface OrderSummaryProps {
  cart: CartItem[];
  isMobile?: boolean;
  shipping?: number;
  subtotal?: number;
  tax?: number;
  total?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  cart, 
  isMobile = false,
  shipping: propShipping,
  subtotal: propSubtotal,
  tax: propTax,
  total: propTotal,
}) => {
  const subtotal = propSubtotal ?? cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = propShipping ?? (subtotal > 0 ? 5.0 : 0);
  const tax = propTax ?? (subtotal > 0 ? subtotal * 0.08 : 0);
  const total = propTotal ?? (subtotal + shipping + tax);

  return (
    <div className={`${isMobile ? "block lg:hidden" : "hidden lg:block"}`}>
      <div className="bg-stone-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
        <ul role="list" className="mt-6 divide-y divide-gray-200">
          {cart.map((product) => (
            <li key={product.id} className="flex py-4">
              <div className="shrink-0 relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-20 w-20 rounded-md object-cover"
                  width={80}
                  height={80}
                />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white">
                  {product.quantity}
                </span>
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{product.name}</h3>
                    <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.size} / {product.color}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-3 border-t border-gray-200 pt-6">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Taxes</dt>
            <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
            <dt className="text-base font-bold text-gray-900">Total</dt>
            <dd className="text-base font-bold text-gray-900">${total.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart, getCartTotal } = useCart();
  const { addOrder } = useOrder();
  const { currentUser } = useAuth();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    name: currentUser?.name || "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvc: "",
  });

  useEffect(() => {
    const timeout = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timeout);
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const subtotal = getCartTotal();
  const shipping = shippingMethod === "express" ? 12.0 : 5.0;
  const tax = subtotal > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create orders for each cart item
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    cart.forEach((item) => {
      const order: Order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customerName: formData.name,
        customerEmail: formData.email,
        productName: `${item.name} (${item.size}, ${item.color})`,
        quantity: item.quantity,
        status: "Processing",
        date: orderDate,
        total: item.price * item.quantity + shipping + (item.price * item.quantity * 0.08),
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
      };
      addOrder(order);
    });

    // Clear cart and redirect
    clearCart();
    router.push(`/order-success?total=${total.toFixed(2)}`);
  };

  return (
    <div
      className={`bg-white min-h-screen transition-opacity duration-500 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* MOBILE HEADER */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider text-gray-900"
            >
              JUNHAE STUDIO
            </Link>
            <button
              type="button"
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <ShoppingBagIcon className="w-5 h-5 text-gray-500" />
              <span>{isSummaryOpen ? "Hide" : "Show"} order summary</span>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  isSummaryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
        {isSummaryOpen && (
          <div className="border-t border-gray-200 p-4 bg-stone-50">
            <OrderSummary 
              cart={cart} 
              isMobile={true}
              shipping={shipping}
              subtotal={subtotal}
              tax={tax}
              total={total}
            />
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-50 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* FORM SECTION */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block text-center mb-12">
              <Link
                href="/"
                className="text-2xl font-bold tracking-wider text-gray-900"
              >
                JUNHAE STUDIO
              </Link>
            </div>

            {/* Breadcrumb */}
            <nav aria-label="Progress">
              <ol role="list" className="flex items-center text-sm font-medium text-gray-500">
                <li className="flex">
                  <Link
                    href="/cart"
                    className="hover:text-gray-700"
                  >
                    Cart
                  </Link>
                </li>
                <li className="flex items-center pl-2">
                  <svg
                    className="h-5 w-5 text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="pl-2 text-gray-900 font-semibold">Information</span>
                </li>
                <li className="flex items-center pl-2">
                  <svg className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="pl-2">Shipping</span>
                </li>
                <li className="flex items-center pl-2">
                  <svg className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="pl-2">Payment</span>
                </li>
              </ol>
            </nav>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-12 space-y-10">
              {/* Contact */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">Shipping method</h2>
                <div className="mt-4 space-y-4">
                  {[
                    { id: "standard", label: "Standard", desc: "3–5 business days", price: 5 },
                    { id: "express", label: "Express", desc: "1–2 business days", price: 12 },
                  ].map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setShippingMethod(option.id as "standard" | "express")}
                      className={`relative flex items-center p-4 border rounded-md cursor-pointer ${
                        shippingMethod === option.id
                          ? "border-gray-900 ring-2 ring-gray-900"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-method"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        readOnly
                        className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <div className="ml-4 flex flex-1 justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{option.label}</span>
                        <span className="text-sm text-gray-500">{option.desc}</span>
                        <span className="text-sm font-medium text-gray-900">${option.price}.00</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name-on-card"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <input
                        type="text"
                        id="name-on-card"
                        name="name-on-card"
                        value={formData.nameOnCard}
                        onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        value={formData.expirationDate}
                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <LockClosedIcon className="w-4 h-4" />
                  <span>Secure 256-bit SSL Encryption. Your information is safe.</span>
                </div>
              </div>

              {/* Place Order */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* SUMMARY SIDEBAR */}
          <aside className="lg:col-span-1 lg:sticky lg:top-16">
            <div className="py-12">
              <OrderSummary 
                cart={cart} 
                shipping={shipping}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
