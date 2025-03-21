import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Home } from "lucide-react";

interface PropertyData {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: string;
  description: string;
  mainFeatures: string[];
  heroImage: string;
  heroCaption: string;
}

interface PropertyFormProps {
  initialData: PropertyData;
  saveData: (data: PropertyData) => void;
  loading: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    ...initialData,
    mainFeatures: initialData.mainFeatures || []
  });
  
  const [newFeature, setNewFeature] = useState('');
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (
      name === 'beds' || 
      name === 'baths' || 
      name === 'sqft' || 
      name === 'yearBuilt'
    ) {
      setPropertyData({
        ...propertyData,
        [name]: Number(value) || 0
      });
    } else {
      setPropertyData({
        ...propertyData,
        [name]: value
      });
    }
  };
  
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    setPropertyData({
      ...propertyData,
      mainFeatures: [...propertyData.mainFeatures, newFeature.trim()]
    });
    
    setNewFeature('');
  };
  
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...propertyData.mainFeatures];
    updatedFeatures.splice(index, 1);
    
    setPropertyData({
      ...propertyData,
      mainFeatures: updatedFeatures
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(propertyData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Details</h3>
          <p className="text-white/60 mb-6">
            Edit the core details of your property listing. These details will be prominently displayed across the website.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Property Address</Label>
              <Input
                id="address"
                name="address"
                value={propertyData.address}
                onChange={handleInputChange}
                placeholder="e.g. 123 Main Street, Cityville"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Listing Price</Label>
              <Input
                id="price"
                name="price"
                value={propertyData.price}
                onChange={handleInputChange}
                placeholder="e.g. $1,250,000"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="beds" className="text-white">Bedrooms</Label>
              <Input
                id="beds"
                name="beds"
                type="number"
                value={propertyData.beds}
                onChange={handleInputChange}
                min={0}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="baths" className="text-white">Bathrooms</Label>
              <Input
                id="baths"
                name="baths"
                type="number"
                value={propertyData.baths}
                onChange={handleInputChange}
                min={0}
                step={0.5}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sqft" className="text-white">Square Footage</Label>
              <Input
                id="sqft"
                name="sqft"
                type="number"
                value={propertyData.sqft}
                onChange={handleInputChange}
                min={0}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className="text-white">Year Built</Label>
              <Input
                id="yearBuilt"
                name="yearBuilt"
                type="number"
                value={propertyData.yearBuilt}
                onChange={handleInputChange}
                min={1800}
                max={new Date().getFullYear()}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="lotSize" className="text-white">Lot Size</Label>
              <Input
                id="lotSize"
                name="lotSize"
                value={propertyData.lotSize}
                onChange={handleInputChange}
                placeholder="e.g. 0.25 acres"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-white">Property Type</Label>
              <Input
                id="propertyType"
                name="propertyType"
                value={propertyData.propertyType}
                onChange={handleInputChange}
                placeholder="e.g. Single Family Home"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="description" className="text-white">Property Description</Label>
            <Textarea
              id="description"
              name="description"
              value={propertyData.description}
              onChange={handleInputChange}
              placeholder="Describe the property in detail..."
              className="bg-black/50 border-white/10 text-white min-h-[150px]"
            />
          </div>
          
          <div className="space-y-2 mb-6">
            <Label className="text-white">Main Features</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {propertyData.mainFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-black/50 border border-white/10 rounded-full px-3 py-1"
                >
                  <span className="text-white text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-white/60 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature (e.g. Newly renovated kitchen)"
                className="bg-black/50 border-white/10 text-white"
              />
              <Button 
                type="button" 
                onClick={handleAddFeature}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5 whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-['Poppins'] text-white mb-4">Hero Section</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="heroImage" className="text-white">Hero Image URL</Label>
              <Input
                id="heroImage"
                name="heroImage"
                value={propertyData.heroImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroCaption" className="text-white">Hero Caption</Label>
              <Input
                id="heroCaption"
                name="heroCaption"
                value={propertyData.heroCaption}
                onChange={handleInputChange}
                placeholder="A captivating caption for the hero image"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          {propertyData.heroImage && (
            <div className="bg-black/30 border border-white/10 rounded-md overflow-hidden mb-6">
              <div className="aspect-video relative">
                <img 
                  src={propertyData.heroImage} 
                  alt="Hero preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-white/80 text-sm">{propertyData.heroCaption || "No caption provided"}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Property Details"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;