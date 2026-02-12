
export interface VideoData {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  type?: 'direct' | 'youtube' | 'vimeo'; // NUEVO: Tipo de video
  description?: string; // Opcional
}

export interface SectionConfig {
  id: string;
  label: string;
  accentColor: string;
  path: string;
  description: string;
  accessLevel: string;
  videos: VideoData[];
  headerVideoUrl?: string;
  iconSvg: string; // Modular SVG path for easy editing
}

export interface ForumMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}
