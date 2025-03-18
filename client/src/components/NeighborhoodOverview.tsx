import React from 'react';

const NeighborhoodOverview = () => {
  const neighborhoodStats = [
    {
      id: 1,
      title: "Walk Score",
      value: "98%",
      icon: "bx bxs-walk"
    },
    {
      id: 2,
      title: "School Rating",
      value: "A+",
      icon: "bx bxs-school"
    },
    {
      id: 3,
      title: "Parks Within 1km",
      value: "5",
      icon: "bx bxs-tree"
    },
    {
      id: 4,
      title: "Value Increase",
      value: "12%",
      caption: "over 12 months",
      icon: "bx bxs-upvote"
    }
  ];
  
  return (
    <section id="neighborhood" className="py-16 bg-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Poppins'] text-center uppercase mb-6 tracking-wider">
          Thornhill Woods Neighborhood
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xl font-['Titillium_Web'] text-gray-300 leading-relaxed">
            Nestled in the highly sought-after Thornhill Woods community, this property offers the perfect blend of suburban tranquility and urban convenience. Award-winning schools, picturesque parks, and premium shopping are all within minutes of your doorstep.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoodStats.map((stat) => (
            <div key={stat.id} className="bg-primary/20 rounded-lg p-6 text-center transition-transform hover:translate-y-[-5px]">
              <i className={`${stat.icon} text-[#D9A566] text-4xl mb-3`}></i>
              <h3 className="text-lg font-['Poppins'] font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-['Titillium_Web'] text-[#D9A566] font-bold">{stat.value}</p>
              {stat.caption && (
                <p className="text-sm text-gray-400 mt-1">{stat.caption}</p>
              )}
            </div>
          ))}
        </div>
        
        {/* Map section will be added here */}
        <div className="mt-16 h-96 bg-primary/30 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.4761959509288!2d-79.4742281!3d43.8387378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2ed91559c76d%3A0x7b8315da4f0bc03c!2sThornhill%20Woods%2C%20Vaughan%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1663356624389!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location Map"
            ></iframe>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-primary p-4 rounded-lg max-w-xs">
            <h4 className="text-lg font-['Poppins'] mb-2">24 Kylemount Ave</h4>
            <p className="text-sm font-['Titillium_Web'] text-gray-300">Thornhill, ON L4J 8J5</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodOverview;