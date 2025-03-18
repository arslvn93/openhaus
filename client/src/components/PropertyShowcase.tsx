import { useEffect, useRef } from 'react';

const PropertyShowcase = () => {
  const scrollBtnRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);

  // Initialize ScrollMagic controller and scenes
  useEffect(() => {
    // Scroll button visibility handler
    const handleScroll = () => {
      if (scrollBtnRef.current) {
        if (window.scrollY > 0) {
          scrollBtnRef.current.classList.add('move');
        } else {
          scrollBtnRef.current.classList.remove('move');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize ScrollMagic once it's loaded
    const initScrollMagic = () => {
      if (typeof window !== 'undefined' && window.ScrollMagic) {
        controllerRef.current = new window.ScrollMagic.Controller({ loglevel: 3 });
        
        // Scene for the first section
        new window.ScrollMagic.Scene({
          triggerElement: "#section2",
          triggerHook: "onEnter",
          duration: "100%"
        }).setPin("#section1 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the second section
        new window.ScrollMagic.Scene({
          triggerElement: "#section2",
          triggerHook: "onEnter",
          duration: "200%"
        }).setPin("#section2 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the third section
        new window.ScrollMagic.Scene({
          triggerElement: "#section3",
          triggerHook: "onEnter",
          duration: "200%"
        }).setPin("#section3 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the fourth section
        new window.ScrollMagic.Scene({
          triggerElement: "#section4",
          triggerHook: "onEnter",
          duration: "100%"
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
    <section id="property" className="events-page pt-16">
      {/* Hero Section */}
      <div id="section1" className="event relative">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#DFB775] font-['Titillium_Web'] tracking-widest inline-block mb-3 text-sm">OPEN HOUSE</span>
            <h2 className="text-4xl md:text-3xl sm:text-2xl font-['Poppins'] uppercase tracking-wider mb-5 font-light">24 Kylemount Ave, <span className="font-medium">Thornhill</span></h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight mb-8">
              Exquisite Thornhill Woods Residence with Custom Finishes
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center glass-effect px-4 py-2 rounded-full font-['Titillium_Web'] text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H8v-2a2 2 0 1 0-4 0Z"/></svg>
                  4 Bedrooms
                </span>
                <span className="inline-flex items-center glass-effect px-4 py-2 rounded-full font-['Titillium_Web'] text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h.01"/><path d="M15 6h.01"/><path d="M9 18h.01"/><path d="M15 18h.01"/><path d="M4 10v4a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-4"/><path d="M4 10V6a2 2 0 0 1 2-2h2"/><path d="M14 4h2a2 2 0 0 1 2 2v4"/><path d="M4 14a2 2 0 0 0 2 2h2"/><path d="M14 16h2a2 2 0 0 0 2-2"/></svg>
                  3.5 Baths
                </span>
                <span className="inline-flex items-center glass-effect px-4 py-2 rounded-full font-['Titillium_Web'] text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M3 15h12v3H3z"/><path d="M9 10h6v5H9z"/><path d="M14 5h4v5h-4z"/></svg>
                  3,200 Sq Ft
                </span>
              </div>
              <span className="inline-flex items-center glass-effect px-4 py-2 rounded-full font-['Titillium_Web'] text-sm max-w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#4CAF50]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span className="text-[#4CAF50]">May 15, 2023 • 1:00-4:00PM</span>
              </span>
              <button 
                onClick={scrollToForm}
                className="mt-4 inline-block bg-[#DFB775] text-white font-['Poppins'] px-6 py-4 rounded-lg hover:bg-[#DFB775]/90 transition-colors text-sm tracking-wider modern-shadow max-w-fit"
              >
                GET YOUR EXCLUSIVE HOME PACKAGE
              </button>
            </div>
          </div>
          <div className="image" id="loaderVideo">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover object-center absolute top-0 left-0">
              <source src="https://www.yudiz.com/codepen/studio-r/bg-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div 
          ref={scrollBtnRef}
          className="scrollBtn absolute bottom-[2.5%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <h6 className="text-sm font-['Titillium_Web'] uppercase tracking-widest">scroll</h6>
          <span></span>
        </div>
        
        {/* Property quick info card */}
        <div className="absolute bottom-8 left-8 glass-effect p-6 rounded-lg z-20 max-w-xs hidden md:block from-left animate-in soft-glow">
          <h3 className="text-lg font-['Poppins'] uppercase mb-3 font-light">24 Kylemount Ave</h3>
          <div className="flex justify-between text-sm font-['Titillium_Web'] mb-3">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H8v-2a2 2 0 1 0-4 0Z"/></svg>
              4 Bedrooms
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h.01"/><path d="M15 6h.01"/><path d="M9 18h.01"/><path d="M15 18h.01"/><path d="M4 10v4a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-4"/><path d="M4 10V6a2 2 0 0 1 2-2h2"/><path d="M14 4h2a2 2 0 0 1 2 2v4"/><path d="M4 14a2 2 0 0 0 2 2h2"/><path d="M14 16h2a2 2 0 0 0 2-2"/></svg>
              3.5 Baths
            </span>
          </div>
          <div className="flex justify-between text-sm font-['Titillium_Web'] mb-3">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M3 15h12v3H3z"/><path d="M9 10h6v5H9z"/><path d="M14 5h4v5h-4z"/></svg>
              3,200 sq ft
            </span>
            <span className="text-[#DFB775] font-medium">$1,599,000</span>
          </div>
          <div className="text-sm font-['Titillium_Web'] mt-1 text-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13.18V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9.18"/><path d="m8 11 4 4 8-8"/></svg>
            <span>50' x 120' Lot</span>
          </div>
        </div>
      </div>
      
      {/* Limited-Time Offer Banner */}
      <div className="bg-gradient-to-r from-[#DFB775] to-[#C9A56B] text-white py-4 text-center sticky top-16 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <p className="font-['Poppins'] font-medium tracking-wide flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span className="font-bold mr-2">LIMITED TIME:</span>
            Receive a detailed neighborhood analysis and recent comparable sales with your home package!
          </p>
        </div>
      </div>
      
      {/* Room Sections */}
      <div id="section2" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#DFB775] font-['Titillium_Web'] tracking-widest inline-block mb-3 text-sm">CHEF'S DREAM</span>
            <h2 className="text-4xl md:text-3xl sm:text-2xl font-['Poppins'] uppercase tracking-wider mb-5 font-light">Kitchen</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Gourmet kitchen with custom maple cabinetry, granite countertops, and high-end appliances.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Viking 6-burner range
              </span>
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Center island with seating
              </span>
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Walk-in pantry
              </span>
            </div>
          </div>
          <div className="image modern-shadow"></div>
        </div>
      </div>
      
      <div id="section3" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#DFB775] font-['Titillium_Web'] tracking-widest inline-block mb-3 text-sm">MASTER SUITE</span>
            <h2 className="text-4xl md:text-3xl sm:text-2xl font-['Poppins'] uppercase tracking-wider mb-5 font-light">Bedroom</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Luxurious primary suite with tray ceiling, sitting area, and spa-inspired en-suite.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Private balcony
              </span>
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Walk-in closet
              </span>
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Soaker tub
              </span>
            </div>
          </div>
          <div className="image modern-shadow"></div>
        </div>
      </div>
      
      <div id="section4" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#DFB775] font-['Titillium_Web'] tracking-widest inline-block mb-3 text-sm">WORK FROM HOME</span>
            <h2 className="text-4xl md:text-3xl sm:text-2xl font-['Poppins'] uppercase tracking-wider mb-5 font-light">Office</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Dedicated home office with built-in shelving, natural lighting, and peaceful garden views.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Custom built-ins
              </span>
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                French doors
              </span>
              <span className="inline-flex items-center glass-effect px-3 py-1.5 rounded-full text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-1 text-[#DFB775]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M12 3v6"/><path d="M12 12h.01"/></svg>
                Garden view
              </span>
            </div>
          </div>
          <div className="image modern-shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
