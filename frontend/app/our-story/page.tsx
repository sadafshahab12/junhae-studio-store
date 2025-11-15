import Image from "next/image";
import React from "react";
import HeartIcon from "../icons/HeartIcon";
import LeafIcon from "../icons/LeafIcon";
import SparklesIcon from "../icons/SparklesIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";


const OurStoryPage: React.FC = () => {
  const philosophyItems = [
    {
      Icon: HeartIcon,
      title: "For the Individual",
      description:
        "We celebrate your unique story with pieces that are as original as you are.",
    },
    {
      Icon: LeafIcon,
      title: "Conscious Creation",
      description:
        "Print-on-demand means we only create what you need, reducing waste and honoring our planet.",
    },
    {
      Icon: SparklesIcon,
      title: "Creative Freedom",
      description:
        "Our studio is a canvas for artists, dreamers, and you. Your vision is our inspiration.",
    },
  ];

  const processSteps = [
    {
      image: "https://picsum.photos/id/180/600/800",
      title: "1. The Idea",
      description:
        "Every print starts as a spark—a sketch, a feeling, a late-night thought.",
    },
    {
      image: "https://picsum.photos/id/24/600/800",
      title: "2. The Design",
      description:
        "Our artists translate emotion into visuals, crafting minimalist yet meaningful designs.",
    },
    {
      image: "https://picsum.photos/id/58/600/800",
      title: "3. The Print",
      description:
        "Using sustainable inks, your chosen design is brought to life on premium fabric.",
    },
    {
      image: "https://picsum.photos/id/122/600/800",
      title: "4. The Story",
      description:
        "Your piece is born—a wearable story, ready to become a part of yours.",
    },
  ];

  return (
    <div className="pt-40 bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-gray-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <Image
          src="https://picsum.photos/id/1015/1920/1080"
          alt="Misty, atmospheric landscape"
          className="absolute inset-0 w-full h-full object-cover"
          width={1000}
          height={1000}
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight  animate-fade-in-up">
            Our Story Begins With You.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto  animate-fade-in-up animation-delay-200">
            Junhae Studio was born from the belief that fashion should speak —
            not just look.
          </p>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                It started with a sketchbook and a belief.
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                It began as late-night ideas, quiet observations, and an
                obsession with self-expression. Junhae (준해) is a name that
                signifies clarity and understanding, reflecting our core
                mission: to create a space where your inner world can be worn on
                the outside.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Junhae Studio isn’t just a clothing brand — it’s a canvas. We
                combine Korean-inspired minimalism with a deep appreciation for
                the stories that make us who we are. Each piece is a
                conversation starter, a quiet statement, a piece of you.
              </p>
            </div>
            <div>
              <Image
                src="https://picsum.photos/id/367/800/1000"
                alt="Founder or a creative workspace"
                className="rounded-lg object-cover w-full h-full aspect-4/5 shadow-xl"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 md:py-32 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We Print Emotion.
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Every design carries a story — yours, ours, and everything in
            between. Our philosophy is simple and built on three core pillars.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {philosophyItems.map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-900 text-white">
                  <item.Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Prints */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
            Behind the Prints
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-center text-gray-600">
            From a fleeting thought to a finished piece, our process is
            intentional, creative, and centered around quality.
          </p>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.title} className="text-left">
                <div className="aspect-4/5 bg-gray-100 overflow-hidden rounded-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-base text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Wear Your Story?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find a piece that speaks to you, or create the one that only you can
            imagine.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Shop the Collection
              <ArrowRightIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              Create Your Own Print
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;
