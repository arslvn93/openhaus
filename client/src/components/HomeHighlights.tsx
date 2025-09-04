import React, { useEffect, useRef } from 'react';
import { homeShowcaseSections } from '../config/siteConfig';

const HomeHighlights = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get sections beyond the first 3 (section4 and above)
  const additionalSections = homeShowcaseSections.slice(3);

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

  // If there are no additional sections, don't render anything
  if (additionalSections.length === 0) {
    return null;
  }

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {additionalSections.map((section, index) => (
            <div 
              key={section.id}
              ref={(el) => itemRefs.current[index] = el}
              className="group"
            >
              <div className="relative overflow-hidden mb-10 h-[450px]">
                <img 
                  src={section.imageUrl} 
                  alt={section.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">{section.title}</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;