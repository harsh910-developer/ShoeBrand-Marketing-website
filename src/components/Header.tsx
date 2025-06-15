
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Menu, X, Search, ShoppingBag } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartSidebar from "./CartSidebar";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const { wishlistCount } = useWishlist();
  const { items } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "AR Try-On", href: "/ar-try-on", special: true },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-2 max-w-full">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 group">
            <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow group-hover:shadow-lg transition-all duration-200 transform group-hover:scale-105">
              <span className="text-white font-bold text-base">S</span>
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
              ShoeBrand
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative px-1.5 py-1
                  font-medium text-sm rounded transition-all duration-200
                  ${item.special 
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 px-2 py-1"
                    : "text-gray-700 hover:text-red-600"
                  }
                  nav-underline
                `}
              >
                {item.name}
                {!item.special && (
                  <span className="nav-underline-span"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search shoes..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 hover:bg-white transition-all duration-200 text-sm"
              />
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="hidden sm:flex relative p-1.5 hover:bg-red-50 rounded-full transition-all duration-200">
                <Heart className="h-4 w-4 text-gray-600" />
                <span className="ml-1 hidden lg:inline font-medium text-sm">Wishlist</span>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xxs rounded-full h-4 w-4 flex items-center justify-center border-2 border-white leading-tight">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <div className="relative">
              <CartSidebar />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xxs rounded-full h-4 w-4 flex items-center justify-center border-2 border-white leading-tight">
                  {cartItemsCount}
                </Badge>
              )}
            </div>

            {/* User Menu or Sign In Button */}
            <UserMenu />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="animate-fade-in lg:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm"
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              </div>
            </form>
            
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    text-gray-700 hover:text-red-600 font-medium py-1 px-2 rounded transition-all duration-200 text-sm
                    ${item.special ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700" : "hover:bg-gray-50"}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-red-600 font-medium py-1 px-2 rounded flex items-center hover:bg-gray-50 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4 mr-1" />
                Wishlist {wishlistCount > 0 && (
                  <Badge className="ml-1 bg-red-500 text-white text-xxs h-4 w-4">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
              {!user && (
                <Link
                  to="/auth"
                  className="text-gray-700 hover:text-red-600 font-medium py-1 px-2 rounded hover:bg-gray-50 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
      {/* Custom CSS for nav underline animation */}
      <style>
        {`
          .nav-underline {
            position: relative;
          }
          .nav-underline-span {
            display: block;
            position: absolute;
            bottom: -2px; left: 12.5%; right: 12.5%;
            height: 2px;
            background: linear-gradient(90deg, #ef4444, #dc2626 80%);
            border-radius: 1px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.2s;
          }
          .nav-underline:hover .nav-underline-span,
          .nav-underline:focus .nav-underline-span {
            transform: scaleX(1);
          }
        `}
      </style>
    </header>
  );
};

export default Header;
