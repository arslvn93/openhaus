const PropertyShowcase = () => {
  return (
    <section id="property" className="events-page pt-16">
      <div id="section1" className="event relative">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">OPEN HOUSE</span>
            <h2 className="text-3xl md:text-2xl sm:text-xl font-['Poppins'] uppercase tracking-wider mb-4">Living Room</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Spacious living area with floor-to-ceiling windows and panoramic views of the city skyline.
            </p>
            <div className="mt-8">
              <span className="inline-flex items-center bg-[#4CAF50]/20 text-[#4CAF50] px-3 py-1 rounded font-['Titillium_Web']">
                <i className='bx bxs-calendar mr-2'></i> May 15, 2023 • 1:00-4:00PM
              </span>
            </div>
          </div>
          <div className="image" id="loaderVideo">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover object-center absolute top-0 left-0">
              <source src="https://www.yudiz.com/codepen/studio-r/bg-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="scrollBtn absolute bottom-[2.5%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <h6 className="text-sm font-['Titillium_Web'] uppercase tracking-widest">scroll</h6>
          <span></span>
        </div>
        
        {/* Property quick info card */}
        <div className="absolute bottom-8 left-8 bg-primary/80 backdrop-blur-sm p-5 rounded-lg z-20 max-w-xs hidden md:block">
          <h3 className="text-lg font-['Poppins'] uppercase mb-2">123 Hillcrest Avenue</h3>
          <div className="flex justify-between text-sm font-['Titillium_Web'] mb-2">
            <span>5 Bedrooms</span>
            <span>4.5 Baths</span>
          </div>
          <div className="flex justify-between text-sm font-['Titillium_Web']">
            <span>4,850 sq ft</span>
            <span className="text-[#D9A566]">$3,950,000</span>
          </div>
        </div>
      </div>
      
      <div id="section2" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">CHEF'S DREAM</span>
            <h2 className="text-3xl md:text-2xl sm:text-xl font-['Poppins'] uppercase tracking-wider mb-4">Kitchen</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Gourmet kitchen with custom cabinetry, high-end appliances, and a spacious center island.
            </p>
          </div>
          <div className="image"></div>
        </div>
      </div>
      
      <div id="section3" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">MASTER SUITE</span>
            <h2 className="text-3xl md:text-2xl sm:text-xl font-['Poppins'] uppercase tracking-wider mb-4">Bedroom</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Luxurious primary suite with private balcony, walk-in closet, and spa-like en-suite bathroom.
            </p>
          </div>
          <div className="image"></div>
        </div>
      </div>
      
      <div id="section4" className="event">
        <div className="pinWrapper">
          <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-[100px] w-5/12 z-10 md:w-2/5 sm:translate-x-[40px]">
            <span className="text-[#D9A566] font-['Titillium_Web'] tracking-widest inline-block mb-2">WORK FROM HOME</span>
            <h2 className="text-3xl md:text-2xl sm:text-xl font-['Poppins'] uppercase tracking-wider mb-4">Office</h2>
            <p className="text-4xl md:text-3xl sm:text-xl font-['Titillium_Web'] font-extralight leading-tight">
              Dedicated home office with built-in shelving, natural lighting, and peaceful garden views.
            </p>
          </div>
          <div className="image"></div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
