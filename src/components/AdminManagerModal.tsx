import { useState, useRef, ChangeEvent } from 'react';
import { 
  X, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Sliders, 
  Type, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Play, 
  Pause, 
  FolderUp, 
  FileVideo, 
  Save, 
  ExternalLink,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
  Trash2
} from 'lucide-react';
import { 
  AdminMediaConfig, 
  CINE_VIDEO_PRESETS, 
  saveUploadedVideoBlob,
  clearUploadedVideoBlob
} from '../utils/adminStorage';
import { Project } from '../types';
import EfbLogo from './EfbLogo';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdminMediaConfig;
  onSaveConfig: (updated: AdminMediaConfig) => void;
  projects: Project[];
}

export default function AdminManagerModal({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  projects,
}: AdminManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'images' | 'texts' | 'projects'>('video');
  const [draftConfig, setDraftConfig] = useState<AdminMediaConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Video preview player state inside modal
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  // Hidden file inputs
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const posterFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const projectCoverFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProjectIdForEdit, setSelectedProjectIdForEdit] = useState<string>(projects[0]?.id || '');

  if (!isOpen) return null;

  // Handle local video file upload from user's computer
  const handleVideoFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setUploadError('Por favor selecione um arquivo de vídeo válido (.mp4, .webm, .mov).');
      return;
    }

    setUploadError(null);
    setIsUploadingVideo(true);

    try {
      // Save to IndexedDB to persist local video file across browser sessions
      const objectUrl = await saveUploadedVideoBlob(file, 'hero_video');
      
      setDraftConfig((prev) => ({
        ...prev,
        heroVideoUrl: objectUrl,
        heroVideoName: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
        heroVideoSourceType: 'upload',
      }));

      // Generate a poster frame automatically from the uploaded video
      try {
        const videoElem = document.createElement('video');
        videoElem.src = objectUrl;
        videoElem.currentTime = 1.0;
        videoElem.muted = true;
        videoElem.onloadeddata = () => {
          setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = videoElem.videoWidth || 1280;
            canvas.height = videoElem.videoHeight || 720;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
              const posterDataUrl = canvas.toDataURL('image/jpeg', 0.85);
              setDraftConfig((prev) => ({
                ...prev,
                heroPosterUrl: posterDataUrl,
              }));
            }
          }, 300);
        };
      } catch (err) {
        console.warn('Could not auto-generate poster from video:', err);
      }
    } catch (err) {
      console.error('Error processing uploaded video:', err);
      setUploadError('Erro ao carregar vídeo local.');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // Handle Image File upload (Poster, Logo, Project Cover)
  const handleImageFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'heroPosterUrl' | 'customLogoUrl' | 'projectCover'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      if (field === 'heroPosterUrl') {
        setDraftConfig((prev) => ({ ...prev, heroPosterUrl: dataUrl }));
      } else if (field === 'customLogoUrl') {
        setDraftConfig((prev) => ({ ...prev, customLogoUrl: dataUrl }));
      } else if (field === 'projectCover' && selectedProjectIdForEdit) {
        setDraftConfig((prev) => ({
          ...prev,
          projectCoverOverrides: {
            ...prev.projectCoverOverrides,
            [selectedProjectIdForEdit]: dataUrl,
          },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Apply Changes and Save
  const handleSave = () => {
    onSaveConfig(draftConfig);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  // Reset to original studio presets
  const handleResetToDefault = () => {
    if (confirm('Deseja restaurar as configurações originais do estúdio?')) {
      clearUploadedVideoBlob();
      const resetConfig: AdminMediaConfig = {
        ...draftConfig,
        heroVideoUrl: CINE_VIDEO_PRESETS[0].url,
        heroVideoName: CINE_VIDEO_PRESETS[0].name,
        heroVideoSourceType: 'preset',
        heroPosterUrl: CINE_VIDEO_PRESETS[0].poster,
        heroHeadline: 'ALÉM DO OLHAR',
        heroSubtitle: 'Agência de Publicidade e Produtora Audiovisual de Alta Gama. Narrativas visuais cinematográficas que desafiam a percepção e eternizam marcas com profundidade, luz e verdade emocional.',
        customLogoUrl: '',
        projectCoverOverrides: {},
      };
      setDraftConfig(resetConfig);
      onSaveConfig(resetConfig);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0D0D0D] border border-[#D4AF37]/40 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.18)] overflow-hidden"
        style={{
          boxShadow: '0 0 60px rgba(0,0,0,0.9), 0 0 25px rgba(212,175,55,0.2)',
        }}
      >
        {/* MODAL HEADER WITH GOLD & BLACK BRANDING */}
        <div className="px-6 py-4 bg-[#080808] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EfbLogo size="sm" customLogoUrl={draftConfig.customLogoUrl} variant="badge" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-white text-base tracking-wider">
                  GESTOR ADMINISTRATIVO EFB
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono-tech uppercase bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
                  Painel de Mídia
                </span>
              </div>
              <p className="text-[11px] font-mono-tech text-zinc-400">
                Gerencie o vídeo de abertura, imagens de pôster, logotipo e capas de projetos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Fechar Gestor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="px-6 pt-3 bg-[#111111] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'video'
                ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileVideo className="w-3.5 h-3.5" />
            <span>1. Vídeo de Abertura (Início)</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'images'
                ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>2. Pôster & Logomarca</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FolderUp className="w-3.5 h-3.5" />
            <span>3. Capas dos Projetos</span>
          </button>

          <button
            onClick={() => setActiveTab('texts')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'texts'
                ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#D4AF37]/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>4. Títulos & Manifesto</span>
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ============================================================== */}
          {/* TAB 1: VÍDEO DE ENTRADA (HERO BACKGROUND VIDEO)                */}
          {/* ============================================================== */}
          {activeTab === 'video' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-black/60 border border-[#D4AF37]/20 flex flex-col md:flex-row items-center gap-6">
                {/* Live Video Preview Box */}
                <div className="w-full md:w-64 h-36 bg-black rounded border border-white/20 relative overflow-hidden flex-shrink-0 group">
                  <video
                    ref={previewVideoRef}
                    key={draftConfig.heroVideoUrl}
                    src={draftConfig.heroVideoUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${draftConfig.heroVideoBrightness}) contrast(${draftConfig.heroVideoContrast})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        if (previewVideoRef.current) {
                          if (previewPlaying) {
                            previewVideoRef.current.pause();
                            setPreviewPlaying(false);
                          } else {
                            previewVideoRef.current.play();
                            setPreviewPlaying(true);
                          }
                        }
                      }}
                      className="p-2 rounded-full bg-[#D4AF37] text-black shadow-lg"
                    >
                      {previewPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                  </div>
                  <span className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded text-[8px] font-mono-tech bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30 uppercase">
                    Preview Ao Vivo
                  </span>
                </div>

                {/* Status and Current Video Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${draftConfig.heroVideoUrl ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                      <span className="text-xs font-mono-tech text-white uppercase tracking-wider font-semibold">
                        {draftConfig.heroVideoUrl ? 'Vídeo Ativo no Início' : 'Local Vago (Modo Ultra-Leve GitHub)'}
                      </span>
                    </div>
                    {draftConfig.heroVideoUrl && (
                      <button
                        onClick={() => {
                          setDraftConfig((prev) => ({
                            ...prev,
                            heroVideoUrl: '',
                            heroVideoName: 'Local Vago (Pronto para Anexar)',
                          }));
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/60 border border-red-500/40 text-[10px] font-mono-tech text-red-300 hover:text-white transition-colors"
                        title="Deixar o slot vago para manter o repositório leve para o GitHub"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remover Vídeo (Deixar Vago)</span>
                      </button>
                    )}
                  </div>
                  <p className="text-sm font-heading text-[#D4AF37] font-semibold break-all">
                    {draftConfig.heroVideoUrl ? (draftConfig.heroVideoName || 'Vídeo Personalizado') : 'Nenhum vídeo anexado (0 KB em repouso)'}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono-tech">
                    {draftConfig.heroVideoUrl 
                      ? `Origem: ${draftConfig.heroVideoSourceType.toUpperCase()} • Brilho: ${draftConfig.heroVideoBrightness} • Contraste: ${draftConfig.heroVideoContrast}`
                      : 'Slot vago preparado para o GitHub. Clica em Carregar Vídeo ou escolhe um preset quando quiseres activar.'}
                  </p>
                </div>
              </div>

              {/* Upload Local Video Button */}
              <div className="p-6 rounded-lg bg-black/40 border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm text-white font-bold tracking-wide">
                    Carregar Vídeo do Seu Computador
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                    Selecione um arquivo de vídeo (MP4, WebM ou MOV). Ele será carregado e executado automaticamente na abertura do site.
                  </p>
                </div>

                <input
                  ref={videoFileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleVideoFileUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  disabled={isUploadingVideo}
                  onClick={() => videoFileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs font-mono-tech uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploadingVideo ? 'Processando Vídeo...' : 'Selecionar Arquivo de Vídeo'}</span>
                </button>

                {uploadError && (
                  <p className="text-xs text-red-400 font-mono-tech mt-2">{uploadError}</p>
                )}
              </div>

              {/* Paste Direct Video URL */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-2">
                <label className="block text-xs font-mono-tech uppercase text-zinc-300 tracking-wider">
                  Ou Inserir URL Direta de Vídeo (MP4 / WebM / CDN)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={draftConfig.heroVideoUrl}
                    onChange={(e) =>
                      setDraftConfig((prev) => ({
                        ...prev,
                        heroVideoUrl: e.target.value,
                        heroVideoName: 'Link Externo Direto',
                        heroVideoSourceType: 'url',
                      }))
                    }
                    placeholder="https://exemplo.com/video-cinematografico.mp4"
                    className="flex-1 px-3.5 py-2 rounded bg-black border border-white/20 text-xs text-white font-mono-tech focus:border-[#D4AF37] focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (previewVideoRef.current) {
                        previewVideoRef.current.load();
                        previewVideoRef.current.play();
                        setPreviewPlaying(true);
                      }
                    }}
                    className="px-4 py-2 rounded bg-white/10 hover:bg-[#D4AF37] hover:text-black text-xs font-mono-tech uppercase transition-colors"
                  >
                    Testar
                  </button>
                </div>
              </div>

              {/* Presets Cinematográficos Prontos */}
              <div className="space-y-3">
                <label className="block text-xs font-mono-tech uppercase text-[#D4AF37] tracking-wider font-semibold">
                  Biblioteca de Presets Cinematográficos EFB
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {CINE_VIDEO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          heroVideoUrl: preset.url,
                          heroVideoName: preset.name,
                          heroPosterUrl: preset.poster,
                          heroVideoSourceType: 'preset',
                        }))
                      }
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        draftConfig.heroVideoUrl === preset.url
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-black/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono-tech text-[#D4AF37] uppercase tracking-wider">
                          {preset.tag}
                        </span>
                        {draftConfig.heroVideoUrl === preset.url && (
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        )}
                      </div>
                      <h5 className="font-heading text-xs text-white font-bold mb-1">
                        {preset.name}
                      </h5>
                      <p className="text-[11px] text-zinc-400 font-sans line-clamp-2">
                        {preset.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optical Adjustments for Background Video */}
              <div className="p-4 rounded-lg bg-black/40 border border-white/10 space-y-4">
                <h5 className="text-xs font-mono-tech uppercase tracking-wider text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Ajustes de Exposição e Gradação do Vídeo
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono-tech mb-1">
                      <span className="text-zinc-400">Brilho do Fundo</span>
                      <span className="text-[#D4AF37]">{Math.round(draftConfig.heroVideoBrightness * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.3"
                      max="1.0"
                      step="0.02"
                      value={draftConfig.heroVideoBrightness}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          heroVideoBrightness: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono-tech mb-1">
                      <span className="text-zinc-400">Contraste da Imagem</span>
                      <span className="text-[#D4AF37]">{Math.round(draftConfig.heroVideoContrast * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.4"
                      step="0.02"
                      value={draftConfig.heroVideoContrast}
                      onChange={(e) =>
                        setDraftConfig((prev) => ({
                          ...prev,
                          heroVideoContrast: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: PÔSTER & LOGOMARCA                                      */}
          {/* ============================================================== */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* Logomarca EFB */}
              <div className="p-5 rounded-lg bg-black/60 border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-sm text-white font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      Logomarca da EFB Mídia
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Utilize o emblema vetorial dourado oficial ou carregue sua própria imagem de logo.
                    </p>
                  </div>
                  {draftConfig.customLogoUrl && (
                    <button
                      onClick={() => setDraftConfig((prev) => ({ ...prev, customLogoUrl: '' }))}
                      className="text-xs font-mono-tech text-zinc-400 hover:text-[#D4AF37] underline"
                    >
                      Restaurar Emblema Vetorial Dourado
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
                  <div className="p-3 bg-black rounded-lg border border-[#D4AF37]/40 shadow-inner flex items-center justify-center">
                    <EfbLogo size="lg" customLogoUrl={draftConfig.customLogoUrl} variant="badge" />
                  </div>

                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <input
                      ref={logoFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'customLogoUrl')}
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => logoFileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-[#D4AF37] hover:text-black text-xs font-mono-tech uppercase transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Carregar Arquivo de Logo (PNG / JPG)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, customLogoUrl: '' }))}
                        className={`px-4 py-2 rounded text-xs font-mono-tech uppercase transition-colors ${
                          !draftConfig.customLogoUrl
                            ? 'bg-[#D4AF37] text-black font-semibold'
                            : 'bg-black/60 border border-white/20 text-zinc-300'
                        }`}
                      >
                        Emblema Oficial Vetor Dourado
                      </button>
                    </div>

                    <p className="text-[11px] text-zinc-400 font-mono-tech">
                      Recomendado: Logo com fundo preto ou transparente em formato quadrado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Imagem de Pôster / Capa do Hero */}
              <div className="p-5 rounded-lg bg-black/60 border border-white/10 space-y-4">
                <div>
                  <h4 className="font-heading text-sm text-white font-bold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                    Imagem de Pôster do Início (Hero Poster)
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Exibida durante o carregamento do vídeo ou em conexões lentas.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-56 h-32 rounded bg-black border border-white/20 overflow-hidden flex-shrink-0">
                    <img
                      src={draftConfig.heroPosterUrl}
                      alt="Hero Poster Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-3">
                    <input
                      ref={posterFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'heroPosterUrl')}
                      className="hidden"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => posterFileInputRef.current?.click()}
                        className="px-4 py-2 rounded bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs font-mono-tech uppercase transition-all"
                      >
                        Carregar Imagem Local
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-tech text-zinc-400 mb-1">
                        Ou URL da imagem:
                      </label>
                      <input
                        type="url"
                        value={draftConfig.heroPosterUrl}
                        onChange={(e) => setDraftConfig((prev) => ({ ...prev, heroPosterUrl: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded bg-black border border-white/20 text-xs text-white font-mono-tech focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: CAPAS DOS PROJETOS                                      */}
          {/* ============================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-black/60 border border-[#D4AF37]/30 space-y-3">
                <h4 className="font-heading text-sm text-white font-bold flex items-center gap-2">
                  <FolderUp className="w-4 h-4 text-[#D4AF37]" />
                  Alterar Imagens de Capa dos Projetos
                </h4>
                <p className="text-xs text-zinc-400">
                  Selecione um projeto do portfólio para atualizar a sua imagem de exibição na galeria editorial.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                  {projects.map((proj) => {
                    const currentCover = draftConfig.projectCoverOverrides[proj.id] || proj.coverImage;
                    const isSelected = selectedProjectIdForEdit === proj.id;

                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setSelectedProjectIdForEdit(proj.id)}
                        className={`p-2.5 rounded border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white'
                            : 'bg-black/40 border-white/10 hover:border-white/30 text-zinc-400'
                        }`}
                      >
                        <div className="w-12 h-12 rounded overflow-hidden bg-black flex-shrink-0 border border-white/10">
                          <img
                            src={currentCover}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <span className="block text-xs font-heading font-bold text-white truncate">
                            {proj.title}
                          </span>
                          <span className="text-[10px] font-mono-tech text-[#D4AF37] uppercase">
                            {proj.category}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editor for Selected Project */}
              {selectedProjectIdForEdit && (
                <div className="p-5 rounded-lg bg-black/80 border border-white/15 space-y-4">
                  {(() => {
                    const currentProj = projects.find((p) => p.id === selectedProjectIdForEdit);
                    if (!currentProj) return null;
                    const activeCover = draftConfig.projectCoverOverrides[currentProj.id] || currentProj.coverImage;

                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <h5 className="font-heading text-sm text-white font-bold">
                            Editando: <span className="text-[#D4AF37]">{currentProj.title}</span>
                          </h5>
                          {draftConfig.projectCoverOverrides[currentProj.id] && (
                            <button
                              onClick={() => {
                                const nextOverrides = { ...draftConfig.projectCoverOverrides };
                                delete nextOverrides[currentProj.id];
                                setDraftConfig((prev) => ({
                                  ...prev,
                                  projectCoverOverrides: nextOverrides,
                                }));
                              }}
                              className="text-xs font-mono-tech text-zinc-400 hover:text-red-400 underline"
                            >
                              Restaurar Imagem Original
                            </button>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-5 items-center">
                          <div className="w-full md:w-64 h-36 rounded bg-black border border-[#D4AF37]/40 overflow-hidden flex-shrink-0 shadow-lg">
                            <img
                              src={activeCover}
                              alt={currentProj.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-1 w-full space-y-3">
                            <input
                              ref={projectCoverFileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileUpload(e, 'projectCover')}
                              className="hidden"
                            />

                            <button
                              type="button"
                              onClick={() => projectCoverFileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs font-mono-tech uppercase transition-all"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Carregar Nova Imagem do Computador</span>
                            </button>

                            <div>
                              <label className="block text-[11px] font-mono-tech text-zinc-400 mb-1">
                                Ou Colar Link Direto da Imagem:
                              </label>
                              <input
                                type="url"
                                value={draftConfig.projectCoverOverrides[currentProj.id] || ''}
                                placeholder={currentProj.coverImage}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setDraftConfig((prev) => ({
                                    ...prev,
                                    projectCoverOverrides: {
                                      ...prev.projectCoverOverrides,
                                      [currentProj.id]: val,
                                    },
                                  }));
                                }}
                                className="w-full px-3 py-1.5 rounded bg-black border border-white/20 text-xs text-white font-mono-tech focus:border-[#D4AF37] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: TÍTULOS & MANIFESTO                                     */}
          {/* ============================================================== */}
          {activeTab === 'texts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 space-y-4">
                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Tagline Superior do Estúdio
                  </label>
                  <input
                    type="text"
                    value={draftConfig.heroBadgeText}
                    onChange={(e) => setDraftConfig((prev) => ({ ...prev, heroBadgeText: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-black border border-white/20 text-xs text-white font-mono-tech focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-[#D4AF37] mb-1 font-bold">
                    Título Principal do Hero
                  </label>
                  <input
                    type="text"
                    value={draftConfig.heroHeadline}
                    onChange={(e) => setDraftConfig((prev) => ({ ...prev, heroHeadline: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-black border border-white/20 text-sm font-heading font-extrabold text-white focus:border-[#D4AF37] focus:outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-zinc-400 mb-1">
                    Subtítulo / Descritivo da Produtora
                  </label>
                  <textarea
                    rows={3}
                    value={draftConfig.heroSubtitle}
                    onChange={(e) => setDraftConfig((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-black border border-white/20 text-xs text-white font-sans focus:border-[#D4AF37] focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div className="px-6 py-4 bg-[#080808] border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-xs font-mono-tech text-zinc-400 hover:text-[#D4AF37] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Originais</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded text-xs font-mono-tech text-zinc-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded font-semibold text-xs font-mono-tech uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] ${
                saveSuccess
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#D4AF37] hover:bg-white text-black'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Configurações Salvas!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar e Aplicar no Site</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
