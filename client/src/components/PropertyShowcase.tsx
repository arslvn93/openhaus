import { useEffect, useRef } from 'react';

const PropertyShowcase = () => {
  const controllerRef = useRef<any>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);

  // Initialize ScrollMagic controller and scenes
  useEffect(() => {
    // Scroll indicator visibility
    const handleScroll = () => {
      if (scrollIconRef.current) {
        if (window.scrollY > 100) {
          scrollIconRef.current.classList.add('opacity-0');
        } else {
          scrollIconRef.current.classList.remove('opacity-0');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize ScrollMagic once it's loaded
    const initScrollMagic = () => {
      if (typeof window !== 'undefined' && window.ScrollMagic) {
        controllerRef.current = new window.ScrollMagic.Controller();
        
        // Scene for each section (reduced to keep the scroll animations while simplifying)
        const sections = ["#section1", "#section2", "#section3", "#section4"];
        
        // Create a scene for each section that pins the corresponding pinWrapper
        sections.forEach((section, index) => {
          if (index < sections.length - 1) {
            new window.ScrollMagic.Scene({
              triggerElement: sections[index + 1], // Next section is trigger
              triggerHook: "onEnter",
              duration: index === 0 ? "100%" : "200%"
            }).setPin(`${section} .pinWrapper`, {
              pushFollowers: false
            }).addTo(controllerRef.current);
          }
        });
      }
    };
    
    // Initialize after a short delay to ensure ScrollMagic is loaded
    const timeout = setTimeout(() => {
      initScrollMagic();
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
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
    <section id="property" className="w-full">
      {/* Hero Section */}
      <div id="section1" className="event relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://www.yudiz.com/codepen/studio-r/bg-living.jpg')" }}>
        <div className="pinWrapper flex items-center justify-center h-full w-full">
          <div className="max-w-6xl w-full mx-auto px-8 py-16 flex flex-col md:flex-row items-start md:items-center">
            <div className="w-full md:w-1/2 mb-16 md:mb-0">
              <span className="inline-block text-xs font-light tracking-widest text-white/70 mb-4">OPEN HOUSE EVENT</span>
              <h1 className="text-5xl md:text-6xl font-extralight mb-6 leading-none">
                24 Kylemount <br/>
                <span className="opacity-80">Thornhill</span>
              </h1>
              <p className="text-2xl font-extralight text-white/90 mb-8 max-w-md leading-relaxed">
                Exquisite modern residence with custom finishes in prestigious Thornhill Woods.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-12">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-light text-white/50">Bedrooms</p>
                    <p className="text-lg">4</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11h0a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v1h13Z"></path>
                      <path d="M5 11v1h5v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"></path>
                      <path d="M3 12v1a3 3 0 0 0 3 3v2a2 2 0 0 0 4 0v-2h4v2a2 2 0 0 0 4 0v-2a3 3 0 0 0 3-3v-1Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-light text-white/50">Bathrooms</p>
                    <p className="text-lg">3.5</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-light text-white/50">Square Feet</p>
                    <p className="text-lg">3,200</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className="text-green-400">May 15, 2023 • 1:00-4:00PM</span>
                </div>
                
                <button 
                  onClick={scrollToForm}
                  className="inline-block bg-white text-black text-sm px-8 py-4 hover:bg-white/90 transition-colors ease-in-out duration-300"
                >
                  GET EXCLUSIVE HOME PACKAGE
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-end">
              <div className="w-96 h-96 relative overflow-hidden border border-white/10">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="https://www.yudiz.com/codepen/studio-r/bg-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md inline-block py-2 px-4">
                  <p className="text-xl font-light">$1,599,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          ref={scrollIconRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ease-in-out"
        >
          <p className="text-xs font-light text-white/70 mb-2">Scroll to explore</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/50 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
      
      {/* Feature announcement banner */}
      <div className="bg-white text-black py-4 text-center sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <p className="font-light flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-black/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <div id="section2" className="event relative h-screen w-full" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://www.yudiz.com/codepen/studio-r/bg-kitchen.jpg')" }}>
        <div className="pinWrapper h-full flex items-center">
          <div className="max-w-6xl mx-auto px-8 w-full">
            <div className="max-w-lg">
              <span className="text-xs font-light tracking-widest text-white/70 mb-4 inline-block">CHEF'S DREAM</span>
              <h2 className="text-5xl font-extralight mb-6">Kitchen</h2>
              <p className="text-xl font-light text-white/80 mb-10 leading-relaxed">
                Gourmet kitchen with custom maple cabinetry, granite countertops, and high-end appliances.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Viking 6-burner range</span>
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Center island</span>
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Walk-in pantry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="section3" className="event relative h-screen w-full" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://www.yudiz.com/codepen/studio-r/bg-badroom.jpg')" }}>
        <div className="pinWrapper h-full flex items-center">
          <div className="max-w-6xl mx-auto px-8 w-full">
            <div className="max-w-lg">
              <span className="text-xs font-light tracking-widest text-white/70 mb-4 inline-block">MASTER RETREAT</span>
              <h2 className="text-5xl font-extralight mb-6">Primary Suite</h2>
              <p className="text-xl font-light text-white/80 mb-10 leading-relaxed">
                Luxurious primary suite with tray ceiling, sitting area, and spa-inspired ensuite.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Private balcony</span>
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Walk-in closet</span>
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Soaker tub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="section4" className="event relative h-screen w-full" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://www.yudiz.com/codepen/studio-r/bg-office.jpg')" }}>
        <div className="pinWrapper h-full flex items-center">
          <div className="max-w-6xl mx-auto px-8 w-full">
            <div className="max-w-lg">
              <span className="text-xs font-light tracking-widest text-white/70 mb-4 inline-block">WORK FROM HOME</span>
              <h2 className="text-5xl font-extralight mb-6">Home Office</h2>
              <p className="text-xl font-light text-white/80 mb-10 leading-relaxed">
                Dedicated home office with built-in shelving, natural lighting, and peaceful garden views.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Custom built-ins</span>
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">French doors</span>
                <span className="bg-white/10 px-5 py-2 text-sm text-white/90 border border-white/5">Garden view</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
