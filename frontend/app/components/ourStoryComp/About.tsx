import Image from "next/image";
import React from "react";

const About: React.FC = () => {
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
              conscious creation. We believe fashion is a canvas for
              self-expression. Each piece is crafted on-demand with sustainable
              materials, ensuring your style is not only unique but also kind to
              the planet.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our designs blend Korean-inspired minimalism with an urban edge,
              creating a vibe {`that's`} both timeless and distinctly modern.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="text-base font-semibold text-green-900 hover:text-green-700 transition-colors"
              >
                Discover Our Mission &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
