"use client";

import React, { useState } from "react";
import { CustomizableProduct, Design, Patch } from "../data/types";
import { CUSTOMIZABLE_PRODUCTS } from "../data/constants";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DesignCanvas from "../design/DesignCanvas";
import ControlPanel from "../design/ControlPanel";
import HowItWorks from "../design/HowItWorks";
import Toast from "../components/ui/Toast";
import Link from "next/link";

const CreatePage: React.FC = () => {
  const [product, setProduct] = useState<CustomizableProduct>(
    CUSTOMIZABLE_PRODUCTS[0]
  );
  const [color, setColor] = useState(product.colors[0]);
  const [frontDesign, setFrontDesign] = useState<Design | null>(null);
  const [backDesign, setBackDesign] = useState<Design | null>(null);
  const [patches, setPatches] = useState<Patch[]>([]);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");
  const [showToast, setShowToast] = useState(false);

  const handleDesignChange = (
    newProps: Partial<Design>,
    side: "front" | "back"
  ) => {
    if (side === "front")
      setFrontDesign((prev) => (prev ? { ...prev, ...newProps } : null));
    else setBackDesign((prev) => (prev ? { ...prev, ...newProps } : null));
  };

  const handleImageUpload = (file: File, side: "front" | "back") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newDesign: Design = {
        imageUrl: e.target?.result as string,
        position: {
          x: product.printableArea.left,
          y: product.printableArea.top,
        },
        scale: 1,
        rotation: 0,
        side,
      };
      if (side === "front") setFrontDesign(newDesign);
      else setBackDesign(newDesign);
    };
    reader.readAsDataURL(file);
  };

  const handlePatchUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPatches((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          imageUrl: e.target?.result as string,
          position: { x: 50, y: 50 },
          scale: 0.5,
          rotation: 0,
        },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    setShowToast(true);
    console.log("Added to cart:", {
      product,
      color,
      frontDesign,
      backDesign,
      patches,
    });
  };

  return (
    <div className="pt-40">
      {/* Hero */}
      <section className="py-20 sm:py-24 text-center bg-stone-100 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
            Create What You Wear.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 animate-fade-in-up animation-delay-200">
            Upload your design, place it, and make it uniquely yours.
          </p>
          <div className="mt-8 animate-fade-in-up animation-delay-400">
            <Link
              href="#designer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Start Designing
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Designer */}
      <section id="designer" className="bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <DesignCanvas
            product={product}
            color={color}
            activeSide={activeSide}
            frontDesign={frontDesign}
            backDesign={backDesign}
            patches={patches}
            onDesignChange={handleDesignChange}
          />
          <ControlPanel
            product={product}
            setProduct={setProduct}
            color={color}
            setColor={setColor}
            activeSide={activeSide}
            setActiveSide={setActiveSide}
            frontDesign={frontDesign}
            backDesign={backDesign}
            onDesignChange={handleDesignChange}
            onImageUpload={handleImageUpload}
            patches={patches}
            onPatchUpload={handlePatchUpload}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      <HowItWorks />

      <Toast
        message="Your design was added to the cart!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default CreatePage;
