
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download, Gift, Star, Bell, Zap } from 'lucide-react';

const MobileAppPromo: React.FC = () => {
  const appFeatures = [
    {
      icon: <Gift className="h-5 w-5" />,
      title: "Exclusive App Deals",
      description: "Get app-only discounts and early access to sales"
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Push Notifications",
      description: "Never miss a restock or flash sale again"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Quick Checkout",
      description: "One-tap purchasing with saved payment methods"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Rewards Program",
      description: "Earn points faster with mobile-exclusive bonuses"
    }
  ];

  const handleDownloadApp = (platform: 'ios' | 'android') => {
    // In a real app, these would be actual store links
    const storeLinks = {
      ios: 'https://apps.apple.com/app/shoebrand',
      android: 'https://play.google.com/store/apps/details?id=com.shoebrand'
    };
    
    // For demo purposes, we'll show a toast
    console.log(`Redirecting to ${platform} store: ${storeLinks[platform]}`);
    // window.open(storeLinks[platform], '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Main App Promotion Card */}
      <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-none overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Smartphone className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Get the ShoeBrand App
              </CardTitle>
              <p className="text-blue-100">
                Experience seamless shopping with exclusive mobile benefits
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Exclusive Mobile Features</h3>
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-blue-100">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Download Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-yellow-500 text-yellow-900 font-bold">
                  LIMITED TIME
                </Badge>
                <span className="text-sm">20% off your first app order!</span>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => handleDownloadApp('ios')}
                  className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download for iOS
                </Button>
                <Button 
                  onClick={() => handleDownloadApp('android')}
                  className="w-full bg-black/30 hover:bg-black/40 backdrop-blur-sm border border-white/20"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download for Android
                </Button>
              </div>
              
              <p className="text-xs text-center text-blue-200 mt-4">
                Available on iOS 12+ and Android 8+
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App-Only Deals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-red-500" />
            Exclusive App-Only Deals
          </CardTitle>
          <p className="text-sm text-gray-600">
            Special offers available only through our mobile app
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-red-50 to-pink-50">
              <div className="text-3xl font-bold text-red-600 mb-2">20%</div>
              <p className="font-medium">First App Order</p>
              <p className="text-sm text-gray-600">New app users only</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="text-3xl font-bold text-blue-600 mb-2">$10</div>
              <p className="font-medium">App Download Bonus</p>
              <p className="text-sm text-gray-600">Instant credit</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-3xl font-bold text-green-600 mb-2">2x</div>
              <p className="font-medium">Rewards Points</p>
              <p className="text-sm text-gray-600">On app purchases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Statistics */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">4.8★</div>
              <p className="text-sm text-gray-600">App Store Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">100K+</div>
              <p className="text-sm text-gray-600">Downloads</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">50%</div>
              <p className="text-sm text-gray-600">Faster Checkout</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
              <p className="text-sm text-gray-600">Mobile Support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileAppPromo;
