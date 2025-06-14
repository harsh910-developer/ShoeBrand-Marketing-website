
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-red-500 to-red-600 text-white">
      <div className="container mx-auto text-center">
        <div className="text-6xl mb-6">👟✨</div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AR Try-On Experience
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Revolutionary augmented reality technology that lets you virtually try on shoes before you buy. 
          See how they look and fit from every angle.
        </p>
        <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 mb-8">
          Coming Soon - Beta Testing Available
        </Badge>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100 text-lg px-8 py-3">
            Join Beta Program
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-500 text-lg px-8 py-3">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
