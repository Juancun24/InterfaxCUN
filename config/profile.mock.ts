
// EDIT HERE: Main profile user data
export const profileUser = {
  name: "Alexander 'Cipher' Vance",
  role: "ADMIN / SENIOR OPERATOR",
  status: "ACTIVO", // ACTIVO, SUSPENDIDO, PENDIENTE
  accessLevel: 5,
  lastLogin: "2025-05-20 14:32:01 UTC",
  avatar: "https://picsum.photos/seed/cipher/300/300",
  email: "a.vance@agency.intl",
  phone: "+1 (555) 000-8921"
};

// EDIT HERE: Mission performance stats
export const profileStats = [
  { label: "Sessions Completed", value: 842, target: 1000, color: "#9B6BFF" },
  { label: "Evaluations Submitted", value: 156, target: 200, color: "#9B6BFF" },
  { label: "Forum Messages", value: 2431, target: 3000, color: "#9B6BFF" },
  { label: "Modules Mastered", value: 7, target: 7, color: "#2BFF88" }
];

// EDIT HERE: Security configuration
export const securityState = {
  twoFactor: true,
  maskedEmail: "ciph*******@agency.intl",
  devices: [
    { name: "Terminal_V3 (Main)", type: "PC", location: "DC_Sector_4" },
    { name: "Mobile_Unit_X", type: "Smartphone", location: "Dynamic_GPS" }
  ],
  lastPasswordUpdate: "2024-12-01"
};

// EDIT HERE: UI Activity events
export const activityEvents = [
  { id: '1', type: 'SECURITY', label: 'LOGEADO_CON_EXITO', detail: 'IP: 192.168.1.104', time: '2 mins ago' },
  { id: '2', type: 'NAVIGATION', label: 'ACCESO_A_SECCION', detail: 'Notebook (Field Log)', time: '45 mins ago' },
  { id: '3', type: 'FORO', label: 'MENSAJE_ENVIADO', detail: 'Channel: #Cdigital', time: '2 hours ago' },
  { id: '4', type: 'SYSTEM', label: 'VIDEO_REPRODUCIDO', detail: 'Surveillance_Clip_#3', time: '1 day ago' },
  { id: '5', type: 'SECURITY', label: 'KEY_ROTATION', detail: 'AES_256_AUTO', time: '3 days ago' }
];

// EDIT HERE: Skill and role badges
export const badges = [
  { label: "ADMINISTRATIVO", color: "#9B6BFF" },
  { label: "ELITE", color: "#2BFF88" },
  { label: "HACKER", color: "#FF9F1C" },
  { label: "MODERADOR", color: "#00E5FF" }
];
