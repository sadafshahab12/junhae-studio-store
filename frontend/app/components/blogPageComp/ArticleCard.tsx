import React from "react";

import Image from "next/image";
import { Article } from "@/app/data/types";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="group flex flex-col">
      <div className="relative w-full aspect-4/3 bg-gray-200 overflow-hidden rounded-lg">
        <Image
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          width={1000}
          height={1000}
        />
      </div>
      <div className="mt-4 flex-1 flex flex-col">
        <p className="text-sm font-medium text-green-800">{article.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-gray-900">
          <a href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {article.title}
          </a>
        </h3>
        <p className="mt-3 text-base text-gray-600 flex-1">{article.excerpt}</p>
        <div className="mt-4">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:text-green-800 transition-colors"
          >
            Read More
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
