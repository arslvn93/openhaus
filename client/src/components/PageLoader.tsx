import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
// @ts-ignore - JS config module without types
import { siteBranding, property } from '../config/siteConfig.js';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader = ({ isLoading }: PageLoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="fixed inset-0 z-[100000] w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            height: '100vh',
            minHeight: '100dvh',
            overscrollBehavior: 'contain',
            touchAction: 'none'
          }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(${siteBranding.colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${siteBranding.colors.primary} 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* House icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              className="relative mb-8"
            >
              {/* Pulsing glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ backgroundColor: siteBranding.colors.primary }}
              />
              
              {/* House icon */}
              <div 
                className="relative p-6 rounded-2xl backdrop-blur-sm border-2"
                style={{ 
                  backgroundColor: `${siteBranding.colors.primary}20`,
                  borderColor: siteBranding.colors.primary
                }}
              >
                <Home 
                  className="w-16 h-16"
                  style={{ color: siteBranding.colors.primary }}
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>

            {/* Static text below icon */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-2 text-center"
            >
              <h1 className="font-['Poppins'] text-white text-xl sm:text-2xl">
                {property.address.street.toUpperCase()}
              </h1>
              <h3 className="font-['Titillium_Web'] text-white/70 text-base sm:text-lg">
                NEW LISTING
              </h3>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

