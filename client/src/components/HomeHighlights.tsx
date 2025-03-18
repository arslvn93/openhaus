import React, { useEffect, useRef } from 'react';

const HomeHighlights = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Add animation classes once the component is mounted
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -100px 0px" });

    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Observe all feature items
    itemRefs.current.forEach(item => {
      if (item) {
        item.classList.add('from-bottom');
        observer.observe(item);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="highlights" 
      className="py-32 bg-[#0a0a0a] text-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24 max-w-2xl">
          <h4 className="text-white/70 font-light mb-4 text-lg tracking-wide">BEAUTIFUL SPACES</h4>
          <h2 className="text-5xl font-light mb-8">
            Premium features in every room
          </h2>
          <div className="w-24 h-1 bg-white/20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Kitchen Feature */}
          <div 
            ref={(el) => itemRefs.current[0] = el}
            className="group"
          >
            <div className="relative overflow-hidden mb-10 h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Gourmet Kitchen" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Gourmet Kitchen</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Custom maple cabinetry, granite countertops, and high-end stainless steel appliances including a 6-burner gas range.
              </p>
            </div>
          </div>
          
          {/* Primary Suite Feature */}
          <div 
            ref={(el) => itemRefs.current[1] = el}
            className="group"
          >
            <div className="relative overflow-hidden mb-10 h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Primary Suite" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Primary Suite</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Spacious retreat with tray ceiling, sitting area, walk-in closet, and spa-inspired en-suite with soaker tub.
              </p>
            </div>
          </div>
          
          {/* Backyard Feature */}
          <div 
            ref={(el) => itemRefs.current[2] = el}
            className="group"
          >
            <div className="relative overflow-hidden mb-10 h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Private Backyard" 
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
            </div>
            <div>
              <h3 className="text-2xl font-light mb-4">Private Backyard</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Professionally landscaped oasis with composite deck, stone patio, and mature privacy trees on a generous 50' x 120' lot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;