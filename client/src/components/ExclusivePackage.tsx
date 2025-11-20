import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
// @ts-ignore - JS config module without types
import { property, siteBranding, contactInfo } from '../config/siteConfig';
import { FileText, BarChart2, GraduationCap, CheckSquare, DollarSign, Map, Search, CreditCard, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Default package items fallback
const defaultPackageItems = [
  {
    id: 1,
    title: 'Detailed Floor Plans',
    description: 'Complete architectural layouts showing room dimensions and optimal flow',
    icon: 'FileText'
  },
  {
    id: 2,
    title: 'Market Analysis',
    description: 'Recent sales data and pricing trends in the area',
    icon: 'BarChart2'
  },
  {
    id: 3,
    title: 'School Information',
    description: 'Local schools, ratings, and enrollment details',
    icon: 'GraduationCap'
  },
  {
    id: 4,
    title: 'Property Features',
    description: 'Detailed list of all property features and amenities',
    icon: 'CheckSquare'
  },
  {
    id: 5,
    title: 'Utility Cost Estimates',
    description: 'Estimated monthly utility and maintenance expenses',
    icon: 'DollarSign'
  },
  {
    id: 6,
    title: 'Area Amenities',
    description: 'Nearby shops, restaurants, and services',
    icon: 'Map'
  },
  {
    id: 7,
    title: 'Home Inspection Tips',
    description: 'What to look for during property viewing',
    icon: 'Search'
  },
  {
    id: 8,
    title: 'Financing Resources',
    description: 'Mortgage options and payment calculators',
    icon: 'CreditCard'
  }
];

// Map of icon names to their respective components
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8" />,
  BarChart2: <BarChart2 className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  CheckSquare: <CheckSquare className="w-8 h-8" />,
  DollarSign: <DollarSign className="w-8 h-8" />,
  Map: <Map className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
  CreditCard: <CreditCard className="w-8 h-8" />
};

// Phone formatting helper
const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

interface FormQuestion {
  id: number;
  key: string;
  question: string;
  order: number;
  options: Array<{ value: string; label: string; emoji: string }>;
}

