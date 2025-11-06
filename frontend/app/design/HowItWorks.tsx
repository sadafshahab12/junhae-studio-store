import React from "react";

import SettingsIcon from "../icons/SettingsIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import UploadCloudIcon from "../icons/UploadCloudIcon";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UploadCloudIcon,
      title: "1. Upload Your Design",
      description:
        "Choose a high-quality PNG, JPG, or SVG file. Transparent backgrounds work best!",
    },
    {
      icon: SettingsIcon,
      title: "2. Customize Your Product",
      description:
        "Select your garment, color, and size. Position and scale your design to perfection.",
    },
    {
      icon: ShoppingCartIcon,
      title: "3. Place Your Order",
      description:
        "Add to cart and check out. We’ll print and ship your unique creation right to you.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Bringing your vision to life is as simple as one, two, three.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                <step.icon className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-base text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
