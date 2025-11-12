"use client";
import React, { useState } from "react";
import StatCard from "./StatCard";
import { CUSTOMERS } from "@/app/data/constants";
import { CartItem } from "@/app/data/types";
import { useOrder } from "@/app/context/OrderContext";
import { useProduct } from "@/app/context/ProductContext";
import PackageIcon from "@/app/icons/PackageIcon";
import ShoppingCartIcon from "@/app/icons/ShoppingCartIcon";
import UsersIcon from "@/app/icons/UsersIcon";
import Image from "next/image";
import Link from "next/link";

const DashboardOverview: React.FC = () => {
  const { orders, getTotalSales } = useOrder();
  const { products } = useProduct();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => { 
    try {
      const storedCart = localStorage.getItem("junhaeCart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart", error);
      return [];
    }
  });

  const [cartTotal, setCartTotal] = useState(() => {
    try {
      const storedCart = localStorage.getItem("junhaeCart");
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        return cart.reduce(
          (sum: number, item: CartItem) => sum + item.price * item.quantity,
          0
        );
      }
      return 0;
    } catch (error) {
      console.error("Failed to load cart", error);
      return 0;
    }
  });

  const totalSales = getTotalSales();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={products.length.toString()}
          Icon={PackageIcon}
          change="+2 since last month"
        />
        <StatCard
          title="Total Orders"
          value={orders.length.toString()}
          Icon={ShoppingCartIcon}
          change="+5 since last month"
          changeType="positive"
        />
        <StatCard
          title="Active Customers"
          value={CUSTOMERS.length.toString()}
          Icon={UsersIcon}
          change="-1 since last month"
          changeType="negative"
        />
        <StatCard
          title="Cart Value"
          value={`$${cartTotal.toFixed(2)}`}
          Icon={ShoppingCartIcon}
          change={`${cartItems.length} items in cart`}
        />
      </div>

      {/* Cart Items Section */}
      {cartItems.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Cart Items
            </h3>
            <Link
              href="/cart"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              View Cart →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Color</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-md object-cover mr-3"
                          width={1000}
                          height={1000}
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.size}</td>
                    <td className="px-4 py-3">{item.color}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-right font-semibold"
                  >
                    Cart Total:
                  </td>
                  <td className="px-4 py-3 font-bold text-lg">
                    ${cartTotal.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Sales
        </h3>
        {/* In a real app, this would be a chart component like Recharts or Chart.js */}
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            Sales chart placeholder - Total Sales: ${totalSales.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
