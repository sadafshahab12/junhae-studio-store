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
  login: (email: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string) => Promise<User>;
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

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("junhaeUser");
      if (storedUser) {
        requestAnimationFrame(() => {
          setCurrentUser(JSON.parse(storedUser));
        });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("junhaeUser");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let user: User;
        if (email.toLowerCase() === "admin@junhae.com") {
          user = { id: 0, name: "Admin", email, role: "admin" };
        } else {
          user = { id: Date.now(), name: "Test User", email, role: "user" };
        }
        localStorage.setItem("junhaeUser", JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 500);
    });
  };

  const signup = async (name: string, email: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = { id: Date.now(), name, email, role: "user" };
        localStorage.setItem("junhaeUser", JSON.stringify(newUser));
        setCurrentUser(newUser);
        resolve(newUser);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem("junhaeUser");
    setCurrentUser(null);
    window.location.hash = "#login";
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
