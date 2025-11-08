"use client"
import { Customer } from "@/app/data/types";
import { useOrder } from "@/app/context/OrderContext";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";

const CustomersAdmin: React.FC = () => {
  const { orders } = useOrder();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Generate customers from orders
  useEffect(() => {
    const customerMap = new Map<string, Customer>();
    
    orders.forEach((order) => {
      if (!customerMap.has(order.customerEmail)) {
        customerMap.set(order.customerEmail, {
          id: customerMap.size + 1,
          name: order.customerName,
          email: order.customerEmail,
          totalOrders: 1,
          joinDate: order.date,
          avatarUrl: order.avatarUrl,
        });
      } else {
        const customer = customerMap.get(order.customerEmail)!;
        customer.totalOrders += 1;
      }
    });

    setCustomers(Array.from(customerMap.values()));
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Customers ({filteredCustomers.length})
      </h2>
      
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Total Orders
              </th>
              <th scope="col" className="px-6 py-3">
                Join Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  <div className="flex items-center">
                    <Image
                      src={customer.avatarUrl}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover mr-4"
                      width={1000}
                      height={1000}
                    />
                    {customer.name}
                  </div>
                </td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.totalOrders}</td>
                <td className="px-6 py-4">{customer.joinDate}</td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersAdmin;
