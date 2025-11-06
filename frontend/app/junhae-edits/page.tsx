"use client"
import React, { useState, useMemo, useRef, useEffect } from "react";
import { CATEGORIES, PRODUCTS } from "../data/constants";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ProductCard from "../components/shopPageComp/ProductCard";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Link from "next/link";

const JunhaeEditsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    "Newest",
    "Bestsellers",
    "Price: Low to High",
    "Price: High to Low",
  ];

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
        ? [...PRODUCTS]
        : PRODUCTS.filter((p) => p.category === activeCategory);

    switch (sortOption) {
      case "Newest":
        filtered.sort(
          (a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0) || a.id - b.id
        );
        break;
      case "Bestsellers":
        filtered.sort(
          (a, b) =>
            (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) || a.id - b.id
        );
        break;
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [activeCategory, sortOption]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    if (category !== "Custom Prints") {
      setActiveCategory(category);
    } else {
      // In a real app, this would navigate to the custom print page
      alert("Navigating to Create Your Own page!");
    }
  };

  return (
    <div className="pt-16">
      <header className="py-8 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Shop the Story You Wear.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Every print begins with an idea — yours.
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
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
                      className={`block w-full text-left px-4 py-2 text-sm ${
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Pagination would go here in a full build-out */}
        </div>
      </section>

      <section className="bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Want Something That’s You?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {` You're`} the artist. {`We're`} the canvas. Bring your vision to
            life on our premium, sustainable apparel.
          </p>
          <div className="mt-8">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Create Your Own Print
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JunhaeEditsPage;
