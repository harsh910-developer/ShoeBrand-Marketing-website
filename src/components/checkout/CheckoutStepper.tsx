
const steps = [
  "Shipping",
  "Payment",
  "Review",
  "Confirmation"
];

const CheckoutStepper = ({ step }: { step: number }) => (
  <nav className="flex items-center justify-between">
    {steps.map((label, idx) => (
      <div key={label} className="flex-1 flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-sm
            ${step >= idx ? 'bg-red-500 border-red-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}
          `}
        >{idx + 1}</div>
        <span className={`mt-1 text-xs ${step >= idx ? 'text-red-500' : 'text-gray-400'}`}>
          {label}
        </span>
        {idx !== steps.length - 1 && (
          <div className="w-full h-1 bg-gray-200 my-0.5"/>
        )}
      </div>
    ))}
  </nav>
);
export default CheckoutStepper;
