import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Myless went above and beyond to help us find our dream home. His knowledge of the Thornhill market is exceptional, and he made the entire process smooth and stress-free.",
      name: "Michael & Sarah Johnson",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      quote: "Working with Myless was the best decision we made. He provided insights about the neighborhood that we wouldn't have known otherwise and got us the best possible price.",
      name: "Jennifer Chen",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      quote: "As first-time home buyers, we had countless questions. Myless was patient, informative, and truly advocated for our interests. I couldn't recommend him more highly!",
      name: "David & Emily Rodriguez",
      avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];
  
  return (
    <section id="testimonials" className="py-16 bg-[#1E293B]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Poppins'] text-center uppercase mb-12 tracking-wider">
          What My Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-primary/30 rounded-lg p-8 shadow-lg transition-transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <h3 className="font-['Poppins']">{testimonial.name}</h3>
              </div>
              
              <div className="relative">
                <i className="bx bxs-quote-left text-[#D9A566] text-4xl absolute -top-6 -left-2 opacity-30"></i>
                <p className="font-['Titillium_Web'] text-gray-300 italic relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="mt-4 flex">
                {Array(5).fill(0).map((_, i) => (
                  <i key={i} className="bx bxs-star text-[#D9A566] text-lg"></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;