import React, { useEffect, useRef, useState } from 'react';
import Logo from '../ARBIAN ETHOS.png';
import { Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCT_CATEGORIES } from '../src/data/categories';

gsap.registerPlugin(ScrollTrigger);

const paymentMethods = [
  '/footer cards/visa-svgrepo-com.svg',
  '/footer cards/mastercard-full-svgrepo-com.svg',
  '/footer cards/amex-svgrepo-com.svg',
  '/footer cards/discover-svgrepo-com.svg',
  '/footer cards/paypal-svgrepo-com.svg',
  '/footer cards/apple-pay-svgrepo-com.svg',
  '/footer cards/google-pay-svgrepo-com.svg',
  '/footer cards/upi_logo_icon_169316.svg'
];

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const cardGroupRef = useRef<HTMLDivElement>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant staggered fade up
      gsap.fromTo(elementsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax on the ambient glow
      gsap.to(".footer-ambient-glow", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Logo 3D Auto-Flip on scroll
      if (cardGroupRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 60%", // Trigger when footer is well into view
            toggleActions: "play none none none"
          }
        });

        tl.to(cardGroupRef.current, {
          rotationY: 180,
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => setIsCardFlipped(true)
        })
          .to({}, { duration: 2.5 }) // Pause to let them read the card
          .to(cardGroupRef.current, {
            rotationY: 360,
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(cardGroupRef.current, { rotationY: 0 }); // Reset for subsequent interactions
              setIsCardFlipped(false);
            }
          });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleLogoClick = () => {
    if (!cardGroupRef.current) return;

    // Kill any ongoing auto-flip animation to prevent conflict
    gsap.killTweensOf(cardGroupRef.current);

    if (isCardFlipped) {
      gsap.to(cardGroupRef.current, { rotationY: 0, duration: 1, ease: "power3.inOut" });
      setIsCardFlipped(false);
    } else {
      gsap.to(cardGroupRef.current, { rotationY: 180, duration: 1, ease: "power3.inOut" });
      setIsCardFlipped(true);
    }
  };

  // Empty the array on each render to avoid duplicate refs in React Strict Mode
  elementsRef.current = [];

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-[#030303] text-white overflow-hidden pt-24 md:pt-32 border-t border-[rgba(212,175,55,0.1)]">
      {/* 1. CINEMATIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
      <div className="footer-ambient-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.07)_0%,transparent_60%)]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#030303] via-transparent to-[#030303] pointer-events-none z-0" />

      {/* 2. NEWSLETTER VIP INVITATION */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 mb-24 md:mb-32">
        <div ref={addToRefs} className="flex flex-col items-center justify-center text-center">
          <span className="font-serif-luxury text-[10px] md:text-[12px] tracking-[0.4em] uppercase text-[#D4AF37] mb-6 opacity-80 inline-block">
            Step Into The Inner Circle
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl tracking-[0.1em] text-white mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            A LIFE OF <span className="text-[#D4AF37] italic pr-2">ELEVATION</span>
          </h2>
          <p className="font-montserrat text-sm md:text-base text-gray-400 font-light max-w-xl mb-12 leading-relaxed opacity-80">
            Subscribe to our private journal to receive exclusive previews of upcoming bespoke collections, VIP event invitations, and curated editorial pieces.
          </p>

          <form className="glass-newsletter flex items-center w-full max-w-2xl relative group transition-all duration-500 hover:border-[rgba(212,175,55,0.4)]">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent border-none outline-none text-white font-montserrat text-sm tracking-widest px-8 py-5 md:py-6 placeholder:text-gray-600 focus:ring-0"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-white text-black rounded-sm w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 transform group-hover:scale-105"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
            {/* Soft inner glow on focus/hover */}
            <div className="absolute inset-0 rounded-sm bg-[#D4AF37] opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-500" />
          </form>
        </div>
      </div>

      {/* 3. DIVIDER */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mb-20 md:mb-28">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.3)] to-transparent opacity-50" />
      </div>

      {/* 4. MAIN FOOTER CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-4 lg:gap-8">

          {/* Brand Info (Left - Massive Presence) */}
          <div ref={addToRefs} className="md:col-span-5 flex flex-col pt-2">
            {/* 3D Flipping Logo Container */}
            <div
              className="relative w-full max-w-[600px] aspect-[400/100] mb-8 cursor-pointer group perspective-[1000px]"
              onClick={handleLogoClick}
            >
              <div
                ref={cardGroupRef}
                className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700"
              >
                {/* Front (Logo) */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img
                      src={Logo}
                      alt="Arabian Ethos"
                      className="w-full h-full object-contain filter saturate-[1.2] brightness-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.15)] origin-left"
                    />
                </div>

                {/* Back (Business Card) */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the flip again
                    if (isCardFlipped) {
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <div className="w-full h-full relative group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300">
                    <img
                      src="/ARABIAN ETHOS CARD.png"
                      alt="Arabian Ethos Card"
                      className="w-full h-full object-contain rounded-sm"
                    />
                    {/* Hover text indicator */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm">
                      <span className="font-serif-luxury text-[10px] tracking-widest text-[#D4AF37] uppercase">Click to Expand</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-4">


              {/* The Address - Styled to match "ELEVATION" */}
              <div className="flex flex-col gap-2 text-[18px] text-white italic tracking-[0.1em] mb-8">
                <p>38, HAINES ROAD, FRAZER TOWN</p>
                <p>560005 BANGALORE</p>
              </div>

              {/* The Contact - Styled to match "ELEVATION" */}
              <div className="flex flex-col gap-3 text-[18px] text-white italic tracking-[0.1em]">
                <a href="tel:+919739751786" className="w-fit hover:text-[#D4AF37] transition-colors relative group">
                  +91 973 975 1786
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-50"></span>
                </a>
                <a href="tel:+919880314497" className="w-fit hover:text-[#D4AF37] transition-colors relative group">
                  +91 988 031 4497
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-50"></span>
                </a>
                <a href="mailto:info@arabianethos.in" className="w-fit hover:text-[#D4AF37] transition-colors relative group">
                  info@arabianethos.in
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-50"></span>
                </a>
              </div>
            </div>
          </div>

          {/* Links Grid (Right - Minimalist 3 Columns) */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-4 lg:gap-8">

              {/* Column 1: SHOP */}
              <div ref={addToRefs} className="flex flex-col gap-6">
                <h4 className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">
                  SHOP
                </h4>
                <div className="flex flex-col gap-3 font-montserrat text-[13px] text-white/80 font-light">
                  <a href="#" className="hover:text-[#D4AF37] transition-colors w-fit">View All</a>
                  {[
                    "Men's Thobes", "Men's Footwear", "Men's Headwear",
                    "Boys' Thobes", "Kids' Hajj & Umrah",
                    "Abayas", "Women's Hajj & Umrah",
                    "Oud & Attars", "Accessories"
                  ].map((item, idx) => (
                    <a key={idx} href="#" className="hover:text-[#D4AF37] transition-colors w-fit">{item}</a>
                  ))}
                </div>
              </div>

              {/* Column 2: THE HOUSE */}
              <div ref={addToRefs} className="flex flex-col gap-6">
                <h4 className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">
                  THE HOUSE
                </h4>
                <div className="flex flex-col gap-3 font-montserrat text-[13px] text-white/80 font-light">
                  {['Private Appointments', 'Client Services', 'Shipping & Delivery', 'Returns & Exchanges', 'Care Guide'].map((item) => (
                    <a key={item} href="#" className="hover:text-[#D4AF37] transition-colors w-fit">
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 3: JOIN US */}
              <div ref={addToRefs} className="flex flex-col gap-6">
                <h4 className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">
                  JOIN US
                </h4>
                <div className="flex flex-col gap-3 font-montserrat text-[13px] text-white/80 font-light">
                  <a href="https://www.instagram.com/arabian.ethos?igsh=MWljZHY4MHFuejkxMA==" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors w-fit flex items-center gap-2">
                    <Instagram size={16} />
                    <span>Instagram</span>
                  </a>
                  <a href="https://www.facebook.com/share/1Bo4VVvUVA/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors w-fit flex items-center gap-2">
                    <Facebook size={16} />
                    <span>Facebook</span>
                  </a>
                  <a href="https://youtube.com/@arabianethos?si=aalXYZZghT-wVtfw" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors w-fit flex items-center gap-2">
                    <Youtube size={16} />
                    <span>Youtube</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 5. BOTTOM METADATA BAR */}
      <div className="relative z-20 w-full bg-[#020202] border-t border-[rgba(212,175,55,0.08)] py-6 md:py-8 mt-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

          {/* Left Side: Copyright */}
          <div ref={addToRefs} className="flex flex-col items-center md:flex-row md:items-center gap-1 md:gap-2 font-montserrat text-[11px] tracking-widest text-gray-500 uppercase">
            <span>© {new Date().getFullYear()} Arabian Ethos</span>
            <span className="hidden md:inline mx-2 text-[rgba(212,175,55,0.3)]">|</span>
            <span className="block md:inline mt-1 md:mt-0">A UNIT OF AL JUMANAH VENTURES LLP</span>
          </div>

          {/* Right Side: Payment Methods */}
          <div ref={addToRefs} className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
            {paymentMethods.map((src, index) => {
              const isPaddedImage = src.includes('pngwing') || src.includes('95b8efae8b4321acfd7955102e79e2a7358a9928');
              return (
                <img
                  key={index}
                  src={src}
                  alt={`Payment method ${index + 1}`}
                  className={`
                    w-auto object-contain mix-blend-screen opacity-40 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0
                    ${isPaddedImage ? 'h-5 sm:h-7' : 'h-3 sm:h-4'}
                  `}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .glass-newsletter {
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212,175,55,0.15);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
          border-radius: 4px;
        }
      `}</style>

      {/* 6. BUSINESS CARD FULL-SCREEN MODAL */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-500 overflow-hidden ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          onClick={() => {
            setIsModalOpen(false);
            // Flip back automatically when closing the modal
            if (cardGroupRef.current) {
              gsap.to(cardGroupRef.current, { rotationY: 0, duration: 1, ease: "power3.inOut", delay: 0.3 });
              setIsCardFlipped(false);
            }
          }}
          className="absolute top-8 right-8 text-white/70 hover:text-[#D4AF37] transition-colors p-2 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className={`relative w-full max-w-5xl px-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0'}`}>
          <img
            src="/ARABIAN ETHOS CARD.png"
            alt="Arabian Ethos High Resolution Card"
            className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-lg"
          />
        </div>

        <a
          href="/ARABIAN ETHOS CARD.png"
          download="Arabian_Ethos_Business_Card.png"
          className={`absolute bottom-12 group flex items-center gap-3 px-8 py-4 bg-transparent border border-[rgba(212,175,55,0.3)] hover:border-[#D4AF37] hover:bg-[rgba(212,175,55,0.05)] text-white font-serif-luxury tracking-[0.2em] text-[11px] uppercase transition-all duration-500 delay-300 ${isModalOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="relative z-10">DOWNLOAD</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
      </div>

    </footer>
  );
};

export default Footer;