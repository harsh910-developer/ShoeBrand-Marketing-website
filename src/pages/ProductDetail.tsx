
import { useProductData } from "@/hooks/useProductData";
import ProductDetailLayout from "./ProductDetailLayout";

// Main route component
const ProductDetail = () => {
  const { currentProduct, products } = useProductData();
  return <ProductDetailLayout currentProduct={currentProduct} products={products} />;
};

export default ProductDetail;
