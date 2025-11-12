"use client";
import React, { useRef, useState } from "react";
import { CustomizableProduct, Design, Patch } from "../data/types";
import Image from "next/image";

interface DesignCanvasProps {
  product: CustomizableProduct;
  color: { name: string; hex: string };
  activeSide: "front" | "back";
  frontDesign: Design | null;
  backDesign: Design | null;
  patches?: Patch[];
  onDesignChange: (newProps: Partial<Design>, side: "front" | "back") => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({
  product,
  color,
  activeSide,
  frontDesign,
  backDesign,
  patches = [],
  onDesignChange,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const designToShow = activeSide === "front" ? frontDesign : backDesign;

  // Select front/back mockup
  const getProductMockup = () => {
    if (!product.mockups) return "";
    const url =
      activeSide === "front" ? product.mockups.front : product.mockups.back;
    return url.replace("white", color.name.toLowerCase());
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!designToShow || !designRef.current) return;
    setIsDragging(true);
    const rect = designRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !designToShow || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const printable = product.printableArea;

    // Calculate relative position inside printable area
    const newX = e.clientX - canvasRect.left - dragStart.x;
    const newY = e.clientY - canvasRect.top - dragStart.y;

    const newXPercent =
      ((newX / canvasRect.width - printable.left / 100) * 100) /
      (printable.width / 100);
    const newYPercent =
      ((newY / canvasRect.height - printable.top / 100) * 100) /
      (printable.height / 100);

    onDesignChange(
      {
        position: {
          x: Math.max(0, Math.min(100, newXPercent)),
          y: Math.max(0, Math.min(100, newYPercent)),
        },
      },
      activeSide
    );
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-full max-w-lg aspect-4/5" ref={canvasRef}>
        {/* Shirt Mockup */}
        <Image
          key={getProductMockup()}
          src={getProductMockup()}
          alt={`${product.name} in ${color.name}`}
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.2))",
          }}
        />

        {/* Printable Area */}
        <div
          className="absolute border-2 border-dashed border-blue-400 pointer-events-none"
          style={{
            width: `${product.printableArea.width}%`,
            height: `${product.printableArea.height}%`,
            top: `${product.printableArea.top}%`,
            left: `${product.printableArea.left}%`,
          }}
        />

        {/* Design Image */}
        {designToShow?.imageUrl && (
          <Image
            ref={designRef}
            src={designToShow.imageUrl}
            alt={`${activeSide} design`}
            width={1000}
            height={1000}
            className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              left: `calc(${product.printableArea.left}% + ${
                designToShow.position.x
              }% * ${product.printableArea.width / 100})`,
              top: `calc(${product.printableArea.top}% + ${
                designToShow.position.y
              }% * ${product.printableArea.height / 100})`,
              transform: `scale(${designToShow.scale}) rotate(${designToShow.rotation}deg)`,
              width: `${product.printableArea.width}%`,
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
          />
        )}

        {/* Patches / Decals */}
        {patches.map((p) => (
          <Image
            key={p.id}
            src={p.imageUrl}
            alt="Patch"
            width={1000}
            height={1000}
            className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              left: `${p.position.x}%`,
              top: `${p.position.y}%`,
              transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
              width: "10%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignCanvas;
