import { useState, useEffect } from 'react';
import EfbLogo from './EfbLogo';

interface CinematicIntroProps {
  onComplete: () => void;
  customLogoUrl?: string;
}

export default function CinematicIntro({ onComplete, customLogoUrl }: CinematicIntroProps) {
  // Animation phases:
  // 'initial' -> 'aperture' -> 'brand' -> 'slogan' -> 'fade_out' -> 'finished'
  const [phase, setPhase] = useState<'initial' | 'aperture' | 'brand' | 'slogan' | 'fade_out' | 'finished'>('initial');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session
    const seen = sessionStorage.getItem('efb_cinematic_intro_seen');
    if (seen === 'true') {
      onComplete();
      setPhase('finished');
      return;
    }

    // Cinematic Choreography Timeline (Total ~3.2 seconds)
    // 1. Start aperture breath at 150ms
    const t1 = setTimeout(() => {
      setPhase('aperture');
    }, 150);

    // 2. Optical camera focus & Brand "EFB MÍDIA" reveal at 700ms
    const t2 = setTimeout(() => {
      setPhase('brand');
    }, 700);

    // 3. Delicate Slogan "ALÉM DO OLHAR" reveal at 1700ms
    const t3 = setTimeout(() => {
      setPhase('slogan');
    }, 1700);

    // 4. Smooth Cinematic dissolve & light expansion at 2700ms
    const t4 = setTimeout(() => {
      setPhase('fade_out');
    }, 2700);

    // 5. Complete and handoff seamlessly to main site at 3400ms
    const t5 = setTimeout(() => {
      sessionStorage.setItem('efb_cinematic_intro_seen', 'true');
      setPhase('finished');
      onComplete();
    }, 3400);

    // Keyboard shortcut (Escape to skip intro)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const skipIntro = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    sessionStorage.setItem('efb_cinematic_intro_seen', 'true');
    setPhase('fade_out');
    setTimeout(() => {
      setPhase('finished');
      onComplete();
    }, 400);
  };

  if (phase === 'finished') {
    return null;
  }

  // Visual state derivations
  const isApertureActive = phase !== 'initial';
  const isBrandVisible = phase === 'brand' || phase === 'slogan' || phase === 'fade_out';
  const isSloganVisible = phase === 'slogan' || phase === 'fade_out';
  const isFadingOut = phase === 'fade_out';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden select-none pointer-events-auto transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transitionProperty: 'opacity, filter, transform',
        filter: isFadingOut ? 'blur(8px)' : 'none',
        transform: isFadingOut ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {/* ===================================================================== */}
      {/* 1. CINEMATIC BACKGROUND OPTICAL ATMOSPHERE & ANAMORPHIC LIGHT FLARE    */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep black vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0C0C0C_0%,#050505_70%,#000000_100%)]" />

        {/* Anamorphic Horizontal Streak of Light (Subtle 35mm Prime Lens Glow) */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent transition-all duration-1000 ease-out pointer-events-none ${
            isApertureActive ? 'opacity-70 scale-x-100' : 'opacity-0 scale-x-25'
          }`}
          style={{
            filter: 'blur(1px)',
            boxShadow: '0 0 35px rgba(212,175,55,0.45)',
          }}
        />

        {/* Soft Center Lens Bloom */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4AF37]/10 transition-all duration-1000 ease-out pointer-events-none ${
            isBrandVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ filter: 'blur(70px)' }}
        />
      </div>

      {/* ===================================================================== */}
      {/* 2. SUBTLE RETICLE & OPTICAL FOCUS GUIDES                                */}
      {/* ===================================================================== */}
      <div
        className={`absolute inset-8 sm:inset-16 pointer-events-none border border-white/5 transition-opacity duration-700 ${
          isBrandVisible ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/40" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/40" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/40" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/40" />
      </div>

      {/* ===================================================================== */}
      {/* 3. CENTRAL HERO IDENTITY LOCKUP (EFB MÍDIA • ALÉM DO OLHAR)             */}
      {/* ===================================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* BRAND LOGOMARK (EFB in pure white, MÍDIA in rich gold) */}
        <div
          className={`transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isBrandVisible
              ? 'opacity-100 blur-0 scale-100 translate-y-0'
              : 'opacity-0 blur-[14px] scale-95 translate-y-2'
          }`}
        >
          {customLogoUrl ? (
            <div className="max-w-xs sm:max-w-md mx-auto mb-2">
              <img
                src={customLogoUrl}
                alt="EFB MÍDIA"
                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center select-none">
              {/* LINE 1: EFB (Crisp, stark solid bold pure white) */}
              <h1
                className="font-cinematic font-black text-white text-5xl sm:text-7xl md:text-8xl tracking-[0.14em] uppercase leading-none"
                style={{
                  fontFamily: "'Syne', 'Outfit', sans-serif",
                  fontWeight: 900,
                  textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 0 40px rgba(255,255,255,0.15)',
                }}
              >
                EFB
              </h1>

              {/* LINE 2: MÍDIA (Rich satin gold with acute accent) */}
              <h2
                className="font-cinematic font-black text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] uppercase leading-none mt-1 sm:mt-2"
                style={{
                  color: '#D4AF37',
                  fontFamily: "'Syne', 'Outfit', sans-serif",
                  fontWeight: 900,
                  textShadow: '0 4px 25px rgba(0,0,0,0.95), 0 0 35px rgba(212,175,55,0.4)',
                }}
              >
                MÍDIA
              </h2>
            </div>
          )}
        </div>

        {/* DELICATE SLOGAN: "ALÉM DO OLHAR" */}
        <div
          className={`mt-5 sm:mt-6 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSloganVisible
              ? 'opacity-100 max-h-16 blur-0 translate-y-0'
              : 'opacity-0 max-h-0 blur-[8px] translate-y-3'
          }`}
        >
          {/* Subtle gold divider line with center diamond */}
          <div className="flex items-center justify-center gap-3 mb-3 opacity-60">
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p
            className="font-mono-tech uppercase text-zinc-300 font-light text-xs sm:text-sm md:text-base tracking-[0.38em] sm:tracking-[0.45em] drop-shadow-md whitespace-nowrap"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            }}
          >
            Além do olhar
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. DISCREET SKIP BUTTON (TOP OR BOTTOM RIGHT)                         */}
      {/* ===================================================================== */}
      <button
        onClick={skipIntro}
        className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 text-zinc-400 hover:text-[#D4AF37] font-mono-tech text-[10px] tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm ${
          isBrandVisible ? 'opacity-80' : 'opacity-0'
        }`}
      >
        <span>Pular Intro</span>
        <span className="ml-1.5 opacity-60 font-sans">✕</span>
      </button>
    </div>
  );
}
