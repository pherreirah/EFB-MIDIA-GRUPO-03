import { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { cinemaAudio } from '../utils/audioSynth';

interface ProjectsGalleryProps {
  onSelectProject: (project: Project) => void;
  projectCoverOverrides?: Record<string, string>;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: 'default' | 'play' | 'view' | 'lens' | 'hidden') => void;
}

export default function ProjectsGallery({
  onSelectProject,
  projectCoverOverrides = {},
  setCursorText,
  setCursorVariant,
}: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'Todos os Projectos' },
    { key: 'cinema', label: 'Cinema & Ficção' },
    { key: 'publicidade', label: 'Publicidade & Marcas' },
    { key: 'music_video', label: 'Videoclipes & Visual' },
    { key: 'brand_film', label: 'Documentário & Arte' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const handleFilterClick = (key: ProjectCategory) => {
    cinemaAudio.playApertureClick();
    setActiveCategory(key);
  };

  return (
    <section id="projetos" className="py-28 px-6 md:px-12 bg-[#080808] border-t border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#D4AF37]/20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                Portfólio Seleccionado • Angola &amp; Internacional
              </span>
            </div>
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
              Obras &amp; Campanhas
            </h2>
          </div>

          <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md">
            Grelha editorial com projectos cinematográficos e publicitários executados entre Luanda e capitais mundiais.
            Cada fotograma é concebido para eternizar marcas e enriquecer a memória audiovisual angolana.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleFilterClick(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tech tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project, index) => {
            const activeCoverImage = projectCoverOverrides[project.id] || project.coverImage;

            // Asymmetric layout span distribution
            let colSpan = 'md:col-span-6';
            if (index % 4 === 0) colSpan = 'md:col-span-7';
            else if (index % 4 === 1) colSpan = 'md:col-span-5';
            else if (index % 4 === 2) colSpan = 'md:col-span-5';
            else if (index % 4 === 3) colSpan = 'md:col-span-7';

            return (
              <div
                key={project.id}
                onClick={() => {
                  cinemaAudio.playShutterClick();
                  onSelectProject({ ...project, coverImage: activeCoverImage });
                }}
                onMouseEnter={() => {
                  setCursorText('VER PROJECTO');
                  setCursorVariant('view');
                }}
                onMouseLeave={() => {
                  setCursorText('');
                  setCursorVariant('default');
                }}
                className={`${colSpan} group cursor-pointer relative flex flex-col justify-end min-h-[460px] md:min-h-[520px] rounded-lg overflow-hidden border border-white/10 hover:border-[#D4AF37]/70 transition-all duration-700 bg-zinc-950 shadow-2xl`}
              >
                {/* Image Background Frame */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={activeCoverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Atmospheric Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.9)_0%,transparent_70%)]" />
                </div>

                {/* Top Badge: Technical Camera & Aspect */}
                <div className="relative z-10 p-6 md:p-8 mb-auto flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono-tech text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 w-fit font-semibold">
                      {project.categoryLabel}
                    </span>
                    {project.awards && project.awards.length > 0 && (
                      <span className="font-mono-tech text-[9px] text-zinc-300 tracking-wider flex items-center gap-1 mt-1 bg-black/60 px-2 py-0.5 rounded w-fit backdrop-blur-sm border border-white/10">
                        <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                        {project.awards[0]}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-sm shadow-md">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Content Frame */}
                <div className="relative z-10 p-6 md:p-8">
                  <div className="flex items-center gap-3 font-mono-tech text-xs text-zinc-400 mb-2">
                    <span>{project.client}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                    <span>•</span>
                    <span className="text-[#D4AF37] font-semibold">{project.year}</span>
                  </div>

                  <h3 className="font-cinematic text-3xl sm:text-4xl text-white font-normal tracking-wide mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 font-light line-clamp-2 mb-4 leading-relaxed font-sans">
                    {project.subtitle}
                  </p>

                  {/* Micro Specs Footer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-zinc-400">
                    <span>CÂMARA: {project.camera.split(' ')[0]}</span>
                    <span>FORMATO: {project.aspectRatio}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
