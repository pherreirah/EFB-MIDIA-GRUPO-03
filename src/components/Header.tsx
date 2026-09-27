import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Settings } from 'lucide-react';
import EfbLogo from './EfbLogo';

interface HeaderProps {
  onOpenBriefing: () => void;
  onOpenShowreel: () => void;
  onOpenAdmin: () => void;
  customLogoUrl?: string;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: 'default' | 'play' | 'view' | 'lens' | 'hidden') => void;
}

export default function Header({
  onOpenBriefing,
  onOpenShowreel,
  onOpenAdmin,
  customLogoUrl,
  setCursorText,
  setCursorVariant,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projectos', href: '#projetos' },
    { label: 'Cinema', href: '#cinema' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#080808]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
          : 'py-5 bg-gradient-to-b from-[#080808]/95 via-[#080808]/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Hub Location */}
        <a
          href="#"
          className="group flex items-center focus:outline-none"
          onMouseEnter={() => {
            setCursorVariant('default');
          }}
        >
          {/* Authentic EFB Logo Lockup with Montserrat font */}
          <div className="transform group-hover:scale-[1.03] transition-transform duration-300">
            <EfbLogo 
              size="sm" 
              customLogoUrl={customLogoUrl} 
              variant="horizontal" 
              showSubtitle={true} 
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-[0.22em] font-mono-tech text-zinc-200 hover:text-[#D4AF37] transition-colors relative py-1 group font-medium"
                  onMouseEnter={() => {
                    setCursorVariant('default');
                  }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Buttons: MENU and GESTOR ADMIN matching reference */}
        <div className="flex items-center gap-3">
          {/* MENU Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-black/60 border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-mono-tech uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
            title="Abrir Menu Completo"
          >
            <span className="text-sm leading-none font-bold">≡</span>
            <span className="font-semibold text-[11px]">MENU</span>
            <span className="text-[10px] text-[#D4AF37] group-hover:translate-x-0.5 transition-transform">»</span>
          </button>

          {/* GESTOR ADMIN Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-black/70 border border-[#D4AF37]/60 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-mono-tech uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
            title="Abrir Gestor Administrativo (Carregar Vídeo e Imagens)"
          >
            <span className="text-xs leading-none">👤</span>
            <span className="font-semibold text-[11px]">GESTOR ADMIN</span>
            <span className="text-[10px] text-[#D4AF37] group-hover:translate-x-0.5 transition-transform">›</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[62px] bg-[#080808]/98 backdrop-blur-2xl z-50 flex flex-col p-8 border-t border-[#D4AF37]/30">
          <div className="flex flex-col gap-5 pt-2">
            <span className="font-mono-tech text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase">
              Menu & Navegação
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-cinematic text-2xl tracking-wide text-zinc-100 hover:text-[#D4AF37] transition-colors py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-black border border-[#D4AF37] text-[#D4AF37] font-mono-tech text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                <Settings className="w-4 h-4" />
                <span>Gestor Administrativo (Mídia & Vídeo)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShowreel();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-white/20 text-white font-mono-tech text-xs uppercase tracking-widest rounded hover:border-[#D4AF37]"
              >
                Assistir Showreel 2025 ▶
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBriefing();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] text-black font-semibold font-mono-tech text-xs uppercase tracking-widest rounded shadow-lg"
              >
                Iniciar Novo Briefing ↗
              </button>
            </div>

            <div className="mt-auto pt-6 text-center text-[10px] font-mono-tech text-zinc-400 uppercase tracking-widest">
              EFB MÍDIA ALÉM DO OLHAR • Luanda & Lisboa
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
