"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../data/types";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("junhaeUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("junhaeUser");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);

    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user: User;

        // Hardcoded admin login
        if (
          email.toLowerCase() === "admin@junhae.com" &&
          password === "admin"
        ) {
          user = { id: 0, name: "Admin", email, role: "admin" };
        }
        // Regular user
        else {
          user = { id: Date.now(), name: "Test User", email, role: "user" };
        }

        // Save to localStorage & update context
        localStorage.setItem("junhaeUser", JSON.stringify(user));
        setCurrentUser(user);
        setLoading(false);
        resolve(user);
      }, 500);
    });
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = { id: Date.now(), name, email, role: "user" };
        localStorage.setItem("junhaeUser", JSON.stringify(newUser));
        setCurrentUser(newUser);
        setLoading(false);
        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem("junhaeUser");
    setCurrentUser(null);
    window.location.href = "/auth/login"; // Properly redirect
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
