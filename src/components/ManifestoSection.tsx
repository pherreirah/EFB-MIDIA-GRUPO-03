import { AGENCY_STATS } from '../data/portfolioData';
import { Aperture, Compass, Film, Award } from 'lucide-react';

export default function ManifestoSection() {
  const pillars = [
    {
      icon: Aperture,
      number: '01',
      title: 'A Lente Cinematográfica',
      desc: 'Tratamos cada projecto — de um spot comercial de 30 segundos a uma série de podcast ou longa-metragem — com a gravidade, a composição óptica e o rigor de iluminação da grande tela.',
    },
    {
      icon: Compass,
      number: '02',
      title: 'O Eixo Luanda • Lisboa',
      desc: 'Um olhar transatlântico único. Unimos a vibrante potência criativa e cultural de Angola à sofisticação técnica e infraestrutura de ponta do cinema internacional.',
    },
    {
      icon: Film,
      number: '03',
      title: 'Verdade Emocional',
      desc: 'Rejeitamos o ruído estético descartável. Buscamos a densidade da textura, o silêncio da luz natural e narrativas humanas que permanecem vivas na memória colectiva.',
    },
  ];

  return (
    <section id="manifesto" className="relative py-28 px-6 md:px-12 bg-[#0E0E10] border-t border-white/5 overflow-hidden">
      {/* Background Subtle Viewfinder Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Introduction Block (Unobstructed from Hero Video) */}
        <div className="mb-16 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#D4AF37]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-semibold">
              AGÊNCIA DE PUBLICIDADE E COMUNICAÇÃO • LUANDA &amp; LISBOA
            </span>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-100 font-light leading-relaxed max-w-4xl tracking-tight">
            Narrativas visuais cinematográficas, cinema autoral, documentários, publicidade 360° e estúdios dedicados de podcast que desafiam a percepção e eternizam marcas com profundidade, luz e verdade emocional.
          </p>
        </div>

        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[2px] bg-[#D4AF37]" />
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Manifesto • Conceito Criativo &amp; Angola
          </span>
        </div>

        {/* Big Impact Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-7">
            <h2 className="font-cinematic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
              O que vemos à primeira vista é apenas o início.
              <span className="block italic text-[#D4AF37] font-normal mt-2">
                A verdade mora além do olhar.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              Na publicidade massificada e no consumo veloz de imagens, o olhar comum capta apenas a casca.
              Na <strong className="text-white font-medium">EFB MÍDIA</strong>, em Luanda, operamos como uma lente de alta precisão: ajustamos o foco, desafiamos a luz convencional e revelamos a substância que transforma produtos em ícones culturais e histórias em património perene.
            </p>

            <div className="p-6 rounded-lg bg-black/40 border border-[#D4AF37]/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-xs font-mono-tech tracking-widest uppercase text-zinc-400 mb-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Posicionamento de Mercado em Angola</span>
              </div>
              <p className="text-sm text-zinc-300 italic">
                &ldquo;Não criamos publicidade para ser assistida com pressa. Criamos cinema que as marcas angolanas e internacionais têm orgulho de assinar.&rdquo;
              </p>
              <div className="mt-3 text-[11px] font-mono-tech text-[#D4AF37] uppercase tracking-wider font-semibold">
                — Edson Francisco Banza, Director Criativo Executivo
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group relative p-8 rounded-lg bg-[#141416] border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono-tech text-xs text-[#D4AF37] tracking-widest font-semibold">
                    {pillar.number} // PILAR
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-cinematic text-2xl text-white mb-3 tracking-wide group-hover:text-[#D4AF37] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Telemetry Stats Strip */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {AGENCY_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-cinematic text-4xl sm:text-5xl text-[#D4AF37] font-normal mb-1">
                {stat.value}
              </span>
              <span className="font-mono-tech text-xs text-white uppercase tracking-wider mb-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-zinc-500 font-light">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
