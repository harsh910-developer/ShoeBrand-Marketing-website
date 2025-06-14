
import { Button } from "@/components/ui/button";

interface ARModeSelectorProps {
  arMode: "preview" | "try-on";
  onModeChange: (mode: "preview" | "try-on") => void;
}

const ARModeSelector = ({ arMode, onModeChange }: ARModeSelectorProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={arMode === "preview" ? "default" : "outline"}
        onClick={() => onModeChange("preview")}
        className={arMode === "preview" ? "bg-blue-500 hover:bg-blue-600" : ""}
      >
        Product Preview
      </Button>
      <Button
        variant={arMode === "try-on" ? "default" : "outline"}
        onClick={() => onModeChange("try-on")}
        className={arMode === "try-on" ? "bg-blue-500 hover:bg-blue-600" : ""}
      >
        Live AR Try-On
      </Button>
    </div>
  );
};

export default ARModeSelector;
