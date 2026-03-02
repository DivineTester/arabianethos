import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { PRODUCT_CATEGORIES } from '../src/data/categories';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isMenuOpen]);

  // GSAP Animation for opening/closing menu
  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      // Explicitly show and reset clip path
      gsap.set(menuRef.current, { display: 'flex', clipPath: 'circle(0% at right top)' });

      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at right top)',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          // Explicitly set to none to restore scroll
          if (menuRef.current) menuRef.current.style.clipPath = 'none';
        }
      });

      gsap.fromTo(linksRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    } else {
      // Reapply clip path before shrinking
      if (menuRef.current) menuRef.current.style.clipPath = 'circle(150% at right top)';

      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at right top)',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          // Hide completely
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
      // Reset active category on close
      setTimeout(() => setActiveCategory(null), 500);
    }
  }, [isMenuOpen]);

  const addToRefs = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // Clear refs array on render
  linksRef.current = [];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryName: string) => {
    e.preventDefault();

    // Dispatch custom event to trigger global Toast
    const event = new CustomEvent('SHOW_TOAST', {
      detail: { message: `The ${categoryName} catalog will be available shortly.` }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-[100] px-6 md:px-12 py-5 bg-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-transparent">

          {/* Brand Logo Container (Left Side) */}
          <div className="flex flex-col items-center relative group pointer-events-auto animate-swing mt-6 md:mt-12">

            {/* Vertical Strings */}
            <div className="absolute -top-20 left-1 md:left-2 w-[2px] h-20 bg-gradient-to-r from-[#996515] via-[#FCF6BA] to-[#996515] shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-[0.5px] border-[#FCF6BA] bg-gradient-to-br from-[#D4AF37] to-[#8B6F20] shadow-[0_0_5px_rgba(212,175,55,0.6)]"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-sm border-[0.5px] border-[#FCF6BA] bg-gradient-to-b from-[#D4AF37] to-[#8B6F20]"></div>
            </div>
            <div className="absolute -top-20 right-1 md:right-2 w-[2px] h-20 bg-gradient-to-r from-[#996515] via-[#FCF6BA] to-[#996515] shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-[0.5px] border-[#FCF6BA] bg-gradient-to-br from-[#D4AF37] to-[#8B6F20] shadow-[0_0_5px_rgba(212,175,55,0.6)]"></div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-sm border-[0.5px] border-[#FCF6BA] bg-gradient-to-b from-[#D4AF37] to-[#8B6F20]"></div>
            </div>

            <div className="relative">
              <img
                src="ARBIAN ETHOS.png"
                alt="Arabian Ethos Logo"
                className="h-10 md:h-16 lg:h-20 w-auto object-contain transition-all duration-700 logo-visibility group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            </div>
          </div>

          {/* Menu Button (Right Side) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 text-white pointer-events-auto group outline-none mix-blend-difference z-[200]"
          >
            <span className="font-montserrat text-xs md:text-sm tracking-[0.2em] uppercase hidden md:block text-[#D4AF37]">
              Menu
            </span>
            <div className="flex flex-col gap-[5px] items-end">
              <div className="w-8 h-[1px] bg-[#D4AF37] group-hover:w-10 transition-all duration-300 transform origin-right" />
              <div className="w-5 h-[1px] bg-[#D4AF37] group-hover:w-8 transition-all duration-300 delay-75 transform origin-right" />
            </div>
          </button>

        </div>
      </nav>

      {/* FULL SCREEN OVERLAY MENU */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[200] bg-[#050505] text-white flex flex-col pointer-events-auto overflow-hidden"
        style={{ clipPath: 'circle(0% at right top)', display: 'none' }}
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

        {/* Close Button Header */}
        <div className="w-full px-6 md:px-12 py-8 flex justify-between items-center relative z-10 border-b border-[rgba(212,175,55,0.1)] flex-shrink-0">
          <img src="ARBIAN ETHOS.png" alt="Arabian Ethos" className="h-10 w-auto opacity-80" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 text-white group outline-none"
          >
            <span className="font-montserrat text-xs tracking-[0.2em] uppercase hidden md:block text-[#D4AF37] group-hover:text-white transition-colors">
              Close
            </span>
            <X className="w-8 h-8 text-[#D4AF37] group-hover:rotate-90 group-hover:scale-110 transition-all duration-300" strokeWidth={1} />
          </button>
        </div>

        {/* Categories Grid Layout */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 lg:p-20 relative z-10 custom-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'manipulation' }}
        >
          <div className="max-w-[1400px] mx-auto min-h-full flex flex-col md:flex-row gap-12 lg:gap-24">

            {/* Main Categories Menu */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 shrink-0">
              <h3 className="font-serif-luxury text-[10px] sm:text-[11px] tracking-[0.4em] text-[rgba(212,175,55,0.8)] uppercase mb-4 sm:mb-8 pb-4 relative inline-block w-fit">
                Curated Collections
                <span className="absolute bottom-0 left-0 w-8 h-[1px] bg-[#D4AF37]" />
              </h3>
              {PRODUCT_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Category Link (Header) */}
                  <div
                    className="group cursor-pointer relative"
                    onMouseEnter={() => { if (window.innerWidth >= 768) setActiveCategory(cat.name) }}
                  >
                    <a
                      ref={addToRefs}
                      href={cat.featuredLink || "#"}
                      onClick={(e) => {
                        if (window.innerWidth < 768) {
                          if (cat.sections && cat.sections.length > 0) {
                            e.preventDefault();
                            setActiveCategory(activeCategory === cat.name ? null : cat.name);
                            return; // Stop execution so it doesn't trigger the toast
                          }
                        }
                        // Handle all desktop clicks and mobile clicks that have no sub-sections
                        handleLinkClick(e, cat.name);
                      }}
                      className={`font-serif-luxury text-2xl sm:text-3xl lg:text-[40px] tracking-[0.15em] uppercase transition-all duration-700 ease-out inline-flex items-center gap-6 ${activeCategory === cat.name ? 'text-[#D4AF37] translate-x-4 md:translate-x-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-white/50 hover:text-white/90 hover:translate-x-2'}`}
                    >
                      {cat.name}
                      {cat.sections && cat.sections.length > 0 && (
                        <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 transform ${activeCategory === cat.name ? 'opacity-100 rotate-90 md:rotate-0 translate-x-0' : 'opacity-50 md:opacity-0 -translate-x-4 md:block'} hidden sm:block`} strokeWidth={1} />
                      )}
                    </a>
                  </div>

                  {/* Mobile Accordion Content */}
                  <div
                    className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${activeCategory === cat.name ? 'max-h-[2000px] opacity-100 mt-6 mb-2' : 'max-h-0 opacity-0 mt-0 mb-0'}`}
                  >
                    <div className="flex flex-col gap-8 pl-4 border-l border-[rgba(212,175,55,0.2)] pb-4">
                      {cat.sections.map((section, sIdx) => (
                        <div key={sIdx} className="flex flex-col gap-4">
                          <h4 className="font-serif-luxury text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase">
                            {section.title}
                          </h4>
                          <div className="flex flex-col gap-3">
                            {section.items.map((item, iIdx) => (
                              <a
                                key={iIdx}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.name)}
                                className="font-montserrat text-[13px] text-white/50 hover:text-[#D4AF37] transition-all duration-300 w-fit uppercase"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                      {cat.featuredLink && (
                        <a href={cat.featuredLink} onClick={(e) => handleLinkClick(e, cat.name)} className="mt-2 font-montserrat text-[11px] tracking-[0.2em] text-[#D4AF37] uppercase flex items-center gap-2 border border-[rgba(212,175,55,0.2)] p-3 rounded-sm w-fit">
                          Explore All {cat.name} <ChevronRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Sub-categories Display Panel (DESKTOP ONLY) */}
            <div className="hidden md:grid w-[60%] border-l border-[rgba(212,175,55,0.1)] pl-12 lg:pl-24 items-start pb-20">
              {PRODUCT_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-out flex flex-col gap-8 w-full ${activeCategory === cat.name || (!activeCategory && idx === 0) ? 'opacity-100 translate-y-0 visible z-10 pointer-events-auto' : 'opacity-0 translate-y-8 invisible z-0 pointer-events-none'}`}
                >
                  <div className="flex justify-between items-end border-b border-[rgba(212,175,55,0.2)] pb-4 mb-2">
                    <h3 className="font-serif-luxury text-2xl lg:text-3xl text-[#D4AF37] tracking-[0.2em] uppercase">
                      {cat.name}
                    </h3>
                    {cat.featuredLink && (
                      <a href={cat.featuredLink} onClick={(e) => handleLinkClick(e, cat.name)} className="font-montserrat text-xs tracking-widest text-white/50 hover:text-[#D4AF37] uppercase transition-colors flex items-center gap-2">
                        View All <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                    {cat.sections.map((section, sIdx) => (
                      <div key={sIdx} className="flex flex-col gap-5">
                        <h4 className="font-serif-luxury text-[11px] tracking-[0.25em] text-white/80 uppercase">
                          {section.title}
                        </h4>
                        <div className="flex flex-col gap-4">
                          {section.items.map((item, iIdx) => (
                            <a
                              key={iIdx}
                              href={item.href}
                              onClick={(e) => handleLinkClick(e, item.name)}
                              className="font-montserrat text-[13px] text-white/50 hover:text-[#D4AF37] hover:translate-x-2 transition-all duration-300 w-fit uppercase"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Bar inside the menu */}
          <div className="max-w-[1400px] mx-auto mt-20 pt-10 border-t border-[rgba(212,175,55,0.1)] flex flex-wrap gap-8 justify-between items-center opacity-80">
            <div className="flex gap-6">
              {['Our Story', 'Boutique Location', 'Customer Care', 'Contact Us'].map((link, idx) => (
                <a key={idx} href="#" className="font-montserrat text-[10px] sm:text-xs tracking-widest text-[rgba(212,175,55,0.6)] hover:text-[#D4AF37] transition-colors uppercase">
                  {link}
                </a>
              ))}
            </div>
            <div className="font-montserrat text-[10px] tracking-widest uppercase text-white/40">
              Crafted for Excellence
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212,175,55,0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212,175,55,0.6);
        }
      `}</style>
    </>
  );
};

export default Navbar;