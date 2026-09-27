import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Grid, Sliders, Disc, Maximize2 } from 'lucide-react';
import { LensSetting } from '../types';
import { LENS_SETTINGS } from '../data/portfolioData';
import { cinemaAudio } from '../utils/audioSynth';

interface ViewfinderProps {
  currentLens: LensSetting;
  onSelectLens: (lens: LensSetting) => void;
  showHUD: boolean;
  onToggleHUD: () => void;
  isHeroVideoMuted?: boolean;
  onToggleHeroAudio?: () => void;
}

export default function ViewfinderOverlay({
  currentLens,
  onSelectLens,
  showHUD,
  onToggleHUD,
  isHeroVideoMuted = false,
  onToggleHeroAudio,
}: ViewfinderProps) {
  const [timecode, setTimecode] = useState('01:14:28');
  const [showGuides, setShowGuides] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [shutterCount, setShutterCount] = useState(1);

  // Optimized lightweight timecode updater (1Hz instead of 24Hz to eliminate 24 React re-renders/sec)
  useEffect(() => {
    let sec = 28;
    let min = 14;
    const hour = 1;

    const interval = setInterval(() => {
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
          min = 0;
        }
      }
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`${pad(hour)}:${pad(min)}:${pad(sec)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    cinemaAudio.playApertureClick();
    if (onToggleHeroAudio) {
      onToggleHeroAudio();
    }
  };

  const handleLensChange = (lens: LensSetting) => {
    cinemaAudio.playApertureClick();
    onSelectLens(lens);
  };

  const handleCaptureSnapshot = () => {
    cinemaAudio.playShutterClick();
    setIsFlashActive(true);
    setShutterCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFlashActive(false);
    }, 180);
  };

  if (!showHUD) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={onToggleHUD}
          className="flex items-center gap-2 bg-black/85 hover:bg-black text-xs font-mono-tech uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/50 px-4 py-2 rounded-full backdrop-blur-md transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]"
          title="Ativar Visor de Câmara (HUD)"
        >
          <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>VISOR CÂMARA [ON]</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 1. Camera Snapshot Flash Frame */}
      {isFlashActive && (
        <div className="fixed inset-0 z-[120] bg-white pointer-events-none animate-out fade-out duration-200" />
      )}

      {/* 2. Four Viewfinder Corner Framing Brackets */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />

      {/* 3. Camera Guides: 2.39:1 CinemaScope Frame & Rule of Thirds */}
      {showGuides && (
        <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
          {/* CinemaScope 2.39:1 Framing Lines */}
          <div className="absolute top-[6%] left-0 right-0 border-b border-white/[0.08]" />
          <div className="absolute bottom-[6%] left-0 right-0 border-t border-white/[0.08]" />

          {/* Rule of Thirds Grid */}
          <div className="absolute top-0 bottom-0 left-1/3 border-r border-white/[0.04]" />
          <div className="absolute top-0 bottom-0 right-1/3 border-l border-white/[0.04]" />
          <div className="absolute left-0 right-0 top-1/3 border-b border-white/[0.04]" />
          <div className="absolute left-0 right-0 bottom-1/3 border-t border-white/[0.04]" />

          {/* Center Crosshair Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-40">
            <span className="absolute top-1/2 left-0 w-8 h-[1px] bg-white/60 -translate-y-1/2" />
            <span className="absolute left-1/2 top-0 h-8 w-[1px] bg-white/60 -translate-x-1/2" />
          </div>
        </div>
      )}

      {/* 4. Top Telemetry Bar: ARRI ALEXA / Cinema Operator Style */}
      <header className="fixed top-2.5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl flex items-center justify-between bg-black/75 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-mono-tech tracking-wider text-zinc-300 shadow-2xl">
        {/* Left: REC Status & Timecode */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-red-500">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
            <span className="font-bold tracking-widest text-[11px]">REC ●</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-100 font-semibold tracking-widest">{timecode}</span>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="text-[#D4AF37] font-semibold hidden md:inline">4K DCI • 24.00 FPS</span>
        </div>

        {/* Center: Camera Exposure & Optics Telemetry */}
        <div className="hidden lg:flex items-center gap-3 text-zinc-400">
          <span>SHUTTER 180.0°</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-200">ISO 800</span>
          <span className="text-zinc-600">•</span>
          <span>WB 5600K RAW</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#D4AF37]">{currentLens.focal} ({currentLens.aperture})</span>
        </div>

        {/* Right: Audio, Battery, Media & Viewfinder Controls */}
        <div className="flex items-center gap-3">
          {/* CSS-animated Audio VU Meters (zero CPU load, zero React re-renders) */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10" title="Níveis de Áudio (VU Meter CH1 / CH2)">
            <span className="text-[9px] text-[#D4AF37] font-bold">MIC</span>
            <div className="flex flex-col gap-0.5 w-12">
              <div className="h-1 bg-zinc-800 rounded-sm overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-red-500 transition-all duration-300 ${!isHeroVideoMuted ? 'w-[75%]' : 'w-[10%]'}`} />
              </div>
              <div className="h-1 bg-zinc-800 rounded-sm overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-red-500 transition-all duration-300 ${!isHeroVideoMuted ? 'w-[68%]' : 'w-[8%]'}`} />
              </div>
            </div>
          </div>

          {/* Audio Master Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-1 rounded transition-colors ${
              !isHeroVideoMuted
                ? 'text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/40'
                : 'text-zinc-400 hover:text-white'
            }`}
            title={!isHeroVideoMuted ? 'Silenciar Áudio' : 'Ativar Áudio do Vídeo'}
          >
            {!isHeroVideoMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => {
              cinemaAudio.playApertureClick();
              setShowGuides(!showGuides);
            }}
            className={`p-1 rounded transition-colors ${
              showGuides ? 'text-[#D4AF37] bg-[#D4AF37]/20 border border-[#D4AF37]/40' : 'text-zinc-400 hover:text-white'
            }`}
            title="Alternar Grelha & Linhas de Enquadramento"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Capture Still Photo Flash */}
          <button
            onClick={handleCaptureSnapshot}
            className="flex items-center gap-1 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 px-2 py-0.5 rounded text-[9px] text-[#D4AF37] font-semibold transition-colors"
            title="Disparar Obturador (Fotograma #000)"
          >
            <Camera className="w-3 h-3" />
            <span className="hidden sm:inline">SNAP</span>
            <span className="opacity-60">#{shutterCount.toString().padStart(3, '0')}</span>
          </button>

          {/* Battery Status */}
          <div className="flex items-center gap-1 text-zinc-300">
            <span className="text-[9px]">98%</span>
            <div className="w-3.5 h-2 border border-zinc-400 rounded-sm p-[1px] flex items-center">
              <div className="w-full h-full bg-emerald-500 rounded-xs" />
            </div>
          </div>

          {/* Hide HUD */}
          <button
            onClick={onToggleHUD}
            className="text-zinc-400 hover:text-white p-0.5"
            title="Ocultar Visor"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 5. Left Vertical Cinema Optics Selector (Prime Lenses) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-1.5 bg-black/75 border border-white/10 backdrop-blur-md p-2 rounded-xl text-[10px] font-mono-tech shadow-xl">
        <div className="text-[9px] uppercase tracking-widest text-[#D4AF37] pb-1 border-b border-white/10 text-center font-bold">
          OPTICS
        </div>
        {(Object.keys(LENS_SETTINGS) as Array<keyof typeof LENS_SETTINGS>).map((lensKey) => {
          const lens = LENS_SETTINGS[lensKey];
          const isSelected = currentLens.focal === lens.focal;
          return (
            <button
              key={lens.focal}
              onClick={() => handleLensChange(lens)}
              className={`flex items-center justify-between gap-3 px-2 py-1.5 rounded transition-all text-left ${
                isSelected
                  ? 'bg-[#D4AF37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
              }`}
            >
              <span>{lens.focal}</span>
              <span className={`text-[9px] ${isSelected ? 'text-black/80' : 'text-zinc-500'}`}>{lens.aperture}</span>
            </button>
          );
        })}
      </div>

      {/* 6. Bottom Right Telemetry: Media Card & Codec Details */}
      <div className="fixed bottom-3 right-4 z-30 hidden md:flex items-center gap-3 bg-black/70 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono-tech text-zinc-400 shadow-lg">
        <span className="flex items-center gap-1">
          <Disc className="w-3 h-3 text-[#D4AF37]" />
          <span>CFexpress: <strong className="text-zinc-200">1.8 TB LIVRE</strong></span>
        </span>
        <span className="text-zinc-600">|</span>
        <span>Apple ProRes 4444 XQ</span>
        <span className="text-zinc-600">|</span>
        <span className="text-emerald-400 font-semibold">LUT: EFB_GOLD_35MM</span>
      </div>
    </>
  );
}
