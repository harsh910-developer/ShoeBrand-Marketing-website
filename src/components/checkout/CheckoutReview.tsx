
import { Button } from "@/components/ui/button";

const CheckoutReview = ({
  shipping,
  payment,
  promoCode,
  onBack,
  onConfirm,
}: any) => {
  // Calculate a fake total for now. Real calculation would reference cart.
  let subtotal = 99.99; // fake example
  let discount = promoCode === "DISCOUNT10" ? 10 : 0;
  let total = subtotal - discount;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
      <div className="mb-6 space-y-2">
        <div className="font-semibold">Shipping</div>
        <div>{shipping.name} &middot; {shipping.address}, {shipping.city} {shipping.zip}</div>
        <div>{shipping.email} {shipping.phone && <>| {shipping.phone}</>}</div>
      </div>
      <div className="mb-6 space-y-2">
        <div className="font-semibold">Payment</div>
        <div>Card ending in {payment.card.slice(-4)} - {payment.name}</div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className={discount ? "text-green-600" : ""}>
            {discount ? `- $${discount}` : "--"}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={onConfirm}>Confirm & Pay</Button>
      </div>
    </div>
  );
};
export default CheckoutReview;
