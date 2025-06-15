
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PromoCodeInput = ({
  promoCode,
  setPromoCode,
}: {
  promoCode: string | null;
  setPromoCode: (code: string | null) => void
}) => {
  const [input, setInput] = useState<string>(promoCode || "");
  const [msg, setMsg] = useState<string | null>(null);

  const handleApply = () => {
    if (!input) return;
    // Fake only: Accept "DISCOUNT10"
    if (input === "DISCOUNT10") {
      setPromoCode(input);
      setMsg("Promo code applied: $10 off!");
    } else {
      setMsg("Invalid promo code");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Promo Code"
        value={input}
        onChange={e => { setInput(e.target.value); setMsg(null); }}
        className="max-w-xs"
      />
      <Button type="button" size="sm" variant="outline" onClick={handleApply}>
        Apply
      </Button>
      {msg && (
        <span className={`ml-2 text-xs ${msg.includes('off') ? 'text-green-600' : 'text-red-500'}`}>{msg}</span>
      )}
    </div>
  );
};
export default PromoCodeInput;
