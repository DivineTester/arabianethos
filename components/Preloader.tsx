import React, { useEffect, useRef, useState } from 'react';
import Logo from '../ARBIAN ETHOS.png';
import gsap from 'gsap';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                onComplete();
            }
        });

        tl.fromTo(logoRef.current,
            { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }
        )
            .fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 1.5, ease: 'power2.inOut' },
                "-=0.8"
            )
            .fromTo(textRef.current,
                { opacity: 0, y: 15, filter: 'blur(5px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
                "-=1"
            )
            .to([logoRef.current, textRef.current, lineRef.current], {
                opacity: 0,
                y: -30,
                filter: 'blur(10px)',
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.inOut',
                delay: 0.8
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.5,
                ease: 'expo.inOut'
            }, "-=0.4");

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-[#D4AF37] overflow-hidden"
        >
            {/* Subtle Texture/Gradient in background of preloader */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative flex flex-col items-center z-10">
                <img
                    ref={logoRef}
                    src={Logo}
                    alt="Arabian Ethos Crest"
                    className="w-48 md:w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] saturate-[1.1]"
                />

                <div className="w-full flex justify-center items-center mt-8">
                    <div
                        ref={lineRef}
                        className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent origin-center opacity-80"
                    />
                </div>

                <div
                    ref={textRef}
                    className="mt-8 font-serif-luxury text-[13px] md:text-[15px] tracking-[0.4em] uppercase text-[rgba(212,175,55,0.9)]"
                >
                    Curating Excellence
                </div>
            </div>
        </div>
    );
};

export default Preloader;
