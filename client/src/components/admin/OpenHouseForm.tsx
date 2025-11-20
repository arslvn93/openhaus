import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Phone, Mail, Link as LinkIcon } from 'lucide-react';

interface OpenHouseDetails {
  date: string;
  startTime: string;
  endTime: string;
  registerLink: string;
  host?: string;
  phone?: string;
  email?: string;
  ctaText?: string;
}

interface OpenHouseFormProps {
  initialData: OpenHouseDetails;
  saveData: (details: OpenHouseDetails) => void;
  loading: boolean;
}

const OpenHouseForm: React.FC<OpenHouseFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [details, setDetails] = useState<OpenHouseDetails>(initialData);
  
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(details);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Open House Event Details</h3>
          <p className="text-white/60 mb-6">
            Configure the date, time, and contact information for your open house event. The location will automatically use the property address.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="date" className="text-white">Event Date</Label>
              </div>
              <Input
                id="date"
                name="date"
                value={details.date}
                onChange={handleDetailsChange}
                placeholder="e.g., Saturday, September 6, 2025"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="startTime" className="text-white">Start Time</Label>
                </div>
                <Input
                  id="startTime"
                  name="startTime"
                  value={details.startTime}
                  onChange={handleDetailsChange}
                  placeholder="e.g., 1:00 PM"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-white">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  value={details.endTime}
                  onChange={handleDetailsChange}
                  placeholder="e.g., 4:00 PM"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="registerLink" className="text-white">RSVP Button Link</Label>
              </div>
              <Input
                id="registerLink"
                name="registerLink"
                value={details.registerLink}
                onChange={handleDetailsChange}
                placeholder="/openhouse or https://example.com/rsvp"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-white/40 text-xs">
                Link destination for the RSVP button. Use internal routes (e.g., /openhouse) or external URLs (e.g., https://example.com/rsvp). Defaults to /openhouse if empty.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="host" className="text-white">Host Name</Label>
              </div>
              <Input
                id="host"
                name="host"
                value={details.host || ''}
                onChange={handleDetailsChange}
                placeholder="e.g., Arslan Ahmed"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="phone" className="text-white">Host Phone</Label>
              </div>
              <Input
                id="phone"
                name="phone"
                value={details.phone || ''}
                onChange={handleDetailsChange}
                placeholder="e.g., (416) 655-4850"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="email" className="text-white">Host Email</Label>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={details.email || ''}
                onChange={handleDetailsChange}
                placeholder="e.g., info@80john.com"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ctaText" className="text-white">CTA Button Text</Label>
              <Input
                id="ctaText"
                name="ctaText"
                value={details.ctaText || ''}
                onChange={handleDetailsChange}
                placeholder="RSVP for Open House"
                className="bg-black/50 border-white/10 text-white"
              />
              <p className="text-white/40 text-xs">
                Text displayed on the call-to-action button
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Open House Details"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OpenHouseForm;

