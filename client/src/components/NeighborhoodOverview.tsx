import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Map, Building, School, Trees, TrendingUp, Navigation, Coffee, ShoppingBag } from 'lucide-react';

interface NeighborhoodStat {
  id: number;
  title: string;
  value: string;
  caption?: string;
  icon: React.ReactNode;
  color: string;
}

interface Amenity {
  id: number;
  name: string;
  distance: string;
  category: 'shopping' | 'dining' | 'education' | 'recreation';
  icon: React.ReactNode;
}

const NeighborhoodOverview = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const neighborhoodStats: NeighborhoodStat[] = [
    {
      id: 1,
      title: "Walk Score",
      value: "98",
      icon: <Navigation className="h-8 w-8" />,
      color: "#D9A566"
    },
    {
      id: 2,
      title: "School Rating",
      value: "A+",
      icon: <School className="h-8 w-8" />,
      color: "#6AADDA"
    },
    {
      id: 3,
      title: "Parks Within 1km",
      value: "5",
      icon: <Trees className="h-8 w-8" />,
      color: "#7AC279"
    },
    {
      id: 4,
      title: "Value Increase",
      value: "12%",
      caption: "over 12 months",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "#E06469"
    }
  ];
  
  const nearbyAmenities: Amenity[] = [
    {
      id: 1,
      name: "Thornhill Mall",
      distance: "0.7 km",
      category: "shopping",
      icon: <ShoppingBag className="h-5 w-5" />
    },
    {
      id: 2,
      name: "Starbucks",
      distance: "0.3 km",
      category: "dining",
      icon: <Coffee className="h-5 w-5" />
    },
    {
      id: 3,
      name: "Thornhill Secondary School",
      distance: "1.1 km",
      category: "education",
      icon: <School className="h-5 w-5" />
    },
    {
      id: 4,
      name: "Thornhill Community Center",
      distance: "0.8 km",
      category: "recreation",
      icon: <Building className="h-5 w-5" />
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section id="neighborhood" className="py-20 bg-primary from-left">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-['Poppins'] uppercase mb-3 tracking-wider text-white">
            Neighborhood
          </h2>
          <div className="w-24 h-1 bg-[#D9A566] mx-auto mb-6"></div>
          <p className="text-white/80 font-['Titillium_Web'] max-w-3xl mx-auto text-lg leading-relaxed">
            Nestled in the highly sought-after Thornhill Woods community, 24 Kylemount Ave offers the perfect blend of suburban tranquility and urban convenience.
          </p>
        </div>
        
        {/* Stats section with radial gradient cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {neighborhoodStats.map((stat) => (
            <motion.div 
              key={stat.id} 
              variants={itemVariants}
              className="relative rounded-xl p-8 text-center bg-black/50 backdrop-blur-sm border border-white/5 shadow-xl overflow-hidden"
            >
              {/* Subtle radial gradient background */}
              <div 
                className="absolute inset-0 opacity-20 z-0" 
                style={{ 
                  background: `radial-gradient(circle at center, ${stat.color}50 0%, transparent 70%)`,
                  filter: 'blur(10px)'
                }}
              />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                  <div className="text-white" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-['Poppins'] font-medium mb-2 text-white/90">
                  {stat.title}
                </h3>
                
                <p className="text-3xl font-['Poppins'] font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                
                {stat.caption && (
                  <p className="text-sm text-white/60 mt-1 font-['Titillium_Web']">
                    {stat.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Map and amenities section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column with amenities */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-xl">
              <h3 className="text-2xl font-['Poppins'] text-white mb-4 flex items-center">
                <Map className="mr-2 h-5 w-5 text-[#D9A566]" /> 
                Nearby Amenities
              </h3>
              
              <div className="space-y-4">
                {nearbyAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center border-b border-white/10 pb-3 last:border-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D9A566]/20 flex items-center justify-center text-[#D9A566]">
                      {amenity.icon}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-['Poppins'] text-base">{amenity.name}</h4>
                      <p className="text-white/60 font-['Titillium_Web'] text-sm">{amenity.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-xl">
              <h3 className="text-2xl font-['Poppins'] text-white mb-4">Address</h3>
              <div className="space-y-2 text-white/80 font-['Titillium_Web']">
                <p>24 Kylemount Ave</p>
                <p>Thornhill, ON L4J 8J5</p>
                <p className="pt-2 text-[#D9A566]">Thornhill Woods</p>
              </div>
              
              <div className="mt-6">
                <a 
                  href="https://maps.google.com/?q=24+Kylemount+Ave+Thornhill+ON" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#D9A566] hover:bg-[#D9A566]/80 text-white py-2 px-4 rounded-lg font-['Poppins'] text-sm transition-colors duration-300"
                >
                  <Navigation className="w-4 h-4" /> 
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Right column with map */}
          <motion.div 
            ref={mapRef}
            className="lg:col-span-2 rounded-xl overflow-hidden shadow-xl border border-white/5 relative"
            style={{ height: "462px", zIndex: 1 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.4761959509288!2d-79.4742281!3d43.8387378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2ed91559c76d%3A0x7b8315da4f0bc03c!2sThornhill%20Woods%2C%20Vaughan%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1663356624389!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: "relative" }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location Map"
              className="grayscale contrast-125 opacity-90"
            ></iframe>
          </motion.div>
        </div>
        
        {/* Neighborhood description */}
        <motion.div 
          className="mt-16 bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-8 shadow-xl relative"
          style={{ zIndex: 2 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-['Poppins'] text-white mb-4">About Thornhill Woods</h3>
              <div className="space-y-4 text-white/80 font-['Titillium_Web']">
                <p>Thornhill Woods is one of the most coveted neighborhoods in the Greater Toronto Area, known for its family-friendly atmosphere and luxury homes.</p>
                <p>The community features award-winning schools, picturesque parks, and premium shopping, all within minutes of your doorstep.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-['Poppins'] text-white mb-4">Neighborhood Highlights</h3>
              <ul className="space-y-2 text-white/80 font-['Titillium_Web']">
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-[#D9A566] rounded-full mr-2"></span>
                  Easy access to Highway 407 and public transit
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-[#D9A566] rounded-full mr-2"></span>
                  Multiple parks and walking trails
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-[#D9A566] rounded-full mr-2"></span>
                  Top-rated schools within walking distance
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-[#D9A566] rounded-full mr-2"></span>
                  Shopping centers with premium retailers
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-[#D9A566] rounded-full mr-2"></span>
                  Safe, family-oriented community
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeighborhoodOverview;