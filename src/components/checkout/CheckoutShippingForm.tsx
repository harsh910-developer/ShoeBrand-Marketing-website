
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PromoCodeInput from "@/components/checkout/PromoCodeInput";

// Simple autofill using browser's autocomplete and API if available
const autofillAddress = async (setFields: (fields: any) => void) => {
  if ("contacts" in navigator && (navigator as any).contacts.select) {
    try {
      // @ts-ignore
      const contacts = await (navigator as any).contacts.select(
        ["name", "address", "tel"], { multiple: false }
      );
      if (contacts && contacts[0]?.address) {
        setFields({
          address: contacts[0].address.streetAddress || "",
          city: contacts[0].address.city || "",
          state: contacts[0].address.region || "",
          zip: contacts[0].address.postalCode || "",
          country: contacts[0].address.country || "",
          name: contacts[0].name[0] || "",
          phone: contacts[0].tel[0] || ""
        });
      }
    } catch (e) { /* ignore if user denied */ }
  }
};

const CheckoutShippingForm = ({ value = {}, onSubmit, promoCode, setPromoCode }: any) => {
  const [fields, setFields] = useState({
    name: value.name || "",
    address: value.address || "",
    city: value.city || "",
    state: value.state || "",
    zip: value.zip || "",
    country: value.country || "",
    phone: value.phone || "",
    email: value.email || ""
  });
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Basic validation
    if (!fields.name || !fields.address || !fields.city || !fields.state || !fields.zip || !fields.email) {
      setError("Please fill all required fields.");
      return;
    }
    setError(null);
    onSubmit(fields);
  };

  const maybeAutofill = () => autofillAddress(setFields);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" ref={ref} autoComplete="on">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <Button type="button" size="sm" variant="ghost" onClick={maybeAutofill}>
          Autofill
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          placeholder="Full Name *"
          autoComplete="name"
          required
          value={fields.name}
          onChange={e => setFields({ ...fields, name: e.target.value })}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email *"
          autoComplete="email"
          required
          value={fields.email}
          onChange={e => setFields({ ...fields, email: e.target.value })}
        />
      </div>
      <Input
        name="address"
        placeholder="Address *"
        autoComplete="street-address"
        required
        value={fields.address}
        onChange={e => setFields({ ...fields, address: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="city"
          placeholder="City *"
          autoComplete="address-level2"
          required
          value={fields.city}
          onChange={e => setFields({ ...fields, city: e.target.value })}
        />
        <Input
          name="state"
          placeholder="State *"
          autoComplete="address-level1"
          required
          value={fields.state}
          onChange={e => setFields({ ...fields, state: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="zip"
          placeholder="Postal/ZIP Code *"
          autoComplete="postal-code"
          required
          value={fields.zip}
          onChange={e => setFields({ ...fields, zip: e.target.value })}
        />
        <Input
          name="country"
          placeholder="Country *"
          autoComplete="country"
          required
          value={fields.country}
          onChange={e => setFields({ ...fields, country: e.target.value })}
        />
      </div>
      <Input
        name="phone"
        placeholder="Phone"
        autoComplete="tel"
        value={fields.phone}
        onChange={e => setFields({ ...fields, phone: e.target.value })}
      />
      <PromoCodeInput promoCode={promoCode} setPromoCode={setPromoCode} />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
        Continue to Payment
      </Button>
    </form>
  );
};
export default CheckoutShippingForm;
