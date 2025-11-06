import React, { useState, useRef } from "react";
import { CustomizableProduct, Design } from "../data/types";
import Image from "next/image";

interface DesignCanvasProps {
  product: CustomizableProduct;
  color: { name: string; hex: string };
  design: Design | null;
  onDesignChange: (design: Partial<Design>) => void;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({
  product,
  color,
  design,
  onDesignChange,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getProductMockup = () => {
    // This is a simplified lookup. A real app might have more complex logic.
    return product.mockups.imageUrl.replace("white", color.name.toLowerCase());
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!design || !designRef.current) return;
    setIsDragging(true);

    const designRect = designRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - designRect.left,
      y: e.clientY - designRect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !design || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();

    const newX = e.clientX - canvasRect.left - dragStart.x;
    const newY = e.clientY - canvasRect.top - dragStart.y;

    // Convert pixel values to percentages
    const newXPercent = (newX / canvasRect.width) * 100;
    const newYPercent = (newY / canvasRect.height) * 100;

    onDesignChange({ position: { x: newXPercent, y: newYPercent } });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-full max-w-lg aspect-4/5" ref={canvasRef}>
        <Image
          key={getProductMockup()} // Key helps React re-render the image on change
          src={getProductMockup()}
          alt={`${product.name} in ${color.name}`}
          className="w-full h-full object-contain animate-pulse-once"
          width={1000}
          height={1000}
        />
        {/* Printable Area Visualization (optional, for debugging)  */}
        <div
          className="absolute border-2 border-dashed border-blue-400 pointer-events-none"
          style={{
            width: `${product.printableArea.width}%`,
            height: `${product.printableArea.height}%`,
            top: `${product.printableArea.top}%`,
            left: `${product.printableArea.left}%`,
          }}
        />

        {design?.imageUrl && (
          <Image
            ref={designRef}
            src={design.imageUrl}
            alt="User design"
            width={1000}
            height={1000}
            className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              left: `${design.position.x}%`,
              top: `${design.position.y}%`,
              transform: `scale(${design.scale}) rotate(${design.rotation}deg)`,
              width: `${product.printableArea.width}%`, // Base width on printable area
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
          />
        )}
      </div>
    </div>
  );
};

export default DesignCanvas;
