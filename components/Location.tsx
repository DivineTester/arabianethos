
import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Location: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow, sweeping fade-up for typography
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Slow, cinematic scale-in for map
      gsap.fromTo(mapRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-[100px] md:py-[140px] bg-black border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Elevated Brand Statement */}
          <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-start opacity-0 transform-gpu">
            {/* Minimal Tracking Label */}
            <span className="text-[#D4AF37]/75 font-montserrat text-xs tracking-[0.4em] uppercase mb-8">
              Our Location
            </span>

            {/* Massive Dramatic Serif */}
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif-luxury text-[#D4AF37] leading-[1.05] tracking-tight mb-8">
              Located in the <br className="hidden md:block" />
              Heart of Bangalore
            </h2>

            {/* Refined Context */}
            <p className="font-montserrat text-white/80 font-light text-sm md:text-base leading-relaxed max-w-lg mb-12 italic">
              "Visit our private showroom in Frazer Town, where tradition meets contemporary refinement."
            </p>

            {/* Clean Address Format */}
            <address className="not-italic flex flex-col gap-2 font-montserrat text-white/90 text-sm md:text-base tracking-wide font-light mb-12">
              <span>38, Haines Road</span>
              <span>Frazer Town, Bangalore</span>
              <span>Karnataka 560005</span>
              <div className="h-[1px] w-1/3 bg-[rgba(212,175,55,0.2)] mt-6" />
            </address>

            {/* Redesigned Luxury Pill Button */}
            <a
              href="https://wa.me/919739751786"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-10 md:px-12 py-4 md:py-5 border border-[#D4AF37] rounded-full bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 ease-out transform hover:-translate-y-[2px]"
            >
              <MessageCircle size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-montserrat text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
                Consult via WhatsApp
              </span>
            </a>
          </div>

          {/* Right Side: Map Reveal */}
          <div ref={mapRef} className="w-full lg:w-1/2 opacity-0 transform-gpu relative">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[24px] overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(212,175,55,0.05)] bg-[#050505]">
              {/* The absolute overlay darkens the Google Maps UI significantly to match the luxury black aesthetic */}
              <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />

              <iframe
                src="https://www.google.com/maps?q=Arabian+Ethos,+Bangalore&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter grayscale contrast-125 saturate-50"
              />

              {/* Private Showroom Badge Overlay */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-black/80 backdrop-blur-md border border-[#D4AF37]/20 px-6 py-3 rounded-sm z-20 shadow-xl">
                <span className="text-[#D4AF37] font-montserrat text-[10px] md:text-xs uppercase tracking-[0.3em]">
                  Private Showroom
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
