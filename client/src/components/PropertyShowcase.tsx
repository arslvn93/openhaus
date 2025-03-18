import { useState, useEffect, useRef } from 'react';

const PropertyShowcase = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const scrollBtnRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const loaderVideoRef = useRef<HTMLDivElement>(null);

  // Initialize ScrollMagic controller and scenes
  useEffect(() => {
    // Get header height for correct sticky banner placement
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

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
      
      // Show sticky banner when scrolled past the initial white banner
      const section2 = document.getElementById('section2');
      const originalBanner = document.getElementById('originalBanner');
      
      if (originalBanner && section2) {
        const bannerRect = originalBanner.getBoundingClientRect();
        
        // When the original banner is scrolled up and out of view
        if (bannerRect.bottom < headerHeight) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
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
    
    // Initialize after a short delay to ensure ScrollMagic is loaded
    const timeout = setTimeout(() => {
      initScrollMagic();
    }, 1000);
    
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
      
      clearTimeout(timeout);
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
              24 Kylemount <br/><span className="opacity-80">Thornhill</span>
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
          
          <div className="image" id="loaderVideo" ref={loaderVideoRef}>
            <video autoPlay loop muted playsInline className="h-full w-full object-cover object-center absolute top-0 left-0">
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
      </div>
      
      {/* Sticky White Banner - appears when scrolled past the original */}
      {showSticky && (
        <div 
          className="fixed bg-white text-black py-4 text-center z-40 shadow-md w-full"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="container mx-auto px-4">
            <p className="font-light flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-black/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.51 15.35A9 9 0 0 0 13 21a9 9 0 0 0 9-9A9 9 0 0 0 5.64 4.57a9.1 9.1 0 0 0-1.48 4.88c0 1.5.37 2.9 1.02 4.13"></path>
                <path d="M12.45 11.95 8.1 17.93"></path>
                <path d="m14.84 7-2.39 4.95"></path>
                <path d="M7.1 9.1c1.23-.38 2.6.34 3.05 1.59"></path>
              </svg>
              <span className="font-medium mr-2">LIMITED OPPORTUNITY:</span>
              Receive a detailed neighborhood analysis with your exclusive home package!
            </p>
          </div>
        </div>
      )}
      
      {/* Original Limited-Time Offer Banner */}
      <div id="originalBanner" className="bg-white text-black py-4 text-center">
        <div className="container mx-auto px-4">
          <p className="font-light flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-black/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.51 15.35A9 9 0 0 0 13 21a9 9 0 0 0 9-9A9 9 0 0 0 5.64 4.57a9.1 9.1 0 0 0-1.48 4.88c0 1.5.37 2.9 1.02 4.13"></path>
              <path d="M12.45 11.95 8.1 17.93"></path>
              <path d="m14.84 7-2.39 4.95"></path>
              <path d="M7.1 9.1c1.23-.38 2.6.34 3.05 1.59"></path>
            </svg>
            <span className="font-medium mr-2">LIMITED OPPORTUNITY:</span>
            Receive a detailed neighborhood analysis with your exclusive home package!
          </p>
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
