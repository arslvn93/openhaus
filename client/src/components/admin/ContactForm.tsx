import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Define interfaces based on the siteConfig structure
interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
  mapLocation: {
    lat: number;
    lng: number;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

interface ContactFormProps {
  initialData: ContactInfo;
  saveData: (data: ContactInfo) => void;
  loading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialData);
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects (social links)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'socialLinks') {
        setContactInfo({
          ...contactInfo,
          socialLinks: {
            ...contactInfo.socialLinks,
            [child]: value
          }
        });
      }
    } 
    // Handle map location as a special case
    else if (name === 'lat' || name === 'lng') {
      setContactInfo({
        ...contactInfo,
        mapLocation: {
          ...contactInfo.mapLocation,
          [name]: parseFloat(value) || 0
        }
      });
    }
    // Handle normal fields
    else {
      setContactInfo({
        ...contactInfo,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(contactInfo);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Contact Information</h3>
          <p className="text-white/60 mb-6">
            Update your contact details and social media links.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-white">Office Address</Label>
              <Input
                id="address"
                name="address"
                value={contactInfo.address}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="hours" className="text-white">Business Hours</Label>
              <Textarea
                id="hours"
                name="hours"
                value={contactInfo.hours}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white min-h-[80px]"
              />
            </div>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Map Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lat" className="text-white">Latitude</Label>
              <Input
                id="lat"
                name="lat"
                type="number"
                step="0.000001"
                value={contactInfo.mapLocation.lat}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lng" className="text-white">Longitude</Label>
              <Input
                id="lng"
                name="lng"
                type="number"
                step="0.000001"
                value={contactInfo.mapLocation.lng}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 border border-white/10 rounded-lg bg-black/30">
            <p className="text-sm text-white/60 mb-2">
              Map Preview (uses current coordinates)
            </p>
            <div className="h-48 w-full bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-white/40">
                Map preview would display at coordinates: {contactInfo.mapLocation.lat}, {contactInfo.mapLocation.lng}
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Social Media Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-white">Facebook</Label>
              <Input
                id="facebook"
                name="socialLinks.facebook"
                value={contactInfo.socialLinks.facebook || ''}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-white">Twitter</Label>
              <Input
                id="twitter"
                name="socialLinks.twitter"
                value={contactInfo.socialLinks.twitter || ''}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-white">Instagram</Label>
              <Input
                id="instagram"
                name="socialLinks.instagram"
                value={contactInfo.socialLinks.instagram || ''}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-white">LinkedIn</Label>
              <Input
                id="linkedin"
                name="socialLinks.linkedin"
                value={contactInfo.socialLinks.linkedin || ''}
                onChange={handleContactChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="youtube" className="text-white">YouTube</Label>
              <Input
                id="youtube"
                name="socialLinks.youtube"
                value={contactInfo.socialLinks.youtube || ''}
                onChange={handleContactChange}
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
            {loading ? "Saving..." : "Save Contact Information"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;