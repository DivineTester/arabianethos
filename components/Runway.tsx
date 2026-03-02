import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const categories = [
  {
    title: "Premium Thobes",
    images: ["/Premium Thobes1.webp", "/Premium Thobes2.webp", "/Premium Thobes3.PNG"],
    price: "Luxury Arabian Craftsmanship"
  },
  { title: "Pathani Suits", img: "/Pathani Suits.PNG", price: "Royal Heritage Wear" },
  { title: "Kurta Pyjama Sets", img: "/Kurta Pyjama Sets.PNG", price: "Elegant Traditional Attire" },
  { title: "Arabic Sandals", video: "/Arabic Sandals.mp4", price: "Hand-crafted Leather" },
  { title: "Attars & Bakhoor", img: "/Attars & Bakhoor1.png", price: "Pure Essence" },
];

const CategoryCard: React.FC<{ item: any }> = ({ item }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = item.images || (item.img ? [item.img] : []);
  const isSlider = images.length > 1;

  useEffect(() => {
    if (!isSlider || images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 2500); // 2.5 seconds loop
    return () => clearInterval(timer);
  }, [isSlider, images.length]);

  return (
    <div className="min-w-[85vw] md:min-w-[450px] h-full group relative overflow-hidden flex-shrink-0 bg-white/5">
      {item.video ? (
        <video
          src={item.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-110 z-10"
        />
      ) : (
        images.map((imgSrc: string, idx: number) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={`${item.title} ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover grayscale transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-110 ${idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          />
        ))
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-30 pointer-events-none">
        <h3 className="text-3xl md:text-4xl font-cinzel text-gold mb-2">{item.title}</h3>
        <p className="text-white/80 font-light tracking-[0.3em] text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {item.price}
        </p>
        <div className="w-0 group-hover:w-full h-[1px] bg-gold/50 mt-4 transition-all duration-1000" />
      </div>
    </div>
  );
};

const Runway: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        if (!runwayRef.current) return 0;
        // Precisely calculate how far the container needs to translate to align the final item flush with the right viewport edge.
        return -(runwayRef.current.scrollWidth - window.innerWidth);
      };

      gsap.to(runwayRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${runwayRef.current?.scrollWidth || 0}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true, // Recalculates exact widths perfectly via `getScrollAmount` on window pivot/resize
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden bg-black flex flex-col justify-center min-h-screen relative z-30">
      <div className="px-10 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <h2 className="text-5xl md:text-8xl font-serif-luxury text-gold uppercase tracking-tighter">
          The Runway
        </h2>
        <p className="text-white/60 font-light max-w-sm tracking-wide text-sm md:text-base">
          Our latest collection combines traditional silhouettes with modern tailoring excellence.
        </p>
      </div>

      <div ref={runwayRef} className="flex gap-10 px-10 h-[60vh] md:h-[70vh] items-center">
        {categories.map((item, i) => (
          <CategoryCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Runway;