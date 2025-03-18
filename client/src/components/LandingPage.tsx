import { useEffect } from 'react';
import Navigation from './Navigation';
import PropertyShowcase from './PropertyShowcase';
import PropertyDetails from './PropertyDetails';
import Gallery from './Gallery';
import Location from './Location';
import ContactForm from './ContactForm';
import Footer from './Footer';
import Preloader from './Preloader';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const LandingPage = () => {
  const { initializeAnimations } = useScrollAnimation();

  useEffect(() => {
    initializeAnimations();
    // Initialize fade-in animations
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
    
    return () => {
      window.removeEventListener('scroll', fadeInOnScroll);
    };
  }, [initializeAnimations]);

  return (
    <>
      <Navigation />
      <PropertyShowcase />
      <PropertyDetails />
      <Gallery />
      <Location />
      <ContactForm />
      <Footer />
      <Preloader />
    </>
  );
};

export default LandingPage;
