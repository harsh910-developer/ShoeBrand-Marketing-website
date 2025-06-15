
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoeCustomizer from '@/components/customization/ShoeCustomizer';
import MobileAppPromo from '@/components/mobile/MobileAppPromo';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Customize = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Sport Sneakers",
    brand: "StepStyle Pro",
    basePrice: 129.99,
    description: "Create your perfect pair with our advanced customization system"
  };

  const handleAddToCart = (customization: any, price: number) => {
    addToCart({
      id: product.id,
      name: `Custom ${product.name}`,
      price: price,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      brand: product.brand,
      customization
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Product
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Customize Your Shoes</h1>
            <p className="text-gray-600 text-lg">
              Design the perfect pair that reflects your unique style
            </p>
          </div>
        </div>

        {/* Customizer */}
        <ShoeCustomizer
          productId={product.id}
          productName={product.name}
          basePrice={product.basePrice}
          onAddToCart={handleAddToCart}
        />

        {/* Mobile App Promotion */}
        <div className="mt-16">
          <MobileAppPromo />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Customize;
