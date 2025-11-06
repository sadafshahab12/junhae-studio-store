import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Image
        src="https://picsum.photos/id/1060/1920/1080"
        alt="Models wearing Junhae Studio apparel"
        className="absolute inset-0 w-full h-full object-cover"
        width={1000}
        height={1000}
      />
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight  animate-fade-in-up">
          Design What You Feel
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto  animate-fade-in-up animation-delay-200">
          Don’t chase trends — create them. Personalized, premium cotton
          T-shirts built for everyday expression.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/junhae-edits"
            className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300  animate-fade-in-up animation-delay-400"
          >
            Shop the Edits
          </Link>
          <Link
            href="/create"
            className="w-full sm:w-auto px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300  animate-fade-in-up animation-delay-600"
          >
            Create Your Own
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
