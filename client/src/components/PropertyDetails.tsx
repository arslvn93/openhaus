const PropertyDetails = () => {
  const propertyFeatures = [
    {
      icon: 'bxs-building-house',
      title: 'Property Overview',
      details: [
        { label: 'Type', value: 'Single Family Home' },
        { label: 'Year Built', value: '2018' },
        { label: 'Lot Size', value: '0.75 Acres' },
        { label: 'Square Footage', value: '4,850 sq ft' },
      ]
    },
    {
      icon: 'bxs-home',
      title: 'Interior Features',
      details: [
        { label: 'Bedrooms', value: '5' },
        { label: 'Bathrooms', value: '4.5' },
        { label: 'Flooring', value: 'Hardwood, Marble' },
        { label: 'Heating/Cooling', value: 'Central HVAC' },
      ]
    },
    {
      icon: 'bxs-tree',
      title: 'Exterior & Community',
      details: [
        { label: 'Parking', value: '3 Car Garage' },
        { label: 'Outdoor', value: 'Pool, Patio, Garden' },
        { label: 'View', value: 'City, Mountain' },
        { label: 'School District', value: 'Hillcrest District' },
      ]
    }
  ];

  return (
    <section id="details" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">PROPERTY DETAILS</span>
          <h2 className="text-4xl font-['Poppins'] uppercase tracking-wider">123 Hillcrest Avenue</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyFeatures.map((feature, index) => (
            <div key={index} className="bg-primary/50 p-6 rounded-lg fade-in">
              <div className="flex items-center mb-4">
                <i className={`bx ${feature.icon} text-[#D9A566] text-3xl mr-3`}></i>
                <h3 className="text-xl font-['Poppins']">{feature.title}</h3>
              </div>
              <ul className="space-y-3 font-['Titillium_Web']">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-gray-400">{detail.label}:</span>
                    <span>{detail.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Open House Info */}
        <div className="mt-16 bg-primary/80 rounded-lg p-8 fade-in">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-['Poppins'] mb-3">Open House Information</h3>
              <p className="font-['Titillium_Web'] text-lg mb-6">
                Don't miss this exclusive opportunity to tour one of the most desirable properties in Hillcrest Estates. Refreshments will be served.
              </p>
              
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center">
                  <i className='bx bxs-calendar text-[#D9A566] text-2xl mr-3'></i>
                  <div>
                    <h4 className="font-['Poppins']">Date & Time</h4>
                    <p className="font-['Titillium_Web']">May 15, 2023 • 1:00-4:00PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className='bx bxs-map text-[#D9A566] text-2xl mr-3'></i>
                  <div>
                    <h4 className="font-['Poppins']">Location</h4>
                    <p className="font-['Titillium_Web']">123 Hillcrest Avenue, Beverly Hills, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className='bx bxs-user text-[#D9A566] text-2xl mr-3'></i>
                  <div>
                    <h4 className="font-['Poppins']">Hosted By</h4>
                    <p className="font-['Titillium_Web']">Sarah Johnson, Luxury Estates Agent</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="inline-block bg-[#D9A566] text-white font-['Poppins'] px-6 py-3 rounded-lg hover:bg-[#D9A566]/80 transition-colors"
              >
                RSVP for Open House
              </a>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80" 
                className="w-full h-64 md:h-full object-cover rounded-lg" 
                alt="Property Exterior" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
