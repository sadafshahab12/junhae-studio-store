"use client"
import Image from "next/image";
import React, { useState, useMemo } from "react";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import SearchIcon from "../icons/SearchIcon";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../data/constants";
import ArticleCard from "../components/blogPageComp/ArticleCard";
import Newsletter from "../components/homePageComp/Newsletter";
import Link from "next/link";

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const featuredPost = useMemo(() => BLOG_POSTS.find((p) => p.featured), []);
  const otherPosts = useMemo(
    () => BLOG_POSTS.filter((p) => p.id !== featuredPost?.id),
    [featuredPost]
  );

  const filteredPosts = useMemo(() => {
    let posts = otherPosts;

    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }

    if (searchTerm) {
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }, [otherPosts, activeCategory, searchTerm]);

  return (
    <div className="pt-38 bg-white">
      {/* Hero Section */}
      {featuredPost && (
        <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-start text-white bg-gray-900">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src={featuredPost.imageUrl}
            alt={featuredPost.title}
            className="absolute inset-0 w-full h-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="relative z-10 p-8 md:p-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest  animate-fade-in-up">
              {featuredPost.category}
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight  animate-fade-in-up animation-delay-200">
              {featuredPost.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl  animate-fade-in-up animation-delay-400">
              {featuredPost.excerpt}
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300  animate-fade-in-up animation-delay-600"
            >
              Read the Story
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 self-start mb-12 lg:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900">Categories</h3>
              <div className="mt-4 flex flex-col items-start space-y-2">
                {BLOG_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      activeCategory === category
                        ? "font-semibold text-green-900 bg-green-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Blog Grid */}
          <main className="lg:col-span-9">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredPosts.map((post) => (
                  <ArticleCard key={post.id} article={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900">
                  No Stories Found
                </h3>
                <p className="mt-2 text-gray-600">
                  Try adjusting your search or category filters.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default BlogPage;
