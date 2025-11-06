import { RelatedPost } from "@/app/data/types";
import Image from "next/image";
import React from "react";

interface RelatedPostsProps {
  posts: RelatedPost[];
}

const PostCard: React.FC<{ post: RelatedPost }> = ({ post }) => (
  <a href="#" className="group block">
    <div className="overflow-hidden rounded-lg">
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={1000}
        height={3000}
        loading="lazy"
        className="w-full h-full object-cover aspect-video transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
    </div>
    <div className="mt-4">
      <p className="text-sm font-semibold text-green-900">{post.category}</p>
      <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-gray-500">{post.readTime} min read</p>
    </div>
  </a>
);

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <section className="bg-stone-100 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
          You Might Also Like
        </h2>
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
