"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RecommendedProducts from "../components/cartPageComp/RecommendedProducts";
import EmptyCart from "../components/cartPageComp/EmptyCart";
import { useCart } from "../context/CartContext";
import MinusIcon from "../icons/MinusIcon";
import TrashIcon from "../icons/TrashIcon";
import PlusIcon from "../icons/PlusIcon";
import CartLoader from "../components/ui/CartLoader";

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, isLoaded } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + shipping + tax;

  if (!isLoaded) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <CartLoader />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <EmptyCart
            onShopClick={() => (window.location.href = "/junhae-edits")}
          />
        </main>
        <RecommendedProducts />
      </div>
    );
  }

  return (
    <div className="bg-white pt-40">
      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Cart
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Check your picks before they’re gone.
          </p>

          <form
            id="cart-form"
            className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          >
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        width={1000}
                        height={1000}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href="#"
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">{product.color}</p>
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                              {product.size}
                            </p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <div className="flex items-center border border-gray-300 rounded-md w-fit">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity - 1)
                              }
                              className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                              <span className="sr-only">Decrease quantity</span>
                              <MinusIcon />
                            </button>
                            <span className="px-3 text-sm font-medium text-gray-700">
                              {product.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                              className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                              <span className="sr-only">Increase quantity</span>
                              <PlusIcon />
                            </button>
                          </div>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5  cursor-pointer"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 flex text-sm text-gray-700 sm:hidden">
                        Item Total: $
                        {(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-8 pb-32 lg:pb-0">
                <Link
                  href="/junhae-edits"
                  className="font-medium text-green-900 hover:text-green-700"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="hidden lg:block mt-16 rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 lg:sticky lg:top-24"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${shipping.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="block w-full text-center rounded-md border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Proceed to Checkout &rarr;
                </Link>
              </div>
            </section>
          </form>
        </div>
      </main>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-sm text-gray-600">Total</span>
            <p className="text-xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </p>
          </div>
          <Link
            href="/checkout"
            className="w-full max-w-xs text-center rounded-md border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
          >
            Checkout
          </Link>
        </div>
      </div>
      <RecommendedProducts />
    </div>
  );
};

export default CartPage;
