import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X, ArrowUpDown, Home } from 'lucide-react';

// Define interfaces based on the siteConfig structure
interface PropertyFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ShowcaseSection {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FeaturesFormProps {
  initialData: PropertyFeature[];
  initialSections: ShowcaseSection[];
  saveData: (features: PropertyFeature[], sections: ShowcaseSection[]) => void;
  loading: boolean;
}

const FeaturesForm: React.FC<FeaturesFormProps> = ({ 
  initialData, 
  initialSections, 
  saveData, 
  loading 
}) => {
  const [features, setFeatures] = useState<PropertyFeature[]>(initialData);
  const [sections, setSections] = useState<ShowcaseSection[]>(initialSections);
  
  // Features management
  const handleAddFeature = () => {
    const newId = features.length > 0 
      ? Math.max(...features.map(f => f.id)) + 1 
      : 1;
    
    setFeatures([
      ...features, 
      { id: newId, title: '', description: '', icon: 'HomeIcon' }
    ]);
  };
  
  const handleRemoveFeature = (id: number) => {
    setFeatures(features.filter(f => f.id !== id));
  };
  
  const handleFeatureChange = (id: number, field: keyof PropertyFeature, value: string) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };
  
  // Showcase sections management
  const handleAddSection = () => {
    const newId = sections.length > 0 
      ? Math.max(...sections.map(s => s.id)) + 1 
      : 1;
    
    setSections([
      ...sections, 
      { id: newId, title: '', description: '', image: '' }
    ]);
  };
  
  const handleRemoveSection = (id: number) => {
    setSections(sections.filter(s => s.id !== id));
  };
  
  const handleSectionChange = (id: number, field: keyof ShowcaseSection, value: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(features, sections);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Property Features Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Features</h3>
          <p className="text-white/60 mb-6">
            Add or edit the key features of the property. These will be displayed in the features section.
          </p>
          
          <div className="space-y-4">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="p-4 bg-black/40 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-black/60 rounded-md border border-white/10 flex items-center justify-center mr-3">
                      <Home className="text-[#D9A566]" size={20} />
                    </div>
                    <div className="font-semibold text-white">{feature.title || 'New Feature'}</div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFeature(feature.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${feature.id}`} className="text-white">Feature Title</Label>
                    <Input
                      id={`title-${feature.id}`}
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`icon-${feature.id}`} className="text-white">Icon Name</Label>
                    <Input
                      id={`icon-${feature.id}`}
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(feature.id, 'icon', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label htmlFor={`description-${feature.id}`} className="text-white">Feature Description</Label>
                  <Textarea
                    id={`description-${feature.id}`}
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                    className="bg-black/50 border-white/10 text-white min-h-[80px]"
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddFeature}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Feature
            </Button>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        {/* Showcase Sections */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Showcase Sections</h3>
          <p className="text-white/60 mb-6">
            Manage the highlighted sections that showcase the property's best features.
          </p>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div 
                key={section.id}
                className="p-4 bg-black/40 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="font-semibold text-white">{section.title || 'New Section'}</div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSection(section.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor={`stitle-${section.id}`} className="text-white">Section Title</Label>
                      <Input
                        id={`stitle-${section.id}`}
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`sdescription-${section.id}`} className="text-white">Section Description</Label>
                      <Textarea
                        id={`sdescription-${section.id}`}
                        value={section.description}
                        onChange={(e) => handleSectionChange(section.id, 'description', e.target.value)}
                        className="bg-black/50 border-white/10 text-white min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`simage-${section.id}`} className="text-white">Section Image URL</Label>
                    <Input
                      id={`simage-${section.id}`}
                      value={section.image}
                      onChange={(e) => handleSectionChange(section.id, 'image', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                    {section.image && (
                      <div className="mt-2 border border-white/10 rounded-md overflow-hidden">
                        <img 
                          src={section.image} 
                          alt={section.title || 'Section image'} 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddSection}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Showcase Section
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Features & Sections"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FeaturesForm;