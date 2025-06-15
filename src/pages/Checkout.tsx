
import { useState } from "react";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CheckoutShippingForm from "@/components/checkout/CheckoutShippingForm";
import CheckoutPaymentForm from "@/components/checkout/CheckoutPaymentForm";
import CheckoutReview from "@/components/checkout/CheckoutReview";
import CheckoutConfirmation from "@/components/checkout/CheckoutConfirmation";

const Checkout = () => {
  const [step, setStep] = useState(0);

  // Temporary state for forms (normally should use context or reducer)
  const [shippingData, setShippingData] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  // Order ID to display after confirmation
  const [orderId, setOrderId] = useState<string | null>(null);

  // Continue callback
  const goToNext = () => setStep((s) => s + 1);
  const goToPrev = () => setStep((s) => s - 1);

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <CheckoutStepper step={step} />
      <div className="mt-8">
        {step === 0 && (
          <CheckoutShippingForm
            value={shippingData}
            onSubmit={(data) => {
              setShippingData(data);
              goToNext();
            }}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
          />
        )}
        {step === 1 && (
          <CheckoutPaymentForm
            value={paymentData}
            onSubmit={(data) => {
              setPaymentData(data);
              goToNext();
            }}
            onBack={goToPrev}
          />
        )}
        {step === 2 && (
          <CheckoutReview
            shipping={shippingData}
            payment={paymentData}
            promoCode={promoCode}
            onBack={goToPrev}
            onConfirm={() => {
              // Generate a fake order ID for demonstration
              setOrderId("ORD" + Math.floor(100000 + Math.random() * 900000));
              goToNext();
            }}
          />
        )}
        {step === 3 && (
          <CheckoutConfirmation orderId={orderId} />
        )}
      </div>
    </div>
  );
};
export default Checkout;
