import React from 'react';

const HomeHighlights = () => {
  return (
    <section id="highlights" className="py-16 bg-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Poppins'] text-center uppercase mb-12 tracking-wider">
          Home Highlights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kitchen Feature */}
          <div className="bg-primary/5 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Gourmet Kitchen" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] uppercase tracking-wide mb-3">Gourmet Kitchen</h3>
              <p className="font-['Titillium_Web'] text-gray-300">
                Custom maple cabinetry, granite countertops, and high-end stainless steel appliances including a 6-burner gas range and French door refrigerator.
              </p>
            </div>
          </div>
          
          {/* Primary Suite Feature */}
          <div className="bg-primary/5 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Primary Suite" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] uppercase tracking-wide mb-3">Primary Suite</h3>
              <p className="font-['Titillium_Web'] text-gray-300">
                Spacious retreat with tray ceiling, sitting area, walk-in closet with custom organization system, and spa-inspired en-suite with soaker tub.
              </p>
            </div>
          </div>
          
          {/* Backyard Feature */}
          <div className="bg-primary/5 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80" 
                alt="Private Backyard" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] uppercase tracking-wide mb-3">Private Backyard</h3>
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