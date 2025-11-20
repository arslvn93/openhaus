/**
 * Site Configuration
 * This file contains all configurable content for the website
 * Last updated: 2025-09-05T06:30:10.202Z
 */

// contactInfo configuration
export const contactInfo = {
    agent: {
      name: "Arslan Ahmed",
      photo: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757711141211-Headshot%20Arslan%20Andrew.jpg",
      phone: "(416) 655-4850",
      email: "arslan@salesgenius.co",
      company: "Executive Homes Realty Inc",
      license: "REALTOR®",
      repo: "New-Listing-886",
      companyAddress: "290 Traders Blvd E unit 1, Mississauaga, L4Z, 1W7, Canada",
      companyLogo: "https://www.executivehomesrealty.ca/files/themeManager/9607/theme28/EHRB%20Transparent.png"
    },
    agent2: {
      name: "Rick Sandhu",
      photo: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757711141211-Headshot%20Arslan%20Andrew.jpg",
      phone: "(416) 655-4850",
      email: "rick@salesgenius.co",
      company: "Sandhu Realty Inc",
      license: "REALTOR®",
    },
    social: {
      instagram: "https://instagram.com/executivehomesrealtyinc",
      facebook: "https://facebook.com/executivehomesrealtyinc",
      linkedin: "https://linkedin.com/company/executivehomesrealtyinc"
    },
  };

// galleryImages configuration
export const galleryImages = [
    {
      id: 1,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
      alt: "Open concept living room with floor-to-ceiling windows at 80 John St #2912",
      category: "interior"
    },
    {
      id: 2,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004602781-2912-80 John St-04.jpg",
      alt: "Living and dining area with southeast light at 80 John St #2912",
      category: "interior"
    },
    {
      id: 3,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004609515-2912-80 John St-14.jpg",
      alt: "Gourmet kitchen with enlarged island and built-in power at 80 John St #2912",
      category: "kitchen"
    },
    {
      id: 4,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004627198-2912-80 John St-20.jpg",
      alt: "Primary bedroom with skyline outlook at 80 John St #2912",
      category: "bedroom"
    },
    {
      id: 5,
      src: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004643105-2912-80 John St-11.jpg",
      alt: "Luxury bathroom with floor-to-ceiling tile and modern fixtures at 80 John St #2912",
      category: "bathroom"
    }
  ];

// heroVideo configuration
export const heroVideo = {
    url: "https://www.yudiz.com/codepen/studio-r/bg-video.mp4",
    type: "video/mp4",
    autoplay: true,
    loop: true,
    muted: true,
    playsInline: true
  };

// homeShowcaseSections configuration
export const homeShowcaseSections = [
    {
      id: "section1",
      title: "Glass-Framed Living",
      description: "An airy open-concept living and dining space wrapped in true floor-to-ceiling windows delivers dramatic light, clean sightlines, and effortless flow for everyday comfort and entertaining.",
      image: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004643105-2912-80 John St-11.jpg"
    },
    {
      id: "section2",
      title: "Culinary Haven",
      description: "Custom 2021 kitchen with enlarged island, storage on the seating side, and built-in outlet—perfect for prep, laptops, and hosting—finished with cohesive designer materials and fixtures.",
      image: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004602781-2912-80 John St-04.jpg",
      tags: "Custom Kitchen, Island Seating, Modern Fixtures"
    },
    {
      id: "section3",
      title: "Primary Retreat",
      description: "Quiet, well-proportioned bedroom offers serene rest with bright southeast light and easy access to a beautifully retiled bathroom featuring modern fixtures and floor-to-ceiling tile.",
      image: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004609515-2912-80 John St-14.jpg",
      tags: "Serene Bedroom, Natural Light, Modern Bathroom"
    },
    {
      id: "section4",
      title: "Productive Workspace",
      description: "A true den separates work from life—ideal for focused WFH, a guest nook, or reading lounge—without compromising the openness of the main living area.",
      image: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004643105-2912-80 John St-11.jpg",
      tags: "Home Office, Flexible Space, Private Den"
    }
  ];

