
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductImageGallery = ({
  images,
  productName,
  selectedImage,
  onImageSelect,
  isNew,
  isSale
}: ProductImageGalleryProps) => {
  // Add zoom state for tap-to-zoom on mobile
  const [zoomed, setZoomed] = useState(false);

  // Reset zoom when image changes
  useEffect(() => { setZoomed(false); }, [selectedImage]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div
          className={`overflow-hidden rounded-lg w-full h-96 lg:h-[500px]`}
          style={{ position: "relative" }}
        >
          <img
            src={images[selectedImage]}
            alt={productName}
            className={`
              w-full h-96 lg:h-[500px] object-cover rounded-lg
              transition-transform duration-300
              ${zoomed ? "scale-150 cursor-zoom-out" : "hover:scale-125 cursor-zoom-in"}
            `}
            onClick={() => setZoomed((z) => !z)}
            onMouseLeave={() => setZoomed(false)}
            draggable={false}
            style={{
              objectPosition: zoomed ? "center 40%" : undefined
            }}
          />
          {isNew && (
            <Badge className="absolute top-4 left-4 bg-green-500">NEW</Badge>
          )}
          {isSale && (
            <Badge className="absolute top-4 right-4 bg-red-500">SALE</Badge>
          )}
        </div>
      </div>
      {/* Thumbnail Images */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
              selectedImage === index ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <img src={image} alt={`${productName} ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
export default ProductImageGallery;
