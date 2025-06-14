
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SearchProvider } from "@/contexts/SearchContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Wishlist from "@/pages/Wishlist";
import ARTryOn from "@/pages/ARTryOn";
import NotFound from "@/pages/NotFound";
import ComparisonBar from "@/components/ComparisonBar";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/ar-try-on" element={<ARTryOn />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ComparisonBar />
                  <Toaster />
                </div>
              </ComparisonProvider>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
