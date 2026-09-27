import { Project, CinemaWork, ServiceItem, TeamMember, LensSetting } from '../types';

export const LENS_SETTINGS: Record<string, LensSetting> = {
  '24mm': {
    focal: '24mm',
    label: '24mm Ultra-Wide',
    aperture: 'f/2.8',
    dofLabel: 'Grande Angular • Profundidade Ampla',
    angle: '84° FOV',
    blurStrength: 1,
  },
  '35mm': {
    focal: '35mm',
    label: '35mm Anamórfica',
    aperture: 'T1.5',
    dofLabel: 'Foco Cinematográfico Clássico',
    angle: '63° FOV',
    blurStrength: 3,
  },
  '50mm': {
    focal: '50mm',
    label: '50mm Olhar Humano',
    aperture: 'f/1.2',
    dofLabel: 'Perspectiva Natural • Foco Seletivo',
    angle: '46° FOV',
    blurStrength: 6,
  },
  '85mm': {
    focal: '85mm',
    label: '85mm Macro & Retrato',
    aperture: 'T1.3',
    dofLabel: 'Profundidade de Campo Reduzida • Bokeh Luxo',
    angle: '28° FOV',
    blurStrength: 10,
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'sussurros-do-kwanza',
    title: 'Sussurros do Kwanza',
    subtitle: 'Uma elegia visual sobre a memória fluvial e arquitetura vernacular',
    category: 'cinema',
    categoryLabel: 'Documentário Cinematográfico',
    year: '2024',
    client: 'Fundação Memória Africana & EFB Studios',
    location: 'Luanda & Kwanza Sul, Angola',
    duration: '28 min',
    director: 'Edson Francisco Banza',
    dop: 'Mário Kalunga & Rui Valente',
    aspectRatio: '2.39:1 Anamorphic',
    camera: 'ARRI ALEXA Mini LF',
    lenses: 'Cooke Anamorphic /i Full Frame Plus',
    colorGrading: 'DaVinci Resolve Studio (ACES 2065-1)',
    awards: [
      'Vencedor Melhor Fotografia — FESPACO 2024',
      'Seleção Oficial — Doclisboa 2024',
      'Prêmio Especial do Júri — Festival Internacional de Durban'
    ],
    synopsis: 'Nas margens do Rio Kwanza, o tempo não corre em linha reta. O filme explora a convergência entre pescadores ancestrais, as ruínas coloniais que a selva consome e a pulsação contemporânea de Angola. Uma direção de fotografia focada no chiaroscuro e no silêncio da luz natural.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    stillFrames: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tagline: 'Onde o reflexo da água revela o invisível.',
  },
  {
    id: 'terra-e-ouro',
    title: 'Terra & Ouro: Haute Joaillerie',
    subtitle: 'Campanha global de posicionamento para joalharia de alta gama',
    category: 'publicidade',
    categoryLabel: 'Luxury Brand Campaign',
    year: '2025',
    client: 'Maison Aurum Lisbonne',
    location: 'Lisboa & Sintra, Portugal',
    duration: '90s Film & 30s Cuts',
    director: 'Clara Vasconcelos',
    dop: 'Edson Francisco Banza',
    aspectRatio: '2.00:1 Univisium',
    camera: 'RED V-RAPTOR XL 8K VV',
    lenses: 'Leitz SUMMILUX-C Cine Primes',
    colorGrading: 'Film Print Emulation Kodak 2383',
    awards: [
      'Gold Trophy — Lisbon Luxury Advertising Festival',
      'Shortlist — Cannes Corporate Media & TV Awards'
    ],
    synopsis: 'A intersecção entre a mineralogia pura de África e a ourivesaria artesanal europeia. Luzes douradas esculpem formas escuras com transições invisíveis de foco ótico, celebrando a raridade do diamante e o peso do metal precioso.',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    stillFrames: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tagline: 'A eternidade não se desenha. Esculpe-se na luz.',
  },
  {
    id: 'nocturno-em-alvalade',
    title: 'Nocturno em Alvalade',
    subtitle: 'Ficção dramática curta sobre desencontros na metrópole',
    category: 'cinema',
    categoryLabel: 'Curta-Metragem Ficção',
    year: '2024',
    client: 'Coprodução RTP & EFB Filmes',
    location: 'Lisboa, Portugal',
    duration: '19 min',
    director: 'Gonçalo Neves',
    dop: 'Edson Francisco Banza',
    aspectRatio: '1.85:1 Academy Flat',
    camera: 'Sony VENICE 2 8K',
    lenses: 'Atlas Orion Anamorphic 2x',
    colorGrading: 'Moody Neo-Noir Low Key Palette',
    awards: [
      'Melhor Curta de Ficção — IndieLisboa 2024',
      'Prêmio da Crítica — Festival de Cinema de Roterdão'
    ],
    synopsis: 'Duas almas que se cruzam na calçada molhada das madrugadas de Lisboa. Iluminação diegética com lâmpadas de sódio, neons vintage e sombras alongadas criam uma atmosfera lírica e melancólica.',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop',
    stillFrames: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tagline: 'Nas sombras da cidade, o silêncio é quem fala mais alto.',
  },
  {
    id: 'batida-e-heranca',
    title: 'Batida & Herança: Afro-Futurismo',
    subtitle: 'Videoclipe cinematográfico conceitual e experiência sensorial',
    category: 'music_video',
    categoryLabel: 'Visual Album & Videoclipe',
    year: '2025',
    client: 'Universal Music Africa & Artista Residente',
    location: 'Luanda (Ilha do Cabo) & Lisboa (LX Factory)',
    duration: '4:15 min',
    director: 'Edson Francisco Banza',
    dop: 'Tiago Santos',
    aspectRatio: '2.35:1 Widescreen',
    camera: 'ARRI ALEXA 35 4.6K Super 35',
    lenses: 'Angénieux Optimo Ultra 12x',
    colorGrading: 'High-Saturation Vibrant Film LUT',
    awards: [
      'Melhor Direção de Arte — African Music Video Awards',
      'Vencedor de Ouro — Visual FX Showcase'
    ],
    synopsis: 'Uma celebração visual onde o Kuduro de vanguarda e a eletrônica afro encontram a cenografia barroca. Movimentos de câmera contínuos em steadicam e figurinos esculturais desenhados à mão.',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    stillFrames: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tagline: 'O som ganha corpo, o ritmo ganha luz.',
  },
  {
    id: 'horizonte-atlantico',
    title: 'Horizonte Atlântico: Arquitetura & Vanguarda',
    subtitle: 'Manifesto visual para grupo internacional de desenvolvimento imobiliário',
    category: 'publicidade',
    categoryLabel: 'Campanha Institucional & Arquitetura',
    year: '2024',
    client: 'Atlântico Real Estate Holdings',
    location: 'Baía de Luanda & Cascais',
    duration: '2:30 min',
    director: 'Sofia Mendes',
    dop: 'Edson Francisco Banza',
    aspectRatio: '16:9 DCI 4K',
    camera: 'DJI Inspire 3 X9-8K Air Cinema + ARRI LF',
    lenses: 'Hasselblad Prime Lenses 8K',
    colorGrading: 'Clean Architectural Natural Daylight',
    awards: [
      'Prêmio Arquitetura em Filme — Bienal de Design'
    ],
    synopsis: 'Perspectivas geométricas e jogos de sombras projetadas pelo sol equatorial. Um estudo rigoroso sobre as linhas estruturais dos edifícios modernos e a sua relação visceral com o Oceano Atlântico.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    stillFrames: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tagline: 'Construir não é ocupar o espaço; é iluminar o vazio.',
  },
  {
    id: 'a-danca-das-sombras',
    title: 'A Dança das Sombras',
    subtitle: 'Ensaio fotográfico e filme documental sobre a arte plástica moderna angolana',
    category: 'brand_film',
    categoryLabel: 'Doc Arte & Cultura',
    year: '2024',
    client: 'Museu Nacional de Antropologia & Colecionadores Privados',
    location: 'Luanda & Paris',
    duration: '15 min',
    director: 'Edson Francisco Banza',
    dop: 'Pedro Henriques',
    aspectRatio: '4:3 Vintage Silent Framing',
    camera: 'Bolex 16mm Reversal Film & ARRI 35',
    lenses: 'Zeiss Master Anamorphic',
    colorGrading: 'Monochrome Black & White High Dynamic Contrast',
    awards: [
      'Menção Honrosa — Festival de Cinema de Paris'
    ],
    synopsis: 'Diálogo entre o escultor e a madeira milenar do embondeiro. Texturas táteis registradas com lentes macro extremas onde cada fibra conta a história de gerações esquecidas.',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    stillFrames: [
      'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tagline: 'As mãos sabem o que os olhos ainda não viram.',
  }
];

export const CINEMA_WORKS: CinemaWork[] = [
  {
    id: 'sussurros-do-kwanza-doc',
    title: 'Sussurros do Kwanza',
    originalTitle: 'Whispers of Kwanza',
    category: 'Documentário Autoral de Longa Duração',
    year: '2024',
    runtime: '74 min',
    festivals: [
      'FESPACO (Vencedor Prêmio Oumarou Ganda)',
      'Doclisboa (Seleção Oficial Investigação)',
      'Tribeca Film Festival (Spotlight Cinema)',
      'Durban International Film Festival'
    ],
    director: 'Edson Francisco Banza',
    producer: 'EFB Mídia & CineÁfrica Produções',
    dop: 'Mário Kalunga',
    logline: 'Entre a neblina matinal da foz do maior rio de Angola e as cicatrizes da história, uma comunidade ancestral resiste através da oralidade e do canto.',
    synopsis: 'Gravado ao longo de 18 meses com acesso exclusivo às comunidades ribeirinhas de Kwanza Sul, o filme é uma obra de contemplação e rigor técnico sem precedentes no cinema angolano. Com mixagem imersiva em Dolby Atmos e fotografia em 35mm anamórfico, o projeto reafirma a missão da EFB Mídia em projetar o imaginário africano para as telas dos principais festivais mundiais.',
    posterImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    backdropImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    technicalSpecs: {
      captureFormat: 'ProRes 4444 XQ / 4.5K Open Gate',
      aspectRatio: '2.39:1 Anamorphic Scope',
      colorSpace: 'ACEScc Rec.2020 PQ',
      soundMix: 'Dolby Atmos 7.1.4 Surround Sound',
      subtitles: 'Português, Inglês, Francês, Kimbundu'
    }
  },
  {
    id: 'cinzas-do-imperio',
    title: 'Cinzas do Império',
    originalTitle: 'Embers of the Empire',
    category: 'Ficção Histórica / Drama',
    year: '2025',
    runtime: '96 min',
    festivals: [
      'Mostra Internacional de Cinema de São Paulo',
      'Festival de Roterdão (Bright Future)',
      'Festival de Cinema Luso-Brasileiro'
    ],
    director: 'Edson Francisco Banza & Manuel Coutinho',
    producer: 'EFB Mídia Luanda-Lisboa',
    dop: 'Rui Valente',
    logline: '1974: Os últimos 30 dias que antecedem a independência de Angola vistos através dos olhos de um fotógrafo e de uma jornalista clandestina.',
    synopsis: 'Um thriller psicológico com ambientação de época meticulosa. As cores desbotadas pelo calor de Luanda e o contraste das salas de arquivo com luz cortante reconstituem a tensão humana que moldou o destino de duas nações irmãs.',
    posterImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
    backdropImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop',
    technicalSpecs: {
      captureFormat: 'RAW 16-bit Sensor Large Format',
      aspectRatio: '1.66:1 European Widescreen',
      colorSpace: 'Kodak 5219 Film Emulation Scan',
      soundMix: '5.1 Theatrical Mix',
      subtitles: 'Português, Inglês'
    }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'podcast-vodcast',
    number: '01',
    title: 'Serviços & Desenvolvimento de Podcast',
    tagline: 'Engenharia acústica, estúdio multicâmara 4K e narrativa serializada de alta retenção',
    description: 'A produção de podcast possui um fluxo técnico, acústico e editorial completamente distinto do cinema e do rádio. Desenvolvemos o conceito integral do programa, identidade visual e sonora, cenografia acústica dedicada, captação multicâmara com switching em tempo real, captação de áudio vocal broadcast com microfonia Shure SM7B / Rodecaster Pro, masterização em padrões LUFS para Spotify, Apple Podcasts e YouTube, além da extração cirúrgica de cortes verticais virais (Reels/TikTok/Shorts) para máxima distribuição orgânica.',
    deliverables: [
      'Desenvolvimento de Conceito, Bíblias de Conteúdo & Roteirização',
      'Gravação em Estúdio Acústico com 3 a 4 Câmeras Cinema 4K',
      'Tratamento de Voz Broadcast, Remoção de Ruído & Equalização Fina',
      'Masterização de Áudio para Streaming (-14 LUFS / -16 LUFS)',
      'Edição Dinâmica de Conversação & Color Grading Multi-Ângulo',
      'Pílulas e Cortes Verticais (Shorts/Reels) com Legendas Dinâmicas',
      'Distribuição Automatizada em Spotify, Apple Podcasts, Deezer e YouTube'
    ],
    equipment: [
      'Microfones Shure SM7B & Neumann BCM 705 com Braços Articulados Yellowtec',
      'Mesa de Mixagem Digital RØDECaster Pro II & Interfaces Cloudlifter CL-1',
      'Câmeras Sony FX3 / FX6 com Lentes GM 24-70mm e 50mm f/1.2',
      'Switcher Blackmagic ATEM Mini Extreme ISO para Gravação Individual',
      'Tratamento Acústico Vicoustic com Difusores e Bass Traps de Estúdio'
    ],
    deliverableLeadTime: '48h a 5 dias úteis por episódio'
  },
  {
    id: 'cinema-ficcao',
    number: '02',
    title: 'Cinema & Produção de Ficção',
    tagline: 'Cinematografia autoral em grande escala para o circuito de festivais e salas mundiais',
    description: 'A cinematografia cinematográfica prioriza a profundidade dramática, iluminação de alto contraste (chiaroscuro), lentes anamórficas de caráter único e direção de atores minuciosa. Conduzimos longas e curtas-metragens desde o desenvolvimento de roteiro até à entrega final em DCP DCI 4K com som surround imersivo Dolby Atmos.',
    deliverables: [
      'Direção de Fotografia & Operação de Câmara em Formato Anamórfico',
      'Direção Criativa, Casting e Preparação de Elenco',
      'Color Grading em DaVinci Resolve com Emulação Film Stock 35mm',
      'Mixagem e Masterização Imersiva em Dolby Atmos 7.1.4',
      'Master Final DCP para Festivais e Distribuição Comercial Internacional'
    ],
    equipment: [
      'ARRI ALEXA Mini LF & Sony VENICE 2 Full Frame',
      'Conjuntos de Lentes Anamórficas Cooke Anamorphic/i Full Frame Plus',
      'Iluminação Pesada ARRI SkyPanel X, HMI 18K e Astera Titan Tubes',
      'Sistemas de Estabilização Ronin 2, Dolly Chapman e Gruas Cine'
    ],
    deliverableLeadTime: '6 a 16 semanas conforme a escala do projeto'
  },
  {
    id: 'documentario',
    number: '03',
    title: 'Documentário & Grandes Reportagens',
    tagline: 'Investigação antropológica profunda e verdade humana imortalizada',
    description: 'Construção de narrativas documentais de rigor histórico, ambiental e social. Equipes ágeis preparadas para terrenos remotos, captação de som direto cristalino com microfonia shotgun Sennheiser/Sound Devices e sensibilidade para capturar a essência crua dos protagonistas sem artifícios.',
    deliverables: [
      'Pesquisa Antropológica, Pré-entrevistas e Estruturação Narrativa',
      'Captação Documental em Locações Nacionais e Internacionais',
      'Captação de Som Direto com Gravadores de 32-bit Float',
      'Montagem Documental com Arquitetura de Ritmo Emocional',
      'Pacote Completo de Legendas Multilíngues e Audiodescrição'
    ],
    equipment: [
      'Gravadores Sound Devices Scorpio & Microfones Sennheiser MKH 416',
      'Câmeras Sony FX9 e Canon C500 Mk II com Selagem Climática',
      'Drones DJI Inspire 3 com Sensor Full Frame X9-8K'
    ],
    deliverableLeadTime: '4 a 12 semanas'
  },
  {
    id: 'spot-publicitario',
    number: '04',
    title: 'Spot Publicitário (TV & Digital)',
    tagline: 'Impacto visual fulminante em 15s, 30s e 60s com padrão de prestígio',
    description: 'Diferente do cinema contemplativo, o spot publicitário exige um poder de síntese matemático: prender a atenção no primeiro segundo, transmitir a proposta de valor com estética refinada e induzir à ação imediata. Produzimos campanhas para televisão aberta, canais a cabo e formatos otimizados para publicidade digital de alta conversão.',
    deliverables: [
      'Roteirização Publicitária, Storyboards Ilustrados e Moodboards de Direção',
      'Produção Executiva Completa, Locações Exclusivas e Styling',
      'Captação em Alta Velocidade (Slow Motion até 1000 FPS para Food/Beauty)',
      'Versões Master para Broadcast TV (EBU R128 / CALM Act) e Web',
      'Adaptações em Formatos Verticais (9:16), Quadrados (1:1) e Anamórficos'
    ],
    equipment: [
      'Câmeras Phantom Flex4K para Super Slow Motion',
      'Sistemas de Controle de Movimento Robótico Bolt Cinebot',
      'Lentes Leica Summicron-C & ARRI Signature Primes'
    ],
    deliverableLeadTime: '2 a 4 semanas'
  },
  {
    id: 'spot-radiofonico-sound',
    number: '05',
    title: 'Spot Radiofónico & Sound Branding',
    tagline: 'Identidade sonora e locução broadcast que dominam as ondas sonoras',
    description: 'A publicidade em áudio apoia-se inteiramente na sugestão mental e na clareza sonora. Contamos com um banco de vozes de locutores profissionais em português europeu, português angolano e línguas nacionais, jingles originais compostos sob medida, sonoplastia imersiva e masterização com máxima pegada e inteligibilidade nas frequências FM e plataformas de áudio streaming.',
    deliverables: [
      'Redação Publicitária Radiofônica (Textos de 15", 30" e 45")',
      'Casting de Vozes e Gravação de Locutores Profissionais Acreditados',
      'Composição de Assinatura Sonora (Audio Logo / Sonic Branding)',
      'Sonoplastia Especializada, Efeitos Sonoros e Sound Design Fino',
      'Masterização Broadcast para Emissoras de Rádio e Spotify Ads'
    ],
    equipment: [
      'Microfones Neumann U87 Ai & Manley Reference Cardioid',
      'Pré-amplificadores Neve 1073 & Compressores Tube-Tech CL 1B',
      'Monitores de Estúdio Genelec 8351B SAM'
    ],
    deliverableLeadTime: '24h a 72h úteis'
  },
  {
    id: 'video-clip',
    number: '06',
    title: 'Vídeo-Clip Musical',
    tagline: 'Alquimia visual entre ritmo, moda e vanguarda audiovisual',
    description: 'Transformamos composições musicais em universos visuais inesquecíveis. Direção artística arrojada, coreografia de luzes programadas com DMX, movimentos de câmara cinéticos e montagem sincopada para artistas que exigem relevância cultural e milhões de visualizações.',
    deliverables: [
      'Conceito Visual, Roteiro Temático e Moodboard de Moda/Figurino',
      'Coreografia de Movimento e Iluminação Rítmica Programada',
      'Efeitos Visuais Orgânicos e Digitais (VFX/CGI)',
      'Color Grading de Estilo de Época ou Futurista',
      'Versão Teaser para Redes Sociais e Formatos 4K/HDR'
    ],
    equipment: [
      'RED V-Raptor 8K VV & Atlas Orion Anamorphic Primes',
      'Gimbal Ronin 2 integrado a coletes Ready Rig e Steadicam',
      'Iluminação Especializada DMX com Efeitos Estroboscópicos de Palco'
    ],
    deliverableLeadTime: '2 a 5 semanas'
  },
  {
    id: 'motion-design-vfx',
    number: '07',
    title: 'Motion Design & Efeitos Visuais 3D',
    tagline: 'Geometrias cinéticas, tipografia em movimento e composições tridimensionais',
    description: 'Animações gráficas sofisticadas para vinhetas de programas, identidade em movimento de marcas globais, modelagem de produto fotorrealista em 3D, simulações de fluidos e partículas, e integração perfeita de CGI em cenas de live-action.',
    deliverables: [
      'Aberturas de Programas de TV, Podcasts e Séries',
      'Identidade Visual em Movimento (Kinetic Typography & Brand Motion)',
      'Renderização de Produtos em 3D com Iluminação Fotográfica',
      'Remoção de Elementos Indesejados e Composição Digital VFX'
    ],
    equipment: [
      'Workstations de Renderização com GPUs NVIDIA RTX 4090 Dual',
      'Softwares Cinema 4D, Houdini, Octane Render e After Effects',
      'Pipelines de Cor AcesCG para Fidelidade de Pós-Produção'
    ],
    deliverableLeadTime: '1 a 3 semanas'
  },
  {
    id: 'websites-plataformas',
    number: '08',
    title: 'Websites & Experiências Digitais',
    tagline: 'Interfaces cinematográficas com interatividade fluida e alto poder de conversão',
    description: 'Desenvolvimento de ecossistemas digitais que traduzem a sofisticação da sua marca na web. Experiências imersivas com vídeo em tela cheia, tipografia editorial moderna, otimização extrema para dispositivos móveis e velocidade de carregamento instantânea.',
    deliverables: [
      'Arquitetura de Informação & Design de Interface Exclusivo (UI/UX)',
      'Desenvolvimento Front-End com Microinterações e Efeitos Cinematográficos',
      'Integração com Sistemas de Gestão de Conteúdo (CMS) e Analítica Avançada',
      'Otimização Completa de Performance e SEO para Motores de Busca'
    ],
    equipment: [
      'Stack Moderna React / Next.js / Tailwind CSS com Animações a 60 FPS',
      'Infraestrutura Global em Edge Computing com CDN de Baixa Latência'
    ],
    deliverableLeadTime: '3 a 6 semanas'
  },
  {
    id: 'marketing-digital-performance',
    number: '09',
    title: 'Marketing Digital & Gestão de Performance',
    tagline: 'Estratégias orientadas a dados que transformam atenção em faturamento real',
    description: 'Planejamento e execução de campanhas digitais de ponta a ponta. Gestão profissional de tráfego pago nas principais plataformas, funis de conversão para vendas de produtos e serviços de alto valor, marketing de conteúdo e monitoramento contínuo de métricas de retorno sobre investimento (ROI).',
    deliverables: [
      'Estratégia de Tráfego Pago (Meta Ads, Google Ads, LinkedIn Ads, TikTok Ads)',
      'Desenvolvimento de Criativos em Vídeo e Estáticos de Alta Conversão',
      'Configuração Avançada de Pixels, CAPI e Rastreamento de Conversões',
      'Relatórios Quinzenais e Mensais com Métricas de Retorno e CAC/ROAS'
    ],
    equipment: [
      'Plataformas Analíticas Google Analytics 4, Supermetrics e Looker Studio',
      'Laboratório de Testes A/B de Criativos e Copywriting Publicitário'
    ],
    deliverableLeadTime: 'Contratos mensais com otimização diária'
  },
  {
    id: 'comunicacao-estrategica',
    number: '10',
    title: 'Comunicação Estratégica & Assessoria de Imprensa',
    tagline: 'Posicionamento institucional, relações públicas e blindagem de reputação',
    description: 'Assessoria de imprensa e comunicação corporativa 360° para marcas, líderes empresariais e instituições governamentais. Relações sólidas com os principais veículos de comunicação de Angola, Portugal e lusofonia, elaboração de press releases jornalísticos, gestão de crises e media training executivo.',
    deliverables: [
      'Elaboração de Plano Estratégico de Comunicação Anual',
      'Produção e Distribuição de Press Releases para Veículos Tier 1',
      'Agendamento de Entrevistas Exclusivas em Rádio, TV e Jornais',
      'Manual de Gestão de Crise e Media Training para Porta-Vozes'
    ],
    equipment: [
      'Rede de Contatos com Editores e Jornalistas em Luanda, Lisboa e Maputo',
      'Clipping Diário e Análise de Valoração de Mídia Espontânea'
    ],
    deliverableLeadTime: 'Acompanhamento contínuo e gestão de pautas sob demanda'
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Edson Francisco Banza',
    role: 'Fundador & Diretor Criativo Executivo',
    location: 'Luanda & Lisboa',
    bio: 'Cineasta, fotógrafo e diretor criativo com mais de 12 anos de experiência em projetos cinematográficos e campanhas globais. Premiado em festivais internacionais por sua visão de iluminação e narrativa transatlântica.',
    credits: 'Diretor de "Sussurros do Kwanza", Vencedor FESPACO 2024',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Inês Albuquerque',
    role: 'Diretora de Estratégia & Atendimento',
    location: 'Lisboa, Portugal',
    bio: 'Especialista em branding de luxo e posicionamento estratégico com passagens pelas maiores agências da Península Ibérica. Conecta marcas europeias ao vibrante ecossistema criativo da África Lusófona.',
    credits: 'Liderou campanhas para mais de 30 marcas internacionais',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Mário Kalunga',
    role: 'Head of Cinematography (DOP)',
    location: 'Luanda, Angola',
    bio: 'Diretor de fotografia com assinatura única em luz natural equatorial e lentes anamórficas vintage. Membro associado da Associação de Diretores de Fotografia de Cinema.',
    credits: 'DOP em 4 longas-metragens e dezenas de comerciais de grande porte',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Rui Valente',
    role: 'Lead Colorist & Diretor Técnico',
    location: 'Lisboa & Luanda',
    bio: 'Mestre em ciência da cor e fluxos de trabalho ACES. Responsável pelo visual cinematográfico com assinatura de densidade analógica que define as obras da EFB Mídia.',
    credits: 'Mais de 60 filmes colorizados com exibição em salas de cinema',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
  }
];

export const AGENCY_STATS = [
  { value: '42+', label: 'Prêmios Internacionais', detail: 'Festivais de Cinema & Publicidade' },
  { value: '180+', label: 'Produções Realizadas', detail: 'Comerciais, Filmes e Séries' },
  { value: '14', label: 'Países de Filmagem', detail: 'África, Europa e Américas' },
  { value: '02', label: 'Hubs Operacionais', detail: 'Estúdios em Luanda & Lisboa' },
];
