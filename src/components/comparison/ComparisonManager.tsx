
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Save, Share2, History, Download, Trash2, Copy } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { toast } from "@/hooks/use-toast";

const ComparisonManager = () => {
  const { 
    comparisonProducts, 
    savedComparisons, 
    saveComparison, 
    loadComparison,
    deleteSavedComparison,
    generateShareLink,
    comparisonHistory 
  } = useComparison();
  
  const [saveName, setSaveName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  const handleSaveComparison = () => {
    if (!saveName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your comparison.",
        variant: "destructive",
      });
      return;
    }
    
    saveComparison(saveName.trim());
    setSaveName("");
    setShowSaveDialog(false);
    toast({
      title: "Comparison saved",
      description: `Your comparison "${saveName}" has been saved.`,
    });
  };

  const handleShareComparison = () => {
    const shareLink = generateShareLink();
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link copied!",
      description: "Comparison link has been copied to your clipboard.",
    });
  };

  const handleExportComparison = () => {
    // Simple implementation - in a real app, you'd generate a PDF
    const data = {
      products: comparisonProducts,
      timestamp: new Date().toISOString(),
      summary: `Comparison of ${comparisonProducts.length} products`
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shoe-comparison-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Comparison exported",
      description: "Your comparison has been downloaded as a JSON file.",
    });
  };

  const handleLoadComparison = (comparison: any) => {
    loadComparison(comparison);
    toast({
      title: "Comparison loaded",
      description: `Loaded "${comparison.name}" comparison.`,
    });
  };

  if (comparisonProducts.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Save Comparison */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Comparison</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter comparison name..."
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveComparison()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveComparison}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Comparison */}
      <Button variant="outline" size="sm" onClick={handleShareComparison}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      {/* Export Comparison */}
      <Button variant="outline" size="sm" onClick={handleExportComparison}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      {/* Saved Comparisons */}
      {savedComparisons.length > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Saved ({savedComparisons.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Saved Comparisons</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {savedComparisons.map((comparison) => (
                <div key={comparison.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{comparison.name}</p>
                    <p className="text-xs text-gray-500">
                      {comparison.products.length} products • {new Date(comparison.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleLoadComparison(comparison)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteSavedComparison(comparison.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Comparison History */}
      {comparisonHistory.length > 0 && (
        <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Comparison History</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {comparisonHistory.map((products, index) => (
                <div key={index} className="p-3 border rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {products.length} products compared
                      </p>
                      <p className="text-xs text-gray-500">
                        {products.map(p => p.brand).join(", ")}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        // Load this comparison
                        products.forEach(product => {
                          // This would need to be implemented in context
                        });
                        setShowHistoryDialog(false);
                      }}
                    >
                      Load
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ComparisonManager;
