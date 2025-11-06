import LayoutGridIcon from "@/app/icons/LayoutGridIcon";
import LogOutIcon from "@/app/icons/LogOutIcon";
import PackageIcon from "@/app/icons/PackageIcon";
import SettingsIcon from "@/app/icons/SettingsIcon";
import ShoppingCartIcon from "@/app/icons/ShoppingCartIcon";
import UsersIcon from "@/app/icons/UsersIcon";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navItems = [
    { name: "Overview", icon: LayoutGridIcon },
    { name: "Products", icon: PackageIcon },
    { name: "Orders", icon: ShoppingCartIcon },
    { name: "Customers", icon: UsersIcon },
    { name: "Settings", icon: SettingsIcon },
  ];

  const NavLink: React.FC<{
    item: {
      name: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    };
  }> = ({ item }) => (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setActivePage(item.name);
        setIsSidebarOpen(false); // Close sidebar on mobile after click
      }}
      className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
        activePage === item.name
          ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900"
          : "text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{item.name}</span>
    </Link>
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold tracking-wider text-gray-900 dark:text-white">
            JUNHAE ADMIN
          </h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="#"
            className="flex items-center px-4 py-2.5 rounded-lg text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200"
          >
            <LogOutIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
