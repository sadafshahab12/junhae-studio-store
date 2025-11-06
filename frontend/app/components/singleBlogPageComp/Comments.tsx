import React from "react";

import Image from "next/image";
import { Comment } from "@/app/data/types";

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Join the Conversation ({comments.length})
          </h2>

          <form className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-4 py-3 bg-stone-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-3 bg-stone-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                name="comment"
                id="comment"
                rows={4}
                className="w-full px-4 py-3 bg-stone-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Write your comment..."
                required
              ></textarea>
            </div>
            <div className="mt-4 text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div className="space-y-8">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-4">
                <Image
                  src={comment.avatarUrl}
                  alt={comment.author}
                  className="w-12 h-12 rounded-full object-cover shrink-0 mt-1"
                  width={3000}
                  height={3000}
                />
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900">
                      {comment.author}
                    </p>
                    <span className="text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
