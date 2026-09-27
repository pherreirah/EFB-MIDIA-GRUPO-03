import { useState, useEffect } from 'react';
import { SERVICES } from '../data/portfolioData';
import { ArrowUpRight, Check, Sparkles, Clock, Wrench, Mic, Film, Radio, Tv, Layers, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBriefing: () => void;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: 'default' | 'play' | 'view' | 'lens' | 'hidden') => void;
  activeServiceId?: string;
  onSelectServiceId?: (id: string) => void;
}

export default function ServicesSection({
  onOpenBriefing,
  setCursorText,
  setCursorVariant,
  activeServiceId,
  onSelectServiceId,
}: ServicesSectionProps) {
  const [internalSelectedId, setInternalSelectedId] = useState(activeServiceId || SERVICES[0].id);

  useEffect(() => {
    if (activeServiceId) {
      setInternalSelectedId(activeServiceId);
    }
  }, [activeServiceId]);

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    if (onSelectServiceId) {
      onSelectServiceId(id);
    }
  };

  const activeService = SERVICES.find((s) => s.id === internalSelectedId) || SERVICES[0];

  return (
    <section id="servicos" className="py-28 px-6 md:px-12 bg-[#070709] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                Capacidades &amp; Verticais de Produção
              </span>
            </div>
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
              O Que Fazemos
            </h2>
          </div>

          <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md">
            Do conceito estratégico à masterização em padrões internacionais. Infraestrutura especializada para cada tipo de linguagem audiovisual e sonora.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SPECIAL DIFFERENTIATION CALLOUT: PODCAST vs CINEMA vs SPOTS              */}
        {/* ========================================================================= */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black via-[#0E0E12] to-black border border-[#D4AF37]/30 shadow-[0_0_35px_rgba(212,175,55,0.08)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono-tech text-[11px] text-[#D4AF37] uppercase tracking-[0.24em] font-semibold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                Diferenciação Técnica de Produção
              </span>
              <h3 className="font-cinematic text-xl sm:text-2xl text-white mt-1">
                Por Que Cada Linguagem Exige um Ecossistema Próprio
              </h3>
            </div>
            <span className="text-xs text-zinc-400 font-mono-tech max-w-sm">
              Na EFB Mídia, não adaptamos ferramentas genéricas. Cada formato possui workflow, equipamentos e engenharia acústica dedicados.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Podcast Vertical */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 text-[#D4AF37] mb-2 font-mono-tech text-xs uppercase tracking-wider font-semibold">
                <Mic className="w-4 h-4" />
                <span>Podcast &amp; Vodcast</span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Foco em conversação fluida, estúdio com isolamento seco, microfones Shure SM7B, corte multicâmara dinâmico e clips verticais de alta retenção.
              </p>
            </div>

            {/* Cinema & Ficção */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 text-[#D4AF37] mb-2 font-mono-tech text-xs uppercase tracking-wider font-semibold">
                <Film className="w-4 h-4" />
                <span>Cinema &amp; Ficção</span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Narrativas de longo fôlego, lentes anamórficas Cooke, iluminação escultural chiaroscuro, sonoplastia surround 7.1 e master DCP DCI 4K.
              </p>
            </div>

            {/* Spot Publicitário */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 text-[#D4AF37] mb-2 font-mono-tech text-xs uppercase tracking-wider font-semibold">
                <Tv className="w-4 h-4" />
                <span>Spot Publicitário TV</span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Poder de síntese cirúrgico em 15s/30s/60s, robótica Bolt, captação em 1000 FPS e conformidade rigorosa com normas broadcast EBU R128.
              </p>
            </div>

            {/* Spot Radiofónico */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 text-[#D4AF37] mb-2 font-mono-tech text-xs uppercase tracking-wider font-semibold">
                <Radio className="w-4 h-4" />
                <span>Spot Radiofónico</span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                100% sensorial e auditivo: casting de locutores nativos, jingles e sound design autoral com compressão broadcast otimizada para FM e streaming.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SERVICES SHOWCASE GRID                                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Service Selector Tabs List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1">
            {SERVICES.map((service) => {
              const isSelected = service.id === internalSelectedId;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelect(service.id)}
                  onMouseEnter={() => {
                    setCursorVariant('default');
                  }}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-black border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.2)]'
                      : 'bg-[#101014] border-white/5 hover:border-white/20 hover:bg-[#141418]'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#D4AF37]" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono-tech text-[10px] text-[#D4AF37] tracking-[0.25em] font-semibold">
                      {service.number} // VERTICAL
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#D4AF37] translate-x-0.5 -translate-y-0.5' : 'text-zinc-600 group-hover:text-zinc-300'}`} />
                  </div>

                  <h3 className={`font-cinematic text-lg sm:text-xl tracking-wide transition-colors ${isSelected ? 'text-white font-semibold' : 'text-zinc-300 group-hover:text-white'}`}>
                    {service.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-light mt-1 line-clamp-1 font-sans">
                    {service.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Deep Dive Details Panel */}
          <div className="lg:col-span-7 p-7 sm:p-10 rounded-2xl bg-black border border-white/15 relative overflow-hidden shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-white/10 relative z-10">
              <div>
                <span className="font-mono-tech text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] block mb-1 font-semibold">
                  DETALHAMENTO TÉCNICO • {activeService.number}
                </span>
                <h3 className="font-cinematic text-2xl sm:text-3xl text-white font-normal">
                  {activeService.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-mono-tech">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeService.deliverableLeadTime}</span>
              </div>
            </div>

            <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-8 relative z-10 font-sans">
              {activeService.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="mb-8 relative z-10">
              <h4 className="font-mono-tech text-xs text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Entregáveis Rigorosos &amp; Formatos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#121216] border border-white/5">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-300 font-light font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment & Workflow Rigor */}
            <div className="mb-8 p-5 rounded-xl bg-[#0f0f13] border border-white/10 relative z-10">
              <h4 className="font-mono-tech text-xs text-[#D4AF37] uppercase tracking-widest mb-3 flex items-center gap-2 font-semibold">
                <Wrench className="w-3.5 h-3.5" />
                Infraestrutura &amp; Equipamentos Dedicados
              </h4>
              <ul className="space-y-1.5 font-mono-tech text-xs text-zinc-300">
                {activeService.equipment.map((eq, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action for this service */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 relative z-10">
              <div className="text-xs text-zinc-400 font-mono-tech">
                Produções em Luanda, Lisboa ou operações itinerantes.
              </div>
              <button
                onClick={onOpenBriefing}
                onMouseEnter={() => {
                  setCursorText('BRIEFING');
                  setCursorVariant('default');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs font-mono-tech uppercase tracking-[0.2em] rounded-[2px] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] whitespace-nowrap"
              >
                <span>Solicitar Briefing Deste Serviço</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
