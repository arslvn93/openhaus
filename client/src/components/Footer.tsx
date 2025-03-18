const Footer = () => {
  return (
    <footer className="py-10 bg-secondary/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-white font-['Poppins'] text-xl tracking-wider">
              LUXURY<span className="text-[#D9A566]">ESTATES</span>
            </a>
            <p className="font-['Titillium_Web'] text-sm mt-2 text-gray-400">Luxury Real Estate Specialists</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <a href="#property" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web']">Property</a>
            <a href="#details" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web']">Details</a>
            <a href="#gallery" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web']">Gallery</a>
            <a href="#location" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web']">Location</a>
            <a href="#contact" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web']">Contact</a>
          </div>
          
          <div className="flex gap-4 mt-6 md:mt-0">
            <a href="#" className="text-white hover:text-[#D9A566] transition-colors">
              <i className='bx bxl-facebook text-2xl'></i>
            </a>
            <a href="#" className="text-white hover:text-[#D9A566] transition-colors">
              <i className='bx bxl-instagram text-2xl'></i>
            </a>
            <a href="#" className="text-white hover:text-[#D9A566] transition-colors">
              <i className='bx bxl-linkedin text-2xl'></i>
            </a>
            <a href="#" className="text-white hover:text-[#D9A566] transition-colors">
              <i className='bx bxl-youtube text-2xl'></i>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-['Titillium_Web'] text-sm text-gray-400">&copy; {new Date().getFullYear()} Luxury Estates. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="font-['Titillium_Web'] text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="font-['Titillium_Web'] text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="font-['Titillium_Web'] text-sm text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
