import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Runway from './components/Runway';
import Craftsmanship from './components/Craftsmanship';
import Occasions from './components/Occasions';
import Location from './components/Location';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { Toast } from './components/Toast';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Standard requestAnimationFrame loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial refresh to ensure ScrollTrigger calculations are correct after components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Ensure all images loaded trigger a refresh
    window.addEventListener('load', () => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
      clearTimeout(timer);
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <main className="bg-black min-h-screen relative selection:bg-gold selection:text-black">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <Hero />
      <div id="collection"><Runway /></div>
      <div id="craftsmanship"><Craftsmanship /></div>
      <div id="occasions"><Occasions /></div>
      <div id="visit-us"><Location /></div>
      <Footer />
      <Toast />
    </main>
  );
};

export default App;