// neighborhood configuration
export const neighborhood = {
    name: "Entertainment District",
    city: "Toronto",
    description: "Toronto's Entertainment District is the city's premier destination for culture, dining, and urban living, known for its vibrant atmosphere and world-class amenities.",
    highlights: [
      "Steps to theaters, dining, and entertainment venues",
      "Direct access to PATH underground walkway",
      "TTC subway and streetcar connections",
      "Walk to financial district and shopping",
      "Vibrant urban lifestyle with 95/100 walk score"
    ]
  };

// neighborhoodAmenities configuration
export const neighborhoodAmenities = [
    {
      id: 1,
      name: "Rabba Fine Foods King West",
      distance: "0.2 miles",
      category: "shopping",
      icon: "ShoppingBag"
    },
    {
      id: 2,
      name: "David Pecaut Square",
      distance: "0.1 miles",
      category: "recreation",
      icon: "Leaf"
    },
    {
      id: 3,
      name: "Ogden Junior Public School (TDSB)",
      distance: "0.6 miles",
      category: "education",
      icon: "School"
    },
    {
      id: 4,
      name: "Byblos Toronto",
      distance: "0.2 miles",
      category: "dining",
      icon: "Wine"
    },
    {
      id: 5,
      name: "Momofuku Noodle Bar",
      distance: "0.4 miles",
      category: "dining",
      icon: "Utensils"
    },
    {
      id: 6,
      name: "St Andrew Station (Line 1)",
      distance: "0.4 miles",
      category: "transportation",
      icon: "Train"
    },
    {
      id: 7,
      name: "The Adelaide Club",
      distance: "0.5 miles",
      category: "recreation",
      icon: "Users"
    },
    {
      id: 8,
      name: "PATH Financial District",
      distance: "0.4 miles",
      category: "business",
      icon: "Building"
    }
  ];

// neighborhoodStats configuration
export const neighborhoodStats = [
    {
      id: 1,
      title: "Walk Score",
      value: "95/100",
      caption: "Walker's Paradise",
      icon: "BadgeCheck",
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Transit Score",
      value: "94/100",
      caption: "Excellent Transit",
      icon: "Compass",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "School Rating",
      value: "8/10",
      caption: "Great Schools",
      icon: "School",
      color: "bg-indigo-500"
    },
    {
      id: 4,
      title: "Commute Time",
      value: "8 min",
      caption: "To Financial District",
      icon: "Clock",
      color: "bg-amber-500"
    }
  ];

// openHouseDetails configuration
export const openHouseDetails = {
    date: "",
    startTime: "",
    endTime: "",
    registerLink: "/openhouse",
    host: "Arslan Ahmed",
    phone: "(416) 655-4850",
    email: "info@80john.com",
    ctaText: "RSVP for Open House"
  };

// packageItems configuration
export const packageItems = [
    {
      id: 1,
      title: "Detailed Floor Plans",
      description: "Complete architectural layouts showing the 2 bedroom, 2 bathroom + den configuration with precise measurements and optimal room flow.",
      icon: "FileText"
    },
    {
      id: 2,
      title: "Recent Neighborhood Sales",
      description: "Comparative market analysis of recent Condo Apartment sales in the Entertainment District, showing strong demand for larger, renovated suites.",
      icon: "BarChart2"
    },
    {
      id: 3,
      title: "School District Information",
      description: "Comprehensive overview of TDSB and TCDSB options nearby, including Ogden Junior Public School and local secondary programs with ratings and enrollment details.",
      icon: "GraduationCap"
    },
    {
      id: 4,
      title: "Property Feature List",
      description: "Detailed inventory highlighting true floor-to-ceiling windows without bulkheads, cohesive $90K 2021 kitchen and bath renovation, and enlarged island with seating-side storage and built-in outlet.",
      icon: "CheckSquare"
    },
    {
      id: 5,
      title: "Utility Cost Estimates",
      description: "Estimated monthly utility expenses averaging $180 based on 1,249 sq ft, LED lighting, and efficient in-suite HVAC with programmable thermostat.",
      icon: "DollarSign"
    },
    {
      id: 6,
      title: "Local Amenities Guide",
      description: "Curated directory of shopping, dining, recreation, and entertainment within walking distance of 80 John St #2912, including insider recommendations.",
      icon: "Map"
    },
    {
      id: 7,
      title: "Home Inspection Tips",
      description: "Professional guidance focusing on the 2021 custom kitchen and fully retiled bathrooms, plus key mechanical and building systems to evaluate in a condo tower.",
      icon: "Search"
    },
    {
      id: 8,
      title: "Financing Resources",
      description: "Mortgage pre-approval resources, down payment strategies, and competitive financing options for the $1,495,000 purchase price range.",
      icon: "CreditCard"
    }
  ];

