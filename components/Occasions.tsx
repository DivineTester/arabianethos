import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// chevron icons removed — clicks on the card toggle expansion/shrinking
import { PRODUCT_CATEGORIES, MainCollection } from '../src/data/categories';

gsap.registerPlugin(ScrollTrigger);

// Curated cinematic placeholder images for the 4 core collections
const collectionImages = [
  "/thobe_hero.png", // Men's (Dark suiting/fabric)
  "/kids_hero.png", // Kids' (Elegant architecture/heritage)
  "/abaya_hero.png", // Women's (Flowing luxury fabric/light)
  "/oud_hero.png"  // Accessories (Gold/Perfume aesthetic)
];

const Occasions: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default expand the first on desktop
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // All card clicks are handled by the parent — remove individual link handlers
  // so clicking anywhere on a card toggles expansion/shrinking.

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up the section header
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">

      {/* Section Global Header */}
      <div ref={headerRef} className="text-center mb-16 md:mb-24 px-6 relative z-10 opacity-0">
        <h2 className="text-[10px] md:text-xs font-montserrat tracking-[0.4em] md:tracking-[0.6em] text-[#D4AF37] uppercase mb-6 drop-shadow-lg">
          Arriving Post-Ramadan
        </h2>
        <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif-luxury text-white/90 tracking-widest leading-none">
          THE COLLECTIONS
        </h3>
        <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-[#D4AF37]/50 to-transparent mx-auto mt-8 md:mt-12" />
      </div>

      {/* Cinematic Interactive Accordion */}
      <div className="w-full h-[100vh] md:h-[85vh] max-h-[1000px] flex flex-col md:flex-row overflow-hidden border-y border-[rgba(212,175,55,0.15)]">
        {PRODUCT_CATEGORIES.map((collection: MainCollection, index: number) => {
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              className={
                'relative group cursor-pointer overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ' +
                (isExpanded
                  ? 'flex-[5.5_5.5_0%] md:flex-[4_4_0%]'
                  : 'flex-[1.5_1.5_0%] md:flex-[1_1_0%]')
              }
              style={{ touchAction: 'manipulation' }}
              onClick={() => {
                setExpandedIndex(isExpanded ? null : index);
              }}
            >
              {/* Mobile overlay to prioritize card tap logic on small screens.
                  When collapsed it captures taps; when expanded it yields to inner
                  content by disabling pointer events. */}
              <div
                className={`absolute inset-0 md:hidden z-40 ${isExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              />
              {/* Deep Background Image Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out will-change-transform pointer-events-none"
                style={{
                  backgroundImage: `url(${collectionImages[index] || collectionImages[0]})`,
                  transform: isExpanded ? 'scale(1.05)' : 'scale(1.15)', // Slow dramatic zoom out on expand
                }}
              />

              {/* Complex Gradient Overlays to ensure text legibility while keeping the cinematic mood */}
              <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${isExpanded ? 'bg-black/40' : 'bg-black/70 group-hover:bg-black/50'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none" />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Collapsed State Title (Vertical on Desktop, Horizontal on Mobile) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300 pointer-events-auto'}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-2 text-center md:text-left">
                  <h4
                    className="font-serif-luxury text-lg sm:text-2xl md:text-3xl text-white/70 tracking-[0.2em] uppercase transform md:-rotate-90 whitespace-normal md:whitespace-nowrap cursor-pointer leading-tight"
                  >
                    {collection.name}
                  </h4>
                  {/* chevron removed to allow card-level clicks */}
                </div>
              </div>

              {/* Expanded State Content Area */}
              <div
                className={`absolute inset-0 p-6 md:p-16 flex flex-col justify-end pointer-events-none transition-opacity duration-700 ease-out z-20 ${isExpanded ? 'opacity-100 delay-300' : 'opacity-0'}`}
              >
                {/* collapse button removed — card click will handle collapsing */}

                <div className="max-w-4xl pointer-events-auto">
                  {/* Glowing Outline Box Accent */}
                  <div className={`w-8 md:w-12 h-[1px] bg-[#D4AF37] mb-4 md:mb-6 transition-all duration-1000 delay-500 transform ${isExpanded ? 'translate-x-0' : '-translate-x-8'}`} />

                  <h4
                    className={`font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.1em] uppercase mb-4 md:mb-8 cursor-pointer hover:text-[#D4AF37] transition-all duration-700 transform ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} drop-shadow-lg`}
                  >
                    {collection.name}
                  </h4>

                  {/* Elegant Category Sub-list */}
                  <div className={`grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4 max-h-[30vh] md:max-h-[35vh] overflow-y-auto custom-scrollbar pr-2 md:pr-4 transition-all duration-1000 delay-200 transform ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                    {collection.sections.map((section, secIdx) => (
                      <div key={secIdx} className="flex flex-col mb-4">
                        <span className="font-montserrat text-[10px] tracking-[0.3em] text-[#D4AF37]/80 uppercase mb-3 border-b border-[rgba(212,175,55,0.2)] pb-2 inline-block w-fit">
                          {section.title}
                        </span>
                        <div className="flex flex-col gap-2 pl-2 border-l border-[rgba(255,255,255,0.1)]">
                          {section.items.slice(0, 4).map((item, itemIdx) => ( // Only show top 4 items to keep UI clean
                            <button
                              key={itemIdx}
                              className="font-montserrat text-xs text-white/60 hover:text-white transition-colors uppercase text-left w-fit"
                              onClick={(e) => { e.stopPropagation(); /* reserved: no action */ }}
                            >
                              {item.name}
                            </button>
                          ))}
                          {section.items.length > 4 && (
                            <span className="font-montserrat text-[10px] text-white/30 italic mt-1">
                              + More
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {collection.featuredLink && (
                    <button
                      className={`mt-4 md:mt-16 group inline-flex items-center gap-4 font-montserrat text-[10px] md:text-xs tracking-[0.3em] text-[#D4AF37] uppercase transition-all duration-1000 delay-300 transform outline-none ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                      onClick={(e) => { e.stopPropagation(); /* reserved: no action */ }}
                    >
                      Explore Collection
                      <div className="w-8 h-[1px] bg-[#D4AF37] group-hover:w-16 transition-all duration-500 ease-out relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[#D4AF37] rotate-45 transform origin-center" />
                      </div>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Occasions;
