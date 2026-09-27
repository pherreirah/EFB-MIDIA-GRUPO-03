interface EfbLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  customLogoUrl?: string;
  showSubtitle?: boolean;
  variant?: 'horizontal' | 'stacked' | 'badge';
  onClick?: () => void;
}

export default function EfbLogo({
  className = '',
  size = 'md',
  customLogoUrl,
  showSubtitle = true,
  variant = 'horizontal',
  onClick,
}: EfbLogoProps) {
  // Dimension scales
  const sizeStyles = {
    xs: {
      wrapper: 'w-16',
      boxPadding: 'px-1.5 py-0.5',
      efbText: 'text-xs',
      midiaText: 'text-xs tracking-[0.2em]',
      sloganText: 'text-[6px] tracking-[0.26em]',
      gap: 'gap-2',
      borderWidth: 'border',
    },
    sm: {
      wrapper: 'w-24',
      boxPadding: 'px-2 py-1',
      efbText: 'text-sm font-black',
      midiaText: 'text-sm tracking-[0.22em]',
      sloganText: 'text-[7px] tracking-[0.28em]',
      gap: 'gap-2.5',
      borderWidth: 'border-[1.5px]',
    },
    md: {
      wrapper: 'w-36',
      boxPadding: 'px-3 py-1.5',
      efbText: 'text-lg sm:text-xl font-black',
      midiaText: 'text-lg sm:text-xl tracking-[0.24em]',
      sloganText: 'text-[8px] sm:text-[9px] tracking-[0.32em]',
      gap: 'gap-3',
      borderWidth: 'border-2',
    },
    lg: {
      wrapper: 'w-48',
      boxPadding: 'px-4 py-2',
      efbText: 'text-2xl sm:text-3xl font-black',
      midiaText: 'text-2xl sm:text-3xl tracking-[0.26em]',
      sloganText: 'text-[10px] sm:text-xs tracking-[0.36em]',
      gap: 'gap-4',
      borderWidth: 'border-2',
    },
    xl: {
      wrapper: 'w-64',
      boxPadding: 'px-6 py-3',
      efbText: 'text-4xl sm:text-5xl font-black',
      midiaText: 'text-4xl sm:text-5xl tracking-[0.28em]',
      sloganText: 'text-xs sm:text-sm tracking-[0.4em]',
      gap: 'gap-5',
      borderWidth: 'border-[3px]',
    },
    '2xl': {
      wrapper: 'w-80',
      boxPadding: 'px-8 py-4',
      efbText: 'text-5xl sm:text-6xl font-black',
      midiaText: 'text-5xl sm:text-6xl tracking-[0.3em]',
      sloganText: 'text-sm sm:text-base tracking-[0.45em]',
      gap: 'gap-6',
      borderWidth: 'border-4',
    },
  }[size];

  // If a custom image was uploaded via Admin, show it cleanly
  if (customLogoUrl) {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center ${sizeStyles.wrapper} ${className} ${
          onClick ? 'cursor-pointer' : ''
        }`}
      >
        <img
          src={customLogoUrl}
          alt="EFB MÍDIA • Além do Olhar"
          className="w-full h-auto object-contain drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // =========================================================================
  // OFFICIAL EFB MÍDIA LOGO LOCKUP (1:1 MATCH WITH REFERENCE DESIGN)
  // Left: Gold bordered box with bold EFB letters in gold
  // Right: MÍDIA in crisp white tracking + ALÉM DO OLHAR underneath
  // =========================================================================

  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center select-none ${className} ${
          onClick ? 'cursor-pointer' : ''
        }`}
      >
        {/* The Gold EFB Box */}
        <div
          className={`relative flex items-center justify-center ${sizeStyles.borderWidth} border-[#D4AF37] ${sizeStyles.boxPadding} rounded-[2px] bg-black/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]`}
        >
          <span
            className={`font-montserrat font-black text-[#D4AF37] tracking-wider leading-none ${sizeStyles.efbText}`}
            style={{
              textShadow: '0 0 15px rgba(212,175,55,0.4)',
            }}
          >
            EFB
          </span>
        </div>

        {/* MÍDIA */}
        <div
          className={`font-montserrat font-extrabold text-white uppercase ${sizeStyles.midiaText} leading-none mt-2.5`}
          style={{ letterSpacing: '0.22em' }}
        >
          MÍDIA
        </div>

        {/* ALÉM DO OLHAR */}
        {showSubtitle && (
          <div
            className={`font-montserrat uppercase text-[#D4AF37] font-semibold ${sizeStyles.sloganText} mt-1.5 whitespace-nowrap`}
          >
            ALÉM DO OLHAR
          </div>
        )}
      </div>
    );
  }

  // Default: 'horizontal' (as seen in Header, Footer, and top-left of reference design)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${sizeStyles.gap} select-none ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* The Gold EFB Box */}
      <div
        className={`relative flex items-center justify-center ${sizeStyles.borderWidth} border-[#D4AF37] ${sizeStyles.boxPadding} rounded-[2px] bg-black/60 shadow-[0_0_20px_rgba(212,175,55,0.25)] flex-shrink-0`}
      >
        <span
          className={`font-montserrat font-black text-[#D4AF37] tracking-wider leading-none ${sizeStyles.efbText}`}
          style={{
            textShadow: '0 0 14px rgba(212,175,55,0.4)',
          }}
        >
          EFB
        </span>
      </div>

      {/* MÍDIA + ALÉM DO OLHAR Lockup */}
      <div className="flex flex-col justify-center leading-none text-left">
        <span
          className={`font-montserrat font-extrabold text-white uppercase ${sizeStyles.midiaText}`}
        >
          MÍDIA
        </span>
        {showSubtitle && (
          <span
            className={`font-montserrat uppercase text-[#D4AF37] font-semibold ${sizeStyles.sloganText} mt-1`}
          >
            ALÉM DO OLHAR
          </span>
        )}
      </div>
    </div>
  );
}
