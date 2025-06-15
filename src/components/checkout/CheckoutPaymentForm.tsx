
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CheckoutPaymentForm = ({ value = {}, onSubmit, onBack }: any) => {
  const [fields, setFields] = useState({
    card: value.card || "",
    exp: value.exp || "",
    cvc: value.cvc || "",
    name: value.name || "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Mock validation
    if (!fields.card || !fields.exp || !fields.cvc || !fields.name) {
      setError("Please fill all card info.");
      return;
    }
    setError(null);
    onSubmit(fields);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
      <h2 className="text-xl font-semibold">Payment Information</h2>
      <Input
        name="name"
        placeholder="Name on Card *"
        autoComplete="cc-name"
        required
        value={fields.name}
        onChange={e => setFields({ ...fields, name: e.target.value })}
      />
      <Input
        name="card"
        placeholder="Card Number *"
        autoComplete="cc-number"
        required
        value={fields.card}
        onChange={e => setFields({ ...fields, card: e.target.value })}
        maxLength={19}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="exp"
          placeholder="MM/YY *"
          autoComplete="cc-exp"
          required
          value={fields.exp}
          onChange={e => setFields({ ...fields, exp: e.target.value })}
        />
        <Input
          name="cvc"
          placeholder="CVC *"
          autoComplete="cc-csc"
          required
          value={fields.cvc}
          onChange={e => setFields({ ...fields, cvc: e.target.value })}
          maxLength={4}
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <div className="flex justify-between gap-2">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>
        <Button type="submit" className="bg-red-500 hover:bg-red-600">
          Review Order
        </Button>
      </div>
    </form>
  );
};
export default CheckoutPaymentForm;
