import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CursorProps {
  cursorText: string;
  cursorVariant: 'default' | 'play' | 'view' | 'lens' | 'hidden';
}

export default function InteractiveCursor({ cursorText, cursorVariant }: CursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [focusDistance, setFocusDistance] = useState('2.4m');
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with precise pointer (avoid breaking touch screens)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const updateMouse = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);

        const dist = (1.2 + (e.clientY / window.innerHeight) * 3.8).toFixed(1);
        setFocusDistance(`${dist}m`);

        const target = e.target as HTMLElement | null;
        if (target) {
          const isClickable = Boolean(
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.getAttribute('role') === 'button' ||
            target.dataset.cursor
          );
          setIsPointer(isClickable);
        }
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // No synthetic audio click to keep the experience completely silent and free of noise
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible || cursorVariant === 'hidden') return null;

  const isExpanded = cursorVariant === 'play' || cursorVariant === 'view' || cursorVariant === 'lens';

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block">
      {/* 1. Subtle Shutter Flash Ring Effect on click */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-20 h-20 rounded-full bg-[#D4AF37] blur-md -translate-x-1/2 -translate-y-1/2"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          />
        )}
      </AnimatePresence>

      {/* 2. Micro Central Crosshair Target */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicking ? 0.7 : isPointer ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 450, mass: 0.08 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
      </motion.div>

      {/* 3. Camera Viewfinder Autofocus Brackets [ + ] */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicking ? 0.85 : isPointer ? 1.15 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.12 }}
      >
        <div className="relative w-9 h-9">
          <span className="absolute top-0 left-0 w-2 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="absolute top-0 left-0 w-[1.5px] h-2 bg-[#D4AF37]/80" />
          <span className="absolute top-0 right-0 w-2 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="absolute top-0 right-0 w-[1.5px] h-2 bg-[#D4AF37]/80" />
          <span className="absolute bottom-0 left-0 w-2 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="absolute bottom-0 left-0 w-[1.5px] h-2 bg-[#D4AF37]/80" />
          <span className="absolute bottom-0 right-0 w-2 h-[1.5px] bg-[#D4AF37]/80" />
          <span className="absolute bottom-0 right-0 w-[1.5px] h-2 bg-[#D4AF37]/80" />
        </div>
      </motion.div>

      {/* 4. Outer Cinema Ring */}
      <motion.div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-colors ${
          isExpanded
            ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-mono-tech font-bold tracking-widest text-[10px] shadow-[0_0_30px_rgba(212,175,55,0.6)]'
            : isPointer
            ? 'border-[#D4AF37] bg-[#D4AF37]/10 backdrop-blur-[2px] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            : 'border-white/20'
        }`}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isExpanded ? 88 : isPointer ? 52 : 36,
          height: isExpanded ? 88 : isPointer ? 52 : 36,
          rotate: isPointer ? 45 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 260, mass: 0.18 }}
      >
        {isExpanded && (
          <span className="uppercase select-none text-center leading-none px-2 font-mono-tech">
            {cursorText || (cursorVariant === 'play' ? 'PLAY ▶' : 'VER')}
          </span>
        )}
      </motion.div>

      {/* 5. Floating Telemetry Badge */}
      {!isExpanded && (
        <motion.div
          className="fixed top-0 left-0 pl-6 pt-5 pointer-events-none font-mono-tech text-[9px] tracking-wider text-zinc-400 select-none flex items-center gap-1.5"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            opacity: isVisible ? (isPointer ? 0.95 : 0.45) : 0,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.05 }}
        >
          <span className={`px-1 rounded ${isPointer ? 'bg-[#D4AF37] text-black font-semibold' : 'text-zinc-400'}`}>
            {isPointer ? 'AF-LOCK' : 'CINE'}
          </span>
          <span className="text-[#D4AF37] font-medium">{focusDistance}</span>
        </motion.div>
      )}
    </div>
  );
}
