"use client"
import { ORDERS } from "@/app/data/constants";
import { Order } from "@/app/data/types";
import Image from "next/image";
import React, { useState } from "react";

const OrdersAdmin: React.FC = () => {
  const [orders] = useState<Order[]>(ORDERS);

  const getStatusBadge = (status: Order["status"]) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "Shipped":
        return (
          <span
            className={`${baseClasses} text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300`}
          >
            Shipped
          </span>
        );
      case "Processing":
        return (
          <span
            className={`${baseClasses} text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300`}
          >
            Processing
          </span>
        );
      case "Delivered":
        return (
          <span
            className={`${baseClasses} text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300`}
          >
            Delivered
          </span>
        );
      case "Cancelled":
        return (
          <span
            className={`${baseClasses} text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300`}
          >
            Cancelled
          </span>
        );
      default:
        return (
          <span
            className={`${baseClasses} text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-gray-300`}
          >
            Unknown
          </span>
        );
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Orders
      </h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Image
                      src={order.avatarUrl}
                      alt={order.customerName}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                      width={1000}
                      height={1000}
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order.productName} ({order.quantity})
                </td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdmin;