// property configuration
export const property = {
    name: "80 John St",
    address: {
      street: "88 John St #2912",
      city: "Toronto",
      state: "ON",
      zip: "M5V 3X4",
      country: "Canada"
    },
    price: "$1,495,000",
    beds: 2,
    baths: 2,
    sqft: 1249,
    lotSize: "30 x 120 ft",
    yearBuilt: 2010,
    status: "For Sale",
    description: "Sophisticated condo apartment offering turnkey urban luxury, dramatic floor-to-ceiling glazing without bulkheads, cohesive 2021 renovations, and walk-to-everything convenience in Toronto's Entertainment District.",
    shortDescription: "Turnkey luxury condo in Toronto's Entertainment District with parking",
    propertyType: "Condo Apartment",
    heroImage: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
    heroCaption: "Turnkey luxury condo in Toronto's Entertainment District with parking",
    mapLocation: {
      lat: 43.7,
      lng: -79.4
    },
    virtualTourAvailable: true,
    virtualTourUrl: "https://tours.openhousemedia.ca/sites/80-john-st-2912-toronto-on-m5v-3x4-15850296/branded"
  };

// propertyFeatures configuration
export const propertyFeatures = [
    {
      id: 1,
      title: "Custom-designed kitchen with enlarged island, seating-side cabinet storage, and integrated power outlet for seamless cooking, work, and entertaining",
      description: "Custom-designed kitchen with enlarged island, seating-side cabinet storage, and integrated power outlet for seamless cooking, work, and entertaining",
      icon: "CheckCircle"
    },
    {
      id: 2,
      title: "Open-concept living and dining framed by true floor-to-ceiling glazing for maximum light, bigger views, and dramatic first impressions",
      description: "Open-concept living and dining framed by true floor-to-ceiling glazing for maximum light, bigger views, and dramatic first impressions",
      icon: "CheckCircle"
    },
    {
      id: 3,
      title: "Primary bedroom with generous proportions and bright southeast outlook for calm, comfortable rest",
      description: "Primary bedroom with generous proportions and bright southeast outlook for calm, comfortable rest",
      icon: "CheckCircle"
    },
    {
      id: 4,
      title: "Designer-renovated bathrooms fully retiled floor-to-ceiling with new vanities, fixtures, and toilets for a luxe, cohesive look",
      description: "Designer-renovated bathrooms fully retiled floor-to-ceiling with new vanities, fixtures, and toilets for a luxe, cohesive look",
      icon: "CheckCircle"
    },
    {
      id: 5,
      title: "Functional den offering a quiet, dedicated workspace or guest nook without compromising main living areas",
      description: "Functional den offering a quiet, dedicated workspace or guest nook without compromising main living areas",
      icon: "CheckCircle"
    },
    {
      id: 6,
      title: "Energy-efficient double-pane curtain-wall glazing and predominantly LED lighting for comfort and lower operating costs",
      description: "Energy-efficient double-pane curtain-wall glazing and predominantly LED lighting for comfort and lower operating costs",
      icon: "CheckCircle"
    },
    {
      id: 7,
      title: "Individually controlled in-suite HVAC with programmable thermostat for year-round climate control",
      description: "Individually controlled in-suite HVAC with programmable thermostat for year-round climate control",
      icon: "CheckCircle"
    },
    {
      id: 8,
      title: "Rare no-bulkhead design in principal rooms delivering uninterrupted glass and skyline wow factor",
      description: "Rare no-bulkhead design in principal rooms delivering uninterrupted glass and skyline wow factor",
      icon: "CheckCircle"
    },
    {
      id: 9,
      title: "Consistent, designer-level finish across kitchen and baths elevating the entire home's feel",
      description: "Consistent, designer-level finish across kitchen and baths elevating the entire home's feel",
      icon: "CheckCircle"
    },
    {
      id: 10,
      title: "143 sq ft balcony sized for real outdoor living—dining, lounging, and entertaining",
      description: "143 sq ft balcony sized for real outdoor living—dining, lounging, and entertaining",
      icon: "CheckCircle"
    },
    {
      id: 11,
      title: "Parking and owned locker provide turnkey downtown convenience and storage",
      description: "Parking and owned locker provide turnkey downtown convenience and storage",
      icon: "CheckCircle"
    },
    {
      id: 12,
      title: "Pre-wired for high-speed internet and smart-home ready for easy thermostat, lock, and lighting upgrades",
      description: "Pre-wired for high-speed internet and smart-home ready for easy thermostat, lock, and lighting upgrades",
      icon: "CheckCircle"
    },
    {
      id: 13,
      title: "Southeast exposure balances natural light and privacy without harsh late-afternoon glare",
      description: "Southeast exposure balances natural light and privacy without harsh late-afternoon glare",
      icon: "CheckCircle"
    },
    {
      id: 14,
      title: "Cohesive 2021 renovation investment (~$90K) minimizing future maintenance and upgrade needs",
      description: "Cohesive 2021 renovation investment (~$90K) minimizing future maintenance and upgrade needs",
      icon: "CheckCircle"
    }
  ];

