"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";

import ProductCard from "../components/shopPageComp/ProductCard";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProduct } from "../context/ProductContext";
import { CATEGORIES } from "../data/constants";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { Product } from "../data/types";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ProductLoader from "../components/ui/ProductLoader";

const JunhaeEditsPage: React.FC = () => {
  const { products } = useProduct();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const sortRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const sortOptions = [
    "Newest",
    "Bestsellers",
    "Price: Low to High",
    "Price: High to Low",
  ];

  // Loader with minimum timer
  useEffect(() => {
    const loader = async () => {
      if (!products) return;
      setLoading(true);
    };
    loader();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // show loader at least 1.5s
    return () => clearTimeout(timer);
  }, [products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayedProducts = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? [...products]
        : products.filter((p) => p.category === activeCategory);

    switch (sortOption) {
      case "Newest":
        filtered.sort((a, b) => {
          const diff = (b.newest ? 1 : 0) - (a.newest ? 1 : 0);
          if (diff !== 0) return diff;
          return Number(a.id) - Number(b.id);
        });
        break;
      case "Bestsellers":
        filtered.sort((a, b) => {
          const diff = (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
          if (diff !== 0) return diff;
          return Number(a.id) - Number(b.id);
        });
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [products, activeCategory, sortOption]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    if (category !== "Custom Prints") {
      setActiveCategory(category);
    } else {
      alert("Navigating to Create Your Own page!");
      router.push("/create");
    }
  };

  return (
    <div className="pt-50">
      <header className="py-8 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Shop the Story You Wear.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Explore sustainable streetwear, minimalist Korean fashion, and
            custom print-on-demand clothing. Each Junhae Studio piece is made
            consciously — soft cotton, clean silhouettes, and timeless
            expression.
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Desktop Category Buttons */}
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === category && category !== "Custom Prints"
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  } ${
                    category === "Custom Prints"
                      ? "text-green-800 font-semibold hover:bg-green-50"
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="flex sm:hidden w-full mr-2">
              <select
                value={activeCategory}
                onChange={(e) => handleCategoryClick(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative ml-4" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Sort
                <ChevronDownIcon
                  className={`ml-1 transition-transform ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSortChange(option)}
                      className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                        sortOption === option
                          ? "font-semibold text-gray-900"
                          : "text-gray-700"
                      } hover:bg-gray-100`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <ProductLoader text="Loading products for you..." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {displayedProducts.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Design It. Wear It. Live It.
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Print your art, thoughts, or words on timeless, minimalist pieces.
            Each design is printed on demand using sustainable materials — your
            story, your style, your Junhae.
          </p>
          <div className="mt-8">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Print Your Vision
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JunhaeEditsPage;
