"use client"
import { CUSTOMERS } from "@/app/data/constants";
import { Customer } from "@/app/data/types";
import Image from "next/image";
import React, { useState } from "react";

const CustomersAdmin: React.FC = () => {
  const [customers] = useState<Customer[]>(CUSTOMERS);

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Customers
      </h2>
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
            {customers.map((customer) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersAdmin;
