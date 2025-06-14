
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Sparkles, Eye, Zap, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const ARTryOnPromotion = () => {
  const benefits = [
    {
      icon: Eye,
      title: "See Before You Buy",
      description: "Visualize how shoes look on your feet"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Try on multiple styles in seconds"
    },
    {
      icon: Sparkles,
      title: "AI Powered",
      description: "Advanced foot detection technology"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-8">
            <div>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mb-4 px-4 py-2">
                🚀 Revolutionary Technology
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Try On Shoes with 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 block">
                  Augmented Reality
                </span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Experience the future of online shopping. See exactly how shoes will look and fit 
                on your feet before making a purchase. No more sizing guesswork!
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-blue-100">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/ar-try-on">
                  <Camera className="mr-2 h-5 w-5" />
                  Try AR Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm text-blue-200">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15K+</div>
                <div className="text-sm text-blue-200">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-blue-200">Shoe Models</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo Preview */}
          <div className="space-y-6">
            {/* Main AR Preview Card */}
            <Card className="relative overflow-hidden bg-black/20 backdrop-blur-sm border-white/20 transform hover:scale-105 transition-all duration-500">
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop" 
                  alt="AR Try-On Demo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Floating AR Elements */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  🔴 LIVE AR
                </div>
                
                {/* Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 rounded-full w-20 h-20">
                    <Camera className="h-8 w-8 text-white" />
                  </Button>
                </div>

                {/* Bottom Text */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Interactive AR Experience</h3>
                  <p className="text-sm text-gray-200">Point your camera at your feet</p>
                </div>
              </div>
            </Card>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center text-white hover:bg-white/20 transition-colors">
                <div className="text-2xl mb-2">👟</div>
                <h4 className="font-semibold mb-1">500+ Models</h4>
                <p className="text-xs text-blue-200">All brands available</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center text-white hover:bg-white/20 transition-colors">
                <div className="text-2xl mb-2">📱</div>
                <h4 className="font-semibold mb-1">Any Device</h4>
                <p className="text-xs text-blue-200">Phone, tablet, desktop</p>
              </Card>
            </div>

            {/* Quick Access CTA */}
            <Card className="bg-gradient-to-r from-yellow-400/20 to-pink-400/20 backdrop-blur-sm border-yellow-400/30 p-6 text-center">
              <h3 className="text-white font-bold text-xl mb-3">Ready to Experience AR?</h3>
              <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                <Link to="/ar-try-on">
                  Start Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARTryOnPromotion;
