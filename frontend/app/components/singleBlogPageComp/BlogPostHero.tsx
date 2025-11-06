import Image from "next/image";
import React from "react";

interface BlogPostHeroProps {
  category: string;
  title: string;
  author: string;
  publishDate: string;
  heroImageUrl: string;
}

const BlogPostHero: React.FC<BlogPostHeroProps> = ({
  category,
  title,
  author,
  publishDate,
  heroImageUrl,
}) => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <Image
        src={heroImageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        width={3000}
        height={3000}
      />
      <div className="relative z-20 p-4 container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest uppercase text-gray-200  animate-fade-in-up">
          {category}
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight  animate-fade-in-up animation-delay-200">
          {title}
        </h1>
        <p className="mt-6 text-sm md:text-base text-gray-200  animate-fade-in-up animation-delay-400">
          By {author} &middot; {publishDate}
        </p>
      </div>
    </section>
  );
};

export default BlogPostHero;
