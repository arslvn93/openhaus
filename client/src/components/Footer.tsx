import React from 'react';
// @ts-ignore - JS config module without types
import { contactInfo, siteBranding } from '../config/siteConfig.js';

const Footer = () => {
  const year = new Date().getFullYear();
  const primaryColor = siteBranding?.colors?.primary || '#D9A566';

  return (
    <footer className="bg-black border-t border-white/10" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 items-start md:items-center gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-0 py-5 md:py-3">
          {/* Agent strip */}
          <div className="col-span-12 lg:col-span-4 flex items-center gap-3 md:gap-4">
            <img
              src={contactInfo.agent.photo}
              alt={contactInfo.agent.name}
              decoding="async"
              className="h-16 md:h-14 object-contain"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm md:text-base truncate">{contactInfo.agent.name}</span>
                {contactInfo.agent.license && (
                  <span className="text-white/50 text-[11px] md:text-xs truncate">{contactInfo.agent.license}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <a
                  href={`tel:${contactInfo.agent.phone}`}
                  aria-label={`Call ${contactInfo.agent.name}`}
                  className="px-3 md:px-3 h-8 md:h-8 inline-flex items-center rounded-full text-xs md:text-xs text-white/90 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 md:h-[14px] w-3.5 md:w-[14px] mr-1.5 md:mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {contactInfo.agent.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.agent.email}`}
                  aria-label={`Email ${contactInfo.agent.name}`}
                  className="px-3 md:px-3 h-8 md:h-8 inline-flex items-center rounded-full text-xs md:text-xs text-white/90 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 md:h-[14px] w-3.5 md:w-[14px] mr-1.5 md:mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><polyline points="22,6 12,13 2,6" /></svg>
                  {contactInfo.agent.email}
                </a>
              </div>
            </div>
          </div>
            
          {/* Company strip */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-start lg:justify-center gap-3 md:gap-4">
            <img
              src={contactInfo.agent.companyLogo || siteBranding?.logo || '/logo.svg'}
              alt={contactInfo.agent.company}
              decoding="async"
              className="h-16 md:h-14 object-contain"
            />
            <div className="min-w-0 flex-1 lg:flex-initial">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm md:text-base truncate">{contactInfo.agent.company}</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.agent.companyAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${contactInfo.agent.company} location`}
                className="mt-0.5 md:mt-1 text-white/60 text-[11px] md:text-xs hover:text-white/90 transition-colors block leading-tight"
              >
                {contactInfo.agent.companyAddress}
              </a>
            </div>
          </div>
          
          {/* Social strip - Mobile optimized */}
          <div className="col-span-12 lg:col-span-2 flex flex-col items-center lg:items-end justify-center order-3 lg:order-none gap-1">
            <div className="flex items-center justify-center lg:justify-end gap-6 md:gap-6">
              {contactInfo.social?.instagram && (
                <a href={contactInfo.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="group relative transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9 transition-all duration-300 md:group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: primaryColor, opacity: 0.9, filter: 'drop-shadow(0 0 0px transparent)' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = `drop-shadow(0 0 8px ${primaryColor}66)`; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)'; }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {contactInfo.social?.facebook && (
                <a href={contactInfo.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="group relative transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9 transition-all duration-300 md:group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: primaryColor, opacity: 0.9, filter: 'drop-shadow(0 0 0px transparent)' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = `drop-shadow(0 0 8px ${primaryColor}66)`; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)'; }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {contactInfo.social?.linkedin && (
                <a href={contactInfo.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="group relative transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-9 md:w-9 transition-all duration-300 md:group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: primaryColor, opacity: 0.9, filter: 'drop-shadow(0 0 0px transparent)' }} onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = `drop-shadow(0 0 8px ${primaryColor}66)`; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)'; }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
            </div>
            {/* Privacy beneath socials on desktop only */}
            <a href="#privacy" className="hidden lg:block text-[9px] text-white/30 hover:text-white/50 transition-colors">Privacy Policy</a>
          </div>
        </div>
        
        {/* Privacy at very bottom - Mobile only */}
        <div className="border-t border-white/5 py-2 text-center lg:hidden">
          <a href="#privacy" className="text-[9px] text-white/30 hover:text-white/50 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


