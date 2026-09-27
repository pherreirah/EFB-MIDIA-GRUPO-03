import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  ArrowDownRight, 
  Volume2, 
  VolumeX, 
  Instagram, 
  Facebook, 
  Settings, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Upload, 
  Link as LinkIcon, 
  Trash2, 
  Film, 
  Check, 
  Maximize2 
} from 'lucide-react';
import { LensSetting } from '../types';
import { AdminMediaConfig, CINE_VIDEO_PRESETS, saveUploadedVideoBlob } from '../utils/adminStorage';
import { cinemaAudio } from '../utils/audioSynth';

interface HeroProps {
  currentLens: LensSetting;
  onOpenShowreel: () => void;
  onOpenAdmin: () => void;
  adminConfig: AdminMediaConfig;
  onSaveAdminConfig?: (config: AdminMediaConfig) => void;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: 'default' | 'play' | 'view' | 'lens' | 'hidden') => void;
  onSelectServiceTab?: (tabIndex: number) => void;
  isAudioUnmuted?: boolean;
  onToggleSound?: () => void;
}

const HERO_SERVICE_TABS = [
  { number: '01', title: 'MARKETING DIGITAL', targetId: 'marketing-digital-performance' },
  { number: '02', title: 'CINEMA', targetId: 'cinema-ficcao' },
  { number: '03', title: 'DOCUMENTÁRIO', targetId: 'documentario' },
  { number: '04', title: 'VÍDEO-CLIP', targetId: 'video-clip' },
  { number: '05', title: 'MOTION DESIGN', targetId: 'motion-design-vfx' },
  { number: '06', title: 'WEBSITES', targetId: 'websites-plataformas' },
  { number: '07', title: 'PUBLICIDADE', targetId: 'spot-publicitario' },
  { number: '08', title: 'PODCAST & SOUND', targetId: 'podcast-vodcast' },
];

