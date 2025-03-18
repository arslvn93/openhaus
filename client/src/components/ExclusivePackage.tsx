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
      {/* Sticky banner appears when scrolled past the original banner */}
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
        
        <div className="container mx-auto px-4 relative z-10 pt-6">
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
            {/* Left side: Animated folder illustration with documents */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/5 flex justify-center"
            >
              <div className="relative w-[350px] h-[450px]">
                {/* Floor plan document - Top Left */}
                <motion.div
                  initial={{ rotate: -15, y: 0 }}
                  animate={{ rotate: -12, y: -5 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 3.1 
                  }}
                  className="absolute top-0 left-0 z-10"
                >
                  <div className="w-[220px] h-[140px] bg-white rounded-md shadow-md overflow-hidden transform origin-bottom-right">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/10"></div>
                    <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">FLOOR PLAN</div>
                    <div className="absolute top-2 right-3 text-xs text-gray-600">24 Kylemount Ave</div>
                    <div className="grid grid-cols-3 gap-1 px-3 pt-10">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Neighborhood data document - Bottom Right */}
                <motion.div
                  initial={{ rotate: 8, y: 0 }}
                  animate={{ rotate: 10, y: 5 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 3.5 
                  }}
                  className="absolute bottom-5 right-0 z-10"
                >
                  <div className="w-[200px] h-[150px] bg-[#f0f0f0] rounded-md shadow-md overflow-hidden transform origin-top-left">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/5"></div>
                    <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">NEIGHBORHOOD DATA</div>
                    <div className="px-3 pt-10">
                      <div className="flex justify-between mb-2">
                        <div className="h-2 w-12 bg-gray-400 rounded"></div>
                        <div className="h-2 w-8 bg-gray-400 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded-sm w-full"></div>
                      <div className="mt-4 flex justify-between">
                        <div className="h-6 w-6 rounded-full bg-[#D9A566]/20"></div>
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                        <div className="h-6 w-6 rounded-full bg-[#D9A566]/20"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Property highlights document - Bottom Left */}
                <motion.div
                  initial={{ rotate: -5, y: 0 }}
                  animate={{ rotate: -8, y: 3 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2.8 
                  }}
                  className="absolute bottom-20 left-0 z-10"
                >
                  <div className="w-[180px] h-[160px] bg-[#f8f8f8] rounded-md shadow-md overflow-hidden transform origin-top-right">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/5"></div>
                    <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">PROPERTY HIGHLIGHTS</div>
                    <div className="flex flex-col gap-2 px-3 pt-10">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                        <div className="h-2 w-24 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                        <div className="h-2 w-20 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                        <div className="h-2 w-28 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex items-center mt-3">
                        <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                        <div className="h-2 w-16 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                        <div className="h-2 w-24 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Main folder in center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-[280px] h-[360px] bg-gradient-to-br from-[#D9A566] to-[#8B6839] rounded-lg shadow-2xl relative overflow-hidden transform rotate-[-2deg]">
                    {/* Folder tab */}
                    <div className="absolute top-0 right-10 w-32 h-10 bg-[#D9A566] rounded-b-lg transform translate-y-[-35%]"></div>
                    
                    {/* Folder interior */}
                    <div className="absolute top-4 left-4 right-4 bottom-4 bg-[#111111] rounded-md flex items-center justify-center overflow-hidden">
                      <div className="absolute top-4 left-4 w-40 h-1.5 bg-white/10 rounded-full"></div>
                      <div className="absolute top-10 left-4 w-24 h-1.5 bg-white/10 rounded-full"></div>
                      <div className="text-[#D9A566] text-5xl font-bold opacity-20">24K</div>
                    </div>
                  
                    {/* "PREMIUM" stamp */}
                    <div className="absolute top-8 right-12 w-24 h-24 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#D9A566]/80 flex items-center justify-center transform rotate-[-20deg] border-[3px] border-[#D9A566] text-black font-['Poppins'] font-bold text-lg tracking-wider">
                        PREMIUM
                      </div>
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