"use client"
import React, { useRef } from "react";
import { CUSTOMIZABLE_PRODUCTS } from "../data/constants";
import CheckIcon from "../icons/CheckIcon";
import UploadCloudIcon from "../icons/UploadCloudIcon";
import Trash2Icon from "../icons/Trash2Icon";
import Slider from "../components/ui/Slider";
import { CustomizableProduct, Design } from "../data/types";

interface ControlPanelProps {
  product: CustomizableProduct;
  setProduct: (product: CustomizableProduct) => void;
  color: { name: string; hex: string };
  setColor: (color: { name: string; hex: string }) => void;
  design: Design | null;
  onDesignChange: (design: Partial<Design>) => void;
  onImageUpload: (file: File) => void;
  onDesignRemove: () => void;
  onAddToCart: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  product,
  setProduct,
  color,
  setColor,
  design,
  onDesignChange,
  onImageUpload,
  onDesignRemove,
  onAddToCart,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const currentProduct = CUSTOMIZABLE_PRODUCTS.find((p) => p.id === product.id);

  return (
    <div className="w-full lg:w-1/2 p-4 lg:p-8 bg-gray-50 border-l border-gray-200">
      <div className="max-w-md mx-auto">
        {/* Product Selection */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <select
            value={product.id}
            onChange={(e) => {
              const newProduct = CUSTOMIZABLE_PRODUCTS.find(
                (p) => p.id === e.target.value
              );
              if (newProduct) setProduct(newProduct);
            }}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md bg-white"
          >
            {CUSTOMIZABLE_PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Color Picker */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Color: {color.name}
          </label>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {currentProduct?.colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c)}
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: c.hex,
                  borderColor: color.hex === c.hex ? "#111827" : "transparent",
                }}
              >
                {color.hex === c.hex && (
                  <CheckIcon
                    className="w-4 h-4 mx-auto"
                    style={{ stroke: c.name === "Black" ? "white" : "black" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Design Upload */}
        <div className="mt-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            hidden
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <UploadCloudIcon className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm font-semibold text-gray-700">
              Upload Design
            </span>
            <span className="text-xs text-gray-500">PNG or JPG</span>
          </button>
        </div>

        {design && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">
                Customize Your Design
              </h3>
              <button
                onClick={onDesignRemove}
                className="text-gray-400 hover:text-red-600"
              >
                <Trash2Icon className="w-5 h-5" />
              </button>
            </div>
            <Slider
              label="Size"
              min="0.5"
              max="1.5"
              step="0.01"
              value={design.scale}
              onChange={(e) =>
                onDesignChange({ scale: parseFloat(e.target.value) })
              }
            />
            <Slider
              label="Rotation"
              min="-180"
              max="180"
              step="1"
              value={design.rotation}
              onChange={(e) =>
                onDesignChange({ rotation: parseInt(e.target.value) })
              }
            />
          </div>
        )}

        {/* Size & Quantity */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Size</label>
            <select className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              defaultValue="1"
              min="1"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
        </div>

        {/* Add to Cart */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">
              ${product.basePrice.toFixed(2)}
            </span>
            <button
              onClick={onAddToCart}
              className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
