import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Navigation = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-sm' : ''}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white font-['Poppins'] text-xl tracking-wider">
          LUXURY<span className="text-[#D9A566]">ESTATES</span>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#property" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Property</a></li>
            <li><a href="#details" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Details</a></li>
            <li><a href="#gallery" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Gallery</a></li>
            <li><a href="#location" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Location</a></li>
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
          <li><a href="#property" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Property</a></li>
          <li><a href="#details" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Details</a></li>
          <li><a href="#gallery" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Gallery</a></li>
          <li><a href="#location" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Location</a></li>
          <li><a href="#contact" className="text-white hover:text-[#D9A566] transition-colors font-['Titillium_Web'] tracking-wide">Contact</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
