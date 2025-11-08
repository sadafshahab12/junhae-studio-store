"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CheckCircleIcon from "../icons/CheckCircleIcon";

const OrderSuccessContent: React.FC = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total") || "0.00";

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircleIcon className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. Your order has been received and is being
            processed.
          </p>
          <p className="text-2xl font-semibold text-gray-900 mb-8">
            Total: ${total}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/junhae-edits"
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSuccessPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;
