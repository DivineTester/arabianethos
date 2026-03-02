import React, { useState, useEffect } from 'react';

export const Toast: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleShowToast = (e: Event) => {
            const customEvent = e as CustomEvent<{ message: string }>;
            setMessage(customEvent.detail.message);
            setIsVisible(true);

            // Reset the auto-hide timer if triggered multiple times
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, 3500); // Display duration: 3.5 seconds
        };

        window.addEventListener('SHOW_TOAST', handleShowToast);

        return () => {
            window.removeEventListener('SHOW_TOAST', handleShowToast);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-[300] transition-all duration-700 ease-in-out pointer-events-none ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
        >
            <div className="bg-[rgba(10,10,10,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.3)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-sm px-6 sm:px-8 py-4 flex items-center gap-4">
                {/* Decorative Gold Dash */}
                <div className="w-4 sm:w-6 h-[1px] bg-[#D4AF37]" />

                <p className="font-serif-luxury text-sm sm:text-base tracking-[0.15em] text-white/90 uppercase text-center md:whitespace-nowrap">
                    {message}
                </p>

                {/* Decorative Gold Dash */}
                <div className="hidden sm:block w-6 h-[1px] bg-[#D4AF37]" />
            </div>
        </div>
    );
};