// siteBranding configuration
export const siteBranding = {
    logoUrl: "/logo.svg",
    colors: {
      primary: "#D9A566"
    },
    footer: {
      copyrightText: "© 2024 80 John St. All rights reserved.",
      disclaimer: "This website is for informational purposes only. Details are subject to change.",
      privacyPolicyUrl: ""
    }
  };

// siteMetadata configuration
export const siteMetadata = {
    title: "80 John St #2912 | Turnkey Luxury Condo | Downtown Toronto",
    description: "Turnkey 2+Den condo with no-bulkhead floor-to-ceiling windows, $90K 2021 renovation, 143 sf balcony, and parking in the Entertainment District. Book a tour.",
    keywords: "condo apartment, Toronto real estate, Entertainment District, luxury condo, floor-to-ceiling windows, 2 bed plus den, parking included, virtual tour, $1,495,000",
    ogImage: "https://salesgenius.s3.ca-central-1.amazonaws.com/uploads/1757004589506-2912-80 John St-01.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    canonical: "https://80john.com"
  };

// formAutomations configuration
export const formAutomations = {
  crmLeadParsingEmail: '',
  sgApiKey: ''
};

// formQuestions configuration
export const formQuestions = [
  {
    id: 1,
    key: 'buyingTimeline',
    question: 'When are you looking to buy?',
    order: 1,
    options: [
      { value: 'immediately', label: 'Immediately', emoji: '🚀' },
      { value: '1-3months', label: '1-3 months', emoji: '📅' },
      { value: '3-6months', label: '3-6 months', emoji: '⏰' },
      { value: '6+months', label: '6+ months', emoji: '🔮' },
      { value: 'just-exploring', label: 'Just exploring', emoji: '👀' }
    ]
  },
  {
    id: 2,
    key: 'propertyType',
    question: 'What type of property interests you?',
    order: 2,
    options: [
      { value: 'house', label: 'Single Family Home', emoji: '🏠' },
      { value: 'condo', label: 'Condo/Apartment', emoji: '🏢' },
      { value: 'townhouse', label: 'Townhouse', emoji: '🏘️' },
      { value: 'investment', label: 'Investment Property', emoji: '💼' },
      { value: 'any', label: 'Open to anything', emoji: '✨' }
    ]
  }
];

// testimonials configuration
export const testimonials = [
    {
      id: 1,
      name: "David Chen",
      role: "Recent Homebuyer",
      content: "Arslan Ahmed guided us to a suite that feels bigger than the square footage. The true floor-to-ceiling windows and cohesive renovation were exactly what we wanted—plus parking in the heart of the city.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Jennifer Liu",
      role: "Interior Designer",
      content: "The rare no-bulkhead glazing and consistent materials across the kitchen and baths show thoughtful design. The enlarged island with built-in power is both elegant and incredibly functional. Arslan presented every detail clearly.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Mark Williams",
      role: "Neighborhood Resident",
      content: "Living in the Entertainment District, you appreciate walkability to theatres, TTC, and PATH. Suites like this, with real outdoor space and parking, are special. Arslan knows how to highlight what matters here.",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 5
    }
  ];

