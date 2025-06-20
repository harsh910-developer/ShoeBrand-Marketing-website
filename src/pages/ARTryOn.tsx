import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Smartphone, Eye, Zap, Star, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroSection from "@/components/ar-page/HeroSection";
import HowItWorksSection from "@/components/ar-page/HowItWorksSection";

const ARTryOn = () => {
  const features = [
    {
      icon: Camera,
      title: "Advanced Camera Technology",
      description: "Our AI uses your device's camera to create a precise 3D model of your feet for accurate virtual fitting."
    },
    {
      icon: Eye,
      title: "Realistic Visualization",
      description: "See exactly how shoes will look on your feet with photorealistic rendering and accurate proportions."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Try on multiple shoes in seconds without leaving your home. Compare different styles side by side."
    },
    {
      icon: Smartphone,
      title: "Works on Any Device",
      description: "Compatible with smartphones, tablets, and computers. No special equipment needed."
    }
  ];

  const benefits = [
    "Reduce sizing uncertainty",
    "Save time and shipping costs",
    "Compare multiple styles easily",
    "Share with friends and family",
    "Make confident purchase decisions"
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      rating: 5,
      comment: "This AR feature is a game-changer! I can finally see how shoes look before buying online.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Chen",
      rating: 5,
      comment: "Amazing technology. Helped me choose the perfect sneakers for my style.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection />
      <HowItWorksSection />

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Use AR Try-On?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Shopping for shoes online can be challenging. Our AR technology eliminates the guesswork 
                and gives you confidence in your purchase decisions.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-red-100 to-red-200 rounded-lg p-8 text-center">
                <div className="text-8xl mb-4">📲</div>
                <h3 className="text-2xl font-semibold mb-4">Try It Now</h3>
                <p className="text-gray-600 mb-6">
                  Be among the first to experience the future of online shoe shopping
                </p>
                <Button size="lg" className="bg-red-500 hover:bg-red-600">
                  Get Early Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Beta Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-red-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our beta program and be among the first to try our revolutionary AR shoe fitting technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100 text-lg px-8 py-3">
              Join Beta Program
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-500 text-lg px-8 py-3">
              Notify When Ready
            </Button>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default ARTryOn;
