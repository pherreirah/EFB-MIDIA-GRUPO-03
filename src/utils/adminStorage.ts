import { Project } from '../types';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/portfolioData';

export interface AdminMediaConfig {
  // Hero Video Config
  heroVideoUrl: string;
  heroVideoName: string;
  heroVideoSourceType: 'upload' | 'url' | 'preset';
  heroVideoBrightness: number; // 1.0
  heroVideoContrast: number;   // 1.0
  heroVideoOpacity: number;    // 1.0
  heroVideoAutoplayMuted: boolean;

  // Hero Image / Poster
  heroPosterUrl: string;

  // Hero Copy
  heroBadgeText: string;
  heroHeadline: string;
  heroSubtitle: string;

  // Logo Config
  customLogoUrl: string; // If empty, uses official vector EFB emblem
  logoScale: number; // 0.8 to 1.5

  // Accent Colors
  primaryGoldColor: string; // default #D4AF37

  // Projects customization (overrides by project id)
  projectCoverOverrides: Record<string, string>;

  // Custom added projects list
  customProjects: Project[];

  // Last saved timestamp
  lastUpdated: string;
}

export const CINE_VIDEO_PRESETS = [
  {
    id: 'master-8k',
    name: 'Red Cinema // Master Reel 1080p (Alta Nitidez)',
    url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',
    tag: 'CINEMA 1080P MASTER',
    description: 'Imagens épicas de cinema de altíssima nitidez e som estéreo imersivo.',
  },
  {
    id: 'ocean-cooke',
    name: 'Oceans Nature // 35mm Cooke Prime',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop',
    tag: 'PRIME 35MM',
    description: 'Tomadas aquáticas monumentais com gradação de cor suave e profundidade oceânica.',
  },
  {
    id: 'sintel-cinematic',
    name: 'Filme Narrativo // Iluminação de Estúdio',
    url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop',
    tag: 'STUDIO CINEMA',
    description: 'Contraste acentuado de claro-escuro com iluminação volumétrica e drama visual.',
  },
];

// Default configuration with EMPTY video slot for instant loading & super lightweight GitHub migration
export const DEFAULT_ADMIN_CONFIG: AdminMediaConfig = {
  heroVideoUrl: '', // Deixado vago propositadamente para o repositório ficar ultra-leve e rápido
  heroVideoName: 'Local Vago (Pronto para Anexar)',
  heroVideoSourceType: 'upload',
  heroVideoBrightness: 1.0,
  heroVideoContrast: 1.0,
  heroVideoOpacity: 1.0,
  heroVideoAutoplayMuted: false,

  heroPosterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop',

  heroBadgeText: 'Luanda • Lisboa • Produções Globais',
  heroHeadline: 'ALÉM DO OLHAR',
  heroSubtitle: 'Agência de Publicidade e Produtora Audiovisual de Alta Gama. Narrativas visuais cinematográficas que desafiam a percepção e eternizam marcas com profundidade, luz e verdade emocional.',

  customLogoUrl: '',
  logoScale: 1.0,
  primaryGoldColor: '#D4AF37',

  projectCoverOverrides: {},
  customProjects: DEFAULT_PROJECTS,

  lastUpdated: new Date().toISOString(),
};

const STORAGE_KEY = 'efb_midia_admin_config_v5_ultralight';
const DB_NAME = 'efb_media_db';
const STORE_NAME = 'video_blobs';

// IndexedDB Helper to persist user-uploaded video files across sessions without 5MB localStorage quota limit
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveUploadedVideoBlob(blob: Blob, key = 'hero_video'): Promise<string> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, key);
      req.onsuccess = () => {
        const objectUrl = URL.createObjectURL(blob);
        resolve(objectUrl);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not save video to IndexedDB, using temporary ObjectURL:', err);
    return URL.createObjectURL(blob);
  }
}

export async function loadUploadedVideoBlob(key = 'hero_video'): Promise<string | null> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result instanceof Blob) {
          resolve(URL.createObjectURL(req.result));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function clearUploadedVideoBlob(key = 'hero_video'): Promise<void> {
  try {
    const db = await openDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch {
    // ignore
  }
}

export function loadAdminConfig(): AdminMediaConfig {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_ADMIN_CONFIG;
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_ADMIN_CONFIG,
      ...parsed,
      heroVideoBrightness: 1.0,
      heroVideoContrast: 1.0,
      heroVideoOpacity: 1.0,
      projectCoverOverrides: {
        ...DEFAULT_ADMIN_CONFIG.projectCoverOverrides,
        ...(parsed.projectCoverOverrides || {}),
      },
    };
  } catch (err) {
    console.error('Failed to parse admin config from localStorage', err);
    return DEFAULT_ADMIN_CONFIG;
  }
}

export function saveAdminConfig(config: AdminMediaConfig): void {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      ...config,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save admin config to localStorage', err);
  }
}

export const saveAdminMediaConfig = saveAdminConfig;

export async function loadAdminMediaConfig(): Promise<AdminMediaConfig> {
  const syncConfig = loadAdminConfig();
  if (syncConfig.heroVideoSourceType === 'upload' && syncConfig.heroVideoUrl.startsWith('blob:')) {
    const blobUrl = await loadUploadedVideoBlob('hero_video');
    if (blobUrl) {
      return {
        ...syncConfig,
        heroVideoUrl: blobUrl,
      };
    }
  }
  return syncConfig;
}

export function resetAdminConfig(): AdminMediaConfig {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_CONFIG;
  try {
    localStorage.removeItem(STORAGE_KEY);
    clearUploadedVideoBlob();
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_ADMIN_CONFIG;
}
