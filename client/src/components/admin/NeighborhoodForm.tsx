import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X, MapPin } from 'lucide-react';

// Define interfaces based on the siteConfig structure
interface NeighborhoodStat {
  id: number;
  title: string;
  value: string;
  caption?: string;
  icon: string;
  color: string;
}

interface Amenity {
  id: number;
  name: string;
  distance: string;
  category: string;
  icon: string;
}

interface NeighborhoodFormProps {
  initialStats: NeighborhoodStat[];
  initialAmenities: Amenity[];
  saveData: (stats: NeighborhoodStat[], amenities: Amenity[]) => void;
  loading: boolean;
}

const NeighborhoodForm: React.FC<NeighborhoodFormProps> = ({ 
  initialStats, 
  initialAmenities, 
  saveData, 
  loading 
}) => {
  const [stats, setStats] = useState<NeighborhoodStat[]>(initialStats);
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities);
  
  // Stats management
  const handleAddStat = () => {
    const newId = stats.length > 0 
      ? Math.max(...stats.map(s => s.id)) + 1 
      : 1;
    
    setStats([
      ...stats, 
      { id: newId, title: '', value: '', icon: 'StarIcon', color: '#D9A566' }
    ]);
  };
  
  const handleRemoveStat = (id: number) => {
    setStats(stats.filter(s => s.id !== id));
  };
  
  const handleStatChange = (id: number, field: keyof NeighborhoodStat, value: string) => {
    setStats(stats.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };
  
  // Amenities management
  const handleAddAmenity = () => {
    const newId = amenities.length > 0 
      ? Math.max(...amenities.map(a => a.id)) + 1 
      : 1;
    
    setAmenities([
      ...amenities, 
      { id: newId, name: '', distance: '', category: 'shopping', icon: 'ShoppingCart' }
    ]);
  };
  
  const handleRemoveAmenity = (id: number) => {
    setAmenities(amenities.filter(a => a.id !== id));
  };
  
  const handleAmenityChange = (id: number, field: keyof Amenity, value: string) => {
    setAmenities(amenities.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(stats, amenities);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Neighborhood Stats Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Neighborhood Statistics</h3>
          <p className="text-white/60 mb-6">
            Add or edit the key statistics about the neighborhood.
          </p>
          
          <div className="space-y-4">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="p-4 bg-black/40 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3" 
                         style={{ backgroundColor: stat.color || '#D9A566' }}>
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{stat.title || 'New Statistic'}</div>
                      <div className="text-white/60 text-sm">{stat.value}</div>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveStat(stat.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`stattitle-${stat.id}`} className="text-white">Statistic Title</Label>
                    <Input
                      id={`stattitle-${stat.id}`}
                      value={stat.title}
                      onChange={(e) => handleStatChange(stat.id, 'title', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`statvalue-${stat.id}`} className="text-white">Statistic Value</Label>
                    <Input
                      id={`statvalue-${stat.id}`}
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`staticon-${stat.id}`} className="text-white">Icon Name</Label>
                    <Input
                      id={`staticon-${stat.id}`}
                      value={stat.icon}
                      onChange={(e) => handleStatChange(stat.id, 'icon', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`statcolor-${stat.id}`} className="text-white">Color (HEX)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={`statcolor-${stat.id}`}
                        value={stat.color}
                        onChange={(e) => handleStatChange(stat.id, 'color', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                      <div 
                        className="w-8 h-8 rounded border border-white/10"
                        style={{ backgroundColor: stat.color }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor={`statcaption-${stat.id}`} className="text-white">Caption (Optional)</Label>
                    <Input
                      id={`statcaption-${stat.id}`}
                      value={stat.caption || ''}
                      onChange={(e) => handleStatChange(stat.id, 'caption', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddStat}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Statistic
            </Button>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        {/* Neighborhood Amenities Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Nearby Amenities</h3>
          <p className="text-white/60 mb-6">
            Add or edit nearby amenities and points of interest.
          </p>
          
          <div className="space-y-4">
            {amenities.map((amenity) => (
              <div 
                key={amenity.id}
                className="p-4 bg-black/40 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#D9A566]/10 rounded-md flex items-center justify-center mr-3">
                      <MapPin className="text-[#D9A566]" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{amenity.name || 'New Amenity'}</div>
                      <div className="text-white/60 text-sm">{amenity.distance}</div>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAmenity(amenity.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`amenityname-${amenity.id}`} className="text-white">Amenity Name</Label>
                    <Input
                      id={`amenityname-${amenity.id}`}
                      value={amenity.name}
                      onChange={(e) => handleAmenityChange(amenity.id, 'name', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`amenitydistance-${amenity.id}`} className="text-white">Distance</Label>
                    <Input
                      id={`amenitydistance-${amenity.id}`}
                      value={amenity.distance}
                      onChange={(e) => handleAmenityChange(amenity.id, 'distance', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`amenitycategory-${amenity.id}`} className="text-white">Category</Label>
                    <Input
                      id={`amenitycategory-${amenity.id}`}
                      value={amenity.category}
                      onChange={(e) => handleAmenityChange(amenity.id, 'category', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`amenityicon-${amenity.id}`} className="text-white">Icon Name</Label>
                    <Input
                      id={`amenityicon-${amenity.id}`}
                      value={amenity.icon}
                      onChange={(e) => handleAmenityChange(amenity.id, 'icon', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddAmenity}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Amenity
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Neighborhood Info"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NeighborhoodForm;