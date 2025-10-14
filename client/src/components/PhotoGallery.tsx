import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, Camera, ZoomIn } from 'lucide-react';
import { galleryImages as configImages, property, siteBranding } from '../config/siteConfig';

// Define type for gallery image
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

const PhotoGallery = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Use gallery images from the config file
  const galleryImages: GalleryImage[] = configImages;
  
  const openLightbox = (id: number) => {
    setActiveImage(id);
    setIsOpen(true);
    setShowControls(true);
  };
  
  const closeLightbox = () => {
    setIsOpen(false);
    setActiveImage(null);
    setShowControls(true);
  };
  
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Clear existing timeout
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    
    // Hide controls after 3 seconds of no movement
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };
  
  const navigateImage = (nav: 'next' | 'prev') => {
    if (activeImage === null) return;
    
    setDirection(nav);
    
    const currentIndex = galleryImages.findIndex(img => img.id === activeImage);
    const totalImages = galleryImages.length;
    
    if (nav === 'next') {
      const nextIndex = (currentIndex + 1) % totalImages;
      setActiveImage(galleryImages[nextIndex].id);
    } else {
      const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
      setActiveImage(galleryImages[prevIndex].id);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeImage]);
  
  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  // Animation for the staggered image appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Get current image info
  const currentImage = activeImage !== null 
    ? galleryImages.find(img => img.id === activeImage) 
    : null;
  const currentIndex = activeImage !== null
    ? galleryImages.findIndex(img => img.id === activeImage)
    : -1;
  
  return (
    <section id="gallery" className="py-20 bg-primary from-bottom">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-['Poppins'] uppercase mb-3 tracking-wider text-white">
            Photo Gallery
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: siteBranding.colors.primary }}></div>
          <p className="text-white/80 font-['Titillium_Web'] max-w-2xl mx-auto text-lg">
            Explore the stunning visuals of {property.address.street} in our comprehensive gallery showcase
          </p>
        </div>
        
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div 
              key={image.id}
              variants={imageVariants}
              className="group relative overflow-hidden rounded-xl cursor-pointer h-80 shadow-lg"
              onClick={() => openLightbox(image.id)}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 z-10"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <span 
                    className="text-white text-sm py-1 px-3 rounded-full font-['Poppins']"
                    style={{ backgroundColor: siteBranding.colors.primary }}
                  >
                    {image.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-['Poppins'] text-xl mb-1">{image.alt}</h3>
                  <div className="flex items-center">
                    <ZoomIn className="w-5 h-5 text-white mr-2" />
                    <span className="text-white/80 text-sm">Click to enlarge</span>
                  </div>
                </div>
              </div>
              
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 text-white py-3 px-6 rounded-full font-['Poppins'] transition-colors duration-300"
            style={{ 
              backgroundColor: siteBranding.colors.primary,
              ':hover': { backgroundColor: `${siteBranding.colors.primary}80` }
            } as React.CSSProperties}
          >
            <Camera className="w-5 h-5" /> 
            View All Photos
          </button>
        </div>
      </div>
      
      {/* Lightbox using Radix UI Dialog */}
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal>
          {/* Overlay */}
          <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/98 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          
          {/* Content */}
          <DialogPrimitive.Content 
            className="fixed left-0 top-0 z-[101] w-screen h-screen flex items-center justify-center focus:outline-none"
            onEscapeKeyDown={closeLightbox}
            onMouseMove={handleMouseMove}
            style={{ cursor: showControls ? 'default' : 'none' }}
          >
            {/* Close button - top right */}
            <motion.button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 group"
              aria-label="Close gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative p-2 rounded-full bg-black/50 backdrop-blur-md group-hover:bg-black/70 border border-white/10">
                <X className="w-6 h-6" strokeWidth={2.5} />
              </div>
            </motion.button>
            
            {/* Navigation buttons */}
            <motion.button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group"
              aria-label="Previous image"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative p-3 rounded-full bg-black/50 backdrop-blur-md group-hover:bg-black/70 border border-white/10">
                <ChevronLeft className="w-8 h-8" strokeWidth={2.5} />
              </div>
            </motion.button>
            
            <motion.button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group"
              aria-label="Next image"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative p-3 rounded-full bg-black/50 backdrop-blur-md group-hover:bg-black/70 border border-white/10">
                <ChevronRight className="w-8 h-8" strokeWidth={2.5} />
              </div>
            </motion.button>
            
            {/* Image container - maximized */}
            <div className="relative w-full h-full flex items-center justify-center p-0 overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                {currentImage && (
                  <motion.div
                    key={activeImage}
                    custom={direction}
                    initial={{ 
                      x: direction === 'next' ? '100%' : '-100%'
                    }}
                    animate={{ 
                      x: 0
                    }}
                    exit={{ 
                      x: direction === 'next' ? '-100%' : '100%'
                    }}
                    transition={{ 
                      x: { 
                        type: 'tween',
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1]
                      }
                    }}
                    className="absolute w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      style={{ maxHeight: '100vh', maxWidth: '100vw' }}
                    />
                    
                    {/* Image info - overlaid at bottom */}
                    <motion.div 
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: showControls ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className="bg-black/70 text-white py-2.5 px-6 rounded-full text-sm backdrop-blur-md font-['Poppins'] shadow-2xl border border-white/20"
                      >
                        <span className="font-medium">{currentImage.alt}</span>
                        <span className="mx-2 text-white/40">•</span>
                        <span className="text-white/70">{currentIndex + 1} / {galleryImages.length}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Keyboard hints - bottom left */}
            <motion.div 
              className="absolute bottom-6 left-6 z-50 hidden md:flex gap-3 text-white/50 text-xs font-['Titillium_Web']"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">←</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">→</span>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">ESC</span>
                <span>Close</span>
              </div>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
};

export default PhotoGallery;
