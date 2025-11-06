"use client";
import MenuIcon from "@/app/icons/MenuIcon";
import MoonIcon from "@/app/icons/MoonIcon";
import SearchIcon from "@/app/icons/SearchIcon";
import SunIcon from "@/app/icons/SunIcon";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setIsSidebarOpen }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white mr-4"
              aria-label="Open sidebar"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-gray-300 dark:focus:border-gray-500 focus:ring-gray-300 dark:focus:ring-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeSwitch}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </button>
            <div className="relative">
              <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
                <Image
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?u=admin"
                  alt="Admin user avatar"
                  width={1000}
                  height={1000}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
