import { COLLECTIONS } from "@/app/data/constants";
import { Collection } from "@/app/data/types";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CollectionProps {
  collection: Collection;
}
const CollectionCard: React.FC<CollectionProps> = ({ collection }) => {
  return (
    <div className="group relative overflow-hidden">
      <Image
        src={collection.imageUrl}
        alt={collection.title}
        className="w-full h-full object-cover aspect-4/5 transition-transform duration-500 ease-in-out group-hover:scale-105"
        width={1000}
        height={1000}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
        <h3 className="text-2xl font-semibold">{collection.title}</h3>
        <p className="mt-1 text-sm text-gray-200">{collection.description}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-4 font-semibold text-sm group/link"
        >
          Shop Now
          <ArrowRightIcon className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
          Wearable Art Edits
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((collection, index) => (
            <CollectionCard key={index} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
