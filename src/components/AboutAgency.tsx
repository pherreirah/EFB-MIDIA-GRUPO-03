import { TEAM } from '../data/portfolioData';
import { MapPin, Globe, Film, CheckCircle } from 'lucide-react';

export default function AboutAgency() {
  return (
    <section id="sobre" className="py-28 px-6 md:px-12 bg-[#09090A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                A Agência &amp; Produtora
              </span>
            </div>
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
              A Nossa História
            </h2>
          </div>

          <p className="text-zinc-400 font-light text-sm sm:text-base max-w-md">
            Nascida com vocação cinematográfica e ambição cosmopolita em Angola.
            Construímos uma ponte autêntica entre os centros criativos de Luanda e Lisboa.
          </p>
        </div>

        {/* Narrative & Hubs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono-tech text-xs tracking-widest text-[#D4AF37] uppercase block">
              Génese &amp; Visão
            </span>
            <h3 className="font-cinematic text-3xl sm:text-4xl text-white font-light leading-snug">
              Unir a ancestralidade da narrativa oral ao mais alto padrão técnico do cinema contemporâneo.
            </h3>
            <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              A <strong className="text-white">EFB MÍDIA</strong> foi fundada em Luanda para responder a uma urgência: libertar as narrativas de marcas e as histórias autorais do convencional. Acreditamos que uma campanha só se torna inesquecível quando é filmada com verdade, respeito à luz e sensibilidade humana.
            </p>
            <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
              Com equipas permanentes em Angola e Portugal, transitamos com naturalidade entre grandes produções publicitárias, programas de podcast e longas-metragens documentais que circulam nos principais festivais de cinema do mundo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-black border border-white/10 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono-tech text-xs text-white uppercase tracking-wider mb-1">Estúdio Luanda</h4>
                  <p className="text-xs text-zinc-400 font-light">Talatona &amp; Ilha de Luanda • Base operacional de produção e captação em África.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/10 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono-tech text-xs text-white uppercase tracking-wider mb-1">Estúdio Lisboa</h4>
                  <p className="text-xs text-zinc-400 font-light">Avenida da Liberdade &amp; Chiado • Pós-produção avançada e conexões europeias.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop"
                alt="Equipa EFB Mídia em filmagem cinematográfica"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                <span className="font-mono-tech text-[10px] tracking-widest text-[#D4AF37] uppercase block mb-1 font-semibold">
                  FILOSOFIA DE SET
                </span>
                <p className="text-xs text-zinc-200 font-light">
                  Equipamento proprietário de cinema digital, câmaras de grande formato e equipas que operam com precisão de estúdio e flexibilidade de documentário.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Creative Leadership (Equipa) */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="font-mono-tech text-xs text-[#D4AF37] uppercase tracking-widest block mb-1">
                Liderança Criativa &amp; Direcção
              </span>
              <h3 className="font-cinematic text-3xl sm:text-4xl text-white font-normal">
                Mentes Criativas
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs text-zinc-500">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>PRESENÇA GLOBAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#121215] border border-white/5 hover:border-[#E5A93C]/40 transition-all duration-500"
              >
                {/* Member Portrait */}
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="font-mono-tech text-[10px] text-[#E5A93C] tracking-wider uppercase block">
                      {member.location}
                    </span>
                  </div>
                </div>

                {/* Member Bio & Credentials */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-cinematic text-xl text-white mb-1 group-hover:text-[#E5A93C] transition-colors">
                      {member.name}
                    </h4>
                    <span className="font-mono-tech text-[11px] text-zinc-400 block mb-3 leading-tight">
                      {member.role}
                    </span>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-[10px] font-mono-tech text-zinc-500">
                    <span className="text-[#E5A93C] block mb-0.5 font-semibold">Créditos:</span>
                    <span>{member.credits}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
