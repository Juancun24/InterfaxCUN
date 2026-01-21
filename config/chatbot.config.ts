
// src/config/chatbot.config.ts

export const BOT_CONFIG = {
  name: "OPS_ASSISTANT",
  defaultGreeting: "SECURE CHANNEL ESTABLISHED. STATUS: OPERATIONAL.",
  maxHistory: 50,
  typingDelay: { min: 400, max: 900 },
  accentColor: "#1FB6FF", // Default neon blue
};

export const COMMANDS = [
  { name: "/help", description: "Display available commands", key: "HELP" },
  { name: "/section", description: "Query current operational sector", key: "SECTION_INFO" },
  { name: "/videos", description: "List available visual intel", key: "LIST_VIDEOS" },
  { name: "/open foro", description: "Direct access to secure comms", key: "OPEN_FORUM" },
  { name: "/contact", description: "Focus on extraction protocols", key: "FOCUS_CONTACT" },
  { name: "/clear", description: "Purge local message archive", key: "CLEAR_LOG" },
];

export const SECTION_HINTS: Record<string, string[]> = {
  cdigital: ["Cyber-warfare tactics active.", "Intel phase analysis recommended."],
  notebook: ["Field logs synchronized.", "Check reconnaissance records."],
  gemini: ["Neural link operational.", "AI support awaiting query."],
  perfil: ["Identity dossier loaded.", "Security parameters stable."],
  cun: ["Unified network core stable.", "Traffic flow monitored."],
  default: ["NIVEL DE ACCESO INSUFICIENTE..", "REINTENTA EN LA PROXIMA VENTANA DE SINCRONIZACIÓN."]
};
