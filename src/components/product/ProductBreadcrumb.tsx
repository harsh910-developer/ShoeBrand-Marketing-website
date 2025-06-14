
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ProductBreadcrumbProps {
  productName: string;
}

const ProductBreadcrumb = ({ productName }: ProductBreadcrumbProps) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-red-500">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{productName}</span>
      </div>

      {/* Back Button */}
      <Link to="/products" className="inline-flex items-center gap-2 mb-6 text-red-500 hover:text-red-600">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
    </>
  );
};

export default ProductBreadcrumb;
