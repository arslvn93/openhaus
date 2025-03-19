import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Define interfaces based on the siteConfig structure
interface SiteBranding {
  companyName: string;
  companyLogo: string;
  accentColor: string;
  heroImage: string;
  footerText: string;
}

interface SiteMetadata {
  title: string;
  description: string;
  ogImage: string;
  twitterHandle: string;
}

interface BrandingFormProps {
  initialData: SiteBranding;
  initialMeta: SiteMetadata;
  saveData: (branding: SiteBranding, meta: SiteMetadata) => void;
  loading: boolean;
}

const BrandingForm: React.FC<BrandingFormProps> = ({ 
  initialData, 
  initialMeta, 
  saveData, 
  loading 
}) => {
  const [branding, setBranding] = useState<SiteBranding>(initialData);
  const [metadata, setMetadata] = useState<SiteMetadata>(initialMeta);
  
  const handleBrandingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBranding({
      ...branding,
      [name]: value
    });
  };
  
  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata({
      ...metadata,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(branding, metadata);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Site Branding</h3>
          <p className="text-white/60 mb-6">Update your site's branding elements including logo, colors, and core assets.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={branding.companyName}
                onChange={handleBrandingChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accentColor" className="text-white">Accent Color (HEX)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="accentColor"
                  name="accentColor"
                  value={branding.accentColor}
                  onChange={handleBrandingChange}
                  className="bg-black/50 border-white/10 text-white"
                />
                <div 
                  className="w-10 h-10 rounded border border-white/10"
                  style={{ backgroundColor: branding.accentColor }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyLogo" className="text-white">Company Logo URL</Label>
              <Input
                id="companyLogo"
                name="companyLogo"
                value={branding.companyLogo}
                onChange={handleBrandingChange}
                className="bg-black/50 border-white/10 text-white"
              />
              {branding.companyLogo && (
                <div className="mt-2 p-2 border border-white/10 rounded-md bg-black/30 inline-block">
                  <img 
                    src={branding.companyLogo} 
                    alt="Company Logo" 
                    className="h-10 object-contain"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroImage" className="text-white">Hero Image URL</Label>
              <Input
                id="heroImage"
                name="heroImage"
                value={branding.heroImage}
                onChange={handleBrandingChange}
                className="bg-black/50 border-white/10 text-white"
              />
              {branding.heroImage && (
                <div className="mt-2 border border-white/10 rounded-md overflow-hidden">
                  <img 
                    src={branding.heroImage} 
                    alt="Hero Image" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <Label htmlFor="footerText" className="text-white">Footer Text</Label>
            <Textarea
              id="footerText"
              name="footerText"
              value={branding.footerText}
              onChange={handleBrandingChange}
              className="bg-black/50 border-white/10 text-white min-h-[80px]"
            />
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">SEO & Metadata</h3>
          <p className="text-white/60 mb-6">Optimize your site for search engines and social sharing.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Page Title</Label>
              <Input
                id="title"
                name="title"
                value={metadata.title}
                onChange={handleMetaChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitterHandle" className="text-white">Twitter Handle</Label>
              <Input
                id="twitterHandle"
                name="twitterHandle"
                value={metadata.twitterHandle}
                onChange={handleMetaChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <Label htmlFor="description" className="text-white">Meta Description</Label>
            <Textarea
              id="description"
              name="description"
              value={metadata.description}
              onChange={handleMetaChange}
              className="bg-black/50 border-white/10 text-white min-h-[80px]"
            />
            <p className="text-xs text-white/40 mt-1">
              Recommended length: 150-160 characters for optimal search engine display.
            </p>
          </div>
          
          <div className="mt-4 space-y-2">
            <Label htmlFor="ogImage" className="text-white">Social Sharing Image URL</Label>
            <Input
              id="ogImage"
              name="ogImage"
              value={metadata.ogImage}
              onChange={handleMetaChange}
              className="bg-black/50 border-white/10 text-white"
            />
            {metadata.ogImage && (
              <div className="mt-2 border border-white/10 rounded-md overflow-hidden">
                <img 
                  src={metadata.ogImage} 
                  alt="Social Image" 
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
            <p className="text-xs text-white/40 mt-1">
              Recommended size: 1200 x 630 pixels for optimal display on social platforms.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Branding & SEO"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BrandingForm;