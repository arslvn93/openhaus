import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X, ArrowUpDown, UserCircle } from 'lucide-react';

// Define interface for testimonials based on the siteConfig structure
interface Testimonial {
  id: number;
  author: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsFormProps {
  initialData: Testimonial[];
  saveData: (data: Testimonial[]) => void;
  loading: boolean;
}

const TestimonialsForm: React.FC<TestimonialsFormProps> = ({ initialData, saveData, loading }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  
  const handleAddTestimonial = () => {
    // Get the highest ID and add 1
    const newId = testimonials.length > 0 
      ? Math.max(...testimonials.map(t => t.id)) + 1 
      : 1;
    
    setTestimonials([
      ...testimonials, 
      { 
        id: newId, 
        author: '', 
        role: '', 
        content: '', 
        avatar: '',
        rating: 5
      }
    ]);
  };
  
  const handleRemoveTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };
  
  const handleTestimonialChange = (id: number, field: keyof Testimonial, value: string | number) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };
  
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedItemIndex === null) return;
    if (draggedItemIndex === index) return;
    
    const newTestimonials = [...testimonials];
    const draggedItem = newTestimonials[draggedItemIndex];
    
    // Remove the dragged item
    newTestimonials.splice(draggedItemIndex, 1);
    
    // Insert it at the new position
    newTestimonials.splice(index, 0, draggedItem);
    
    setTestimonials(newTestimonials);
    setDraggedItemIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(testimonials);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Testimonials</h3>
          <p className="text-white/60 mb-6">
            Manage customer testimonials about the property.
            Drag and drop to reorder testimonials.
          </p>
          
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className="p-4 bg-black/40 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 items-center mb-4">
                  <div className="col-span-1 flex items-center justify-center cursor-move text-white/40 hover:text-white/70">
                    <ArrowUpDown size={20} />
                  </div>
                  
                  <div className="col-span-2">
                    {testimonial.avatar ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author || 'Avatar'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center mx-auto">
                        <UserCircle className="text-white/30" size={32} />
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-8">
                    <div className="font-semibold text-white">{testimonial.author || 'New Testimonial'}</div>
                    <div className="text-white/60 text-sm">{testimonial.role || 'Role'}</div>
                  </div>
                  
                  <div className="col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTestimonial(testimonial.id)}
                      className="text-white/40 hover:text-white hover:bg-red-500/10"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`author-${testimonial.id}`} className="text-white">Author Name</Label>
                      <Input
                        id={`author-${testimonial.id}`}
                        value={testimonial.author}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'author', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`role-${testimonial.id}`} className="text-white">Role / Relationship</Label>
                      <Input
                        id={`role-${testimonial.id}`}
                        value={testimonial.role}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'role', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`avatar-${testimonial.id}`} className="text-white">Avatar URL (optional)</Label>
                      <Input
                        id={`avatar-${testimonial.id}`}
                        value={testimonial.avatar || ''}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'avatar', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`rating-${testimonial.id}`} className="text-white">Rating (1-5)</Label>
                      <Input
                        id={`rating-${testimonial.id}`}
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'rating', parseInt(e.target.value) || 5)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`content-${testimonial.id}`} className="text-white">Testimonial Content</Label>
                    <Textarea
                      id={`content-${testimonial.id}`}
                      value={testimonial.content}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'content', e.target.value)}
                      className="bg-black/50 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTestimonial}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Testimonial
            </Button>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Testimonials"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TestimonialsForm;