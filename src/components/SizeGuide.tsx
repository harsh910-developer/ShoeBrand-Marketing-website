import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Footprints } from "lucide-react";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [footLength, setFootLength] = useState<string>("");

  const sizeChart = [
    { us: "7", uk: "6", eu: "40", cm: "25.0" },
    { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.4" },
    { us: "8", uk: "7", eu: "41", cm: "25.7" },
    { us: "8.5", uk: "7.5", eu: "42", cm: "26.0" },
    { us: "9", uk: "8", eu: "42.5", cm: "26.7" },
    { us: "9.5", uk: "8.5", eu: "43", cm: "27.0" },
    { us: "10", uk: "9", eu: "44", cm: "27.3" },
    { us: "10.5", uk: "9.5", eu: "44.5", cm: "27.9" },
    { us: "11", uk: "10", eu: "45", cm: "28.3" },
    { us: "11.5", uk: "10.5", eu: "45.5", cm: "28.6" },
    { us: "12", uk: "11", eu: "46", cm: "29.0" },
    { us: "12.5", uk: "11.5", eu: "47", cm: "29.3" },
    { us: "13", uk: "12", eu: "47.5", cm: "29.7" }
  ];

  const getSizeRecommendation = () => {
    if (!footLength) return null;
    const length = parseFloat(footLength);
    const recommendedSize = sizeChart.find(size => 
      parseFloat(size.cm) >= length - 0.5 && parseFloat(size.cm) <= length + 0.5
    );
    return recommendedSize;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Size Chart</TabsTrigger>
            <TabsTrigger value="measure">Measure Your Foot</TabsTrigger>
            <TabsTrigger value="tips">Fitting Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>International Size Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">US</th>
                        <th className="text-left p-2 font-medium">UK</th>
                        <th className="text-left p-2 font-medium">EU</th>
                        <th className="text-left p-2 font-medium">Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.map((size, index) => (
                        <tr 
                          key={index} 
                          className={`border-b hover:bg-gray-50 cursor-pointer ${
                            selectedSize === size.us ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedSize(size.us)}
                        >
                          <td className="p-2">{size.us}</td>
                          <td className="p-2">{size.uk}</td>
                          <td className="p-2">{size.eu}</td>
                          <td className="p-2">{size.cm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Footprints className="h-5 w-5" />
                  How to Measure Your Foot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Step-by-Step Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Place a piece of paper on the floor against a wall</li>
                      <li>Stand on the paper with your heel against the wall</li>
                      <li>Mark the longest toe on the paper</li>
                      <li>Measure the distance from the wall to the mark</li>
                      <li>Add 0.5-1 cm for comfort</li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Enter Your Measurement:</h4>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Foot length in cm"
                        value={footLength}
                        onChange={(e) => setFootLength(e.target.value)}
                        className="border rounded px-3 py-2 flex-1"
                        step="0.1"
                        min="20"
                        max="35"
                      />
                      <span className="flex items-center text-gray-500">cm</span>
                    </div>
                    {getSizeRecommendation() && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm font-medium text-green-800">
                          Recommended Size: US {getSizeRecommendation()?.us}
                        </p>
                        <p className="text-xs text-green-600">
                          (UK {getSizeRecommendation()?.uk}, EU {getSizeRecommendation()?.eu})
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fitting Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Best Practices:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Measure your feet in the evening when they're largest</li>
                      <li>Measure both feet and use the larger measurement</li>
                      <li>Wear the socks you plan to wear with the shoes</li>
                      <li>Leave about 1cm of space between your longest toe and shoe front</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Special Considerations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Athletic shoes: Consider going up 0.5 size</li>
                      <li>Dress shoes: Should fit snugly but not tight</li>
                      <li>Wide feet: Look for wide-width options</li>
                      <li>Between sizes: Choose the larger size for comfort</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {selectedSize && (
            <Button onClick={onClose} className="bg-red-500 hover:bg-red-600">
              Select Size {selectedSize}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;
