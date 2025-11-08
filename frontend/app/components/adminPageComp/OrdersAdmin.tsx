"use client"
import { Order } from "@/app/data/types";
import { useOrder } from "@/app/context/OrderContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const OrdersAdmin: React.FC = () => {
  const { orders, updateOrderStatus } = useOrder();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = orders;
    
    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm]);

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

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Orders ({filteredOrders.length})
      </h2>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="All">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
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
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value as Order["status"])
                    }
                    className="text-xs px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersAdmin;
