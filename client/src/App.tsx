import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "@/components/LandingPage";
import OpenHousePage from "@/components/OpenHousePage";
import NotFound from "@/pages/not-found";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PageLoader from "@/components/PageLoader";
import { siteMetadata } from "./config/siteConfig";
import { preloadImages } from "./lib/preload";
// @ts-ignore - JS config module without types
import { galleryImages } from "./config/siteConfig.js";

// Component to handle document head metadata
const DocumentHead = () => {
  // Update document title
  document.title = siteMetadata.title;
  
  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Update meta description
  updateMetaTag('description', siteMetadata.description);
  
  // Update keywords
  updateMetaTag('keywords', siteMetadata.keywords);
  
  // Update Open Graph tags
  updateMetaTag('og:title', siteMetadata.title, true);
  updateMetaTag('og:description', siteMetadata.description, true);
  updateMetaTag('og:image', siteMetadata.ogImage, true);
  updateMetaTag('og:type', siteMetadata.ogType, true);
  updateMetaTag('og:url', siteMetadata.canonical, true);
  
  // Update Twitter Card tags
  updateMetaTag('twitter:card', siteMetadata.twitterCard);
  updateMetaTag('twitter:title', siteMetadata.title);
  updateMetaTag('twitter:description', siteMetadata.description);
  updateMetaTag('twitter:image', siteMetadata.ogImage);
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', siteMetadata.canonical);
  
  return null;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/openhouse" component={OpenHousePage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock body scroll while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    const minLoadTime = 800; // keep snappy
    const start = Date.now();

    const urls: string[] = (galleryImages || []).map((g: any) => g.src).filter(Boolean);

    const controller = new AbortController();

    const run = async () => {
      try {
        // If connection is very slow, we still attempt full preload but will time out overall
        const timeoutMs = 20000; // 20s hard cap
        let timedOut = false;
        const timeout = setTimeout(() => { timedOut = true; }, timeoutMs);

        await preloadImages(urls, {
          concurrency: 8,
          retries: 2,
          timeoutMsPerImage: 15000,
          onProgress: (done, total) => {
            const pct = total ? Math.round((done / total) * 100) : 100;
            setProgress(pct);
          }
        });
        clearTimeout(timeout);

        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minLoadTime - elapsed);
        setTimeout(() => setIsLoading(false), remaining);
      } catch {
        // On unexpected failure, still proceed after minimum time
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minLoadTime - elapsed);
        setTimeout(() => setIsLoading(false), remaining);
      }
    };

    run();
    return () => controller.abort();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PageLoader isLoading={isLoading} />
      <DocumentHead />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
