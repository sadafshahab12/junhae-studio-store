"use client"
import React, { useState } from "react";

const AccordionIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="relative w-5 h-5 shrink-0 ml-4">
    <span
      className={`absolute h-0.5 w-full bg-gray-500 top-1/2 -translate-y-1/2 transition-transform duration-300 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    ></span>
    <span
      className={`absolute h-full w-0.5 bg-gray-500 left-1/2 -translate-x-1/2 transition-transform duration-300 ${
        isOpen ? "scale-y-0" : "scale-y-100"
      }`}
    ></span>
  </div>
);

const FaqAccordion: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-6"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <AccordionIcon isOpen={isOpen} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-base text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
