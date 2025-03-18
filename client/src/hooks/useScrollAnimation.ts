import { useCallback } from 'react';

const useScrollAnimation = () => {
  const initializeAnimations = useCallback(() => {
    // Ensure the libraries are loaded
    if (
      typeof window === 'undefined' ||
      !window.ScrollMagic ||
      !window.Lenis
    ) {
      console.error('ScrollMagic or Lenis is not loaded');
      return;
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new window.Lenis();
    
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);

    // Initialize ScrollMagic
    const controller = new window.ScrollMagic.Controller({ loglevel: 3 });
    
    // Pin sections for scrolling effects
    new window.ScrollMagic.Scene({
      triggerElement: "#section2",
      triggerHook: "onEnter",
      duration: "100%"
    }).setPin("#section1 .pinWrapper", {
      pushFollowers: false
    }).addTo(controller);
    
    new window.ScrollMagic.Scene({
      triggerElement: "#section2",
      triggerHook: "onEnter",
      duration: "200%"
    }).setPin("#section2 .pinWrapper", {
      pushFollowers: false
    }).addTo(controller);
    
    new window.ScrollMagic.Scene({
      triggerElement: "#section3",
      triggerHook: "onEnter",
      duration: "200%"
    }).setPin("#section3 .pinWrapper", {
      pushFollowers: false
    }).addTo(controller);
    
    new window.ScrollMagic.Scene({
      triggerElement: "#section4",
      triggerHook: "onEnter",
      duration: "100%"
    }).setPin("#section4 .pinWrapper", {
      pushFollowers: false
    }).addTo(controller);

    // Scroll Down Button visibility
    const handleScroll = () => {
      const scrollBtn = document.querySelector('.scrollBtn');
      if (scrollBtn) {
        if (window.scrollY > 0) {
          scrollBtn.classList.add('move');
        } else {
          scrollBtn.classList.remove('move');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Loader Video Animation
    window.addEventListener('load', function () {
      document.body.classList.add('overflow-hidden');
      document.documentElement.classList.add('overflow-hidden');
      
      setTimeout(function () {
        const loaderVideo = document.getElementById('loaderVideo');
        if (loaderVideo) {
          loaderVideo.style.width = '90%';
          loaderVideo.style.height = '90%';
          loaderVideo.style.transform = 'translate(-50%, -50%)';
          loaderVideo.style.top = '50%';
          loaderVideo.style.left = '50%';
          loaderVideo.style.position = 'fixed';
          loaderVideo.style.borderRadius = '12px';
        }
      }, 2000);
      
      setTimeout(() => {
        const loaderVideo = document.getElementById('loaderVideo');
        if (loaderVideo) {
          if (window.matchMedia('(max-width: 576px)').matches) {
            loaderVideo.style.width = '220px';
            loaderVideo.style.height = '220px';
            loaderVideo.style.top = '25%';
            loaderVideo.style.left = '24px';
            loaderVideo.style.right = 'auto';
            loaderVideo.style.transform = 'translate(0%, -25%)';
          } else if (window.matchMedia('(max-width: 767px)').matches) {
            loaderVideo.style.width = '220px';
            loaderVideo.style.height = '220px';
            loaderVideo.style.left = 'auto';
            loaderVideo.style.right = '40px';
            loaderVideo.style.transform = 'translate(0%, -50%)';
          } else if (window.matchMedia('(max-width: 991px)').matches) {
            loaderVideo.style.width = '310px';
            loaderVideo.style.height = '310px';
            loaderVideo.style.left = 'auto';
            loaderVideo.style.right = '40px';
            loaderVideo.style.transform = 'translate(0%, -50%)';
          } else if (window.matchMedia('(max-width: 1199px)').matches) {
            loaderVideo.style.width = '400px';
            loaderVideo.style.height = '400px';
            loaderVideo.style.left = 'auto';
            loaderVideo.style.right = '60px';
            loaderVideo.style.transform = 'translate(0%, -50%)';
          } else if (window.matchMedia('(max-width: 1399px)').matches) {
            loaderVideo.style.width = '450px';
            loaderVideo.style.height = '450px';
            loaderVideo.style.left = 'auto';
            loaderVideo.style.right = '80px';
            loaderVideo.style.transform = 'translate(0%, -50%)';
          } else {
            loaderVideo.style.width = '500px';
            loaderVideo.style.height = '500px';
            loaderVideo.style.top = '50%';
            loaderVideo.style.left = 'auto';
            loaderVideo.style.right = '100px';
            loaderVideo.style.transform = 'translate(0%, -50%)';
            loaderVideo.style.position = 'absolute';
          }
        }
        
        document.body.classList.remove('overflow-hidden');
        document.documentElement.classList.remove('overflow-hidden');
      }, 3000);
    });

    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      controller.destroy(true);
      lenis.destroy();
    };
  }, []);

  return { initializeAnimations };
};

export default useScrollAnimation;
