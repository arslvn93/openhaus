import React from 'react';

const ExclusivePackage = () => {
  const packageItems = [
    {
      id: 1,
      title: "Detailed Floor Plans",
      icon: "bx bxs-home"
    },
    {
      id: 2,
      title: "Recent Neighborhood Sales",
      icon: "bx bxs-bar-chart-alt-2"
    },
    {
      id: 3,
      title: "School District Information",
      icon: "bx bxs-graduation"
    },
    {
      id: 4,
      title: "Property Feature List",
      icon: "bx bxs-check-shield"
    },
    {
      id: 5,
      title: "Utility Cost Estimates",
      icon: "bx bxs-dollar-circle"
    },
    {
      id: 6,
      title: "Local Amenities Guide",
      icon: "bx bxs-map"
    },
    {
      id: 7,
      title: "Home Inspection Tips",
      icon: "bx bxs-search"
    },
    {
      id: 8,
      title: "Financing Resources",
      icon: "bx bxs-bank"
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
    <section id="package" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Poppins'] text-center uppercase mb-6 tracking-wider">
          Your Exclusive Home Package
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xl font-['Titillium_Web'] text-gray-300 leading-relaxed">
            Request your complimentary home package that includes everything you need to know about this property and the surrounding area to make an informed decision.
          </p>
        </div>
        
        <div className="bg-primary-foreground rounded-lg p-8 max-w-4xl mx-auto shadow-lg border border-gray-800">
          <h3 className="text-2xl font-['Poppins'] mb-6 text-center">Package Includes</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {packageItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#D9A566]/20 flex items-center justify-center mb-3">
                  <i className={`${item.icon} text-[#D9A566] text-2xl`}></i>
                </div>
                <p className="font-['Titillium_Web']">{item.title}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <button 
              onClick={scrollToForm}
              className="bg-[#D9A566] text-white font-['Poppins'] px-8 py-4 rounded-lg hover:bg-[#D9A566]/80 transition-colors text-lg tracking-wider uppercase"
            >
              Request Your Package Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusivePackage;