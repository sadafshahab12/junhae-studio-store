"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Order } from "@/app/data/types";

interface OrderContextType {
  orders: Order[];
  addOrder: (formData: FormData) => Promise<Order | null>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
  getOrdersByCustomer: (email: string) => Order[];
  getTotalSales: () => number;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 🟦 Fetch all orders from backend on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`
        );
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🟩 Create new order (supports file upload)
  const addOrder = async (formData: FormData): Promise<Order | null> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`,
        {
          method: "POST",
          body: formData, // multipart/form-data automatically handled
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Order creation error:", data);
        return null;
      }

      setOrders((prev) => [data.order, ...prev]);
      return data.order;
    } catch (err) {
      console.error("Failed to add order", err);
      return null;
    }
  };

  // 🟨 Update order status
  const updateOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // 🟧 Filter by customer email
  const getOrdersByCustomer = (email: string) => {
    return orders.filter((o) => o.customerEmail === email);
  };

  // 🟥 Sum sales (excluding cancelled orders)
  const getTotalSales = () => {
    return orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByCustomer,
        getTotalSales,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }
  return context;
};
