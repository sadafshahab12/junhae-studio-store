"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CompassIcon from "./icons/CompassIcon";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-24 sm:pb-24 lg:px-8">
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <div className=" animate-fade-in-up">
            <CompassIcon className="mx-auto h-20 w-20" />
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-fade-in-up animation-delay-200">
            This page doesn’t exist…
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600  animate-fade-in-up animation-delay-400">
            But your style does. Looks like you took a wrong turn. Let’s get you
            back to where the magic happens.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6  animate-fade-in-up animation-delay-600">
            <button
              onClick={() => router.push("/")}
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
            >
              Go back home
            </button>
            <button
              onClick={() => router.push("/junhae-edits")}
              className="text-sm font-semibold leading-6 text-gray-900 group"
            >
              Go to Shop{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              >
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Junhae Studio. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
