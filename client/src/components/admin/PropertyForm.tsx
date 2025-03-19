import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Define the property interface based on the siteConfig structure
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

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, saveData, loading }) => {
  const [property, setProperty] = useState<PropertyData>(initialData);
  const [mainFeatures, setMainFeatures] = useState<string>(initialData.mainFeatures.join('\n'));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (['beds', 'baths', 'sqft', 'yearBuilt'].includes(name)) {
      setProperty({
        ...property,
        [name]: parseFloat(value) || 0
      });
    } else {
      setProperty({
        ...property,
        [name]: value
      });
    }
  };
  
  const handleMainFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMainFeatures(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Split text area content by line breaks and filter empty lines
    const featuresArray = mainFeatures
      .split('\n')
      .map(feature => feature.trim())
      .filter(feature => feature.length > 0);
    
    // Submit the updated data
    saveData({
      ...property,
      mainFeatures: featuresArray
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Details</h3>
          <p className="text-white/60 mb-6">Edit the core information about your property listing.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Property Address</Label>
              <Input
                id="address"
                name="address"
                value={property.address}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Price</Label>
              <Input
                id="price"
                name="price"
                value={property.price}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="beds" className="text-white">Bedrooms</Label>
              <Input
                id="beds"
                name="beds"
                type="number"
                value={property.beds}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="baths" className="text-white">Bathrooms</Label>
              <Input
                id="baths"
                name="baths"
                type="number"
                value={property.baths}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sqft" className="text-white">Square Footage</Label>
              <Input
                id="sqft"
                name="sqft"
                type="number"
                value={property.sqft}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lotSize" className="text-white">Lot Size</Label>
              <Input
                id="lotSize"
                name="lotSize"
                value={property.lotSize}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className="text-white">Year Built</Label>
              <Input
                id="yearBuilt"
                name="yearBuilt"
                type="number"
                value={property.yearBuilt}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-white">Property Type</Label>
              <Input
                id="propertyType"
                name="propertyType"
                value={property.propertyType}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Description</h3>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Full Description</Label>
            <Textarea
              id="description"
              name="description"
              value={property.description}
              onChange={handleChange}
              className="bg-black/50 border-white/10 text-white min-h-[150px]"
            />
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Features</h3>
          <p className="text-white/60 mb-4">Enter each feature on a new line. These will be displayed as bullet points.</p>
          
          <div className="space-y-2">
            <Label htmlFor="mainFeatures" className="text-white">Main Features</Label>
            <Textarea
              id="mainFeatures"
              value={mainFeatures}
              onChange={handleMainFeaturesChange}
              className="bg-black/50 border-white/10 text-white min-h-[150px]"
              placeholder="Enter each feature on a new line"
            />
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Hero Section</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="heroImage" className="text-white">Hero Image URL</Label>
              <Input
                id="heroImage"
                name="heroImage"
                value={property.heroImage}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white"
              />
              {property.heroImage && (
                <div className="mt-2 border border-white/10 rounded-md overflow-hidden">
                  <img 
                    src={property.heroImage} 
                    alt="Hero Preview" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroCaption" className="text-white">Hero Caption</Label>
              <Textarea
                id="heroCaption"
                name="heroCaption"
                value={property.heroCaption}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white min-h-[100px]"
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