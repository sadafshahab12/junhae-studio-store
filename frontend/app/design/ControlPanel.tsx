"use client";
import React, { useRef } from "react";
import { CustomizableProduct, Design, Patch } from "../data/types";
import { CUSTOMIZABLE_PRODUCTS } from "../data/constants";
import UploadCloudIcon from "../icons/UploadCloudIcon";
import Trash2Icon from "../icons/Trash2Icon";
import Slider from "../components/ui/Slider";


interface ControlPanelProps {
  product: CustomizableProduct;
  setProduct: (product: CustomizableProduct) => void;
  color: { name: string; hex: string };
  setColor: (color: { name: string; hex: string }) => void;
  activeSide: "front" | "back";
  setActiveSide: (side: "front" | "back") => void;
  frontDesign: Design | null;
  backDesign: Design | null;
  onDesignChange: (newProps: Partial<Design>, side: "front" | "back") => void;
  onImageUpload: (file: File, side: "front" | "back") => void;
  patches: Patch[];
  onPatchUpload: (file: File) => void;
  onAddToCart: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  product,
  setProduct,
  color,
  setColor,
  activeSide,
  setActiveSide,
  frontDesign,
  backDesign,
  onDesignChange,
  onImageUpload,
  onAddToCart,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file, activeSide);
  };

  return (
    <div className="w-full lg:w-1/2 p-4 lg:p-8 bg-gray-50 border-l border-gray-200">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>

        {/* Product Select */}
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

        {/* Side Toggle */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveSide("front")}
            className={`px-3 py-1 rounded ${
              activeSide === "front" ? "bg-gray-900 text-white" : "bg-gray-200"
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setActiveSide("back")}
            className={`px-3 py-1 rounded ${
              activeSide === "back" ? "bg-gray-900 text-white" : "bg-gray-200"
            }`}
          >
            Back
          </button>
        </div>

        {/* Color Picker */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Pick Shirt Color
          </label>
          <input
            type="color"
            value={color.hex}
            onChange={(e) => setColor({ name: "Custom", hex: e.target.value })}
            className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        {/* Upload Design */}
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

        {/* Customize Design */}
        {(activeSide === "front" ? frontDesign : backDesign) && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">
                Customize Your Design
              </h3>
              <button
                onClick={() => onDesignChange({}, activeSide)}
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
              value={
                activeSide === "front"
                  ? frontDesign?.scale || 1
                  : backDesign?.scale || 1
              }
              onChange={(e) =>
                onDesignChange(
                  { scale: parseFloat(e.target.value) },
                  activeSide
                )
              }
            />
            <Slider
              label="Rotation"
              min="-180"
              max="180"
              step="1"
              value={
                activeSide === "front"
                  ? frontDesign?.rotation || 0
                  : backDesign?.rotation || 0
              }
              onChange={(e) =>
                onDesignChange(
                  { rotation: parseInt(e.target.value) },
                  activeSide
                )
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

        {/* Price & Add to Cart */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
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
  );
};

export default ControlPanel;
