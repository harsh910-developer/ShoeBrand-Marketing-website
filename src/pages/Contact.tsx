
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Fashion Street", "New York, NY 10001", "United States"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9AM-6PM EST"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@stepstyle.com", "We reply within 24 hours"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions about our products or need assistance? We're here to help you find the perfect shoes.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-red-500 hover:bg-red-600"
                    size="lg"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Chatbot Section */}
            <Card className="mt-8 bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-6 w-6 text-red-500 mr-3" />
                  <h3 className="text-lg font-semibold">Need Instant Help?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our AI-powered chatbot is available 24/7 to answer your questions about sizing, shipping, returns, and more.
                </p>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* FAQ Link */}
            <Card className="bg-gray-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
                <p className="text-gray-600 mb-4">
                  Find quick answers to common questions about sizing, shipping, returns, and more.
                </p>
                <Button variant="outline">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
