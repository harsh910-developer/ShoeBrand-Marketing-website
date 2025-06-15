
import { useParams } from "react-router-dom";
import products from "@/data/productData";

export function useProductData() {
  const { id } = useParams();
  // always default to first product if no match
  const currentProduct = products.find((p) => p.id === parseInt(id || "1"));
  return { currentProduct, products };
}
