import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

  // Function to trigger the global "Coming Soon" toast
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>, categoryName: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent accordion from toggling when clicking a link
    const event = new CustomEvent('SHOW_TOAST', {
      detail: { message: `The ${categoryName} catalog will be available shortly.` }
    });
    window.dispatchEvent(event);
  };

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
              className={`relative group cursor-pointer overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${isExpanded
                ? 'flex-[5.5_5.5_0%] md:flex-[4_4_0%]' // Exact 55vh on mobile, prevents overlap
                : 'flex-[1.5_1.5_0%] md:flex-[1_1_0%]'  // Exact 15vh on mobile (45vh total for the 3 closed items)
                }`}
              onClick={(e) => {
                if (!isExpanded) {
                  setExpandedIndex(index);
                } else {
                  handleLinkClick(e, collection.name);
                }
              }}
            >
              {/* Deep Background Image Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out will-change-transform"
                style={{
                  backgroundImage: `url(${collectionImages[index] || collectionImages[0]})`,
                  transform: isExpanded ? 'scale(1.05)' : 'scale(1.15)', // Slow dramatic zoom out on expand
                }}
              />

              {/* Complex Gradient Overlays to ensure text legibility while keeping the cinematic mood */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${isExpanded ? 'bg-black/40' : 'bg-black/70 group-hover:bg-black/50'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent opacity-60" />

              {/* Collapsed State Title (Vertical on Desktop, Horizontal on Mobile) */}
              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 z-10 ${isExpanded ? 'opacity-0' : 'opacity-100 delay-300'}`}
              >
                <div className="flex items-center gap-4">
                  <h4 className="font-serif-luxury text-2xl md:text-3xl text-white/70 tracking-[0.2em] uppercase transform md:-rotate-90 whitespace-nowrap">
                    {collection.name}
                  </h4>
                  <ChevronDown 
                    className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-300" 
                    strokeWidth={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(index);
                    }}
                  />
                </div>
              </div>

              {/* Expanded State Content Area */}
              <div
                className={`absolute inset-0 p-6 md:p-16 flex flex-col justify-end pointer-events-none transition-opacity duration-700 ease-out z-20 ${isExpanded ? 'opacity-100 delay-300' : 'opacity-0'}`}
              >
                {/* Collapse Arrow Button - Top Right */}
                <div className="absolute top-6 md:top-16 right-6 md:right-16 z-30 pointer-events-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(null);
                    }}
                    className="text-[#D4AF37] hover:scale-125 transition-transform duration-300 outline-none"
                    aria-label="Collapse collection"
                  >
                    <ChevronUp className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                  </button>
                </div>

                <div className="max-w-4xl pointer-events-auto">
                  {/* Glowing Outline Box Accent */}
                  <div className={`w-8 md:w-12 h-[1px] bg-[#D4AF37] mb-4 md:mb-6 transition-all duration-1000 delay-500 transform ${isExpanded ? 'translate-x-0' : '-translate-x-8'}`} />

                  <h4
                    className={`font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.1em] uppercase mb-4 md:mb-8 cursor-pointer hover:text-[#D4AF37] transition-all duration-700 transform ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} drop-shadow-lg`}
                    onClick={(e) => handleLinkClick(e, collection.name)}
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
                              onClick={(e) => handleLinkClick(e, item.name)}
                              className="font-montserrat text-xs text-white/60 hover:text-white transition-colors uppercase text-left w-fit"
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
                      onClick={(e) => handleLinkClick(e, collection.name)}
                      className={`mt-4 md:mt-16 group inline-flex items-center gap-4 font-montserrat text-[10px] md:text-xs tracking-[0.3em] text-[#D4AF37] uppercase transition-all duration-1000 delay-300 transform outline-none ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
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
