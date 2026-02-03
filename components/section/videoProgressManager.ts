// utils/videoProgressManager.ts

export interface VideoProgress {
  videoId: string;
  progress: number; // 0-100
  timestamp: number; // Última actualización
  completed: boolean;
  duration?: number; // Duración total del video
}

const STORAGE_KEY = 'interfax_video_progress';

/**
 * Obtener todos los progresos guardados
 */
export function getAllProgress(): Record<string, VideoProgress> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading video progress:', error);
    return {};
  }
}

/**
 * Obtener progreso de un video específico
 */
export function getVideoProgress(videoId: string): VideoProgress | null {
  const allProgress = getAllProgress();
  return allProgress[videoId] || null;
}

/**
 * Guardar progreso de un video
 */
export function saveVideoProgress(
  videoId: string,
  progress: number,
  duration?: number,
  forceCompleted?: boolean
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    const completed = forceCompleted || progress >= 95; // 95% o más = completado
    
    allProgress[videoId] = {
      videoId,
      progress: Math.min(100, Math.max(0, progress)),
      timestamp: Date.now(),
      completed,
      duration
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error saving video progress:', error);
  }
}

/**
 * Marcar video como completado
 */
export function markVideoAsCompleted(videoId: string): void {
  saveVideoProgress(videoId, 100, undefined, true);
}

/**
 * Resetear progreso de un video
 */
export function resetVideoProgress(videoId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    delete allProgress[videoId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error resetting video progress:', error);
  }
}

/**
 * Resetear todos los progresos
 */
export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting all progress:', error);
  }
}

/**
 * Obtener estadísticas de progreso
 */
export function getProgressStats(videoIds: string[]): {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percentageComplete: number;
} {
  const allProgress = getAllProgress();
  
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  
  videoIds.forEach(videoId => {
    const progress = allProgress[videoId];
    
    if (!progress || progress.progress === 0) {
      notStarted++;
    } else if (progress.completed) {
      completed++;
    } else {
      inProgress++;
    }
  });
  
  return {
    total: videoIds.length,
    completed,
    inProgress,
    notStarted,
    percentageComplete: videoIds.length > 0 
      ? Math.round((completed / videoIds.length) * 100) 
      : 0
  };
}
