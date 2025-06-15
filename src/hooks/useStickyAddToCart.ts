
import { useEffect, useRef, useState } from "react";

export function useStickyAddToCart() {
  const [showSticky, setShowSticky] = useState(false);
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!addToCartBtnRef.current) return;
      const rect = addToCartBtnRef.current.getBoundingClientRect();
      setShowSticky(rect.bottom > window.innerHeight || rect.bottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { showSticky, addToCartBtnRef };
}
