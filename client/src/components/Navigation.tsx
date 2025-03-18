import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Navigation = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [stickyBanner, setStickyBanner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Main navigation becomes opaque when scrolled
      setScrolled(window.scrollY > 50);
      
      // Banner becomes sticky when scrolled past 300px
      setStickyBanner(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const closeBanner = () => {
    setBannerVisible(false);
  };

  return (
    <>
      {/* Limited Opportunity Banner */}
      {bannerVisible && (
        <div className={`w-full bg-[#D9A566] text-white py-3 text-center font-['Poppins'] text-sm md:text-base z-[60] transition-all duration-300 ${stickyBanner ? 'fixed top-0 left-0 shadow-md' : ''}`}>
          <div className="container mx-auto px-4 relative">
            <span className="font-bold">LIMITED OPPORTUNITY:</span> Receive a detailed neighborhood analysis with your exclusive home package!
            <button 
              onClick={closeBanner}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 text-xl"
              aria-label="Close banner"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      
      {/* Main Navigation */}
      <header className={`fixed ${bannerVisible && stickyBanner ? 'top-12' : 'top-0'} left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-sm' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white font-['Poppins'] text-xl tracking-wider">
            <span className="text-white">OPEN HOUSE:</span> <span className="text-[#D9A566]">24 KYLEMOUNT AVE</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#property" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Home</a></li>
              <li><a href="#highlights" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Highlights</a></li>
              <li><a href="#gallery" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Gallery</a></li>
              <li><a href="#neighborhood" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Neighborhood</a></li>
              <li><a href="#package" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Package</a></li>
              <li><a href="#contact" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Contact</a></li>
            </ul>
          </nav>
          
          <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
            <i className='bx bx-menu'></i>
          </button>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={`bg-primary/95 w-full absolute top-full left-0 py-4 transition-all duration-300 ${
            mobileMenuVisible ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          <ul className="flex flex-col items-center space-y-4">
            <li><a href="#property" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Home</a></li>
            <li><a href="#highlights" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Highlights</a></li>
            <li><a href="#gallery" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Gallery</a></li>
            <li><a href="#neighborhood" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Neighborhood</a></li>
            <li><a href="#package" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Package</a></li>
            <li><a href="#contact" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Contact</a></li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navigation;
