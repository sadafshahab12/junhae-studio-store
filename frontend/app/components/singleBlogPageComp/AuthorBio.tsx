import { Author } from "@/app/data/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AuthorBioProps {
  author: Author;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-stone-100 rounded-lg p-8 flex flex-col sm:flex-row items-center gap-8">
            <Image
              src={author.avatarUrl}
              alt={author.name}
              className="w-24 h-24 rounded-full object-cover shrink-0"
              width={3000}
              height={3000}
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900">
                About {author.name}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{author.bio}</p>
              <Link
                href="#"
                className="mt-4 inline-block text-sm font-semibold text-green-900 hover:text-green-700 transition-colors"
              >
                More articles by {author.name} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBio;
