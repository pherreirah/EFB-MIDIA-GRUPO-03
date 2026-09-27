import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  id: number;
  time: string;
  seconds: number;
  title: string;
  category: string;
  location: string;
  still: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    time: '00:00',
    seconds: 0,
    title: 'Abertura & Luz Equatorial',
    category: 'Cinema Autoral',
    location: 'Luanda & Kwanza Sul',
    still: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    time: '00:45',
    seconds: 45,
    title: 'Haute Joaillerie & Luxo',
    category: 'Campanha Comercial',
    location: 'Lisboa & Sintra',
    still: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    time: '01:30',
    seconds: 90,
    title: 'Nocturno & Neo-Noir',
    category: 'Curta Ficção 35mm',
    location: 'Lisboa Metrópole',
    still: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    time: '02:15',
    seconds: 135,
    title: 'Batida & Afro-Futurismo',
    category: 'Visual Album',
    location: 'Ilha de Luanda',
    still: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(12);
  const totalSeconds = 180; // 3:00 total showreel runtime
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Playback timer simulation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev >= totalSeconds) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  // Sync active chapter with time
  useEffect(() => {
    if (currentSeconds >= 135) setActiveChapterIndex(3);
    else if (currentSeconds >= 90) setActiveChapterIndex(2);
    else if (currentSeconds >= 45) setActiveChapterIndex(1);
    else setActiveChapterIndex(0);
  }, [currentSeconds]);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS[activeChapterIndex];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentSeconds / totalSeconds) * 100;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-6xl bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Viewfinder Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-black/80 border-b border-white/10 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]" />
            <span className="font-mono-tech text-xs tracking-widest text-[#E5A93C] uppercase font-bold">
              SHOWREEL OFICIAL MMXXV // 4K MASTER
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline font-mono-tech text-[11px] text-zinc-400">
              ARRI ALEXA LF • COOKE ANAMORPHIC • 2.39:1
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar Showreel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Stage (Cinematic Aspect Ratio 2.39:1) */}
        <div className="relative aspect-[21/9] sm:aspect-[2.39/1] bg-zinc-950 overflow-hidden flex items-center justify-center">
          {/* Active Chapter Visual Frame */}
          <img
            src={currentChapter.still}
            alt={currentChapter.title}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
            style={{ transition: 'transform 8s ease-out, opacity 0.8s ease' }}
          />

          {/* Letterbox Bars & Cinematic Shadow Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

          {/* Live Chapter Title Overlay */}
          <div className="absolute top-6 left-6 z-10 p-3 rounded bg-black/50 backdrop-blur-md border border-white/10 max-w-sm">
            <span className="font-mono-tech text-[9px] text-[#E5A93C] uppercase tracking-widest block mb-0.5">
              CENA 0{currentChapter.id} • {currentChapter.category}
            </span>
            <h4 className="font-cinematic text-lg sm:text-2xl text-white font-normal leading-tight">
              {currentChapter.title}
            </h4>
            <span className="text-[10px] font-mono-tech text-zinc-400 block mt-1">
              Locação: {currentChapter.location}
            </span>
          </div>

          {/* Center Big Play/Pause Toggle when user hovers */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-20 h-20 rounded-full bg-black/60 border border-[#E5A93C] text-[#E5A93C] flex items-center justify-center hover:scale-110 hover:bg-[#E5A93C] hover:text-black transition-all shadow-[0_0_40px_rgba(229,169,60,0.4)] backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>

          {/* Live Viewfinder Crosshair in Video */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-16 h-16 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-[#E5A93C] rounded-full" />
            </div>
          </div>
        </div>

        {/* Video Timeline & Scrub Bar */}
        <div className="bg-[#0D0D0F] border-t border-white/10 p-4 sm:p-6 space-y-4">
          {/* Progress Bar with Chapters Marks */}
          <div className="relative w-full h-2 bg-zinc-800 rounded-full cursor-pointer overflow-hidden group">
            <div
              className="absolute top-0 left-0 bottom-0 bg-[#E5A93C] rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Chapter markers */}
            {CHAPTERS.map((ch) => (
              <div
                key={ch.id}
                className="absolute top-0 bottom-0 w-0.5 bg-white/40 z-10"
                style={{ left: `${(ch.seconds / totalSeconds) * 100}%` }}
                title={ch.title}
              />
            ))}
          </div>

          {/* Controls Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Play/Pause & Timecode */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-full bg-white text-black hover:bg-[#E5A93C] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => setCurrentSeconds(0)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="font-mono-tech text-xs tracking-wider text-zinc-300">
                <span className="text-white">{formatTime(currentSeconds)}</span>
                <span className="text-zinc-600"> / </span>
                <span className="text-zinc-400">{formatTime(totalSeconds)}</span>
              </div>
            </div>

            {/* Chapters Fast Switcher */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-mono-tech text-[10px] text-zinc-500 uppercase tracking-widest mr-1">
                Capítulos:
              </span>
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentSeconds(ch.seconds);
                    setActiveChapterIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono-tech transition-colors ${
                    activeChapterIndex === idx
                      ? 'bg-[#E5A93C] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white bg-white/5'
                  }`}
                >
                  {ch.time} {ch.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Audio Toggle & Specs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                title={isMuted ? 'Desmutar Áudio' : 'Mutar Áudio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E5A93C]" />}
              </button>

              <span className="font-mono-tech text-[10px] text-zinc-500 hidden sm:inline uppercase">
                DOLBY ATMOS 7.1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
