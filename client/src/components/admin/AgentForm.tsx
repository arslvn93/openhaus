import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Building, FileText, Facebook, Instagram, Linkedin } from "lucide-react";

interface AgentInfo {
  name?: string;
  photo?: string;
  email?: string;
  phone?: string;
  company?: string;
  companyAddress?: string;
  companyLogo?: string;
  license?: string;
  repo?: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

interface AgentFormProps {
  initialData: {
    agent: AgentInfo;
    agent2?: AgentInfo | null;
    social: SocialLinks;
  };
  saveData: (data: { agent: AgentInfo; agent2?: AgentInfo | null; social: SocialLinks }) => void;
  loading: boolean;
}

const AgentForm: React.FC<AgentFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [agentData, setAgentData] = useState<AgentInfo>({
    name: initialData.agent?.name || '',
    photo: initialData.agent?.photo || '',
    email: initialData.agent?.email || '',
    phone: initialData.agent?.phone || '',
    company: initialData.agent?.company || '',
    license: initialData.agent?.license || '',
    repo: initialData.agent?.repo || '',
    companyAddress: initialData.agent?.companyAddress || '',
    companyLogo: initialData.agent?.companyLogo || ''
  });

  // Agent2 state
  const [agent2Enabled, setAgent2Enabled] = useState<boolean>(
    !!(initialData.agent2?.name && initialData.agent2.name.trim() !== '')
  );
  
  const [agent2Data, setAgent2Data] = useState<AgentInfo>({
    name: initialData.agent2?.name || '',
    photo: initialData.agent2?.photo || '',
    email: initialData.agent2?.email || '',
    phone: initialData.agent2?.phone || '',
    company: initialData.agent2?.company || '',
    license: initialData.agent2?.license || ''
  });

  const [socialData, setSocialData] = useState<SocialLinks>({
    facebook: initialData.social?.facebook || '',
    instagram: initialData.social?.instagram || '',
    linkedin: initialData.social?.linkedin || ''
  });

  // Debug logging
  console.log('AgentForm initialData:', initialData);
  console.log('AgentForm agentData:', agentData);
  console.log('AgentForm agent2Enabled:', agent2Enabled);
  console.log('AgentForm agent2Data:', agent2Data);
  
