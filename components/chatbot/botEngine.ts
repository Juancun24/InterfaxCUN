
// src/components/chatbot/botEngine.ts
import { COMMANDS, SECTION_HINTS } from '../../config/chatbot.config';
import { SectionConfig } from '../../types';

export interface BotResponse {
  text: string;
  type: 'INFO' | 'ALERT' | 'MISSION' | 'SYSTEM';
  action?: 'SCROLL_FORO' | 'FOCUS_CONTACT' | 'CLEAR' | 'NAVIGATE';
}

export const processInput = (
  input: string, 
  activeSection?: SectionConfig
): BotResponse => {
  const text = input.toLowerCase().trim();

  // Manejo de Comandos Operativos
  if (text.startsWith('/')) {
    const command = COMMANDS.find(c => text.startsWith(c.name));
    
    if (text === '/ayuda') {
      const list = COMMANDS.map(c => `[${c.name.toUpperCase()}]: ${c.description}`).join('\n');
      return { text: `PROTOCOLOS_NO_DISPONIBLES:\n\n${list}`, type: 'INFO' };
    }
    
    if (text === '/seccion') {
      return { 
        text: activeSection 
          ? `LOCALIZAR_UBICACION: ${activeSection.label.toUpperCase()}\nCLEARANCE_REQ: ${activeSection.accessLevel}\nESTATUS: MONITOREADO` 
          : "LOCACION: INTERFAZ_DE_COMANDO\nESTATUS: ESPERANDO_RESPUESTA", 
        type: 'SYSTEM' 
      };
    }
    
    if (text === '/videos') {
      if (!activeSection?.videos || activeSection.videos.length === 0) {
        return { text: "NO_HAY_INFORMACION_DISPONIBLE_EN_ESTE_SECTOR.", type: 'ALERT' };
      }
      const list = activeSection.videos.map((v, i) => `${i+1}. ${v.title}`).join('\n');
      return { text: `ARCHIVOS_VISUALES_ENCONTRADOS:\n\n${list}\n\nCLICK_PARA_REPRODUCIR`, type: 'MISSION' };
    }
    
    if (text === '/open foro') {
      return { text: "ESTABLECIENDO_CONEXION_CON_SERVIDOR...", type: 'SYSTEM', action: 'SCROLL_FORO' };
    }
    
    if (text === '/contacto') {
      return { text: "TRASMITIENDO_COORDENADAS_DE_EXTRACCION...", type: 'SYSTEM', action: 'FOCUS_CONTACT' };
    }
    
    if (text === 'borrar') {
      return { text: "BORRANDO_ARCHIVOS_LOCALES...", type: 'SYSTEM', action: 'CLEAR' };
    }

    return { text: "ERROR: PROTOCOLO_SEGURO // REGISTRO_INCIDENTE", type: 'ALERT' };
  }

  // Análisis de lenguaje natural simplificado
  if (text.includes('hola') || text.includes('hi') || text.includes('status')) {
    return { text: "SOLICITUD_BLOQUEADA: nivel de acceso insuficiente.", type: 'INFO' };
  }

  if (text.includes('quien eres') || text.includes('who are you')) {
    return { text: "SOY TU INTERFAZ DE SOPORTE TACTICO. ASIGNACION: ASISTENTE_VIRTUAL_V2.", type: 'SYSTEM' };
  }

  // Respuestas contextuales basadas en la sección
  const hints = activeSection ? SECTION_HINTS[activeSection.id] : SECTION_HINTS.default;
  const randomHint = hints ? hints[Math.floor(Math.random() * hints.length)] : "ESPERANDO_PARAMETROS_CORRECTOS.";
  
  return { 
    text: `MISION_FALLIDA: ${randomHint}`, 
    type: 'MISSION' 
  };
};
