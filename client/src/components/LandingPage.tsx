import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import PropertyShowcase from './PropertyShowcase';
import PropertyDetails from './PropertyDetails';
import HomeHighlights from './HomeHighlights';
import PhotoGallery from './PhotoGallery';
import NeighborhoodOverview from './NeighborhoodOverview';
import Testimonials from './Testimonials';
import ExclusivePackage from './ExclusivePackage';
import ContactForm from './ContactForm';
import Footer from './Footer';
import Preloader from './Preloader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const LandingPage = () => {
  const { createScrollScene } = useScrollAnimation();
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {

    // Create scroll animations once ScrollMagic is loaded
    const loadAnimationsTimeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.ScrollMagic) {
        // Section animations
        createScrollScene({
          triggerElement: '#highlights',
          animation: 'fadeIn',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#gallery',
          animation: 'slideUp',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#neighborhood',
          animation: 'slideLeft',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#testimonials',
          animation: 'fadeIn',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#package',
          animation: 'slideRight',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#contact',
          animation: 'slideUp',
          offset: -100
        });
      }
    }, 1000);
    
    // Initialize fade-in animations for elements not using ScrollMagic
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
      fadeInElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight - 100) && (rect.bottom > 0);
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    // Run on initial load
    fadeInOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Setup exit intent detection for popup
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if the cursor leaves from the top of the viewport
      if (e.clientY <= 0 && !localStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true);
        // Set a flag in localStorage so we don't show it again in this session
        localStorage.setItem('exitPopupShown', 'true');
      }
    };
    
    // Add the event listener after a delay to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', fadeInOnScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
      clearTimeout(loadAnimationsTimeout);
    };
  }, [createScrollScene]);

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  return (
    <>
      <Navigation />
      <PropertyShowcase />
      <HomeHighlights />
      <PhotoGallery />
      <NeighborhoodOverview />
      <Testimonials />
      <ExclusivePackage />
      <ContactForm />
      <Footer />
      <Preloader />

      {/* Exit Intent Popup (Modal) */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-primary-foreground p-8 rounded-lg max-w-lg w-full relative fade-in visible">
            <button 
              onClick={closeExitPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              &times;
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-['Poppins'] mb-2">Don't Miss Your Chance!</h3>
              <p className="text-gray-300 font-['Titillium_Web']">
                Get your exclusive home package with detailed information about 24 Kylemount Ave before it's gone!
              </p>
            </div>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-primary border border-secondary/50 rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-primary border border-secondary/50 rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Your Phone" 
                  className="w-full bg-primary border border-secondary/50 rounded-lg p-3 text-white font-['Titillium_Web'] focus:border-[#D9A566] focus:outline-none"
                />
              </div>
              <button 
                type="button" 
                className="w-full bg-[#D9A566] text-white font-['Poppins'] p-4 rounded-lg hover:bg-[#D9A566]/80 transition-colors text-lg font-bold tracking-wider"
                onClick={closeExitPopup}
              >
                YES, SEND ME THE PACKAGE
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