  const handleAgentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAgentData({
      ...agentData,
      [name]: value
    });
  };

  const handleAgent2Change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAgent2Data({
      ...agent2Data,
      [name]: value
    });
  };

  const handleSocialChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSocialData({
      ...socialData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData({
      agent: agentData,
      agent2: agent2Enabled ? agent2Data : null,
      social: socialData
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Primary Agent Information</h3>
          <p className="text-white/60 mb-6">
            Manage the primary agent profile information that appears throughout the website, including the footer and contact sections.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="name" className="text-white">Agent Name</Label>
              </div>
              <Input
                id="name"
                name="name"
                value={agentData.name}
                onChange={handleAgentChange}
                placeholder="John Smith"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="photo" className="text-white">Agent Photo URL</Label>
              </div>
              <Input
                id="photo"
                name="photo"
                value={agentData.photo}
                onChange={handleAgentChange}
                placeholder="https://example.com/agent-photo.jpg"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="email" className="text-white">Email Address</Label>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={agentData.email}
                onChange={handleAgentChange}
                placeholder="agent@example.com"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
              </div>
              <Input
                id="phone"
                name="phone"
                value={agentData.phone}
                onChange={handleAgentChange}
                placeholder="(123) 456-7890"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="company" className="text-white">Company Name</Label>
              </div>
              <Input
                id="company"
                name="company"
                value={agentData.company}
                onChange={handleAgentChange}
                placeholder="Real Estate Company"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="companyAddress" className="text-white">Company Address</Label>
              </div>
              <Textarea
                id="companyAddress"
                name="companyAddress"
                value={agentData.companyAddress || ''}
                onChange={handleAgentChange}
                placeholder="123 Main Street, Cityville, State 12345"
                className="bg-black/50 border-white/10 text-white min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="companyLogo" className="text-white">Company Logo URL</Label>
              </div>
              <Input
                id="companyLogo"
                name="companyLogo"
                value={agentData.companyLogo || ''}
                onChange={handleAgentChange}
                placeholder="https://example.com/logo.png"
                className="bg-black/50 border-white/10 text-white"
              />
              {agentData.companyLogo && (
                <div className="mt-2 p-3 bg-black/20 border border-white/10 rounded-md inline-block">
                  <img 
                    src={agentData.companyLogo} 
                    alt="Company Logo" 
                    className="max-h-20 max-w-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="license" className="text-white">License Number</Label>
              </div>
              <Input
                id="license"
                name="license"
                value={agentData.license}
                onChange={handleAgentChange}
                placeholder="RECO #12345678"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
        </div>
        
        <Separator className="bg-white/10 my-8" />
        
        {/* Agent 2 Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-['Poppins'] text-white">Secondary Agent (Optional)</h3>
              <p className="text-white/60 text-sm mt-1">
                Add a second agent to display alongside the primary agent in the footer
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agent2Enabled}
                onChange={(e) => setAgent2Enabled(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-black text-[#D9A566] focus:ring-[#D9A566] focus:ring-offset-0"
              />
              <span className="text-white/80 text-sm">Enable Agent 2</span>
            </label>
          </div>
          
          {agent2Enabled && (
            <div className="space-y-4 mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="agent2-name" className="text-white">Agent Name</Label>
                </div>
                <Input
                  id="agent2-name"
                  name="name"
                  value={agent2Data.name}
                  onChange={handleAgent2Change}
                  placeholder="John Smith"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="agent2-photo" className="text-white">Agent Photo URL</Label>
                </div>
                <Input
                  id="agent2-photo"
                  name="photo"
                  value={agent2Data.photo}
                  onChange={handleAgent2Change}
                  placeholder="https://example.com/agent-photo.jpg"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="agent2-email" className="text-white">Email Address</Label>
                </div>
                <Input
                  id="agent2-email"
                  name="email"
                  type="email"
                  value={agent2Data.email}
                  onChange={handleAgent2Change}
                  placeholder="agent@example.com"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="agent2-phone" className="text-white">Phone Number</Label>
                </div>
                <Input
                  id="agent2-phone"
                  name="phone"
                  value={agent2Data.phone}
                  onChange={handleAgent2Change}
                  placeholder="(123) 456-7890"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="agent2-company" className="text-white">Company Name</Label>
                </div>
                <Input
                  id="agent2-company"
                  name="company"
                  value={agent2Data.company}
                  onChange={handleAgent2Change}
                  placeholder="Real Estate Company"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#D9A566]" />
                  <Label htmlFor="agent2-license" className="text-white">License Number</Label>
                </div>
                <Input
                  id="agent2-license"
                  name="license"
                  value={agent2Data.license}
                  onChange={handleAgent2Change}
                  placeholder="RECO #12345678"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
          )}
        </div>
        
        <Separator className="bg-white/10 my-8" />
        
        <div>
          <h4 className="text-md font-['Poppins'] text-white mb-4">Social Media Links</h4>
          <p className="text-white/60 mb-4 text-sm">
            Social media links that appear in the website footer (shared by both agents)
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-[#4267B2]" />
                <Label htmlFor="facebook" className="text-white">Facebook</Label>
              </div>
              <Input
                id="facebook"
                name="facebook"
                value={socialData.facebook}
                onChange={handleSocialChange}
                placeholder="https://facebook.com/yourpage"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-[#E1306C]" />
                <Label htmlFor="instagram" className="text-white">Instagram</Label>
              </div>
              <Input
                id="instagram"
                name="instagram"
                value={socialData.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/yourprofile"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-[#0077B5]" />
                <Label htmlFor="linkedin" className="text-white">LinkedIn</Label>
              </div>
              <Input
                id="linkedin"
                name="linkedin"
                value={socialData.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/in/yourprofile"
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
            {loading ? "Saving..." : `Save Agent${agent2Enabled ? 's' : ''} Information`}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AgentForm;
