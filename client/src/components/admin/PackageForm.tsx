import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X, Package } from 'lucide-react';

// Define interfaces based on the siteConfig structure
interface PackageItem {
  id: number;
  title: string;
  description?: string;
  icon: string;
}

interface PackageFormProps {
  initialData: PackageItem[];
  saveData: (items: PackageItem[]) => void;
  loading: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [packageItems, setPackageItems] = useState<PackageItem[]>(initialData);
  
  // Package items management
  const handleAddItem = () => {
    const newId = packageItems.length > 0 
      ? Math.max(...packageItems.map(item => item.id)) + 1 
      : 1;
    
    setPackageItems([
      ...packageItems, 
      { id: newId, title: '', icon: 'FileText' }
    ]);
  };
  
  const handleRemoveItem = (id: number) => {
    setPackageItems(packageItems.filter(item => item.id !== id));
  };
  
  const handleItemChange = (id: number, field: keyof PackageItem, value: string) => {
    setPackageItems(packageItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(packageItems);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Package Items Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Home Package Items</h3>
          <p className="text-white/60 mb-6">
            Manage the items included in the exclusive home package.
          </p>
          
          <div className="space-y-4">
            {packageItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-black/40 border border-white/10 rounded-lg grid grid-cols-12 gap-4 items-center hover:border-white/20 transition-colors"
              >
                <div className="col-span-1">
                  <div className="w-10 h-10 bg-black/60 rounded-md border border-white/10 flex items-center justify-center">
                    <Package className="text-[#D9A566]" size={18} />
                  </div>
                </div>
                
                <div className="col-span-9">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`itemtitle-${item.id}`} className="text-white">Item Title</Label>
                      <Input
                        id={`itemtitle-${item.id}`}
                        value={item.title}
                        onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`itemicon-${item.id}`} className="text-white">Icon Name</Label>
                      <Input
                        id={`itemicon-${item.id}`}
                        value={item.icon}
                        onChange={(e) => handleItemChange(item.id, 'icon', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`itemdesc-${item.id}`} className="text-white">Description</Label>
                    <Textarea
                      id={`itemdesc-${item.id}`}
                      value={item.description || ''}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      placeholder="Describe this package item..."
                      className="bg-black/50 border-white/10 text-white min-h-[80px]"
                    />
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddItem}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Package Item
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Package Items"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PackageForm;