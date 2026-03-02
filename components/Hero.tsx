import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Entry Animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );

      // 2. Scroll-triggered Exit Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -100,
        ease: "none"
      }, 0);

      tl.to(videoRef.current, {
        scale: 1.15,
        opacity: 0.3,
        ease: "none"
      }, 0);

      // 3. Interactive Hover Effect
      const handleMouseEnter = () => {
        gsap.to(videoRef.current, {
          scale: 1.05,
          filter: 'brightness(0.5)',
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(videoRef.current, {
          scale: 1,
          filter: 'brightness(0.35)',
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const element = heroRef.current;
      if (element) {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        if (element) {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black z-10 cursor-default">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
      >
        <source src="/landingScreen.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-6xl">
        {/* Announcement Banner - Enhanced Visibility */}
        <div className="inline-block mb-12 px-8 py-4 border border-gold/60 rounded-full bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500">
          <span className="text-gold text-sm md:text-xl tracking-[0.3em] uppercase font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Opening After This Ramadan
          </span>
        </div>

        <h1 className="text-4xl md:text-8xl font-serif-luxury text-gold mb-6 tracking-tight leading-none">
          Where Tradition Meets <br className="hidden md:block" /> Timeless Elegance
        </h1>
        <p className="text-lg md:text-2xl font-light text-white/80 tracking-[0.2em] uppercase mb-12">
          Authentic Arabian & Ethnic Wear in Bangalore
        </p>

        {/* <div>
          <button className="group relative px-10 py-4 overflow-hidden border border-gold/30 rounded-full transition-all hover:border-gold">
            <span className="relative z-10 text-gold text-sm tracking-widest uppercase group-hover:text-black transition-colors duration-500">
              Enter the Collection
            </span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </button>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-bounce" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-gold">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;