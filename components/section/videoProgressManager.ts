const STORAGE_KEY = 'interfax_video_progress';

export type VideoProgressState = 'pending' | 'in_progress' | 'completed';

export interface VideoProgress {
  videoId: string;
  state: VideoProgressState;
  timestamp: number;
  duration?: number;
  lastPosition?: number; // Posición exacta en segundos
}

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
 * Obtener el estado de un video (pendiente por defecto)
 */
export function getVideoState(videoId: string): VideoProgressState {
  const progress = getVideoProgress(videoId);
  return progress?.state || 'pending';
}

/**
 * Marcar video como iniciado (en progreso)
 */
export function markVideoAsStarted(videoId: string, duration?: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    
    // Solo marcar si está pendiente (no sobrescribir completed)
    const current = allProgress[videoId];
    if (!current || current.state === 'pending') {
      allProgress[videoId] = {
        videoId,
        state: 'in_progress',
        timestamp: Date.now(),
        duration,
        lastPosition: 0
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
      console.log('📝 Video marcado como iniciado:', videoId);
      
      // Disparar evento para actualizar UI
      window.dispatchEvent(new CustomEvent('video-progress-update', { 
        detail: { videoId, state: 'in_progress' } 
      }));
    }
  } catch (error) {
    console.error('Error marking video as started:', error);
  }
}

/**
 * Guardar posición exacta del video
 */
export function saveVideoPosition(
  videoId: string, 
  currentTime: number, 
  duration: number
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    const currentProgress = (currentTime / duration) * 100;
    
    // Determinar estado según progreso
    let state: VideoProgressState = 'pending';
    if (currentProgress >= 90) {
      state = 'completed';
    } else if (currentProgress > 1) {
      state = 'in_progress';
    }
    
    allProgress[videoId] = {
      videoId,
      state,
      timestamp: Date.now(),
      duration,
      lastPosition: currentTime
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    
    // Disparar evento para actualizar UI
    window.dispatchEvent(new CustomEvent('video-progress-update', { 
      detail: { videoId, state, progress: currentProgress } 
    }));
  } catch (error) {
    console.error('Error saving video position:', error);
  }
}

/**
 * Marcar video como completado
 */
export function markVideoAsCompleted(videoId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    const current = allProgress[videoId];
    
    allProgress[videoId] = {
      videoId,
      state: 'completed',
      timestamp: Date.now(),
      duration: current?.duration,
      lastPosition: current?.duration || 0
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    console.log('✅ Video marcado como completado:', videoId);
    
    // Disparar evento para actualizar UI
    window.dispatchEvent(new CustomEvent('video-progress-update', { 
      detail: { videoId, state: 'completed' } 
    }));
  } catch (error) {
    console.error('Error marking video as completed:', error);
  }
}

/**
 * Resetear progreso de un video a pendiente
 */
export function resetVideoProgress(videoId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    delete allProgress[videoId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    console.log('🔄 Progreso reseteado:', videoId);
    
    // Disparar evento para actualizar UI
    window.dispatchEvent(new CustomEvent('video-progress-update', { 
      detail: { videoId, state: 'pending' } 
    }));
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
    console.log('🔄 Todos los progresos reseteados');
    
    // Disparar evento para actualizar UI
    window.dispatchEvent(new CustomEvent('video-progress-update', { 
      detail: { videoId: 'all', state: 'pending' } 
    }));
  } catch (error) {
    console.error('Error resetting all progress:', error);
  }
}

/**
 * Obtener estadísticas de progreso
 */
export function getProgressStats(videoIds: string[]): {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  percentageComplete: number;
} {
  const allProgress = getAllProgress();
  
  let pending = 0;
  let inProgress = 0;
  let completed = 0;
  
  videoIds.forEach(videoId => {
    const progress = allProgress[videoId];
    const state = progress?.state || 'pending';
    
    switch (state) {
      case 'pending':
        pending++;
        break;
      case 'in_progress':
        inProgress++;
        break;
      case 'completed':
        completed++;
        break;
    }
  });
  
  return {
    total: videoIds.length,
    pending,
    inProgress,
    completed,
    percentageComplete: videoIds.length > 0 
      ? Math.round((completed / videoIds.length) * 100) 
      : 0
  };
}
// BACKWARD COMPATIBILITY: Mantener funciones antiguas para no romper código existente
export function saveVideoProgress(videoId: string, progress: number, duration?: number): void {
  // Convertir progreso numérico a estados
  if (progress >= 90) {
    markVideoAsCompleted(videoId);
  } else if (progress > 0) {
    markVideoAsStarted(videoId, duration);
  }
}