const ExclusivePackage = () => {
  const { toast } = useToast();
  const [showSticky, setShowSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [packageItems, setPackageItems] = useState(defaultPackageItems);
  const [formQuestions, setFormQuestions] = useState<FormQuestion[]>([]);
  const [formAutomations, setFormAutomations] = useState<{ crmLeadParsingEmail: string; sgApiKey: string }>({
    crmLeadParsingEmail: '',
    sgApiKey: ''
  });
  
  // Load packageItems from config or use defaults
  useEffect(() => {
    const loadPackageItems = async () => {
      try {
        const config = await import('../config/siteConfig');
        if (config.packageItems && Array.isArray(config.packageItems)) {
          setPackageItems(config.packageItems);
        }
      } catch (error) {
        console.log('Using default package items');
      }
    };
    loadPackageItems();
  }, []);
  
  // Load formQuestions from config
  useEffect(() => {
    const loadFormQuestions = async () => {
      try {
        const config = await import('../config/siteConfig');
        if (config.formQuestions && Array.isArray(config.formQuestions)) {
          const sortedQuestions = [...config.formQuestions].sort((a, b) => a.order - b.order);
          setFormQuestions(sortedQuestions);
        }
      } catch (error) {
        console.log('Using default form questions');
      }
    };
    loadFormQuestions();
  }, []);
  
  // Load formAutomations from config
  useEffect(() => {
    const loadFormAutomations = async () => {
      try {
        const config = await import('../config/siteConfig');
        if (config.formAutomations) {
          setFormAutomations({
            crmLeadParsingEmail: config.formAutomations?.crmLeadParsingEmail || '',
            sgApiKey: config.formAutomations?.sgApiKey || ''
          });
        }
      } catch (error) {
        console.log('Using default form automations');
      }
    };
    loadFormAutomations();
  }, []);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  // Build dynamic formData state based on formQuestions
  const buildInitialFormData = (questions: FormQuestion[]) => {
    const baseData: any = {
      email: '',
      name: '',
      phone: '',
      consent: false
    };
    // Add a field for each question key
    questions.forEach(q => {
      baseData[q.key] = '';
    });
    return baseData;
  };
  
  // Multi-step form state
  const [formStep, setFormStep] = useState(1); // 1 = email, 2 = name+phone+consent, 3+ = questions, last = success
  const [formData, setFormData] = useState(buildInitialFormData([]));
  
  // Update formData when formQuestions change
  useEffect(() => {
    setFormData(buildInitialFormData(formQuestions));
    // Reset form step if questions change
    setFormStep(1);
  }, [formQuestions]);
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [validFields, setValidFields] = useState({
    email: false,
    name: false,
    phone: false,
    consent: false
  });
  
  // Validate fields in real-time
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = formData.phone.replace(/\D/g, '');
    
    setValidFields({
      email: emailRegex.test(formData.email),
      name: formData.name.trim().length >= 2,
      phone: phoneClean.length >= 10,
      consent: formData.consent
    });
  }, [formData]);
  
  useEffect(() => {
    // Get header height for correct sticky banner placement
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
    
    const handleScroll = () => {
      const gallerySection = document.getElementById('gallery');
      const neighborhoodSection = document.getElementById('neighborhood');
      
      if (gallerySection && neighborhoodSection) {
        const galleryRect = gallerySection.getBoundingClientRect();
        const neighborhoodRect = neighborhoodSection.getBoundingClientRect();
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        // Show sticky banner when we scroll past the gallery section
        // Hide it when we scroll past the neighborhood section
        if (galleryRect.top <= headerHeight && neighborhoodRect.bottom > headerHeight) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // API Mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: typeof formData) => {
      // Build questions array from formQuestions config
      const questions = formQuestions
        .filter(q => data[q.key]) // Only include answered questions
        .map(q => {
          // Find the option that matches the selected value
          const selectedOption = q.options.find(opt => opt.value === data[q.key]);
          return {
            question: q.question,
            answer: selectedOption ? selectedOption.label : data[q.key]
          };
        });

      const leadPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        questions: questions,
        source: 'Exclusive Package',
        repo: contactInfo.agent?.repo || '',
        agentEmail: contactInfo.agent?.email || '',
        propertyAddress: property?.address || undefined,
        crmLeadParsingEmail: formAutomations?.crmLeadParsingEmail || '',
        sgApiKey: formAutomations?.sgApiKey || ''
      };
      return apiRequest('POST', '/api/leads', leadPayload);
    },
    onSuccess: () => {
      setFormStep(2 + formQuestions.length + 1); // Show success state (after all questions)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });
  
  // Handle Step 1 -> Step 2 (Email validated, show Name & Phone)
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validFields.email) return;
    setFormStep(2);
    
    // Focus name field after animation
    setTimeout(() => {
      document.getElementById('name-input')?.focus();
    }, 300);
  };
  
  // Handle Step 2 -> Step 3 (Move to questions)
  const handleContinueToQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validFields.name || !validFields.phone || !validFields.consent) return;
    // If no questions, submit directly
    if (formQuestions.length === 0) {
      mutation.mutate(formData);
    } else {
      setFormStep(3); // Go to first question
    }
  };
  
  // Handle question selection with auto-advance
  const handleQuestionSelect = (questionKey: string, value: string) => {
    setFormData(prev => ({ ...prev, [questionKey]: value }));
    
    // Find current question index
    const currentQuestionIndex = formQuestions.findIndex(q => q.key === questionKey);
    
    // Auto-advance after selection with smooth delay
    setTimeout(() => {
      if (currentQuestionIndex !== -1) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < formQuestions.length) {
          // Go to next question
          setFormStep(3 + nextQuestionIndex);
        } else {
          // All questions answered, go to success
          setFormStep(3 + formQuestions.length);
        }
      }
    }, 400); // Slight delay for visual feedback
  };
  
  // Auto-submit when all questions are answered
  useEffect(() => {
    if (formQuestions.length === 0) return; // No questions to answer
    
    const lastQuestionStep = 2 + formQuestions.length;
    const allQuestionsAnswered = formQuestions.every(q => formData[q.key] && formData[q.key] !== '');
    
    if (formStep === lastQuestionStep && allQuestionsAnswered && !mutation.isPending) {
      // Small delay to ensure state is fully updated
      const submitTimer = setTimeout(() => {
        mutation.mutate(formData);
      }, 100);
      
      return () => clearTimeout(submitTimer);
    }
  }, [formStep, formData, formQuestions, mutation]);
  
  // Handle phone input with auto-formatting
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneDisplay(formatted);
    setFormData(prev => ({ ...prev, phone: value.replace(/\D/g, '') }));
  };
  
  const primaryColor = siteBranding?.colors?.primary || '#D9A566';
  
  return (
    <>
      {/* Simple Glassmorphic Header Bar */}
      {showSticky && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed w-full bg-white/5 backdrop-blur-xl border-b border-white/20 py-3 z-50 shadow-2xl"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
            {/* Left: Property Address */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }}></div>
                <span className="font-medium">{property?.address?.street || 'Premium Package'}</span>
              </div>
            </div>
            
            {/* Center: Simple Text */}
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium">
                Get Complete Property Package
              </p>
            </div>
            
            {/* Right: Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('package')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 rounded-lg text-black font-medium text-sm transition-all duration-200 flex items-center gap-2 shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Access Now</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    
      <section ref={sectionRef} id="package" className="py-12 md:py-16 bg-black relative overflow-hidden">
        {/* Hero Image Background with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
               style={{ 
            backgroundImage: `url(${property?.heroImage})`,
            filter: 'blur(10px) brightness(0.4)',
            transform: 'scale(1.02)',
            y: y
          }}
        ></motion.div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[#D9A566]/10 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Split Layout: Benefits Left, Quick Access Right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            
            {/* LEFT: Benefits Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Header */}
              <div>
                  <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                  <span className="text-white/60 text-xs uppercase tracking-wider">{property?.address?.street || 'Premium Package'}</span>
                  </motion.div>
                <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
                  Register for Our Open House
                </h2>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
                  Register to attend our upcoming open house and receive exclusive property information, market analysis, and detailed insights—all in one premium package.
                </p>
              </div>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {packageItems.map((item: any, index: number) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span style={{ color: primaryColor }}>
                        {iconMap[item.icon]}
                      </span>
                    </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-base md:text-lg mb-1">
                        {item.title}
                      </h3>
                        <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                          {item.description || 'Detailed information included'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
            </motion.div>
            
            {/* RIGHT: Quick Access Form */}
              <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {formStep <= 2 ? (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-medium text-white">
                          Register for Open House
                        </h3>
                        {formStep === 2 && (
                          <span className="text-white/40 text-xs">Step 2 of 4</span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm">
                        {formStep === 1 
                          ? 'Enter your email to register for the open house'
                          : 'Just a few more details to complete your registration'}
                      </p>
                    </div>
                    
                    {/* Progressive Form */}
                    <form onSubmit={formStep === 1 ? handleContinue : handleContinueToQuestions} className="space-y-4">
                      {/* Email Field */}
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          disabled={formStep === 2}
                          className={`w-full h-12 md:h-14 bg-black border ${formStep === 2 ? 'border-white/5 opacity-50' : 'border-white/5'} rounded-lg px-4 text-white text-base placeholder-white/30 focus:outline-none focus:border-[#D9A566] focus:shadow-[0_0_0_3px_rgba(217,165,102,0.1)] transition-all duration-200`}
                        />
                        {validFields.email && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <Check className="w-5 h-5" style={{ color: primaryColor }} />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Name & Phone Fields - Slide Down in Step 2 */}
                      {formStep === 2 && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative"
                          >
                            <input
                              type="text"
                              id="name-input"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Full Name"
                              autoComplete="name"
                              className="w-full h-12 md:h-14 bg-black border border-white/5 rounded-lg px-4 text-white text-base placeholder-white/30 focus:outline-none focus:border-[#D9A566] focus:shadow-[0_0_0_3px_rgba(217,165,102,0.1)] transition-all duration-200"
                            />
                            {validFields.name && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                <Check className="w-5 h-5" style={{ color: primaryColor }} />
                              </motion.div>
                            )}
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                            className="relative"
                          >
                            <input
                              type="tel"
                              value={phoneDisplay}
                              onChange={(e) => handlePhoneChange(e.target.value)}
                              placeholder="Phone Number"
                              autoComplete="tel"
                              className="w-full h-12 md:h-14 bg-black border border-white/5 rounded-lg px-4 text-white text-base placeholder-white/30 focus:outline-none focus:border-[#D9A566] focus:shadow-[0_0_0_3px_rgba(217,165,102,0.1)] transition-all duration-200"
                            />
                            {validFields.phone && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                <Check className="w-5 h-5" style={{ color: primaryColor }} />
                              </motion.div>
                            )}
                          </motion.div>
                          
                          {/* Consent Checkbox */}
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
                            className="pt-2"
                          >
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <div className="relative flex-shrink-0 mt-0.5">
                                <input
                                  type="checkbox"
                                  checked={formData.consent}
                                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                                  className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded bg-black checked:bg-black transition-all duration-200 cursor-pointer"
                                />
                                {formData.consent && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                  >
                                    <Check className="w-4 h-4" style={{ color: primaryColor }} />
                                  </motion.div>
                                )}
                              </div>
                              <span className="text-white/60 text-xs md:text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                I consent to receive property information and agree to the{' '}
                                <a href="https://blog.remax.ca/privacy-notice/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white" style={{ color: primaryColor }}>
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </motion.div>
                        </>
                      )}
                      
                      {/* Submit Button */}
                  <button 
                        type="submit"
                        disabled={formStep === 1 ? !validFields.email : (!validFields.name || !validFields.phone || !validFields.consent || mutation.isPending)}
                        className="w-full h-12 md:h-14 rounded-lg text-black font-medium text-base md:text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {mutation.isPending ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : formStep === 1 ? (
                          <>
                            Continue
                            <ArrowRight className="w-5 h-5" />
                          </>
                        ) : (
                          <>
                            Get Instant Access
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                  </button>
                    </form>
                
                {/* Features */}
                <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    <span className="text-white/70 text-xs md:text-sm">No commitment required</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    <span className="text-white/70 text-xs md:text-sm">Instant delivery to your inbox</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    <span className="text-white/70 text-xs md:text-sm">Personal follow-up from {contactInfo.agent.name}</span>
                  </div>
                </div>
                
                    {/* Privacy Note */}
                    <p className="mt-6 text-white/40 text-xs flex items-center gap-1.5">
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1C3.79086 1 2 2.79086 2 5V5.5H1.5C1.22386 5.5 1 5.72386 1 6V10.5C1 10.7761 1.22386 11 1.5 11H10.5C10.7761 11 11 10.7761 11 10.5V6C11 5.72386 10.7761 5.5 10.5 5.5H10V5C10 2.79086 8.20914 1 6 1ZM9 5.5H3V5C3 3.34315 4.34315 2 6 2C7.65685 2 9 3.34315 9 5V5.5Z" fill="currentColor"/>
                      </svg>
                      Your information is secure and will never be shared
                    </p>
                  </>
                ) : formStep >= 3 && formStep < 3 + formQuestions.length ? (
                  /* DYNAMIC QUESTIONS - Typeform Style */
                  (() => {
                    const questionIndex = formStep - 3;
                    const question = formQuestions[questionIndex];
                    if (!question) return null;
                    
                    const totalSteps = 2 + formQuestions.length + 1; // email + name/phone + questions + success
                    const currentStepNumber = formStep;
                    const progressPercent = Math.round((currentStepNumber / (totalSteps - 1)) * 100);
                    
                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="py-2"
                      >
                        {/* Progress */}
                        <div className="mb-5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white/40 text-[10px]">Step {currentStepNumber} of {totalSteps - 1}</span>
                            <span className="text-white/40 text-[10px]">{progressPercent}%</span>
                          </div>
                          <div className="h-0.5 bg-white/10 rounded-full w-full relative">
                            <motion.div
                              initial={{ width: `${((currentStepNumber - 1) / (totalSteps - 1)) * 100}%` }}
                              animate={{ width: `${progressPercent}%` }}
                              transition={{ duration: 0.5 }}
                              className="h-full rounded-full absolute left-0 top-0"
                              style={{ backgroundColor: primaryColor, maxWidth: '100%' }}
                            />
                          </div>
                        </div>
                        
                        {/* Question */}
                        <h3 className="text-lg md:text-xl font-medium text-white mb-6">
                          {question.question}
                        </h3>
                        
                        {/* Options */}
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => handleQuestionSelect(question.key, option.value)}
                              disabled={mutation.isPending}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                                formData[question.key] === option.value
                                  ? 'border-[' + primaryColor + '] bg-white/10'
                                  : 'border-white/10 hover:border-white/20 bg-white/5'
                              } ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <span className="text-2xl">{option.emoji}</span>
                              <span className="text-white text-base font-medium">{option.label}</span>
                              {formData[question.key] === option.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto"
                                >
                                  <Check className="w-5 h-5" style={{ color: primaryColor }} />
                                </motion.div>
                              )}
                            </motion.button>
                          ))}
                        </div>
                        
                        {mutation.isPending && questionIndex === formQuestions.length - 1 && (
                          <p className="text-white/60 text-xs text-center mt-4">
                            Sending your package...
                          </p>
                        )}
                      </motion.div>
                    );
                  })()
                ) : formStep === 2 + formQuestions.length + 1 ? (
                  /* SUCCESS STATE */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}20` }}
                    >
                      <Check className="w-8 h-8" style={{ color: primaryColor }} />
                    </motion.div>
                    
                    {/* Success Message */}
                    <h3 className="text-2xl font-medium text-white mb-2">
                      Package Sent!
                    </h3>
                    <p className="text-white/60 text-sm mb-6">
                      Check your inbox for the complete property details
                    </p>
                    
                    {/* What's Included List */}
                    <div className="text-left space-y-2 mb-6 bg-white/5 rounded-lg p-4">
                      <p className="text-white/80 text-xs font-medium mb-3">You'll receive:</p>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        <span>Floor plans & specifications</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        <span>Market analysis report</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        <span>Virtual tour access</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        <span>Neighborhood insights</span>
                      </div>
                    </div>
                    
                    {/* Agent Follow-up */}
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-white/50 text-xs mb-3">
                        {contactInfo.agent.name} will follow up within 2 hours
                      </p>
                      <button
                        onClick={() => setFormStep(1)}
                        className="text-white/60 hover:text-white text-xs transition-colors"
                      >
                        Submit another request →
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D9A566]/10 to-transparent blur-3xl opacity-20 rounded-full"></div>
      </section>
    </>
  );
};

export default ExclusivePackage;