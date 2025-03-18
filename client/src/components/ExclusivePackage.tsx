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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center mix-blend-overlay"></div>
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
            className="text-center mb-16"
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
          
          {/* Package illustration and interactive list */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Left side: Animated folder illustration */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/5 flex justify-center"
            >
              <div className="relative">
                {/* Main folder */}
                <div className="w-[280px] h-[360px] bg-gradient-to-br from-[#D9A566] to-[#8B6839] rounded-lg shadow-2xl relative overflow-hidden transform rotate-[-5deg]">
                  {/* Folder tab */}
                  <div className="absolute top-0 right-10 w-32 h-10 bg-[#D9A566] rounded-b-lg transform translate-y-[-35%]"></div>
                  
                  {/* Folder interior */}
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-[#111111] rounded-md flex items-center justify-center overflow-hidden">
                    <div className="absolute top-4 left-4 w-40 h-1.5 bg-white/10 rounded-full"></div>
                    <div className="absolute top-10 left-4 w-24 h-1.5 bg-white/10 rounded-full"></div>
                    <div className="text-[#D9A566] text-5xl font-bold opacity-20">24K</div>
                  </div>
                  
                  {/* 3D papers sticking out */}
                  <motion.div 
                    initial={{ y: 30 }}
                    animate={{ y: 23 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2.5
                    }}
                    className="absolute -right-1 top-[40%] w-[290px] h-[130px]"
                  >
                    <div className="absolute top-0 right-0 w-[250px] h-[110px] bg-white rounded-l-md shadow-md transform rotate-[-5deg]"></div>
                    <div className="absolute top-8 right-3 w-[240px] h-[110px] bg-[#f8f8f8] rounded-l-md shadow-md transform rotate-[-3deg]"></div>
                    <div className="absolute top-16 right-5 w-[230px] h-[110px] bg-[#f0f0f0] rounded-l-md shadow-md"></div>
                  </motion.div>
                  
                  {/* "PREMIUM" stamp */}
                  <div className="absolute top-8 right-12 w-24 h-24 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#D9A566]/80 flex items-center justify-center transform rotate-[-20deg] border-[3px] border-[#D9A566] text-black font-['Poppins'] font-bold text-lg tracking-wider">
                      PREMIUM
                    </div>
                  </div>
                </div>
                
                {/* Shadow */}
                <div className="absolute bottom-[-20px] left-5 w-[90%] h-[20px] bg-black/20 blur-md rounded-full"></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#D9A566]/20 blur-xl rounded-full"></div>
                <div className="absolute -bottom-5 right-0 w-32 h-32 bg-[#D9A566]/10 blur-xl rounded-full"></div>
              </div>
            </motion.div>
            
            {/* Right side: Feature list */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-3/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {packageItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-black/40 rounded-md border border-white/10 shadow-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D9A566]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="text-[#D9A566] relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-['Poppins'] text-lg">
                        {item.title}
                      </h3>
                      <div className="h-0.5 w-0 bg-gradient-to-r from-[#D9A566] to-transparent group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-12"
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
                
                <p className="mt-4 text-white/50 text-sm font-['Titillium_Web'] max-w-md">
                  Exclusive offer for serious buyers. Complete property analysis, floor plans, and neighborhood insights in one premium package.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D9A566]/20 to-transparent blur-3xl opacity-20 rounded-full"></div>
        <div className="absolute top-1/3 left-20 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-20 rounded-full"></div>
      </section>
    </>
  );
};

export default ExclusivePackage;