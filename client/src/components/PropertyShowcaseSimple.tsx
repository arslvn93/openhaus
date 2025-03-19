import React, { useState, useEffect } from 'react';
import { siteBranding } from '@/config/siteConfig';

const PropertyShowcaseSimple: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Load images
  useEffect(() => {
    const preloadMedia = async () => {
      console.log("Preloading all images in simple showcase...");
      
      // Define images to preload
      const sectionImages = [
        'https://www.yudiz.com/codepen/studio-r/bg-living.jpg',
        'https://www.yudiz.com/codepen/studio-r/bg-kitchen.jpg',
        'https://www.yudiz.com/codepen/studio-r/bg-badroom.jpg',
        'https://www.yudiz.com/codepen/studio-r/bg-office.jpg'
      ];
      
      // Create preload promises
      const preloadPromises = sectionImages.map(imgSrc => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = `${imgSrc}?v=${new Date().getTime()}`;
        });
      });
      
      // Wait for all to load
      await Promise.all(preloadPromises);
      console.log("All images preloaded successfully in simple showcase");
      setImagesLoaded(true);
    };
    
    preloadMedia();
  }, []);
  
  // Scroll to contact form
  const scrollToForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="property" className="flex flex-col w-full">
      {/* Hero Section */}
      <div 
        className={`relative h-screen w-full transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(https://www.yudiz.com/codepen/studio-r/bg-living.jpg?v=${new Date().getTime()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 backdrop-blur-[2px]"></div>
        
        <div className="relative h-full flex items-center z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-xl">
              <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">OPEN HOUSE</span>
              <h1 className="text-5xl md:text-6xl font-extralight mb-6">
                24 Kylemount <br/><span className="opacity-80">Thornhill</span>
              </h1>
              <p className="text-xl md:text-2xl font-extralight text-white/90 mb-8 leading-relaxed">
                Exquisite modern residence with custom finishes in prestigious Thornhill Woods.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="text-sm">4 Bedrooms</span>
                </div>
                <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11h0a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v1h13Z"></path>
                    <path d="M5 11v1h5v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"></path>
                    <path d="M3 12v1a3 3 0 0 0 3 3v2a2 2 0 0 0 4 0v-2h4v2a2 2 0 0 0 4 0v-2a3 3 0 0 0 3-3v-1Z"></path>
                  </svg>
                  <span className="text-sm">3.5 Baths</span>
                </div>
                <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                  </svg>
                  <span className="text-sm">3,200 Sq Ft</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6 bg-black/40 backdrop-blur-md py-2 px-4 max-w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="text-green-400 font-light">May 15, 2023 • 1:00-4:00PM</span>
              </div>
              
              <button 
                onClick={scrollToForm}
                className="mt-4 px-8 py-4 bg-white text-black font-light text-sm hover:bg-white/90 transition-colors"
              >
                GET EXCLUSIVE HOME PACKAGE
              </button>
            </div>
          </div>
          
          {/* Video embed on right side */}
          <div className="hidden md:block absolute right-12 top-1/2 transform -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className={`h-full w-full object-cover object-center absolute inset-0 transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="https://www.yudiz.com/codepen/studio-r/bg-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        
        {/* Property quick info card */}
        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md border border-white/5 p-6 z-20 max-w-xs hidden md:block">
          <h3 className="text-lg font-light mb-3">24 Kylemount Ave</h3>
          <div className="flex justify-between text-sm text-white/70 font-light mb-3">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              4 Bedrooms
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11h0a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v1h13Z"></path>
                <path d="M5 11v1h5v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"></path>
                <path d="M3 12v1a3 3 0 0 0 3 3v2a2 2 0 0 0 4 0v-2h4v2a2 2 0 0 0 4 0v-2a3 3 0 0 0 3-3v-1Z"></path>
              </svg>
              3.5 Baths
            </span>
          </div>
          <div className="flex justify-between text-sm text-white/70 font-light mb-3">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              3,200 sq ft
            </span>
            <span className="text-white">$1,599,000</span>
          </div>
          <div className="text-sm text-white/70 font-light flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>50' x 120' Lot</span>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* Room Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Kitchen */}
        <div 
          className={`h-screen md:h-auto relative transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(https://www.yudiz.com/codepen/studio-r/bg-kitchen.jpg?v=${new Date().getTime()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-[2px]"></div>
        </div>
        <div className="p-12 md:p-16 lg:p-24 flex items-center">
          <div>
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">CHEF'S DREAM</span>
            <h2 className="text-4xl font-extralight mb-6">Kitchen</h2>
            <p className="text-lg font-light text-white/90 mb-10 leading-relaxed">
              Gourmet kitchen with custom maple cabinetry, granite countertops, and high-end appliances.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Viking 6-burner range</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Center island</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Walk-in pantry</span>
            </div>
          </div>
        </div>
        
        {/* Primary Suite */}
        <div className="p-12 md:p-16 lg:p-24 flex items-center">
          <div>
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">MASTER RETREAT</span>
            <h2 className="text-4xl font-extralight mb-6">Primary Suite</h2>
            <p className="text-lg font-light text-white/90 mb-10 leading-relaxed">
              Luxurious primary suite with tray ceiling, sitting area, and spa-inspired ensuite.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Private balcony</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Walk-in closet</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Soaker tub</span>
            </div>
          </div>
        </div>
        <div 
          className={`h-screen md:h-auto relative transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(https://www.yudiz.com/codepen/studio-r/bg-badroom.jpg?v=${new Date().getTime()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Home Office */}
        <div 
          className={`h-screen md:h-auto relative transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(https://www.yudiz.com/codepen/studio-r/bg-office.jpg?v=${new Date().getTime()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-[2px]"></div>
        </div>
        <div className="p-12 md:p-16 lg:p-24 flex items-center">
          <div>
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">WORK FROM HOME</span>
            <h2 className="text-4xl font-extralight mb-6">Home Office</h2>
            <p className="text-lg font-light text-white/90 mb-10 leading-relaxed">
              Dedicated home office with built-in shelving, natural lighting, and peaceful garden views.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Custom built-ins</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">French doors</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Garden view</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcaseSimple;