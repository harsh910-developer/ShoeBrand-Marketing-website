
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ARTryOnModal from "@/components/ARTryOnModal";
import ReviewSystem from "@/components/ReviewSystem";
import SizeGuide from "@/components/SizeGuide";
import ProductComparison from "@/components/ProductComparison";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import { Palette } from "lucide-react";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { Link } from "react-router-dom";
import { useStickyAddToCart } from "@/hooks/useStickyAddToCart";
import { useProductActions } from "@/hooks/useProductActions";

export default function ProductDetailLayout({ currentProduct, products }: { currentProduct: any, products: any[] }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showARModal, setShowARModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const {
    showSticky,
    addToCartBtnRef,
  } = useStickyAddToCart();
  const {
    handleQuantityChange,
    handleAddToCart,
    handleWishlistToggle,
    handleTryOn,
    handleAddToComparison,
    isInWishlist,
    isInComparison,
    saveForLater,
  } = useProductActions(currentProduct, quantity, setQuantity, selectedSize);

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <button className="btn btn-primary">Back to Products</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb productName={currentProduct.name} />
        <div className="grid lg:grid-cols-2 gap-12">
          <ProductImageGallery
            images={currentProduct.images}
            productName={currentProduct.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            isNew={currentProduct.isNew}
            isSale={currentProduct.isSale}
          />
          <div className="space-y-8">
            <ProductInfo
              brand={currentProduct.brand}
              name={currentProduct.name}
              rating={currentProduct.rating}
              reviews={currentProduct.reviews}
              price={currentProduct.price}
              originalPrice={currentProduct.originalPrice}
              description={currentProduct.description}
              features={currentProduct.features}
            />
            <div>
              <ProductActions
                sizes={currentProduct.sizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onTryOn={() => handleTryOn(setShowARModal)}
                onAddToComparison={handleAddToComparison}
                onWishlistToggle={handleWishlistToggle}
                onShowSizeGuide={() => setShowSizeGuide(true)}
                isInWishlist={isInWishlist}
                isInComparison={isInComparison}
                inStock={currentProduct.inStock}
                price={currentProduct.price}
                onSaveForLater={saveForLater}
              />
              <button
                ref={addToCartBtnRef}
                style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
                tabIndex={-1}
                aria-hidden="true"
              />
            </div>
            <div className="pt-4 border-t">
              <Link to={`/customize/${currentProduct.id}`}>
                <button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Customize This Shoe
                </button>
              </Link>
              <p className="text-sm text-gray-600 text-center mt-2">
                Make it yours with personalized colors, materials, and text
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <ReviewSystem
            productId={currentProduct.id}
            productName={currentProduct.name}
            averageRating={currentProduct.rating}
            totalReviews={currentProduct.reviews}
          />
        </div>
        <RelatedProducts products={products} currentProductId={currentProduct.id} />
      </div>
      <Footer />
      <ARTryOnModal
        isOpen={showARModal}
        onClose={() => setShowARModal(false)}
        product={currentProduct}
      />
      <SizeGuide
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
      <ProductComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
      <StickyAddToCart
        price={currentProduct.price}
        quantity={quantity}
        inStock={currentProduct.inStock}
        selectedSize={selectedSize}
        onAddToCart={handleAddToCart}
        isVisible={showSticky}
        isDisabled={false}
      />
    </div>
  );
}
