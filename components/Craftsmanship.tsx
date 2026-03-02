
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, Gem, Scissors, Crown } from 'lucide-react';

const Craftsmanship: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { text: 'Authentic Textures', Icon: Layers },
    { text: 'Hand-picked Materials', Icon: Gem },
    { text: 'Bespoke Tailoring', Icon: Scissors },
    { text: 'Bangalore Legacy', Icon: Crown }
  ];

  return (
    <>
      <style>{`
        .crafted-with-precision-section {
          background-color: #050505;
          position: relative;
        }
        .crafted-with-precision-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/wavy-fabric-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.35;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 0;
        }
        .crafted-with-precision-content {
          position: relative;
          z-index: 2;
        }
      `}</style>
      <section ref={containerRef} className="crafted-with-precision-section min-h-[90vh] flex flex-col md:flex-row items-center justify-between border-y border-[rgba(255,255,255,0.03)] overflow-hidden">

        {/* LEFT COLUMN: The Thobe Presentation */}
        <div className="crafted-with-precision-content w-full md:w-[40%] lg:w-[45%] relative h-[45vh] md:h-[65vh] overflow-hidden md:ml-12 lg:ml-20 rounded-[4px] shadow-2xl">
          <video
            src="/IMG_6120.MOV"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000 grayscale-[0.2]"
          />
          {/* Subtle vignette over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/60 md:bg-gradient-to-r md:from-black/40 md:to-transparent" />

          {/* Editorial Overlay Text */}

        </div>

        {/* RIGHT COLUMN: The Atelier Typography Layer */}
        <div className="crafted-with-precision-content w-full md:w-[55%] lg:w-[50%] flex flex-col justify-center px-8 py-16 md:px-12 lg:px-20 lg:py-24 xl:pr-32">
          <h2 className="text-[2.5rem] md:text-5xl lg:text-6xl xl:text-[4.2rem] font-serif-luxury text-[#D4AF37] mb-8 leading-[1.1] drop-shadow-md">
            Crafted With <br className="hidden lg:block" />Precision. <br />
            Designed With <br className="hidden lg:block" />Purpose.
          </h2>

          <div ref={dividerRef} className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-10 origin-center" />

          <p className="text-base md:text-lg text-white/70 font-light leading-[1.8] mb-12 max-w-xl font-montserrat">
            Every stitch in an Arabian Ethos garment represents decades of artisanal heritage. We source the finest silks, cottons, and wools to ensure that modesty is paired with unparalleled comfort.
          </p>

          <ul className="space-y-5 lg:space-y-6">
            {features.map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-[11px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] font-montserrat uppercase text-[#D4AF37]/90">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="flex-1">{item.text}</span>
                <item.Icon className="w-5 h-5 text-[#D4AF37]/50 hidden sm:block" strokeWidth={1.5} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Craftsmanship;
