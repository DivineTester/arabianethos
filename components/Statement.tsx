
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Statement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const phrases = [
    '"Clothing Is Identity"',
    '"Heritage"',
    '"Confidence"',
    '"Modesty"'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that handles the entire sequence
      // end: "+=300%" provides enough scroll "depth" without feeling like a dead zone
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", 
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        }
      });

      // Atmospheric background intensity increases slightly as you scroll through the core values
      gsap.to(".atmospheric-bg", {
        opacity: 0.3,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Animate each phrase in sequence
      phrases.forEach((_, i) => {
        // 1. Fade In & Move Up
        tl.fromTo(phraseRefs.current[i],
          { opacity: 0, y: 50, filter: "blur(15px)", scale: 0.9 },
          { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 2, ease: "power2.out" }
        );
        
        // 2. Brief Hold
        tl.to({}, { duration: 1 });

        // 3. Fade Out & Move Up (except for the last one which transitions out with the section)
        if (i < phrases.length - 1) {
          tl.to(phraseRefs.current[i], {
            opacity: 0,
            y: -50,
            filter: "blur(15px)",
            scale: 1.1,
            duration: 2,
            ease: "power2.in"
          });
        } else {
          // Last word lingers slightly more before the scroll finish
          tl.to(phraseRefs.current[i], { opacity: 0, y: -20, duration: 1.5, ease: "power2.in" });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="h-screen bg-black relative flex items-center justify-center overflow-hidden z-20"
    >
      {/* Cinematic Atmospheric Visual */}
      <div className="atmospheric-bg absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury House Texture" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
        <div className="flex items-center justify-center absolute w-full h-full pointer-events-none">
          {phrases.map((phrase, i) => (
            <span
              key={i}
              ref={(el) => { phraseRefs.current[i] = el; }}
              className={`absolute opacity-0 whitespace-nowrap tracking-tight text-center px-6 ${
                i === 0 
                ? "text-3xl md:text-6xl font-serif-luxury text-gold" 
                : "text-5xl md:text-[9rem] font-cinzel text-gold uppercase tracking-widest"
              }`}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle Progress Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 opacity-20">
        {phrases.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold" />
        ))}
      </div>
    </section>
  );
};

export default Statement;
