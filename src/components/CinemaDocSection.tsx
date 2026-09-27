import { useState } from 'react';
import { Film, Play, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { CINEMA_WORKS } from '../data/portfolioData';

interface CinemaDocSectionProps {
  onOpenShowreel: () => void;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: 'default' | 'play' | 'view' | 'lens' | 'hidden') => void;
}

export default function CinemaDocSection({
  onOpenShowreel,
  setCursorText,
  setCursorVariant,
}: CinemaDocSectionProps) {
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const activeFilm = CINEMA_WORKS[selectedFilmIndex];

  return (
    <section id="cinema" className="py-28 px-6 md:px-12 bg-[#080809] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Cinema Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Film className="w-4 h-4 text-[#E5A93C]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#E5A93C]">
                EFB Studios • Divisão de Cinema & Documentário
              </span>
            </div>
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
              Cinema &amp; Obras Autorais
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-zinc-400 uppercase tracking-widest">
              Tratamento Mubi / IMDb Festival:
            </span>
            <div className="flex gap-2">
              {CINEMA_WORKS.map((work, idx) => (
                <button
                  key={work.id}
                  onClick={() => setSelectedFilmIndex(idx)}
                  className={`px-3 py-1 rounded text-xs font-mono-tech transition-all ${
                    selectedFilmIndex === idx
                      ? 'bg-[#E5A93C] text-black font-bold shadow-[0_0_15px_rgba(229,169,60,0.4)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated MUBI / IMDb Premium Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#121215] via-[#0c0c0e] to-black shadow-2xl">
          {/* Film Backdrop with Atmosphere */}
          <div className="relative min-h-[480px] lg:min-h-[560px] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Column: Film Poster & Laurels */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between relative z-10 bg-gradient-to-r from-black/90 via-black/80 to-transparent">
              <div>
                {/* Festival Laurels Strip */}
                <div className="mb-6 p-3 rounded-lg bg-black/60 border border-[#E5A93C]/20 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[10px] font-mono-tech uppercase tracking-widest text-[#E5A93C] mb-2 font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Seleções & Prêmios em Festivais</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeFilm.festivals.map((fest, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[10px] text-zinc-300 font-mono-tech bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        ❧ {fest} ☙
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono-tech text-xs text-zinc-400 mb-2">
                  <span className="text-[#E5A93C]">{activeFilm.category}</span>
                  <span>•</span>
                  <span>{activeFilm.year}</span>
                  <span>•</span>
                  <span>{activeFilm.runtime}</span>
                </div>

                <h3 className="font-cinematic text-4xl sm:text-5xl text-white font-normal tracking-wide mb-1">
                  {activeFilm.title}
                </h3>
                {activeFilm.originalTitle && (
                  <span className="text-sm font-mono-tech text-zinc-400 block mb-4 italic">
                    Título Internacional: {activeFilm.originalTitle}
                  </span>
                )}

                <p className="font-cinematic text-xl text-zinc-200 italic mb-4 leading-snug border-l-2 border-[#E5A93C] pl-4">
                  &ldquo;{activeFilm.logline}&rdquo;
                </p>

                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {activeFilm.synopsis}
                </p>
              </div>

              {/* Action: Watch Film Reel & Specs */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={onOpenShowreel}
                  onMouseEnter={() => {
                    setCursorText('TRAILER');
                    setCursorVariant('play');
                  }}
                  onMouseLeave={() => {
                    setCursorText('');
                    setCursorVariant('default');
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#E5A93C] text-black font-semibold text-xs font-mono-tech uppercase tracking-widest rounded-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(229,169,60,0.3)]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Assistir Trailer Oficial</span>
                </button>

                <div className="text-[11px] font-mono-tech text-zinc-400">
                  Direção: <span className="text-white">{activeFilm.director}</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res Backdrop Image & Technical Spec Sheet */}
            <div className="lg:col-span-7 relative flex flex-col justify-end p-8 sm:p-12 overflow-hidden min-h-[320px]">
              <div className="absolute inset-0 z-0">
                <img
                  src={activeFilm.backdropImage}
                  alt={activeFilm.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
              </div>

              {/* Technical Specifications Floating Card (Criterion / Mubi Style) */}
              <div className="relative z-10 p-6 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 max-w-lg ml-auto w-full">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono-tech text-[#E5A93C]">
                  <span className="flex items-center gap-1.5 uppercase font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    ESPECIFICAÇÕES DE PROJEÇÃO
                  </span>
                  <span>THEATRICAL DCI</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] font-mono-tech">
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Formato de Captação</span>
                    <span className="text-zinc-200">{activeFilm.technicalSpecs.captureFormat}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Proporção (Aspect Ratio)</span>
                    <span className="text-[#E5A93C] font-semibold">{activeFilm.technicalSpecs.aspectRatio}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Espaço de Cor</span>
                    <span className="text-zinc-200">{activeFilm.technicalSpecs.colorSpace}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase">Mixagem de Som</span>
                    <span className="text-zinc-200">{activeFilm.technicalSpecs.soundMix}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/5">
                    <span className="text-zinc-500 block text-[9px] uppercase">Legendas Disponíveis</span>
                    <span className="text-zinc-300">{activeFilm.technicalSpecs.subtitles}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cinema Standards Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech text-xs text-zinc-400">
          <div className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
            <span>Distribuição em DCP DCI 4K para salas de cinema</span>
          </div>
          <div className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
            <span>Pipeline de Cor ACEScc calibrado para festivais</span>
          </div>
          <div className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
            <span>Coproduções internacionais Luanda, Lisboa e Paris</span>
          </div>
        </div>
      </div>
    </section>
  );
}
