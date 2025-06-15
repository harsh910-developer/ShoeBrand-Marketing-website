
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CheckoutConfirmation = ({ orderId }: { orderId: string | null }) => (
  <div className="text-center space-y-6 py-12">
    <div className="text-green-600 text-5xl font-black">✓</div>
    <h2 className="text-2xl font-bold">Order Confirmed!</h2>
    <div>
      Thank you for your purchase.<br />
      <span className="font-medium">Order ID: </span>
      <span className="font-mono text-lg">{orderId || "N/A"}</span>
    </div>
    <div>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  </div>
);
export default CheckoutConfirmation;
