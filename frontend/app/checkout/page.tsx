"use client";
import React, { useState, useEffect, useRef } from "react"; // 👈 Import useRef
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import LockClosedIcon from "../icons/LockClosedIcon";
import UploadCloudIcon from "../icons/UploadCloudIcon";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: string;
  color: string;
}

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
  const subtotal =
    propSubtotal ??
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = propShipping ?? (subtotal > 0 ? 5.0 : 0);
  const tax = propTax ?? (subtotal > 0 ? subtotal * 0.08 : 0);
  const total = propTotal ?? subtotal + shipping + tax;

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
                    <p className="ml-4">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
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
            <dd className="text-sm font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">
              ${shipping.toFixed(2)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Taxes</dt>
            <dd className="text-sm font-medium text-gray-900">
              ${tax.toFixed(2)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
            <dt className="text-base font-bold text-gray-900">Total</dt>
            <dd className="text-base font-bold text-gray-900">
              ${total.toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

// Extracted BankDetails component to be a standalone functional component
interface BankDetailsProps {
  total: number;
}
const BankDetails: React.FC<BankDetailsProps> = ({ total }) => (
  <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
    <h3 className="text-base font-semibold text-gray-900 mb-2">
      Transfer Details
    </h3>
    <p className="text-sm text-gray-700">
      Please transfer **${total.toFixed(2)}** to the following account and
      upload the proof of payment. Your order will be processed upon
      confirmation of the transfer.
    </p>
    <dl className="mt-3 space-y-1 text-sm">
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Bank Name:</dt>
        <dd className="text-gray-900">Juno Bank</dd>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Account Name:</dt>
        <dd className="text-gray-900">Junhae Studio Inc.</dd>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Account Number:</dt>
        <dd className="text-gray-900">1234567890</dd>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Routing Number:</dt>
        <dd className="text-gray-900">098765432</dd>
      </div>
    </dl>
  </div>
);

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart, getCartTotal, isLoaded } = useCart();
  const { addOrder } = useOrder();
  const { currentUser } = useAuth();

  // 👈 Create a ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    name: currentUser?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const timeout = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timeout);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (cart.length === 0) router.push("/cart");
  }, [cart, isLoaded, router]);

  const subtotal = getCartTotal();
  const shipping = shippingMethod === "express" ? 12.0 : 5.0;
  const tax = subtotal > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + shipping + tax;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentProof(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = new FormData();
      // ... (rest of form data appending remains the same)
      form.append("customerName", formData.name);
      form.append("customerEmail", formData.email);
      form.append("address", formData.address);
      form.append("city", formData.city);
      form.append("postalCode", formData.postalCode);
      form.append("country", formData.country || "Unknown");
      form.append("shippingMethod", shippingMethod);
      form.append("subtotal", subtotal.toString());
      form.append("shipping", shipping.toString());
      form.append("tax", tax.toString());
      form.append("total", total.toString());
      form.append("paymentMethod", paymentMethod);

      // Check for payment proof if Bank Transfer is selected
      if (paymentMethod === "Bank Transfer" && !paymentProof) {
        alert("Please upload payment proof for Bank Transfer.");
        return;
      }
      if (paymentProof) form.append("paymentProof", paymentProof);

      // Add products as a JSON string
      form.append(
        "products",
        JSON.stringify(
          cart.map((item) => ({
            name: item.name,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          }))
        )
      );

      // 🎯 Use the context's addOrder function
      const newOrder = await addOrder(form);

      if (!newOrder) {
        alert("Failed to place order");
        return;
      }

      clearCart();
      // Use the newly created order's ID for navigation
      router.push(`/order-success?orderId=${newOrder._id}`);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div
      className={`bg-white min-h-screen transition-opacity duration-500 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* MOBILE HEADER ... (omitted for brevity) */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20 lg:hidden">
        {/* ... (omitted) */}
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
              isMobile
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
          {/* FORM SECTION ... (omitted for brevity) */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block text-center mb-12">
              <Link
                href="/"
                className="text-2xl font-bold tracking-wider text-gray-900"
              >
                JUNHAE STUDIO
              </Link>
            </div>

            {/* Breadcrumb ... (omitted) */}
            <nav aria-label="Progress">
              <ol
                role="list"
                className="flex items-center text-sm font-medium text-gray-500"
              >
                <li className="flex">
                  <Link href="/cart" className="hover:text-gray-700">
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
                  <span className="pl-2 text-gray-900 font-semibold">
                    Information
                  </span>
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
                  <span className="pl-2">Shipping</span>
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
                  <span className="pl-2">Payment</span>
                </li>
              </ol>
            </nav>
            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-12 space-y-10">
              {/* Contact ... (omitted) */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
                </h2>
                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email-address"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                  />
                </div>
              </div>
              {/* Shipping Info ... (omitted) */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      id="postal-code"
                      value={formData.postalCode}
                      onChange={(e) =>
                        setFormData({ ...formData, postalCode: e.target.value })
                      }
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                    />
                  </div>
                </div>
              </div>
              {/* Shipping Method ... (omitted) */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping method
                </h2>
                <div className="mt-4 space-y-4">
                  {[
                    {
                      id: "standard",
                      label: "Standard",
                      desc: "3–5 business days",
                      price: 5,
                    },
                    {
                      id: "express",
                      label: "Express",
                      desc: "1–2 business days",
                      price: 12,
                    },
                  ].map((option) => (
                    <div
                      key={option.id}
                      onClick={() =>
                        setShippingMethod(option.id as "standard" | "express")
                      }
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
                        <span className="text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {option.desc}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          ${option.price}.00
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                  <select
                    className="w-full p-3 border rounded-md"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>

                  {/* BANK TRANSFER DETAILS & UPLOAD FIELD (UPDATED UI) */}
                  {paymentMethod === "Bank Transfer" && (
                    <>
                      <BankDetails total={total} />

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Payment Proof (Required)
                        </label>

                        {/* 1. HIDDEN FILE INPUT */}
                        <input
                          type="file"
                          ref={fileInputRef} // 👈 Reference the hidden input
                          onChange={handleFileChange}
                          accept=".png, .jpg, .jpeg, .pdf"
                          required={paymentMethod === "Bank Transfer"}
                          className="hidden" // 👈 Keep it hidden
                        />

                        {/* 2. STYLED BUTTON/DROPZONE */}
                        {paymentProof ? (
                          <div className="flex items-center justify-between p-3 border border-green-500 bg-green-50 rounded-md">
                            <span className="text-sm text-green-700 truncate">
                              ✅ File uploaded: **{paymentProof.name}**
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setPaymentProof(null);
                                if (fileInputRef.current)
                                  fileInputRef.current.value = "";
                              }}
                              className="text-xs text-green-700 hover:text-green-900 ml-4 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button" // 👈 Use type="button" to prevent form submission
                            onClick={() => fileInputRef.current?.click()} // 👈 Trigger click on hidden input
                            className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <UploadCloudIcon className="w-8 h-8 text-gray-400" />
                            <span className="mt-2 text-sm font-semibold text-gray-700">
                              Click to upload proof
                            </span>
                            <span className="text-xs text-gray-500">
                              PNG, JPG, or PDF
                            </span>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                  {/* END BANK TRANSFER DETAILS & UPLOAD FIELD */}
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <LockClosedIcon className="w-4 h-4" />
                  <span>
                    Secure 256-bit SSL Encryption. Your information is safe.
                  </span>
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

          {/* SUMMARY SIDEBAR ... (omitted) */}
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
