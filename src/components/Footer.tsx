import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowUp } from 'lucide-react';
import EfbLogo from './EfbLogo';

interface FooterProps {
  customLogoUrl?: string;
  onOpenAdmin?: () => void;
}

export default function Footer({ customLogoUrl, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] border-t border-[#D4AF37]/30 text-zinc-300 font-mono-tech text-xs overflow-hidden">
      {/* Top Gold Anamorphic Light Flare Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">
        {/* Main Columns Grid matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10 items-start">
          
          {/* Column 1: Brand & Official Lockup */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {/* Stylized Gold Slash */}
              <div className="w-[3px] h-10 bg-gradient-to-b from-[#D4AF37] to-[#8C701E] -skew-x-12 shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              <EfbLogo size="sm" customLogoUrl={customLogoUrl} variant="horizontal" showSubtitle={true} />
            </div>

            <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-300 font-semibold pl-4">
              AGÊNCIA DE PUBLICIDADE E COMUNICAÇÃO
            </p>

            <p className="text-zinc-400 font-light text-xs font-sans leading-relaxed pl-4 max-w-xs">
              Produtora audiovisual de alta gama e agência de comunicação integrada com hubs em Luanda e Lisboa.
            </p>

            {onOpenAdmin && (
              <div className="pl-4 pt-1">
                <button
                  onClick={onOpenAdmin}
                  className="text-[10px] text-[#D4AF37] hover:underline uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <span>⚙ Gestor Administrativo</span>
                </button>
              </div>
            )}
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <ul className="space-y-2.5 text-xs font-medium uppercase tracking-[0.2em]">
              <li>
                <a href="#projetos" className="text-zinc-300 hover:text-[#D4AF37] transition-colors">
                  PROJECTOS
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-zinc-300 hover:text-[#D4AF37] transition-colors">
                  SERVIÇOS
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-zinc-300 hover:text-[#D4AF37] transition-colors">
                  SOBRE
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-zinc-300 hover:text-[#D4AF37] transition-colors">
                  CONTACTO
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact Information */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <div className="flex items-center gap-3 text-zinc-300">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="tel:+244923060501" className="hover:text-white transition-colors">
                +244 923 060 501
              </a>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="mailto:geral@efbmidia.com" className="hover:text-white transition-colors lowercase">
                geral@efbmidia.com
              </a>
            </div>

            <div className="flex items-start gap-3 text-zinc-300">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Visite-nos: Luanda &amp; Lisboa • Tel: 921 984 864</span>
            </div>
          </div>

          {/* Column 4: Social Media & Slogan */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] flex items-center justify-center text-zinc-300 hover:text-[#D4AF37] transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] flex items-center justify-center text-zinc-300 hover:text-[#D4AF37] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] flex items-center justify-center text-zinc-300 hover:text-[#D4AF37] transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 block font-light">
                SIGA-NOS NAS REDES SOCIAIS
              </span>
            </div>

            {/* Slogan with Gold Angled Slash (From Reference Design) */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-[2px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent -skew-x-12 shrink-0" />
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.28em] text-zinc-300 leading-tight">
                <div>IDEIAS</div>
                <div>IMAGENS</div>
                <div>HISTÓRIAS</div>
                <div className="text-[#D4AF37] font-semibold">QUE TRANSFORMAM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-light">
          <div>
            © 2025 EFB Mídia — Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <span className="text-zinc-700">|</span>
            <a href="#termos" className="hover:text-white transition-colors">
              Termos e Condições
            </a>

            <button
              onClick={scrollToTop}
              className="ml-4 flex items-center gap-1.5 text-zinc-400 hover:text-[#D4AF37] transition-colors py-1 px-2.5 rounded border border-white/10 hover:border-[#D4AF37]/50 bg-white/5"
              title="Voltar ao topo"
            >
              <span>Topo</span>
              <ArrowUp className="w-3 h-3 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