export default function Hero({
  currentLens,
  onOpenShowreel,
  onOpenAdmin,
  adminConfig,
  onSaveAdminConfig,
  setCursorText,
  setCursorVariant,
  onSelectServiceTab,
  isAudioUnmuted = false,
  onToggleSound,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(!isAudioUnmuted);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isPureCinemaMode, setIsPureCinemaMode] = useState(false);
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);

  // Direct URL attachment modal/state
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [showPresetDropdown, setShowPresetDropdown] = useState(false);
  const [uploadSuccessFeedback, setUploadSuccessFeedback] = useState<string | null>(null);

  const activeVideoSrc = adminConfig.heroVideoUrl || '';
  const hasVideo = Boolean(activeVideoSrc.trim().length > 0);
  const activePoster = adminConfig.heroPosterUrl || CINE_VIDEO_PRESETS[0].poster;

  // Start video playback cleanly with optional sound (zero audio noise)
  const startVideoPlayback = useCallback(async (withSound = false) => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = !withSound;
    if (withSound) {
      vid.volume = 1.0;
    }

    try {
      await vid.play();
      setIsVideoPlaying(true);
      setIsMuted(!withSound);
    } catch {
      // If browser prevents unmuted playback initially, play muted cleanly
      vid.muted = true;
      setIsMuted(true);
      await vid.play().catch(() => {});
    }
  }, []);

  // When activeVideoSrc changes, attempt to play
  useEffect(() => {
    if (hasVideo) {
      setVideoLoaded(false);
      startVideoPlayback(isAudioUnmuted);
    }
  }, [hasVideo, activeVideoSrc, startVideoPlayback, isAudioUnmuted]);

  // Sync external sound toggle
  useEffect(() => {
    if (typeof isAudioUnmuted === 'boolean') {
      setIsMuted(!isAudioUnmuted);
      if (videoRef.current) {
        videoRef.current.muted = !isAudioUnmuted;
        if (isAudioUnmuted) {
          videoRef.current.volume = 1.0;
          videoRef.current.play().catch(() => {});
        }
      }
    }
  }, [isAudioUnmuted]);

  // Toggle Video Play/Pause
  const toggleVideoPlayback = () => {
    cinemaAudio.playApertureClick();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsVideoPlaying(false);
    }
  };

  // Toggle Audio (Clean audio only, NO synthesizer noise)
  const toggleSound = () => {
    cinemaAudio.playApertureClick();
    if (onToggleSound) {
      onToggleSound();
      return;
    }
    const nextState = !isMuted;
    setIsMuted(nextState);
    if (videoRef.current) {
      videoRef.current.muted = nextState;
      if (!nextState) {
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Handle local video file attachment (MP4 / WebM)
  const handleFileAttach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    cinemaAudio.playShutterClick();
    const objectUrl = URL.createObjectURL(file);
    
    // Save to indexedDB for persistence
    saveUploadedVideoBlob(file, 'hero_video').catch(() => {});

    const updatedConfig: AdminMediaConfig = {
      ...adminConfig,
      heroVideoUrl: objectUrl,
      heroVideoName: file.name,
      heroVideoSourceType: 'upload',
      lastUpdated: new Date().toISOString(),
    };

    if (onSaveAdminConfig) {
      onSaveAdminConfig(updatedConfig);
    }

    setUploadSuccessFeedback(`Vídeo "${file.name}" anexado com sucesso!`);
    setTimeout(() => setUploadSuccessFeedback(null), 4000);
  };

  // Handle URL video attachment
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    cinemaAudio.playApertureClick();
    const updatedConfig: AdminMediaConfig = {
      ...adminConfig,
      heroVideoUrl: inputUrl.trim(),
      heroVideoName: 'Vídeo por Link Directo',
      heroVideoSourceType: 'url',
      lastUpdated: new Date().toISOString(),
    };

    if (onSaveAdminConfig) {
      onSaveAdminConfig(updatedConfig);
    }

    setShowUrlModal(false);
    setInputUrl('');
    setUploadSuccessFeedback('Link de vídeo anexado com sucesso!');
    setTimeout(() => setUploadSuccessFeedback(null), 4000);
  };

  // Handle preset video attachment
  const handleSelectPreset = (presetUrl: string, presetName: string) => {
    cinemaAudio.playApertureClick();
    const updatedConfig: AdminMediaConfig = {
      ...adminConfig,
      heroVideoUrl: presetUrl,
      heroVideoName: presetName,
      heroVideoSourceType: 'preset',
      lastUpdated: new Date().toISOString(),
    };

    if (onSaveAdminConfig) {
      onSaveAdminConfig(updatedConfig);
    }

    setShowPresetDropdown(false);
    setUploadSuccessFeedback(`Pré-definição "${presetName}" carregada!`);
    setTimeout(() => setUploadSuccessFeedback(null), 4000);
  };

  // Handle Remove / Leave Slot Empty (0MB - Super fast for GitHub migration)
  const handleRemoveVideo = () => {
    cinemaAudio.playApertureClick();
    const updatedConfig: AdminMediaConfig = {
      ...adminConfig,
      heroVideoUrl: '',
      heroVideoName: 'Local Vago (Pronto para Anexar)',
      heroVideoSourceType: 'upload',
      lastUpdated: new Date().toISOString(),
    };

    if (onSaveAdminConfig) {
      onSaveAdminConfig(updatedConfig);
    }

    setUploadSuccessFeedback('Vídeo removido! O local está vago e o repositório 100% leve para o GitHub.');
    setTimeout(() => setUploadSuccessFeedback(null), 4000);
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-20 pb-0 overflow-hidden bg-[#050505]"
    >
      {/* Hidden file input for attaching local videos */}
      <input 
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/ogg,video/quicktime"
        className="hidden"
        onChange={handleFileAttach}
      />

      {/* ========================================================================= */}
      {/* 1. BACKGROUND CONTAINER (EITHER 100% CLEAR VIDEO OR DEDICATED EMPTY SLOT) */}
      {/* ========================================================================= */}
      {hasVideo ? (
        /* ACTIVE VIDEO: 100% Sharp, Unobstructed & Clean */
        <div
          className="absolute inset-0 z-0 overflow-hidden transition-all duration-500 ease-out"
          style={{
            filter: 'brightness(1) contrast(1)',
            opacity: 1,
          }}
        >
          <video
            ref={videoRef}
            key={activeVideoSrc}
            src={activeVideoSrc}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => {
              setVideoLoaded(true);
              startVideoPlayback(!isMuted);
            }}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            poster={activePoster}
          />

          {/* Minimal bottom feather edge for dock readability */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
        </div>
      ) : (
        /* DEDICATED EMPTY VIDEO SLOT ("LOCAL VAGO PARA ANEXAR VÍDEO") */
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-[#0a0a0a] to-black">
          {/* Subtle cinematic camera aperture background pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.25)_0%,_transparent_70%)]" />
          
          {/* Frame guides & slot container */}
          <div className="relative z-10 w-[92%] max-w-4xl border border-dashed border-[#D4AF37]/40 rounded-xl p-8 sm:p-12 bg-black/60 backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
            
            {/* Viewfinder corner brackets inside the slot */}
            <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
            <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Camera Film Slate Icon */}
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <Film className="w-8 h-8" />
            </div>

            {/* Slot Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono-tech uppercase tracking-[0.2em] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>SLOT DE VÍDEO PRONTO • LOCAL VAGO</span>
            </div>

            {/* Title & Description in Angolan Portuguese */}
            <h2 className="text-xl sm:text-2xl font-serif tracking-wider text-white mb-2">
              Espaço Reservado para o Vídeo de Apresentação
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl font-sans leading-relaxed mb-6">
              Deixado <strong className="text-zinc-200">vago propositadamente</strong> para manter o site ultra-leve, 
              sem peso de ficheiros pesados e para facilitar o envio e a migração rápida no 
              <strong className="text-[#D4AF37]"> GitHub</strong>. Podes anexar o teu vídeo a qualquer momento abaixo:
            </p>

            {/* Action buttons inside the vacant slot */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              {/* Button 1: Attach local file */}
              <button
                onClick={() => {
                  cinemaAudio.playApertureClick();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs tracking-wider uppercase rounded transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] transform hover:-translate-y-0.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>+ Anexar Vídeo (MP4 / WebM)</span>
              </button>

              {/* Button 2: Paste URL */}
              <button
                onClick={() => {
                  cinemaAudio.playApertureClick();
                  setShowUrlModal(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/80 hover:bg-zinc-900 border border-white/20 hover:border-[#D4AF37] text-zinc-200 hover:text-white font-medium text-xs tracking-wider uppercase rounded transition-all"
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Inserir Link / URL</span>
              </button>

              {/* Button 3: Test with Preset */}
              <div className="relative">
                <button
                  onClick={() => setShowPresetDropdown(!showPresetDropdown)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-[#D4AF37] text-xs font-mono-tech tracking-wider uppercase rounded transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Testar Demonstração ▾</span>
                </button>

                {showPresetDropdown && (
                  <div className="absolute top-full mt-2 left-0 w-64 bg-zinc-950 border border-white/15 rounded-lg shadow-2xl p-2 z-50 text-left">
                    <div className="text-[10px] font-mono-tech text-zinc-500 uppercase px-2 py-1 mb-1">
                      Pré-definições de Teste:
                    </div>
                    {CINE_VIDEO_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset.url, preset.name)}
                        className="w-full text-left px-2.5 py-2 hover:bg-[#D4AF37]/15 rounded text-xs text-zinc-300 hover:text-[#D4AF37] transition-colors flex flex-col gap-0.5"
                      >
                        <span className="font-semibold">{preset.tag}</span>
                        <span className="text-[10px] text-zinc-400 truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Technical note */}
            <div className="mt-5 text-[10px] font-mono-tech text-zinc-500">
              CONSUMO EM REPOUSO: <span className="text-emerald-400">0 KB</span> • FORMATOS COMPATÍVEIS: MP4, WebM, H.264, ProRes
            </div>
          </div>
        </div>
      )}

      {/* Upload success feedback notification */}
      {uploadSuccessFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-950/95 border border-emerald-500/60 text-emerald-200 px-5 py-2.5 rounded-full text-xs font-mono-tech flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{uploadSuccessFeedback}</span>
        </div>
      )}

      {/* URL Attachment Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-[#D4AF37]/50 rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-serif text-white mb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>Inserir Link Directo de Vídeo</span>
            </h3>
            <p className="text-zinc-400 text-xs mb-4">
              Cola aqui a URL directa do ficheiro de vídeo (MP4 ou WebM) alojado no teu GitHub Releases, CDN, servidor ou Cloudflare:
            </p>
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <input
                type="url"
                required
                placeholder="https://exemplo.com/meu-video.mp4"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-white/20 focus:border-[#D4AF37] px-4 py-2.5 rounded text-sm text-white focus:outline-hidden"
              />
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-4 py-2 text-xs font-mono-tech text-zinc-400 hover:text-white"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-white transition-colors"
                >
                  ANEXAR VÍDEO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TOP AUDIO & CINEMA CONTROLS BAR                                        */}
      {/* ========================================================================= */}
      <div className={`relative z-30 max-w-7xl mx-auto w-full px-6 md:px-12 pt-3 flex items-center justify-between transition-opacity duration-500 ${
        isPureCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {/* Left Badge: Status */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${hasVideo ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
            {hasVideo ? 'VÍDEO CARREGADO • SOM DIRECTO' : 'SLOT DE VÍDEO VAGO • MODO LEVE GITHUB'}
          </span>
        </div>

        {/* Right: Video management & audio controls */}
        <div className="flex items-center gap-2">
          {hasVideo ? (
            <>
              {/* Sound Toggle (Clean audio only, no synth buzz) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSound();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 font-mono-tech text-[11px] backdrop-blur-md shadow-lg ${
                  !isMuted
                    ? 'bg-black/70 border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-black/80 border-white/20 text-zinc-300 hover:border-[#D4AF37] hover:text-white'
                }`}
                title="Alternar Áudio"
              >
                {!isMuted ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="font-semibold tracking-wider">SOM ACTIVO</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="tracking-wider">ACTIVAR SOM</span>
                  </>
                )}
              </button>

              {/* Replace / Remove Video Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 hover:border-[#D4AF37] text-zinc-200 hover:text-[#D4AF37] font-mono-tech text-[11px] tracking-wider transition-all"
                title="Substituir por outro vídeo"
              >
                <Upload className="w-3 h-3" />
                <span>SUBSTITUIR</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveVideo();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 hover:border-red-400 text-red-300 hover:text-white font-mono-tech text-[11px] tracking-wider transition-all"
                title="Remover vídeo e deixar o slot vago para o GitHub"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden md:inline">DEIXAR VAGO (GITHUB)</span>
              </button>

              {/* Pure Cinema Mode */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cinemaAudio.playApertureClick();
                  setIsPureCinemaMode(!isPureCinemaMode);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-mono-tech text-[11px] tracking-wider transition-all duration-300 backdrop-blur-md shadow-md"
                title="Modo Cinema Puro (Ocultar interface para apreciação total do vídeo)"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VÍDEO PURO</span>
              </button>
            </>
          ) : (
            /* Quick Attach button in top bar when slot is empty */
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-mono-tech text-[11px] tracking-wider transition-all hover:bg-[#D4AF37] hover:text-black"
            >
              <Upload className="w-3 h-3" />
              <span>+ ANEXAR VÍDEO</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Exit Button for Pure Cinema Mode */}
      {isPureCinemaMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            cinemaAudio.playApertureClick();
            setIsPureCinemaMode(false);
          }}
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 border border-[#D4AF37] text-[#D4AF37] font-mono-tech text-xs tracking-widest uppercase backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:bg-[#D4AF37] hover:text-black transition-all"
        >
          <EyeOff className="w-4 h-4" />
          <span>RESTAURAR INTERFACE</span>
        </button>
      )}

      {/* ========================================================================= */}
      {/* 3. LEFT VERTICAL SOCIAL DOCK                                              */}
      {/* ========================================================================= */}
      <div className={`hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6 text-zinc-400 transition-opacity duration-500 ${
        isPureCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Instagram EFB Angola"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors p-1"
          aria-label="Facebook EFB Angola"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* ========================================================================= */}
      {/* 4. RIGHT SIDE CONTROLS & SHOWREEL TRIGGER                                 */}
      {/* ========================================================================= */}
      <div className={`hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-end gap-8 text-zinc-300 transition-opacity duration-500 ${
        isPureCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {/* Slide Counter */}
        <div className="font-mono-tech text-xs tracking-[0.25em] text-zinc-300 drop-shadow">
          <span className="text-[#D4AF37] font-semibold">01</span> / 04
        </div>

        {/* Circular Showreel Play Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cinemaAudio.playApertureClick();
            onOpenShowreel();
          }}
          className="group flex flex-col items-center gap-2.5 cursor-pointer text-right"
          onMouseEnter={() => {
            setCursorText('PLAY ▶');
            setCursorVariant('play');
          }}
          onMouseLeave={() => {
            setCursorText('');
            setCursorVariant('default');
          }}
        >
          <div className="relative w-12 h-12 rounded-full border border-[#D4AF37]/70 flex items-center justify-center bg-black/60 backdrop-blur-md group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Play className="w-4 h-4 fill-current ml-0.5 text-[#D4AF37] group-hover:text-black transition-colors" />
          </div>
          <span className="font-mono-tech text-[9px] tracking-[0.22em] uppercase text-zinc-200 group-hover:text-[#D4AF37] transition-colors max-w-[90px] text-center leading-tight drop-shadow">
            SHOWREEL
          </span>
        </button>

        {/* Video Controls (Only if video is present) */}
        {hasVideo && (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVideoPlayback();
              }}
              className="p-2 rounded-full bg-black/70 border border-white/20 text-zinc-200 hover:text-white hover:border-[#D4AF37] transition-colors backdrop-blur-md shadow-md"
              title={isVideoPlaying ? 'Pausar Vídeo' : 'Reproduzir Vídeo'}
              aria-label="Controlo de vídeo"
            >
              {isVideoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSound();
              }}
              className="p-2 rounded-full bg-black/70 border border-white/20 text-zinc-200 hover:text-white hover:border-[#D4AF37] transition-colors backdrop-blur-md shadow-md"
              title={isMuted ? 'Ativar Som do Vídeo' : 'Silenciar'}
              aria-label="Controlo de som"
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-[#D4AF37]" />}
            </button>
          </div>
        )}

        {/* Scroll Indicator */}
        <a 
          href="#manifesto" 
          onClick={(e) => {
            e.stopPropagation();
            cinemaAudio.playApertureClick();
          }}
          className="group flex flex-col items-center gap-1.5 font-mono-tech text-[10px] tracking-[0.25em] text-zinc-300 hover:text-[#D4AF37] transition-colors drop-shadow"
        >
          <span>SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent group-hover:h-12 transition-all duration-300" />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 5. UNOBSTRUCTED BOTTOM ACTION DOCK                                        */}
      {/*    Center remains clean and unobstructed                                  */}
      {/* ========================================================================= */}
      <div className={`relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 mt-auto mb-5 transition-all duration-500 ${
        isPureCinemaMode ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Action Buttons: Positioned cleanly at the bottom dock */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Action Button */}
            <a
              href="#projetos"
              onClick={() => cinemaAudio.playApertureClick()}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5"
              onMouseEnter={() => {
                setCursorText('VER');
                setCursorVariant('view');
              }}
              onMouseLeave={() => {
                setCursorText('');
                setCursorVariant('default');
              }}
            >
              <span>VER PROJECTOS</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            {/* Secondary Action Button */}
            <a
              href="#contacto"
              onClick={() => cinemaAudio.playApertureClick()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black/75 hover:bg-[#D4AF37]/20 border border-white/30 hover:border-[#D4AF37] text-zinc-100 hover:text-white font-medium text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all duration-300 backdrop-blur-md shadow-md"
            >
              <span>ENTRAR EM CONTACTO</span>
            </a>

            {/* Quick Admin Access Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                cinemaAudio.playApertureClick();
                onOpenAdmin();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-[2px] bg-black/75 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-mono-tech uppercase tracking-wider transition-all duration-200 backdrop-blur-md shadow-md hover:bg-[#D4AF37]/15"
              title="Gestor de Mídia"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>GESTOR MÍDIA</span>
            </button>

            {/* Agency Info Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                cinemaAudio.playApertureClick();
                setShowInfoDrawer(!showInfoDrawer);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-[2px] bg-black/60 border border-white/20 hover:border-[#D4AF37] text-zinc-300 hover:text-[#D4AF37] text-xs font-mono-tech uppercase tracking-wider transition-all backdrop-blur-md"
              title="Ver Apresentação da Agência"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>{showInfoDrawer ? 'OCULTAR RESUMO' : '✦ AGÊNCIA LUANDA'}</span>
            </button>
          </div>

          {/* Location & Brand Pill */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono-tech text-white/80 bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>EFB MÍDIA • LUANDA &amp; LISBOA</span>
          </div>
        </div>

        {/* Optional Collapsible Agency Summary Drawer */}
        {showInfoDrawer && (
          <div className="mt-4 p-5 rounded-lg bg-black/90 border border-[#D4AF37]/40 backdrop-blur-xl max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#D4AF37]">
                EDITORIAL • EFB MÍDIA ANGOLA
              </span>
            </div>
            <h3 className="font-serif text-lg text-white mb-2">
              Agência de Publicidade, Comunicação e Produtora Audiovisual
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed mb-3 font-sans">
              Com sede em Luanda e estúdios em Lisboa, desenvolvemos narrativas visuais cinematográficas, 
              campanhas publicitárias 360°, cinema autoral, documentários de impacto, videoclipes e plataformas digitais.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono-tech text-zinc-400 pt-2 border-t border-white/10">
              <span>📍 LUANDA • ANGOLA</span>
              <span>•</span>
              <span>🎥 PRODUÇÕES 4K / 8K RAW</span>
              <span>•</span>
              <span className="text-[#D4AF37]">EFB.AO</span>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM SERVICE NAVIGATION BAR                                          */}
      {/* ========================================================================= */}
      <div className={`relative z-20 w-full bg-black/85 border-t border-white/10 backdrop-blur-md transition-opacity duration-500 ${
        isPureCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-6 sm:gap-8 text-xs font-mono-tech">
            {HERO_SERVICE_TABS.map((tab, idx) => (
              <a
                key={tab.number}
                href={`#${tab.targetId}`}
                onClick={(e) => {
                  cinemaAudio.playApertureClick();
                  setActiveTab(idx);
                  if (onSelectServiceTab) {
                    onSelectServiceTab(idx);
                  }
                }}
                className={`group flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === idx ? 'text-[#D4AF37]' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <span className={`text-[10px] ${activeTab === idx ? 'text-[#D4AF37]' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                  {tab.number}
                </span>
                <span className="tracking-wider uppercase">{tab.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
