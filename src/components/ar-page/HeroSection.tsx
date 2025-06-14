
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Play, Sparkles, Zap, Eye } from "lucide-react";

const HeroSection = () => {
  const featuredShoes = [
    {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      name: "Air Max Pro",
      price: "$149.99"
    },
    {
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop", 
      name: "Sport Elite",
      price: "$129.99"
    },
    {
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
      name: "Classic Canvas",
      price: "$79.99"
    }
  ];

  const features = [
    { icon: Eye, text: "Virtual Try-On" },
    { icon: Zap, text: "Instant Results" },
    { icon: Sparkles, text: "AI Powered" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-red-600 to-red-700 min-h-screen">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: "pulse 4s ease-in-out infinite"
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                🚀 Revolutionary AR Technology
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Step Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  Style
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-xl">
                Discover your perfect fit with our revolutionary AR try-on experience. 
                See how shoes look and feel before you buy!
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <feature.icon className="h-5 w-5 text-yellow-400" />
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Sparkles className="mr-2 h-5 w-5" />
                Try AR Experience
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm text-gray-300">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-gray-300">Shoe Models</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">98%</div>
                <div className="text-sm text-gray-300">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Carousel */}
          <div className="space-y-8">
            {/* Video Preview Section */}
            <Card className="relative overflow-hidden bg-black/20 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-500">
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=450&fit=crop" 
                  alt="AR Demo Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 rounded-full w-20 h-20">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                  🔴 LIVE DEMO
                </Badge>
              </div>
            </Card>

            {/* Interactive Shoe Carousel */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Featured in AR Experience
              </h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {featuredShoes.map((shoe, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                        <div className="aspect-square relative group">
                          <img 
                            src={shoe.image} 
                            alt={shoe.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h4 className="font-bold text-lg">{shoe.name}</h4>
                            <p className="text-yellow-400 font-semibold">{shoe.price}</p>
                          </div>
                          <Button 
                            size="sm" 
                            className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                          >
                            Try in AR
                          </Button>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
                <CarouselNext className="right-2 bg-white/20 hover:bg-white/30 border-white/30 text-white" />
              </Carousel>
            </div>

            {/* Interactive 360° Preview Badge */}
            <div className="text-center">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 text-lg animate-pulse">
                ✨ 360° Interactive Preview Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;
