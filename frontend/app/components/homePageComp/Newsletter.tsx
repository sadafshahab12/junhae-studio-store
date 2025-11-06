import Image from "next/image";
import React from "react";

const Newsletter = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-gray-900">
      <Image
        src="https://picsum.photos/id/119/1920/1080"
        alt="Soft texture background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        width={1000}
        height={1000}
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Join the Junhae Circle
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Be the first to access new streetwear drops, minimalist fashion edits,
          and sustainable T-shirt collections. Get behind-the-scenes looks,
          early access, and exclusive offers — straight from the Junhae Studio.
        </p>
        <form className="mt-8 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email-address"
              name="email"
              autoComplete="email"
              required
              className="flex-auto w-full px-4 py-3 bg-white/5 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
