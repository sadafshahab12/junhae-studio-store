import React from "react";

import Link from "next/link";
import { FAQ_TOPICS } from "../data/constants";
import QuestionMarkCircleIcon from "../icons/QuestionMarkCircleIcon";
import FaqAccordion from "../components/faqPageComp/FaqAccordion";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import TruckIcon from "../icons/TruckIcon";
import ShirtIcon from "../icons/ShirtIcon";
import RefreshIcon from "../icons/RefreshIcon";
import SparklesIcon from "../icons/SparklesIcon";

const categoryIcons: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  "Orders & Shipping": TruckIcon,
  "Print & Product Info": ShirtIcon,
  "Returns & Exchanges": RefreshIcon,
  "Customization & Design": SparklesIcon,
  General: QuestionMarkCircleIcon,
};

const FaqPage: React.FC = () => {
  return (
    <div className="pt-40 bg-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-24 text-center bg-stone-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Got Questions?
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            From prints to shipping — everything you need to know about Junhae
            Studio is right here.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {FAQ_TOPICS.map((topic) => {
            const Icon =
              categoryIcons[topic.category] || QuestionMarkCircleIcon;
            return (
              <div key={topic.category} className="mb-12 last:mb-0">
                <div className="flex items-center gap-4 border-b border-gray-900 pb-4 mb-4">
                  <Icon className="w-6 h-6 text-gray-800" />
                  <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                    {topic.category}
                  </h2>
                </div>
                <div>
                  {topic.questions.map((faq, index) => (
                    <FaqAccordion
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Still need help?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out to our team — we’re real people, and we’re happy to help.
          </p>
          <div className="mt-8">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Contact Us
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
