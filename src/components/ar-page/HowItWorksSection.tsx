
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Eye, Zap, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How AR Try-On Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Scan Your Feet</h3>
            <p className="text-gray-600">Point your camera at your feet and let our AI create a 3D model</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Virtual Try-On</h3>
            <p className="text-gray-600">Browse and virtually try on any shoe from our collection</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Perfect Match</h3>
            <p className="text-gray-600">Find your perfect fit and style with confidence</p>
          </div>
        </div>

        {/* Demo Placeholder */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📱👟</div>
                <h3 className="text-2xl font-semibold mb-2">Interactive Demo</h3>
                <p className="text-gray-600 mb-4">Experience the AR try-on feature in action</p>
                <Button className="bg-red-500 hover:bg-red-600">
                  Launch Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
