import { useState, useEffect } from 'react';
import InteractiveCursor from './components/InteractiveCursor';
import ViewfinderOverlay from './components/ViewfinderOverlay';
import Header from './components/Header';
import Hero from './components/Hero';
import ManifestoSection from './components/ManifestoSection';
import ProjectsGallery from './components/ProjectsGallery';
import CinemaDocSection from './components/CinemaDocSection';
import ServicesSection from './components/ServicesSection';
import AboutAgency from './components/AboutAgency';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ShowreelModal from './components/ShowreelModal';
import BriefingModal from './components/BriefingModal';
import AdminManagerModal from './components/AdminManagerModal';

import { Project, LensSetting } from './types';
import { LENS_SETTINGS, PROJECTS } from './data/portfolioData';
import { 
  AdminMediaConfig, 
  loadAdminMediaConfig, 
  saveAdminMediaConfig, 
  DEFAULT_ADMIN_CONFIG 
} from './utils/adminStorage';
import { cinemaAudio } from './utils/audioSynth';
import { Settings } from 'lucide-react';

export default function App() {
  // Cursor dynamic state
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'play' | 'view' | 'lens' | 'hidden'>('default');

  // Viewfinder & Optical Camera Lens settings
  const [currentLens, setCurrentLens] = useState<LensSetting>(LENS_SETTINGS['35mm']);
  const [showHUD, setShowHUD] = useState(true);

  // Unified audio experience state (enabled by default)
  const [isAudioUnmuted, setIsAudioUnmuted] = useState(true);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);

  // Administrative Media Manager State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminConfig, setAdminConfig] = useState<AdminMediaConfig>(DEFAULT_ADMIN_CONFIG);
  const [activeServiceId, setActiveServiceId] = useState('podcast-vodcast');

  // Load saved Admin Media Configuration and video blobs on start
  useEffect(() => {
    let mounted = true;
    loadAdminMediaConfig().then((loaded) => {
      if (mounted) {
        setAdminConfig(loaded);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSaveAdminConfig = (updated: AdminMediaConfig) => {
    setAdminConfig(updated);
    saveAdminMediaConfig(updated);
  };

  const handleToggleSound = () => {
    cinemaAudio.playApertureClick();
    setIsAudioUnmuted((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-zinc-100 selection:bg-[#D4AF37] selection:text-black">
      {/* Custom Cinema Interactive Cursor (Simulates Camera Viewfinder) */}
      <InteractiveCursor cursorText={cursorText} cursorVariant={cursorVariant} />

      {/* Camera Viewfinder Overlay & Telemetry HUD */}
      <ViewfinderOverlay
        currentLens={currentLens}
        onSelectLens={setCurrentLens}
        showHUD={showHUD}
        onToggleHUD={() => setShowHUD(!showHUD)}
        isHeroVideoMuted={!isAudioUnmuted}
        onToggleHeroAudio={handleToggleSound}
      />

      {/* Main Luxury Header with EFB Logo & Admin Access */}
      <Header
        onOpenBriefing={() => {
          cinemaAudio.playApertureClick();
          setIsBriefingOpen(true);
        }}
        onOpenShowreel={() => {
          cinemaAudio.playApertureClick();
          setIsShowreelOpen(true);
        }}
        onOpenAdmin={() => {
          cinemaAudio.playApertureClick();
          setIsAdminModalOpen(true);
        }}
        customLogoUrl={adminConfig.customLogoUrl}
        setCursorText={setCursorText}
        setCursorVariant={setCursorVariant}
      />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero Section: Cinematic Video Background With Audio & Reference Tabs */}
        <Hero
          currentLens={currentLens}
          onOpenShowreel={() => {
            cinemaAudio.playApertureClick();
            setIsShowreelOpen(true);
          }}
          onOpenAdmin={() => {
            cinemaAudio.playApertureClick();
            setIsAdminModalOpen(true);
          }}
          adminConfig={adminConfig}
          onSaveAdminConfig={handleSaveAdminConfig}
          setCursorText={setCursorText}
          setCursorVariant={setCursorVariant}
          isAudioUnmuted={isAudioUnmuted}
          onToggleSound={handleToggleSound}
          onSelectServiceTab={(tabIdx) => {
            const tabsMap = [
              'marketing-digital-performance',
              'cinema-ficcao',
              'documentario',
              'video-clip',
              'motion-design-vfx',
              'websites-plataformas',
              'spot-publicitario',
              'podcast-vodcast'
            ];
            if (tabsMap[tabIdx]) {
              setActiveServiceId(tabsMap[tabIdx]);
            }
          }}
        />

        {/* 2. Manifesto: Creative Philosophy, Luanda-Lisboa Axis & Stats */}
        <ManifestoSection />

        {/* 3. Asymmetric Editorial Projects Gallery with Dynamic Admin Cover Overrides */}
        <ProjectsGallery
          onSelectProject={(proj) => setSelectedProject(proj)}
          projectCoverOverrides={adminConfig.projectCoverOverrides}
          setCursorText={setCursorText}
          setCursorVariant={setCursorVariant}
        />

        {/* 4. Cinema & Documentaries (Mubi / IMDb Special Section) */}
        <CinemaDocSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          setCursorText={setCursorText}
          setCursorVariant={setCursorVariant}
        />

        {/* 5. Core Agency Verticals (Publicidade 360°, Cinema, Podcast, Spots, Fotografia) */}
        <ServicesSection
          onOpenBriefing={() => setIsBriefingOpen(true)}
          setCursorText={setCursorText}
          setCursorVariant={setCursorVariant}
          activeServiceId={activeServiceId}
          onSelectServiceId={setActiveServiceId}
        />

        {/* 6. The Agency: History, Creative Leadership & Physical Studios */}
        <AboutAgency />

        {/* 7. Direct Contacts & Studio Hubs (Luanda & Lisboa) */}
        <ContactSection onOpenBriefing={() => setIsBriefingOpen(true)} />
      </main>

      {/* Luxury Editorial Footer with Gold Branding */}
      <Footer
        customLogoUrl={adminConfig.customLogoUrl}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Quick Floating Admin Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            cinemaAudio.playApertureClick();
            setIsAdminModalOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-black/90 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300 backdrop-blur-md group"
          title="Abrir Gestor Administrativo (Carregar Vídeo / Mídia)"
        >
          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-xs font-mono-tech uppercase font-semibold tracking-wider pr-1">
            Gestor Admin
          </span>
        </button>
      </div>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBriefing={() => {
          setSelectedProject(null);
          setIsBriefingOpen(true);
        }}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      <BriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
      />

      {/* Administrative Media Manager Modal */}
      <AdminManagerModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        config={adminConfig}
        onSaveConfig={handleSaveAdminConfig}
        projects={PROJECTS}
      />
    </div>
  );
}
