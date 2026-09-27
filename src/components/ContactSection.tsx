import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowUpRight, Check } from 'lucide-react';
import { cinemaAudio } from '../utils/audioSynth';

interface ContactSectionProps {
  onOpenBriefing: () => void;
}

export default function ContactSection({ onOpenBriefing }: ContactSectionProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    cinemaAudio.playShutterClick();
    setNewsletterSubscribed(true);
  };

  return (
    <section id="contacto" className="py-28 px-6 md:px-12 bg-[#0A0A0A] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
              Canais Directos • Luanda &amp; Lisboa
            </span>
          </div>
          <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight mb-4">
            Vamos Criar Algo que Fique na Memória.
          </h2>
          <p className="text-zinc-400 font-light text-base sm:text-lg">
            Seja para uma campanha publicitária nacional em Angola, um spot radiofónico, podcast corporativo ou um projecto de cinema de grande fôlego, a nossa câmara está pronta.
          </p>
        </div>

        {/* Studio Locations & Direct Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Luanda Hub */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#111114] border border-[#D4AF37]/20 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono-tech text-[10px] text-[#D4AF37] uppercase tracking-widest px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  HUB ÁFRICA • LUANDA
                </span>
                <span className="font-mono-tech text-xs text-zinc-500">WAT (GMT +1)</span>
              </div>

              <h3 className="font-cinematic text-2xl text-white mb-2">Estúdio Luanda</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                Base central de operações, captação externa, estúdio de gravação de podcast e casting para todo o território angolano e continente africano.
              </p>

              <div className="space-y-3.5 font-mono-tech text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <span>Talatona, Belas &amp; Base Náutica da Ilha de Luanda, Angola</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div className="flex flex-col">
                    <a href="tel:+244923060501" className="hover:text-[#D4AF37] transition-colors">+244 923 060 501</a>
                    <a href="tel:+244921984864" className="text-zinc-400 hover:text-[#D4AF37] transition-colors">+244 921 984 864</a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a href="mailto:geral@efbmidia.com" className="hover:text-[#D4AF37] transition-colors">geral@efbmidia.com</a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="https://wa.me/244923060501"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cinemaAudio.playApertureClick()}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded bg-white/5 hover:bg-[#25D366] text-white hover:text-black font-mono-tech text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Luanda (+244)</span>
              </a>
            </div>
          </div>

          {/* Lisboa Hub */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-[#111114] border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono-tech text-[10px] text-[#D4AF37] uppercase tracking-widest px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  HUB EUROPA • LISBOA
                </span>
                <span className="font-mono-tech text-xs text-zinc-500">WET (GMT 0)</span>
              </div>

              <h3 className="font-cinematic text-2xl text-white mb-2">Estúdio Lisboa</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                Ilha de pós-produção avançada, masterização de cor ACES, sonorização cinematográfica e relações com distribuidoras europeias.
              </p>

              <div className="space-y-3.5 font-mono-tech text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <span>Avenida da Liberdade &amp; Chiado, Lisboa, Portugal</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>+351 912 345 678</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a href="mailto:lisboa@efbmidia.com" className="hover:text-[#D4AF37] transition-colors">lisboa@efbmidia.com</a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="mailto:lisboa@efbmidia.com"
                onClick={() => cinemaAudio.playApertureClick()}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded bg-white/5 hover:bg-white text-white hover:text-black font-mono-tech text-xs uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contactar Hub Europa</span>
              </a>
            </div>
          </div>

          {/* Direct Briefing Callout Card */}
          <div className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-br from-black via-[#141418] to-black border border-[#D4AF37]/50 flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.12)]">
            <div>
              <span className="font-mono-tech text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">
                INICIAR PROJECTO IMEDIATO
              </span>
              <h3 className="font-cinematic text-2xl text-white mb-3">
                Prefere um Enquadramento Orçamental Detalhado?
              </h3>
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-6">
                Utilize o nosso formulário técnico de briefing. Defina as lentes, dias de rodagem, enquadramento de investimento em Kwanzas (AOA) e prazos de pós-produção.
              </p>
            </div>

            <button
              onClick={() => {
                cinemaAudio.playApertureClick();
                onOpenBriefing();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-[2px] bg-[#D4AF37] hover:bg-white text-black font-semibold font-mono-tech text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              <span>Abrir Formulário de Briefing</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Newsletter & Institutional Footer Row */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <span className="font-mono-tech text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-1">
              ESTUDOS DE CASO &amp; DIÁRIOS DE RODAGEM
            </span>
            <h4 className="font-cinematic text-xl text-white font-normal mb-1">
              Receba os Bastidores do Cinema e Publicidade Angolana
            </h4>
            <p className="text-xs text-zinc-400 font-light">
              Análises de direcção de fotografia, novas tecnologias de podcast e ensaios sobre a cultura visual de Angola.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono-tech">
                <Check className="w-4 h-4" />
                <span>O seu correio electrónico foi registado com sucesso na nossa lista de Luanda.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full lg:w-96">
                <input
                  type="email"
                  required
                  placeholder="o-seu-email@dominio.ao"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded bg-black border border-white/15 text-white text-xs font-mono-tech focus:border-[#D4AF37] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded bg-[#D4AF37] hover:bg-white text-black font-semibold font-mono-tech text-xs uppercase tracking-wider transition-colors shrink-0"
                >
                  Subscrever
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
