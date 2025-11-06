import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section className="py-16 sm:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://picsum.photos/id/23/500/600"
              alt="Behind the scenes studio shot"
              className="rounded-lg shadow-lg object-cover w-full h-full aspect-4/5"
              width={1000}
              height={1000}
            />
            <div className="grid grid-rows-2 gap-4">
              <Image
                src="https://picsum.photos/id/42/500/300"
                alt="Print design detail"
                className="rounded-lg shadow-lg object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              <Image
                src="https://picsum.photos/id/48/500/300"
                alt="Artistic design inspiration"
                className="rounded-lg shadow-lg object-cover w-full h-full"
                width={1000}
                height={1000}
              />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Wear Your Story
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Junhae Studio was born from a passion for art, individuality, and
              conscious fashion. We believe streetwear, minimal fashion,
              sustainable clothing, Korean fashion, and urban style are more
              than {`trends—they’re`} a canvas for self-expression. Each piece
              is crafted on-demand, eco-friendly, and ethically made, ensuring
              your style is unique, modern, and sustainable.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our designs blend Korean minimalist aesthetics with urban
              streetwear vibes, creating a look {`that’s`} timeless, versatile,
              and fashion-forward. From oversized tees and neutral basics to
              statement streetwear pieces, Junhae Studio lets you express
              yourself authentically while supporting mindful fashion.
            </p>
            <div className="mt-8">
              <Link
                href="/our-story"
                className="text-base font-semibold text-green-900 hover:text-green-700 transition-colors"
              >
                Discover Our Mission &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
