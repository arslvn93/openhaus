import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize ScrollMagic and Lenis after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Global declarations for TypeScript
  declare global {
    interface Window {
      Lenis: any;
      ScrollMagic: any;
    }
  }
});

createRoot(document.getElementById("root")!).render(<App />);
