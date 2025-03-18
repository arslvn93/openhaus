import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, BarChart2, GraduationCap, CheckSquare, 
  DollarSign, Map, Search, CreditCard 
} from 'lucide-react';

const ExclusivePackage = () => {
  const [showSticky, setShowSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  useEffect(() => {
    // Get header height for correct sticky banner placement
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
    
    const handleScroll = () => {
      const packageSection = document.getElementById('package');
      
      if (packageSection) {
        const packageRect = packageSection.getBoundingClientRect();
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        // Show sticky banner when we scroll past the original banner
        // +70 accounts for the original banner + some of the section padding
        // This banner remains sticky throughout the rest of the page
        if (packageRect.top <= headerHeight && packageRect.top < -70) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const packageItems = [
    {
      id: 1,
      title: "Detailed Floor Plans",
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Recent Neighborhood Sales",
      icon: <BarChart2 className="w-6 h-6" />
    },
    {
      id: 3,
      title: "School District Information",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Property Feature List",
      icon: <CheckSquare className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Utility Cost Estimates",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      id: 6,
      title: "Local Amenities Guide",
      icon: <Map className="w-6 h-6" />
    },
    {
      id: 7,
      title: "Home Inspection Tips",
      icon: <Search className="w-6 h-6" />
    },
    {
      id: 8,
      title: "Financing Resources",
      icon: <CreditCard className="w-6 h-6" />
    }
  ];
  
  // Function to scroll to contact form
  const scrollToForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      {/* Sticky LIMITED OPPORTUNITY Banner - appears when scrolled past the original banner */}
      {showSticky && (
        <div 
          className="fixed w-full bg-[#D9A566] text-white py-3 z-40 shadow-md transition-all duration-300"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="container mx-auto px-4 text-center font-['Poppins'] text-sm md:text-base">
            <span className="font-bold">LIMITED OPPORTUNITY:</span> Receive a detailed neighborhood analysis with your exclusive home package!
          </div>
        </div>
      )}
    
      <section id="package" className="py-20 bg-black relative overflow-hidden">
        {/* Radial gradient background for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/60 z-0"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        {/* Original LIMITED OPPORTUNITY Banner */}
        <div className="w-full bg-[#D9A566] text-white py-3 mb-16 text-center font-['Poppins'] text-sm md:text-base relative z-10">
          <div className="container mx-auto px-4">
            <span className="font-bold">LIMITED OPPORTUNITY:</span> Receive a detailed neighborhood analysis with your exclusive home package!
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-['Poppins'] text-white uppercase mb-6 tracking-wider">
              Your Exclusive Home Package
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl font-['Titillium_Web'] text-white/80 leading-relaxed">
                Request your complimentary premium home package with everything you need to know about this exceptional property.
              </p>
            </div>
          </motion.div>
          
          {/* Modern horizontal scrolling carousel for package items */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full mx-auto relative pb-20"
          >
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex overflow-x-auto hide-scrollbar pb-8 space-x-6 px-4">
              {packageItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-none w-60 group"
                >
                  <div className="relative h-52 bg-gradient-to-br from-black/40 to-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(217,165,102,0.3)]">
                    <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#D9A566] to-[#D9A566]/70 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"></div>
                    
                    <div className="flex flex-col items-center justify-center h-full p-6 relative z-10">
                      <div className="text-[#D9A566] mb-5 transform transition-transform duration-300 group-hover:scale-110 group-hover:text-[#D9A566]">
                        {item.icon}
                      </div>
                      <p className="font-['Titillium_Web'] text-white font-light text-lg text-center group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-block relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D9A566] to-[#D9A566]/60 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button 
                  onClick={scrollToForm}
                  className="relative px-10 py-5 bg-gradient-to-br from-[#D9A566] to-[#D9A566]/90 text-black font-['Poppins'] text-lg tracking-wider uppercase shadow-xl backdrop-blur-sm rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,165,102,0.6)]"
                >
                  Get Your Premium Package
                </button>
              </div>
              
              <p className="mt-4 text-white/50 text-sm font-['Titillium_Web'] max-w-md mx-auto">
                Exclusive offer for serious buyers. Complete property analysis, floor plans, and neighborhood insights in one premium package.
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D9A566]/20 to-transparent blur-3xl opacity-20 rounded-full"></div>
        <div className="absolute top-1/3 left-20 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-20 rounded-full"></div>
      </section>
    </>
  );
};

export default ExclusivePackage;