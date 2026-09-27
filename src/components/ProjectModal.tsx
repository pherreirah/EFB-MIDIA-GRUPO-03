import { X, Award, Film, Camera, Palette, Calendar, MapPin, Clock } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenBriefing: () => void;
}

export default function ProjectModal({ project, onClose, onOpenBriefing }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-5xl bg-[#111113] border border-white/15 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#111113]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-[10px] tracking-widest text-[#E5A93C] uppercase px-2 py-0.5 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30">
              {project.categoryLabel}
            </span>
            <span className="text-zinc-500 font-mono-tech text-xs">•</span>
            <span className="text-zinc-400 font-mono-tech text-xs tracking-wider">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-10">
          {/* Main Hero Banner with Anamorphic Aspect Ratio */}
          <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-[21/9] bg-black">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            {/* Overlay Tagline & Title */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col">
              <span className="font-mono-tech text-xs text-[#E5A93C] tracking-widest uppercase mb-1">
                {project.client}
              </span>
              <h2 className="font-cinematic text-3xl sm:text-5xl text-white font-normal tracking-wide">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Synopsis & Tagline */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono-tech text-[11px] tracking-widest text-zinc-400 uppercase block mb-2">
                  Visão & Conceito
                </span>
                <p className="font-cinematic text-2xl text-zinc-200 italic leading-snug mb-4">
                  &ldquo;{project.tagline}&rdquo;
                </p>
                <p className="text-zinc-300 font-light leading-relaxed text-sm sm:text-base">
                  {project.synopsis}
                </p>
              </div>

              {/* Awards and Recognitions */}
              {project.awards && project.awards.length > 0 && (
                <div className="p-5 rounded-lg bg-black/50 border border-[#E5A93C]/25">
                  <div className="flex items-center gap-2 font-mono-tech text-xs text-[#E5A93C] uppercase tracking-wider mb-3">
                    <Award className="w-4 h-4" />
                    <span>Distinções & Festivais</span>
                  </div>
                  <ul className="space-y-1.5">
                    {project.awards.map((award, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-[#E5A93C] mt-0.5">•</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Technical Camera Sheet (Ficha Técnica Rigorosa) */}
            <div className="lg:col-span-5 p-6 rounded-lg bg-black/60 border border-white/10 space-y-4 font-mono-tech text-xs">
              <div className="text-[11px] tracking-widest text-[#E5A93C] uppercase pb-2 border-b border-white/10 font-semibold flex items-center justify-between">
                <span>FICHA TÉCNICA CINE</span>
                <span>4K MASTER</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#E5A93C]" /> Direção
                </span>
                <span className="text-zinc-200 text-right">{project.director}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#E5A93C]" /> Direção de Fotografia
                </span>
                <span className="text-zinc-200 text-right">{project.dop}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Câmera Principal</span>
                <span className="text-zinc-200 text-right">{project.camera}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Conjunto Ótico</span>
                <span className="text-zinc-200 text-right">{project.lenses}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Formato / Aspect</span>
                <span className="text-[#E5A93C] text-right">{project.aspectRatio}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#E5A93C]" /> Color Grading
                </span>
                <span className="text-zinc-200 text-right">{project.colorGrading}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" /> Locação
                </span>
                <span className="text-zinc-200 text-right">{project.location}</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E5A93C]" /> Duração
                </span>
                <span className="text-zinc-200 text-right">{project.duration}</span>
              </div>
            </div>
          </div>

          {/* Still Frames Gallery */}
          {project.stillFrames && project.stillFrames.length > 0 && (
            <div>
              <span className="font-mono-tech text-[11px] tracking-widest text-[#E5A93C] uppercase block mb-4">
                Fotogramas Selecionados (Stills 35mm)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.stillFrames.map((frame, idx) => (
                  <div key={idx} className="relative aspect-[16/9] rounded overflow-hidden border border-white/10 group">
                    <img
                      src={frame}
                      alt={`${project.title} still ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[9px] font-mono-tech text-zinc-300">
                      FRAME #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA for Project Inquiry */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-black via-[#141416] to-black border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-cinematic text-xl text-white">Interessado em uma produção similar?</h4>
              <p className="text-xs text-zinc-400 font-light">
                Planejamos e executamos produções publicitárias e cinematográficas sob medida em Luanda e Lisboa.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBriefing();
              }}
              className="px-6 py-2.5 bg-[#E5A93C] hover:bg-white text-black font-semibold text-xs font-mono-tech uppercase tracking-widest rounded transition-colors whitespace-nowrap"
            >
              Solicitar Proposta ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
