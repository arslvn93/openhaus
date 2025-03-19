import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, X, ArrowUpDown, ImageIcon } from 'lucide-react';

// Define interface for gallery images based on the siteConfig structure
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

interface GalleryFormProps {
  initialData: GalleryImage[];
  saveData: (data: GalleryImage[]) => void;
  loading: boolean;
}

const GalleryForm: React.FC<GalleryFormProps> = ({ initialData, saveData, loading }) => {
  const [images, setImages] = useState<GalleryImage[]>(initialData);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  
  const handleAddImage = () => {
    // Get the highest ID and add 1
    const newId = images.length > 0 
      ? Math.max(...images.map(img => img.id)) + 1 
      : 1;
    
    setImages([
      ...images, 
      { id: newId, src: '', alt: '', category: 'interior' }
    ]);
  };
  
  const handleRemoveImage = (id: number) => {
    setImages(images.filter(img => img.id !== id));
  };
  
  const handleImageChange = (id: number, field: keyof GalleryImage, value: string) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };
  
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedItemIndex === null) return;
    if (draggedItemIndex === index) return;
    
    const newImages = [...images];
    const draggedItem = newImages[draggedItemIndex];
    
    // Remove the dragged item
    newImages.splice(draggedItemIndex, 1);
    
    // Insert it at the new position
    newImages.splice(index, 0, draggedItem);
    
    setImages(newImages);
    setDraggedItemIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(images);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Photo Gallery</h3>
          <p className="text-white/60 mb-6">
            Manage the property photos that will appear in the gallery section. 
            Drag and drop to reorder images.
          </p>
          
          <div className="space-y-4">
            {images.map((image, index) => (
              <div 
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className="p-4 bg-black/40 border border-white/10 rounded-lg grid grid-cols-12 gap-4 items-center hover:border-white/20 transition-colors"
              >
                <div className="col-span-1 flex items-center justify-center cursor-move text-white/40 hover:text-white/70">
                  <ArrowUpDown size={20} />
                </div>
                
                <div className="col-span-2">
                  {image.src ? (
                    <div className="relative w-full h-16 rounded-md overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.alt || 'Property image'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-16 bg-black/60 rounded-md flex items-center justify-center">
                      <ImageIcon className="text-white/30" size={24} />
                    </div>
                  )}
                </div>
                
                <div className="col-span-4">
                  <Label htmlFor={`src-${image.id}`} className="sr-only">Image URL</Label>
                  <Input
                    id={`src-${image.id}`}
                    value={image.src}
                    onChange={(e) => handleImageChange(image.id, 'src', e.target.value)}
                    placeholder="Image URL"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor={`alt-${image.id}`} className="sr-only">Alt Text</Label>
                  <Input
                    id={`alt-${image.id}`}
                    value={image.alt}
                    onChange={(e) => handleImageChange(image.id, 'alt', e.target.value)}
                    placeholder="Alt Text"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor={`category-${image.id}`} className="sr-only">Category</Label>
                  <Input
                    id={`category-${image.id}`}
                    value={image.category || ''}
                    onChange={(e) => handleImageChange(image.id, 'category', e.target.value)}
                    placeholder="Category (optional)"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="col-span-1 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveImage(image.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddImage}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Image
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
            {loading ? "Saving..." : "Save Gallery"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GalleryForm;