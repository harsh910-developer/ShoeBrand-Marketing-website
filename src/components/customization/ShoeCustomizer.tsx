
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Type, Sparkles, Save, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CustomizationOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  material: string;
  personalization: string;
  laceColor: string;
  soleColor: string;
}

interface ShoeCustomizerProps {
  productId: number;
  productName: string;
  basePrice: number;
  onAddToCart: (customization: CustomizationOptions, price: number) => void;
}

const ShoeCustomizer: React.FC<ShoeCustomizerProps> = ({
  productId,
  productName,
  basePrice,
  onAddToCart
}) => {
  const [customization, setCustomization] = useState<CustomizationOptions>({
    primaryColor: '#1F2937',
    secondaryColor: '#FFFFFF',
    accentColor: '#DC2626',
    material: 'leather',
    personalization: '',
    laceColor: '#000000',
    soleColor: '#FFFFFF'
  });

  const [previewMode, setPreviewMode] = useState<'3d' | 'flat'>('3d');

  const colorOptions = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Blue', value: '#2563EB' },
    { name: 'Green', value: '#059669' },
    { name: 'Brown', value: '#92400E' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Navy', value: '#1E3A8A' },
    { name: 'Burgundy', value: '#7C2D12' },
    { name: 'Gold', value: '#D97706' }
  ];

  const materialOptions = [
    { name: 'Premium Leather', value: 'leather', price: 0 },
    { name: 'Suede', value: 'suede', price: 25 },
    { name: 'Canvas', value: 'canvas', price: -15 },
    { name: 'Synthetic', value: 'synthetic', price: -10 },
    { name: 'Patent Leather', value: 'patent', price: 35 }
  ];

  const calculateCustomizationPrice = () => {
    const materialUpcharge = materialOptions.find(m => m.value === customization.material)?.price || 0;
    const personalizationCharge = customization.personalization ? 15 : 0;
    return basePrice + materialUpcharge + personalizationCharge;
  };

  const handleColorChange = (colorType: keyof CustomizationOptions, color: string) => {
    setCustomization(prev => ({
      ...prev,
      [colorType]: color
    }));
  };

  const handleMaterialChange = (material: string) => {
    setCustomization(prev => ({
      ...prev,
      material
    }));
  };

  const handlePersonalizationChange = (text: string) => {
    if (text.length <= 8) {
      setCustomization(prev => ({
        ...prev,
        personalization: text.toUpperCase()
      }));
    }
  };

  const handleSaveCustomization = () => {
    const customizationData = {
      productId,
      customization,
      price: calculateCustomizationPrice(),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`customization_${productId}`, JSON.stringify(customizationData));
    toast({
      title: "Customization Saved!",
      description: "Your design has been saved for later."
    });
  };

  const handleAddToCart = () => {
    onAddToCart(customization, calculateCustomizationPrice());
    toast({
      title: "Added to Cart!",
      description: `Custom ${productName} added to your cart.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Make it Yours: Customize Your Style!
          </CardTitle>
          <p className="text-sm text-gray-600">
            Design your perfect pair with our advanced customization tools
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={previewMode === '3d' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('3d')}
                  >
                    3D View
                  </Button>
                  <Button
                    size="sm"
                    variant={previewMode === 'flat' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('flat')}
                  >
                    Flat View
                  </Button>
                </div>
              </div>
              
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                {/* Shoe Preview (simplified representation) */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div 
                    className="relative w-64 h-32 rounded-3xl shadow-2xl transform rotate-12"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    {/* Shoe body */}
                    <div 
                      className="absolute inset-2 rounded-2xl"
                      style={{ backgroundColor: customization.secondaryColor }}
                    />
                    
                    {/* Accent stripe */}
                    <div 
                      className="absolute top-6 left-4 right-8 h-3 rounded-full"
                      style={{ backgroundColor: customization.accentColor }}
                    />
                    
                    {/* Sole */}
                    <div 
                      className="absolute -bottom-2 left-0 right-0 h-4 rounded-full"
                      style={{ backgroundColor: customization.soleColor }}
                    />
                    
                    {/* Laces */}
                    <div className="absolute top-2 left-6 right-6 space-y-1">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i}
                          className="h-0.5 rounded-full"
                          style={{ backgroundColor: customization.laceColor }}
                        />
                      ))}
                    </div>
                    
                    {/* Personalization text */}
                    {customization.personalization && (
                      <div className="absolute bottom-4 right-4 text-xs font-bold text-white">
                        {customization.personalization}
                      </div>
                    )}
                  </div>
                </div>
                
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Live Preview
                </Badge>
              </div>
              
              {/* Price Display */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Custom Price</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${calculateCustomizationPrice().toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>Base: ${basePrice}</p>
                      {customization.personalization && <p>Personalization: +$15</p>}
                      {materialOptions.find(m => m.value === customization.material)?.price !== 0 && (
                        <p>Material: {materialOptions.find(m => m.value === customization.material)?.price! > 0 ? '+' : ''}${materialOptions.find(m => m.value === customization.material)?.price}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customization Controls */}
            <div className="space-y-6">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="colors" className="flex items-center gap-1">
                    <Palette className="h-4 w-4" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="personalize" className="flex items-center gap-1">
                    <Type className="h-4 w-4" />
                    Text
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-4">
                  {/* Primary Color */}
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={`primary-${color.value}`}
                          className={`w-12 h-12 rounded-full border-4 transition-all ${
                            customization.primaryColor === color.value
                              ? 'border-blue-500 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleColorChange('primaryColor', color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Secondary Color */}
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={`secondary-${color.value}`}
                          className={`w-12 h-12 rounded-full border-4 transition-all ${
                            customization.secondaryColor === color.value
                              ? 'border-blue-500 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleColorChange('secondaryColor', color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Accent Color */}
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={`accent-${color.value}`}
                          className={`w-12 h-12 rounded-full border-4 transition-all ${
                            customization.accentColor === color.value
                              ? 'border-blue-500 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => handleColorChange('accentColor', color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-4">
                  <div className="space-y-3">
                    <Label>Material Selection</Label>
                    {materialOptions.map((material) => (
                      <div
                        key={material.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          customization.material === material.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMaterialChange(material.value)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{material.name}</span>
                          <div className="flex items-center gap-2">
                            {material.price !== 0 && (
                              <Badge variant={material.price > 0 ? 'default' : 'secondary'}>
                                {material.price > 0 ? '+' : ''}${material.price}
                              </Badge>
                            )}
                            {customization.material === material.value && (
                              <Badge variant="default">Selected</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="personalize" className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="personalization">Personalization Text</Label>
                    <Input
                      id="personalization"
                      value={customization.personalization}
                      onChange={(e) => handlePersonalizationChange(e.target.value)}
                      placeholder="Enter up to 8 characters"
                      maxLength={8}
                    />
                    <p className="text-sm text-gray-500">
                      Add your initials, name, or special text (+$15)
                    </p>
                    <p className="text-xs text-gray-400">
                      {customization.personalization.length}/8 characters
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveCustomization}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Design
                </Button>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoeCustomizer;
