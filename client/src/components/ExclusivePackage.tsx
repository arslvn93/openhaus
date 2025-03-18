import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, BarChart2, GraduationCap, CheckSquare, 
  DollarSign, Map, Search, CreditCard 
} from 'lucide-react';

const ExclusivePackage = () => {
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
    <section id="package" className="py-20 bg-black">
      {/* LIMITED OPPORTUNITY Banner */}
      <div className="w-full bg-[#D9A566] text-white py-3 mb-16 text-center font-['Poppins'] text-sm md:text-base">
        <div className="container mx-auto px-4">
          <span className="font-bold">LIMITED OPPORTUNITY:</span> Receive a detailed neighborhood analysis with your exclusive home package!
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] text-white uppercase mb-4 tracking-wider">
            Your Exclusive Home Package
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl font-['Titillium_Web'] text-white/70 leading-relaxed">
              Request your complimentary home package with everything you need to know about this premium property.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 p-8 lg:p-10 max-w-5xl mx-auto shadow-2xl"
        >          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {packageItems.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-md bg-black border border-white/10 flex items-center justify-center mb-4 shadow-md">
                  <div className="text-[#D9A566]">{item.icon}</div>
                </div>
                <p className="font-['Titillium_Web'] text-white/90 text-sm lg:text-base">{item.title}</p>
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
            <button 
              onClick={scrollToForm}
              className="bg-[#D9A566] text-black font-['Poppins'] px-8 py-3 rounded-md hover:bg-[#D9A566]/90 transition-colors text-lg tracking-wider uppercase shadow-lg"
            >
              Request Your Package
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusivePackage;