import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Paintbrush, Image, FileText, Hash, Twitter } from "lucide-react";

interface SiteBranding {
  accentColor: string;
  footerText: string;
}

interface SiteMetadata {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  twitterCard: string;
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
  const [brandingData, setBrandingData] = useState<SiteBranding>({
    ...initialData
  });
  
  const [metaData, setMetaData] = useState<SiteMetadata>({
    ...initialMeta
  });
  
  const handleBrandingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrandingData({
      ...brandingData,
      [name]: value
    });
  };
  
  const handleMetaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMetaData({
      ...metaData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(brandingData, metaData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
          <div>
            <h3 className="text-xl font-['Poppins'] text-white mb-4">Site Branding</h3>
            <p className="text-white/60 mb-6">
              Customize the branding elements of your website including colors and appearance.
            </p>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="accentColor" className="text-white">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accentColor"
                name="accentColor"
                value={brandingData.accentColor}
                onChange={handleBrandingChange}
                placeholder="#D9A566"
                className="bg-black/50 border-white/10 text-white flex-grow"
              />
              <div 
                className="w-10 h-10 rounded border border-white/10 flex-none"
                style={{ backgroundColor: brandingData.accentColor || '#D9A566' }}
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="footerText" className="text-white">Footer Text</Label>
            <Textarea
              id="footerText"
              name="footerText"
              value={brandingData.footerText}
              onChange={handleBrandingChange}
              placeholder="© 2025 Your Real Estate Company. All rights reserved."
              className="bg-black/50 border-white/10 text-white min-h-[80px]"
            />
          </div>
          
          <Separator className="bg-white/10 my-8" />
          
          <div>
            <h4 className="text-lg font-['Poppins'] text-white mb-4">SEO Metadata</h4>
            <p className="text-white/60 mb-6">
              Set up search engine optimization (SEO) metadata to improve your site's visibility in search results.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Site Title</Label>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#D9A566]" />
                  <Input
                    id="title"
                    name="title"
                    value={metaData.title}
                    onChange={handleMetaChange}
                    placeholder="24 Kylemount Ave | Luxury Open House"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitterHandle" className="text-white">Twitter Handle</Label>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                  <Input
                    id="twitterHandle"
                    name="twitterHandle"
                    value={metaData.twitterHandle}
                    onChange={handleMetaChange}
                    placeholder="@yourrealestatecompany"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <Label htmlFor="description" className="text-white">Meta Description</Label>
              <Textarea
                id="description"
                name="description"
                value={metaData.description}
                onChange={handleMetaChange}
                placeholder="Explore this stunning property at our exclusive open house event..."
                className="bg-black/50 border-white/10 text-white min-h-[80px]"
              />
              <p className="text-white/40 text-xs">
                Aim for 150-160 characters for optimal SEO performance
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <Label htmlFor="keywords" className="text-white">Keywords</Label>
              <Textarea
                id="keywords"
                name="keywords"
                value={metaData.keywords}
                onChange={handleMetaChange}
                placeholder="condo apartment, Toronto real estate, luxury condo, floor-to-ceiling windows..."
                className="bg-black/50 border-white/10 text-white min-h-[80px]"
              />
              <p className="text-white/40 text-xs">
                Comma-separated keywords for SEO
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <Label htmlFor="twitterCard" className="text-white">Twitter Card Type</Label>
              <Input
                id="twitterCard"
                name="twitterCard"
                value={metaData.twitterCard}
                onChange={handleMetaChange}
                placeholder="summary_large_image"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-white/40 text-xs">
                Options: summary, summary_large_image, app, player
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <Label htmlFor="ogImage" className="text-white">Social Sharing Image URL</Label>
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-[#D9A566]" />
                <Input
                  id="ogImage"
                  name="ogImage"
                  value={metaData.ogImage}
                  onChange={handleMetaChange}
                  placeholder="https://example.com/social-share.jpg"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              {metaData.ogImage && (
                <div className="mt-2 bg-black/30 border border-white/10 rounded-md overflow-hidden">
                  <div className="aspect-[1.91/1] relative">
                    <img 
                      src={metaData.ogImage} 
                      alt="Social preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 bg-black/50">
                    <p className="text-white/80 text-xs">1200×630 is the recommended size for social sharing</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Branding Settings"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BrandingForm;