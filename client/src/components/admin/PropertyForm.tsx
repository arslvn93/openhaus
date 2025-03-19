import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Plus } from "lucide-react";

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
  const [propertyData, setPropertyData] = useState<PropertyData>(initialData);
  const [newFeature, setNewFeature] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === 'beds' || name === 'baths' || name === 'sqft' || name === 'yearBuilt') {
      setPropertyData({
        ...propertyData,
        [name]: parseInt(value) || 0
      });
    } else {
      setPropertyData({
        ...propertyData,
        [name]: value
      });
    }
  };
  
  const addFeature = () => {
    if (newFeature.trim() === '') return;
    
    setPropertyData({
      ...propertyData,
      mainFeatures: [...propertyData.mainFeatures, newFeature.trim()]
    });
    setNewFeature('');
  };
  
  const removeFeature = (index: number) => {
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
            Update the core details about your property including price, size, features and description.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Property Address</Label>
              <Input
                id="address"
                name="address"
                value={propertyData.address}
                onChange={handleInputChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Price</Label>
              <Input
                id="price"
                name="price"
                value={propertyData.price}
                onChange={handleInputChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="beds" className="text-white">Bedrooms</Label>
              <Input
                id="beds"
                name="beds"
                type="number"
                value={propertyData.beds}
                onChange={handleInputChange}
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
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lotSize" className="text-white">Lot Size</Label>
              <Input
                id="lotSize"
                name="lotSize"
                value={propertyData.lotSize}
                onChange={handleInputChange}
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
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <Label htmlFor="description" className="text-white">Property Description</Label>
            <Textarea
              id="description"
              name="description"
              value={propertyData.description}
              onChange={handleInputChange}
              className="bg-black/50 border-white/10 text-white min-h-[150px]"
            />
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Key Features</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {propertyData.mainFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-black/30 border border-white/10 rounded-full px-3 py-1 flex items-center"
              >
                <span className="text-white mr-2">{feature}</span>
                <button 
                  type="button" 
                  onClick={() => removeFeature(index)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a new feature..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              className="bg-black/50 border-white/10 text-white"
            />
            <Button 
              type="button" 
              onClick={addFeature}
              className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Hero Section</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroImage" className="text-white">Hero Image URL</Label>
              <Input
                id="heroImage"
                name="heroImage"
                value={propertyData.heroImage}
                onChange={handleInputChange}
                className="bg-black/50 border-white/10 text-white"
              />
              {propertyData.heroImage && (
                <div className="mt-2 border border-white/10 rounded-md overflow-hidden">
                  <img 
                    src={propertyData.heroImage} 
                    alt="Hero Preview" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroCaption" className="text-white">Hero Caption</Label>
              <Input
                id="heroCaption"
                name="heroCaption"
                value={propertyData.heroCaption}
                onChange={handleInputChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
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