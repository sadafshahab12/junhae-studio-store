"use client";
import { NAV_LINKS } from "@/app/data/constants";
import MenuIcon from "@/app/icons/MenuIcon";
import ShoppingBagIcon from "@/app/icons/ShoppingBagIcon";
import UserIcon from "@/app/icons/UserIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="logo flex justify-center items-center py-4 ">
        <Image
          src={"/logo/junhae studio logo.png"}
          alt="junhae-studio-logo"
          width={1000}
          height={1000}
          className="w-16 h-16"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">

          <nav className="hidden md:flex md:items-center md:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
            >
              <UserIcon />
            </Link>
            <Link
              href="/cart"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingBagIcon />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="sm:hidden text-sm font-medium text-gray-600 hover:text-gray-900 py-2 border-t border-gray-100 pt-4 mt-2"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
