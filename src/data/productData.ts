
const products = [
  {
    id: 1,
    name: "Premium Sport Sneakers",
    price: 129.99,
    originalPrice: 159.99,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 234,
    category: "sneakers",
    brand: "StepStyle Pro",
    sizes: [8, 9, 10, 11, 12],
    colors: ["Black", "White", "Red"],
    isNew: true,
    isSale: true,
    description: "Experience ultimate comfort and style with our Premium Sport Sneakers. Featuring advanced cushioning technology and breathable materials, these sneakers are perfect for both athletic activities and casual wear.",
    features: [
      "Advanced cushioning technology",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Lightweight design",
      "Moisture-wicking lining"
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Classic Leather Dress Shoes",
    price: 199.99,
    originalPrice: 239.99,
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop"
    ],
    rating: 4.9,
    reviews: 156,
    category: "formal",
    brand: "StepStyle Elite",
    sizes: [8, 9, 10, 11],
    colors: ["Black", "Brown"],
    isNew: false,
    isSale: false,
    description: "Elevate your formal attire with these Classic Leather Dress Shoes. Crafted from premium leather with meticulous attention to detail, perfect for business meetings and special occasions.",
    features: [
      "Premium genuine leather",
      "Cushioned insole",
      "Non-slip sole",
      "Classic design",
      "Handcrafted quality"
    ],
    inStock: true
  }
];

export default products;
