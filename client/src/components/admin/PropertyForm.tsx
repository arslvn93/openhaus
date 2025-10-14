import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { X, Plus, Home, ChevronDown, ChevronRight, Settings } from "lucide-react";

// Helper function to convert YouTube URLs to embed format
const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  
  // Handle youtu.be format
  const youtuBeMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (youtuBeMatch) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
  }
  
  // Handle youtube.com/watch?v= format
  const youtubeMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Handle youtube.com/embed/ format (already embedded)
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  return null;
};

interface AddressData {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PropertyData {
  address: AddressData;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: string;
  type: string; // Used by the app for display, we'll sync this with propertyType
  status?: string;
  description: string;
  mainFeatures: string[];
  heroImage: string;
  heroCaption: string;
  shortDescription?: string;
  longDescription?: string;
  mapLocation?: {
    lat: number;
    lng: number;
  };
  // Allow any additional fields
  [key: string]: any;
}

interface HeroVideoData {
  url: string;
  type: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
}

interface PropertyFormProps {
  initialData: PropertyData;
  initialHeroVideo: HeroVideoData;
  saveData: (data: PropertyData, heroVideo: HeroVideoData) => void;
  loading: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  initialData, 
  initialHeroVideo,
  saveData, 
  loading 
}) => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    ...initialData,
    mainFeatures: initialData.mainFeatures || []
  });

  const [heroVideoData, setHeroVideoData] = useState<HeroVideoData>({
    ...initialHeroVideo
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Check if this is an address field
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setPropertyData({
        ...propertyData,
        address: {
          ...propertyData.address,
          [addressField]: value
        }
      });
    }
    // Handle numeric values
    else if (
      name === 'beds' || 
      name === 'baths' || 
      name === 'sqft' || 
      name === 'yearBuilt'
    ) {
      setPropertyData({
        ...propertyData,
        [name]: Number(value) || 0
      });
    } 
    // Special handling for propertyType to update both fields
    else if (name === 'propertyType') {
      setPropertyData({
        ...propertyData,
        propertyType: value,
        type: value // Also update the type field when propertyType changes
      });
    }
    else {
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
  
  const handleHeroVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    
    setHeroVideoData({
      ...heroVideoData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure we use the actual property type field since we removed the duplicate
    if (propertyData.propertyType && !propertyData.type) {
      propertyData.type = propertyData.propertyType;
    }
    
    // Preserve all existing fields from initialData that aren't in the form
    const completePropertyData = {
      ...initialData, // Keep all existing fields
      ...propertyData  // Override with form data
    };
    
    console.log("Submitting complete property data:", completePropertyData);
    console.log("Submitting hero video data:", heroVideoData);
    saveData(completePropertyData, heroVideoData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Details</h3>
          <p className="text-white/60 mb-6">
            Edit the core details of your property listing. These details will be prominently displayed across the website.
          </p>
          
          <div className="mb-6">
            <Label className="text-white mb-2 block">Property Address</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.street" className="text-white/80 text-sm">Street</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={propertyData.address.street}
                  onChange={handleInputChange}
                  placeholder="e.g. 123 Main Street"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.city" className="text-white/80 text-sm">City</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    value={propertyData.address.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Toronto"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address.state" className="text-white/80 text-sm">State/Province</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    value={propertyData.address.state}
                    onChange={handleInputChange}
                    placeholder="e.g. ON"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address.zip" className="text-white/80 text-sm">Zip/Postal Code</Label>
                  <Input
                    id="address.zip"
                    name="address.zip"
                    value={propertyData.address.zip}
                    onChange={handleInputChange}
                    placeholder="e.g. M6B 3A2"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address.country" className="text-white/80 text-sm">Country</Label>
                  <Input
                    id="address.country"
                    name="address.country"
                    value={propertyData.address.country}
                    onChange={handleInputChange}
                    placeholder="e.g. Canada"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Property Name</Label>
              <Input
                id="name"
                name="name"
                value={propertyData.name || ''}
                onChange={handleInputChange}
                placeholder="e.g. Modern Family Home"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status" className="text-white">Listing Status</Label>
              <Input
                id="status"
                name="status"
                value={propertyData.status || ''}
                onChange={handleInputChange}
                placeholder="e.g. For Sale, Sold, Pending"
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              <Label htmlFor="shortDescription" className="text-white">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                value={propertyData.shortDescription || ''}
                onChange={handleInputChange}
                placeholder="Brief description for cards and previews..."
                className="bg-black/50 border-white/10 text-white min-h-[80px]"
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
            <Label htmlFor="longDescription" className="text-white">Long Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              value={propertyData.longDescription || ''}
              onChange={handleInputChange}
              placeholder="Extended property description for detailed pages..."
              className="bg-black/50 border-white/10 text-white min-h-[120px]"
            />
          </div>
          
          <div className="space-y-3 mb-6">
            <Label className="text-white">Map Location (Coordinates)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mapLat" className="text-white/60 text-sm">Latitude</Label>
                <Input
                  id="mapLat"
                  name="mapLat"
                  type="number"
                  step="0.0000001"
                  value={propertyData.mapLocation?.lat || ''}
                  onChange={(e) => {
                    const lat = Number(e.target.value) || 0;
                    setPropertyData({
                      ...propertyData,
                      mapLocation: {
                        ...propertyData.mapLocation,
                        lat: lat
                      }
                    });
                  }}
                  placeholder="43.6532"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mapLng" className="text-white/60 text-sm">Longitude</Label>
                <Input
                  id="mapLng"
                  name="mapLng"
                  type="number"
                  step="0.0000001"
                  value={propertyData.mapLocation?.lng || ''}
                  onChange={(e) => {
                    const lng = Number(e.target.value) || 0;
                    setPropertyData({
                      ...propertyData,
                      mapLocation: {
                        ...propertyData.mapLocation,
                        lng: lng
                      }
                    });
                  }}
                  placeholder="-79.3832"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
            
            <p className="text-white/40 text-xs">
              Tip: You can get coordinates by right-clicking on Google Maps and selecting "What's here?"
            </p>
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
        
        <div>
          <h4 className="text-lg font-['Poppins'] text-white mb-4">Hero Video Settings</h4>
          <p className="text-white/60 mb-6 text-sm">
            Configure the hero video that plays in the background of your property showcase
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="heroVideo.url" className="text-white">Video URL</Label>
              <Input
                id="heroVideo.url"
                name="url"
                value={heroVideoData.url}
                onChange={handleHeroVideoChange}
                placeholder="https://youtu.be/VIDEO_ID or https://player.vimeo.com/video/123456"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-white/40 text-xs">
                Supports YouTube (youtu.be or youtube.com/watch), Vimeo embed URLs, and direct MP4 files
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroVideo.type" className="text-white">Video Type</Label>
              <Input
                id="heroVideo.type"
                name="type"
                value={heroVideoData.type}
                onChange={handleHeroVideoChange}
                placeholder="video/mp4"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="heroVideo.autoplay"
                  name="autoplay"
                  checked={heroVideoData.autoplay}
                  onChange={handleHeroVideoChange}
                  className="rounded border-white/10 bg-black/50 text-[#D9A566] focus:ring-[#D9A566]"
                />
                <Label htmlFor="heroVideo.autoplay" className="text-white text-sm">Autoplay</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="heroVideo.loop"
                  name="loop"
                  checked={heroVideoData.loop}
                  onChange={handleHeroVideoChange}
                  className="rounded border-white/10 bg-black/50 text-[#D9A566] focus:ring-[#D9A566]"
                />
                <Label htmlFor="heroVideo.loop" className="text-white text-sm">Loop</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="heroVideo.muted"
                  name="muted"
                  checked={heroVideoData.muted}
                  onChange={handleHeroVideoChange}
                  className="rounded border-white/10 bg-black/50 text-[#D9A566] focus:ring-[#D9A566]"
                />
                <Label htmlFor="heroVideo.muted" className="text-white text-sm">Muted</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="heroVideo.playsInline"
                  name="playsInline"
                  checked={heroVideoData.playsInline}
                  onChange={handleHeroVideoChange}
                  className="rounded border-white/10 bg-black/50 text-[#D9A566] focus:ring-[#D9A566]"
                />
                <Label htmlFor="heroVideo.playsInline" className="text-white text-sm">Plays Inline</Label>
              </div>
            </div>
          </div>
          
          {heroVideoData.url && (
            <div className="bg-black/30 border border-white/10 rounded-md overflow-hidden mb-6">
              <div className="aspect-video relative">
                {(() => {
                  const youtubeEmbedUrl = getYouTubeEmbedUrl(heroVideoData.url);
                  
                  // YouTube video
                  if (youtubeEmbedUrl) {
                    return (
                      <iframe
                        src={`${youtubeEmbedUrl}?autoplay=0&mute=0&controls=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }
                  
                  // Vimeo video
                  if (heroVideoData.url.includes('vimeo.com')) {
                    return (
                      <iframe
                        src={`${heroVideoData.url}?autoplay=0&muted=1&loop=1&background=1&controls=0&playsinline=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    );
                  }
                  
                  // Direct video file
                  return (
                    <video
                      src={heroVideoData.url}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      muted={heroVideoData.muted}
                      loop={heroVideoData.loop}
                      playsInline={heroVideoData.playsInline}
                    />
                  );
                })()}
              </div>
              <div className="p-3">
                <p className="text-white/80 text-sm">
                  Video Preview - {heroVideoData.type}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between text-white border-white/10 hover:bg-white/5 mb-6"
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Advanced Settings</span>
              </div>
              {isAdvancedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-6">
            <div>
              <h4 className="text-lg font-['Poppins'] text-white mb-4">Advanced Property Details</h4>
              <p className="text-white/60 mb-6 text-sm">
                Additional property information that may not be displayed prominently on the site
              </p>
              
              <div className="space-y-4">
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
          </CollapsibleContent>
        </Collapsible>
        
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