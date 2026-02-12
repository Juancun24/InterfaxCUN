// utils/videoHelpers.ts

/**
 * Detecta el tipo de video basado en la URL
 */
export function detectVideoType(url: string): 'direct' | 'youtube' | 'vimeo' {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'direct';
}

/**
 * Extrae el ID de un video de YouTube
 * Soporta múltiples formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /youtube\.com\/watch\?.*v=([^&]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Extrae el ID de un video de Vimeo
 * Soporta:
 * - https://vimeo.com/VIDEO_ID
 * - https://player.vimeo.com/video/VIDEO_ID
 */
export function extractVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Obtiene la URL del embed según el tipo de video
 */
export function getEmbedUrl(url: string, type?: 'direct' | 'youtube' | 'vimeo'): string {
  const videoType = type || detectVideoType(url);
  
  switch (videoType) {
    case 'youtube': {
      const videoId = extractYouTubeId(url);
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
    }
    
    case 'vimeo': {
      const videoId = extractVimeoId(url);
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : url;
    }
    
    case 'direct':
    default:
      return url;
  }
}

/**
 * Obtiene el thumbnail automático de YouTube o Vimeo
 * Si no puede obtenerlo, devuelve el thumbnail proporcionado
 */
export function getAutoThumbnail(url: string, fallbackThumbnail: string): string {
  const videoType = detectVideoType(url);
  
  if (videoType === 'youtube') {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      // YouTube tiene varios tamaños de thumbnail:
      // maxresdefault.jpg (1280x720) - mejor calidad pero no siempre existe
      // hqdefault.jpg (480x360) - alta calidad, siempre existe
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  
  // Vimeo requiere API para obtener thumbnail, usar fallback
  return fallbackThumbnail;
}