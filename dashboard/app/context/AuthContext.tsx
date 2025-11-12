"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin";
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string) => Promise<User>;
  logout: () => void;
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
      const storedUser = localStorage.getItem("junhaeAdmin");
      if (storedUser) {
        requestAnimationFrame(() => {
          setCurrentUser(JSON.parse(storedUser));
        });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("junhaeAdmin");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.toLowerCase() === "admin@junhae.com") {
          const adminUser: User = { id: 0, name: "Admin", email, role: "admin" };
          localStorage.setItem("junhaeAdmin", JSON.stringify(adminUser));
          setCurrentUser(adminUser);
          resolve(adminUser);
        } else {
          reject(new Error("Only admin can login"));
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem("junhaeAdmin");
    setCurrentUser(null);
    window.location.hash = "#login";
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
