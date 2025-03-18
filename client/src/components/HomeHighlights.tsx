import React, { useEffect, useRef } from 'react';

const HomeHighlights = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation classes once the component is mounted
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with refs
    if (titleRef.current) {
      titleRef.current.classList.add('from-top');
      observer.observe(titleRef.current);
    }
    
    if (card1Ref.current) {
      card1Ref.current.classList.add('from-left');
      observer.observe(card1Ref.current);
    }
    
    if (card2Ref.current) {
      card2Ref.current.classList.add('from-bottom');
      observer.observe(card2Ref.current);
    }
    
    if (card3Ref.current) {
      card3Ref.current.classList.add('from-right');
      observer.observe(card3Ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="highlights" className="py-20 bg-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-4xl font-['Poppins'] text-center uppercase mb-14 tracking-wider"
        >
          Home Highlights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kitchen Feature */}
          <div 
            ref={card1Ref}
            className="bg-primary/5 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px] duration-300"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Gourmet Kitchen" 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] uppercase tracking-wide mb-3 text-[#D9A566]">Gourmet Kitchen</h3>
              <p className="font-['Titillium_Web'] text-gray-300">
                Custom maple cabinetry, granite countertops, and high-end stainless steel appliances including a 6-burner gas range and French door refrigerator.
              </p>
            </div>
          </div>
          
          {/* Primary Suite Feature */}
          <div 
            ref={card2Ref}
            className="bg-primary/5 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px] duration-300"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Primary Suite" 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] uppercase tracking-wide mb-3 text-[#D9A566]">Primary Suite</h3>
              <p className="font-['Titillium_Web'] text-gray-300">
                Spacious retreat with tray ceiling, sitting area, walk-in closet with custom organization system, and spa-inspired en-suite with soaker tub.
              </p>
            </div>
          </div>
          
          {/* Backyard Feature */}
          <div 
            ref={card3Ref}
            className="bg-primary/5 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px] duration-300"
          >
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Private Backyard" 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] uppercase tracking-wide mb-3 text-[#D9A566]">Private Backyard</h3>
              <p className="font-['Titillium_Web'] text-gray-300">
                Professionally landscaped oasis with composite deck, stone patio, fire pit area, and mature privacy trees on a generous 50' x 120' lot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;