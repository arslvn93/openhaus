import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, Clock, ChevronDown, ChevronRight, Settings, Mail } from "lucide-react";

interface ContactInfo {
  mapLocation: {
    lat: number;
    lng: number;
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
  const [contactData, setContactData] = useState<ContactInfo>({
    mapLocation: initialData.mapLocation || { lat: 0, lng: 0 }
  });
  
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value
    });
  };
  
  const handleMapLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const coord = name === 'lat' ? 'lat' : 'lng';
    
    setContactData({
      ...contactData,
      mapLocation: {
        ...contactData.mapLocation,
        [coord]: Number(value) || 0
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(contactData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Contact Information</h3>
          <p className="text-white/60 mb-6">
            Manage additional contact settings. Primary contact details (phone, email, company address) are managed in the Agent tab.
          </p>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Primary Contact Details</span>
            </div>
            <p className="text-blue-200/80 text-sm">
              Phone number, email address, and company address are managed in the <strong>Agent</strong> tab. 
              These are the details that will be displayed on the website.
            </p>
          </div>
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
                <span>Advanced Contact Settings</span>
              </div>
              {isAdvancedOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-6">
            <div>
              <h4 className="text-lg font-['Poppins'] text-white mb-4">Additional Contact Information</h4>
              <p className="text-white/60 mb-6 text-sm">
                Additional contact details that may not be displayed prominently on the site
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#D9A566]" />
                    <Label htmlFor="hours" className="text-white">Business Hours</Label>
                  </div>
                  <Textarea
                    id="hours"
                    name="hours"
                    value={contactData.hours}
                    onChange={handleInputChange}
                    placeholder="Monday - Friday: 9AM - 5PM, Weekends: By appointment only"
                    className="bg-black/50 border-white/10 text-white min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label className="text-white">Map Location (Coordinates)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lat" className="text-white/60 text-sm">Latitude</Label>
                      <Input
                        id="lat"
                        name="lat"
                        type="number"
                        step="0.0000001"
                        value={contactData.mapLocation.lat}
                        onChange={handleMapLocationChange}
                        placeholder="43.6532"
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lng" className="text-white/60 text-sm">Longitude</Label>
                      <Input
                        id="lng"
                        name="lng"
                        type="number"
                        step="0.0000001"
                        value={contactData.mapLocation.lng}
                        onChange={handleMapLocationChange}
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
            </div>
          </CollapsibleContent>
        </Collapsible>
        
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