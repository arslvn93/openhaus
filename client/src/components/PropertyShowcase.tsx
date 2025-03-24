import { useState, useEffect, useRef } from 'react';
import { siteBranding, property } from '../config/siteConfig';

const PropertyShowcase = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const scrollBtnRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const loaderVideoRef = useRef<HTMLDivElement>(null);

  // Initialize ScrollMagic controller and scenes
  useEffect(() => {
    // Preload hero images and video
    const preloadMedia = async () => {
      const heroVideo = 'https://www.yudiz.com/codepen/studio-r/bg-video.mp4';
      const heroImage = siteBranding.heroImage;
      
      // Create an array of promises for all the media we want to preload
      const preloadPromises = [];
      
      // Preload images (if any)
      if (heroImage) {
        const imagePromise = new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = heroImage;
        });
        preloadPromises.push(imagePromise);
      }
      
      // Wait for all media to load
      await Promise.all(preloadPromises);
      setImagesLoaded(true);
      
      // Properly initialize ScrollMagic once media is loaded
      initScrollMagic();
    };
    
    // Start preloading
    preloadMedia();

    // Scroll event handlers
    const handleScroll = () => {
      // Scroll button visibility
      if (scrollBtnRef.current) {
        if (window.scrollY > 0) {
          scrollBtnRef.current.classList.add('move');
        } else {
          scrollBtnRef.current.classList.remove('move');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize ScrollMagic once it's loaded - with optimized performance
    const initScrollMagic = () => {
      if (typeof window !== 'undefined' && window.ScrollMagic) {
        // Create controller with reduced logging and optimized scrolling
        controllerRef.current = new window.ScrollMagic.Controller({
          loglevel: 0,  // Disable logging
          refreshInterval: 200, // Less frequent checks (default is 100)
        });
        
        // Add performance options to all scenes
        const sceneOptions = {
          refreshInterval: 20, // Reduced refresh rate for better performance
          reverse: true,
          offset: 0
        };
        
        // Scene for the first section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section2",
          triggerHook: "onEnter",
          duration: "100%",
          ...sceneOptions
        }).setPin("#section1 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the second section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section2",
          triggerHook: "onEnter",
          duration: "200%",
          ...sceneOptions
        }).setPin("#section2 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the third section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section3",
          triggerHook: "onEnter",
          duration: "200%",
          ...sceneOptions
        }).setPin("#section3 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the fourth section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section4",
          triggerHook: "onEnter",
          duration: "100%",
          ...sceneOptions
        }).setPin("#section4 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
      }
    };
    
    // Handle video loading animations
    const handleVideoLoad = () => {
      const loaderVideo = document.getElementById('loaderVideo');
      
      if (loaderVideo) {
        // Responsive adjustments for the video based on screen size
        const applyResponsiveStyles = () => {
          if (window.matchMedia('(max-width: 576px)').matches) {
            loaderVideo.style.top = "-75%";
            loaderVideo.style.left = "24px";
            loaderVideo.style.right = "auto";
            loaderVideo.style.transform = "translate(0%, -25%)";
          } else if (window.matchMedia('(max-width: 767px)').matches) {
            loaderVideo.style.width = "220px";
            loaderVideo.style.height = "220px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "40px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else if (window.matchMedia('(max-width: 991px)').matches) {
            loaderVideo.style.width = "310px";
            loaderVideo.style.height = "310px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "40px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else if (window.matchMedia('(max-width: 1199px)').matches) {
            loaderVideo.style.width = "400px";
            loaderVideo.style.height = "400px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "60px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else if (window.matchMedia('(max-width: 1399px)').matches) {
            loaderVideo.style.width = "450px";
            loaderVideo.style.height = "450px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "80px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else {
            loaderVideo.style.width = "500px";
            loaderVideo.style.height = "500px";
            loaderVideo.style.top = "50%";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "100px";
            loaderVideo.style.transform = "translate(0%, -50%)";
            loaderVideo.style.position = "absolute";
          }
        };
        
        // Apply initial responsive styles
        applyResponsiveStyles();
        
        // Update on window resize
        window.addEventListener('resize', applyResponsiveStyles);
      }
    };
    
    // Initialize video animations after content loads
    window.addEventListener('load', handleVideoLoad);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleVideoLoad);
      
      if (controllerRef.current) {
        controllerRef.current.destroy(true);
      }
    };
  }, []);
  
  // Scroll to contact form section when CTA button is clicked
  const scrollToForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="property" className="events-page">
      {/* Hero Section */}
      <div id="section1" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-20 w-5/12 z-10">
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">OPEN HOUSE</span>
            <h2 className="text-5xl font-extralight mb-6">
              {property.address.street} <br/><span className="opacity-80">{property.address.city}</span>
            </h2>
            <p className="text-2xl font-extralight text-white/90 mb-8 leading-relaxed">
              Exquisite modern residence with custom finishes in prestigious Thornhill Woods.
            </p>
            
            <div className="flex flex-wrap gap-5 mb-8">
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="text-sm">{property.beds} Bedrooms</span>
              </div>
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11h0a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v1h13Z"></path>
                  <path d="M5 11v1h5v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"></path>
                  <path d="M3 12v1a3 3 0 0 0 3 3v2a2 2 0 0 0 4 0v-2h4v2a2 2 0 0 0 4 0v-2a3 3 0 0 0 3-3v-1Z"></path>
                </svg>
                <span className="text-sm">{property.baths} Baths</span>
              </div>
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                <span className="text-sm">{property.sqft.toLocaleString()} Sq Ft</span>
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
          
          <div className="image" id="loaderVideo" ref={loaderVideoRef}>
            {/* Low quality placeholder image - will show while content loads */}
            <div className="h-full w-full object-cover object-center absolute top-0 left-0 bg-black">
              {/* This inline SVG provides a placeholder gradient effect */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                <defs>
                  <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#333333" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#111111" stopOpacity="0.7" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" />
              </svg>
            </div>
            
            {/* Main video - loads on top of placeholder */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className={`h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src="https://www.yudiz.com/codepen/studio-r/bg-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        
        {/* Scroll button */}
        <div 
          ref={scrollBtnRef}
          className="scrollBtn"
        >
          <h6 className="font-light text-white/60">scroll</h6>
          <span></span>
        </div>
        
        {/* Property quick info card - simplified modern version */}
        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md border border-white/5 p-6 z-20 max-w-xs hidden md:block">
          <h3 className="text-lg font-light mb-3">{property.address.street}</h3>
          <div className="flex justify-between text-sm text-white/70 font-light mb-3">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              {property.beds} Bedrooms
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11h0a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v1h13Z"></path>
                <path d="M5 11v1h5v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"></path>
                <path d="M3 12v1a3 3 0 0 0 3 3v2a2 2 0 0 0 4 0v-2h4v2a2 2 0 0 0 4 0v-2a3 3 0 0 0 3-3v-1Z"></path>
              </svg>
              {property.baths} Baths
            </span>
          </div>
          <div className="flex justify-between text-sm text-white/70 font-light mb-3">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
              {property.sqft.toLocaleString()} sq ft
            </span>
            <span className="text-white">{property.price}</span>
          </div>
          <div className="text-sm text-white/70 font-light flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{property.lotSize} Lot</span>
          </div>
        </div>
      </div>
      
      {/* Room Sections with minimalist design */}
      <div id="section2" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-20 w-5/12 z-10">
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">CHEF'S DREAM</span>
            <h2 className="text-5xl font-extralight mb-6">Kitchen</h2>
            <p className="text-xl font-light text-white/90 mb-10 leading-relaxed">
              Gourmet kitchen with custom maple cabinetry, granite countertops, and high-end appliances.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Viking 6-burner range</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Center island</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Walk-in pantry</span>
            </div>
          </div>
          <div className="image"></div>
        </div>
      </div>
      
      <div id="section3" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-20 w-5/12 z-10">
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">MASTER RETREAT</span>
            <h2 className="text-5xl font-extralight mb-6">Primary Suite</h2>
            <p className="text-xl font-light text-white/90 mb-10 leading-relaxed">
              Luxurious primary suite with tray ceiling, sitting area, and spa-inspired ensuite.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Private balcony</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Walk-in closet</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Soaker tub</span>
            </div>
          </div>
          <div className="image"></div>
        </div>
      </div>
      
      <div id="section4" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-20 w-5/12 z-10">
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">WORK FROM HOME</span>
            <h2 className="text-5xl font-extralight mb-6">Home Office</h2>
            <p className="text-xl font-light text-white/90 mb-10 leading-relaxed">
              Dedicated home office with built-in shelving, natural lighting, and peaceful garden views.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Custom built-ins</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">French doors</span>
              <span className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">Garden view</span>
            </div>
          </div>
          <div className="image"></div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
