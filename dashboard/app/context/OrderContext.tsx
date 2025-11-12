"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Order } from "../data/types";


interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getOrdersByCustomer: (email: string) => Order[];
  getTotalSales: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem("junhaeOrders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error("Failed to load orders from localStorage", error);
      localStorage.removeItem("junhaeOrders");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("junhaeOrders", JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrdersByCustomer = (email: string) => {
    return orders.filter((order) => order.customerEmail === email);
  };

  const getTotalSales = () => {
    return orders
      .filter((order) => order.status !== "Cancelled")
      .reduce((sum, order) => sum + order.total, 0);
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrdersByCustomer,
    getTotalSales,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

