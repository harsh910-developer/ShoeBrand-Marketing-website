
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Globe, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description: "Every shoe is meticulously crafted using premium materials and time-tested techniques."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize customer satisfaction and strive to exceed expectations in every interaction."
    },
    {
      icon: Globe,
      title: "Sustainable Practice",
      description: "Committed to environmentally responsible manufacturing and ethical business practices."
    },
    {
      icon: Heart,
      title: "Passion for Style",
      description: "Driven by a genuine love for footwear and helping men express their personal style."
    }
  ];

  const team = [
    {
      name: "Michael Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "20+ years in luxury footwear design"
    },
    {
      name: "Sarah Chen",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108755-2616c7e9c39e?w=300&h=300&fit=crop&crop=face",
      description: "Former designer at premium fashion houses"
    },
    {
      name: "Robert Martinez",
      role: "Quality Assurance",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Expert in leather craftsmanship"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-red-500">Story</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Our mission is to deliver premium branded shoes to stylish men worldwide, combining timeless craftsmanship with modern innovation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why We Exist</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Founded in 2018, StepStyle was born from a simple belief: every man deserves to walk with confidence. 
              We noticed a gap in the market for high-quality, stylish footwear that didn't compromise on comfort or break the bank. 
              Our journey began with a small team of passionate designers and craftsmen who shared a vision of creating shoes 
              that would empower men to express their unique style.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we've grown into a trusted brand that serves thousands of customers worldwide, but our core values remain unchanged: 
              quality, style, and accessibility for the modern gentleman.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-red-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-red-500 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-red-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <p className="text-red-100">Shoe Styles</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <p className="text-red-100">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <p className="text-red-100">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Step Into Style?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust StepStyle for their footwear needs. 
            Experience the perfect blend of style, comfort, and quality.
          </p>
          <Button size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8 py-3">
            Shop Our Collection
          </Button>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default About;
