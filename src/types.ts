export type ProjectCategory = 
  | 'all' 
  | 'cinema' 
  | 'publicidade' 
  | 'fashion' 
  | 'music_video' 
  | 'brand_film';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  client: string;
  location: string;
  duration: string;
  director: string;
  dop: string; // Diretor de Fotografia
  aspectRatio: string;
  camera: string;
  lenses: string;
  colorGrading: string;
  awards?: string[];
  synopsis: string;
  coverImage: string;
  stillFrames: string[];
  featured?: boolean;
  videoTeaserUrl?: string;
  tagline: string;
}

export interface CinemaWork {
  id: string;
  title: string;
  originalTitle?: string;
  category: string;
  year: string;
  runtime: string;
  festivals: string[];
  director: string;
  producer: string;
  dop: string;
  logline: string;
  synopsis: string;
  posterImage: string;
  backdropImage: string;
  technicalSpecs: {
    captureFormat: string;
    aspectRatio: string;
    colorSpace: string;
    soundMix: string;
    subtitles: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  equipment: string[];
  deliverableLeadTime: string;
}

export interface TeamMember {
  name: string;
  role: string;
  location: string;
  bio: string;
  credits: string;
  image: string;
}

export type LensFocalLength = '24mm' | '35mm' | '50mm' | '85mm';

export interface LensSetting {
  focal: LensFocalLength;
  label: string;
  aperture: string;
  dofLabel: string;
  angle: string;
  blurStrength: number;
}
