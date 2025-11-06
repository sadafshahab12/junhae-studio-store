"use client"
import Image from "next/image";
import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative w-full aspect-4/5 bg-gray-100 overflow-hidden rounded-lg">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`View of ${productName}`}
          className="absolute inset-0 w-full h-full object-cover animate-fade-in-up"
          width={1000}
          height={1000}
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(image)}
            className={`aspect-square bg-gray-100 rounded-md overflow-hidden ring-2 ring-offset-2 transition-all ${
              activeImage === image ? "ring-gray-900" : "ring-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${idx + 1} of ${productName}`}
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
