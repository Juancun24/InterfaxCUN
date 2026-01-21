import { SectionConfig } from '../types';

// EDIT HERE: The video that plays as a transition before any archive video
export const TRANSITION_VIDEO_URL = '/assets/vid intro foki.mp4'; 

// EDIT HERE: Main sections. You can change the "iconPath" to any SVG 'd' attribute.
export const SECTIONS: SectionConfig[] = [
{
  id: "cdigital",
  label: "Cdigital",
  accentColor: "#2BFF88",
  path: "cdigital",
  description: "División de Inteligencia Digital.",
  accessLevel: "ACTIVO",
  headerVideoUrl: 'assets/VIDEO2.mp4',

  // ✅ SVG completo con width/height ajustados para el sidebar
 iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 94.42 94.42">
    <g>
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
        d="M47.21,93.42C21.73,93.42,1,72.69,1,47.21S21.73,1,47.21,1s46.21,20.73,46.21,46.21-20.73,46.21-46.21,46.21ZM47.21,1.5C22.01,1.5,1.5,22.01,1.5,47.21s20.51,45.71,45.71,45.71,45.71-20.51,45.71-45.71S72.42,1.5,47.21,1.5Z"/>

      <path fill="currentColor"
        d="M47.21,4.08C23.43,4.08,4.08,23.43,4.08,47.21s19.35,43.13,43.13,43.13,43.13-19.35,43.13-43.13S70.99,4.08,47.21,4.08ZM20.77,25.6c11.13-13.49,30.75-16.4,45.23-6.57.64.44.83,1.3.65,1.9-.16.52-1.27,1.57-2.08,1.01-13.15-9.05-30.81-6.66-41.1,5.46-.52.61-1.38.72-2.11.37-.55-.27-1.11-1.54-.59-2.17ZM17.94,64.58c-.64-.58-.69-1.56-.1-2.31,5.26-6.73,2.12-11.57,5.03-11.7.89-.04,1.75.6,1.74,1.6-.03,4.44-1.5,8.64-4.3,12.18-.68.87-1.74.82-2.38.23ZM44.65,70.99c-1.37,2.9-3.04,5.55-5.02,8.19-.62.83-1.53,1-2.24.62-.69-.37-1.17-1.46-.61-2.21,1.88-2.53,3.56-5.08,4.93-7.95.41-.85,1.37-1.16,2.06-.87.89.37,1.3,1.32.88,2.22ZM85.62,48.31h-4.49c-.02.52-.05,1.03-.1,1.55-.09.96-1.02,1.48-1.67,1.45-1.52-.07-1.55-1.13-1.5-2.99h-4.79c.52,8-.67,16.02-2.94,23.73-.27.91-1.33,1.15-2,.98-.7-.18-1.34-.98-1.08-1.89,2.13-7.42,3.31-15.05,2.77-22.81h-4.9c.02.1.04.21.05.32.56,10.41-1.55,20.63-6.17,30.04-.45.92-1.45,1.06-2.07.8-.79-.33-1.28-1.3-.84-2.19,4.37-8.93,6.41-18.68,5.85-28.63,0-.12,0-.23.02-.34h-4.88c.75,11.4-2.08,22.63-8.33,32.22-.48.73-1.48.81-2.06.51-.83-.44-1.16-1.45-.61-2.31,5.78-9.04,8.57-19.58,7.72-30.42h-4.85c.4,4.65.07,9.25-1.01,13.82-.21.9-1.11,1.36-1.88,1.22-.87-.16-1.48-1.03-1.25-2.01.99-4.31,1.28-8.62.89-13.02h-4.91s0,.03,0,.04c1.13,10.15-2.25,20.21-9,27.78-.64.71-1.68.59-2.18.16-.76-.64-.83-1.64-.14-2.42,6.12-6.94,9.17-16.08,8.1-25.33,0-.08,0-.15-.02-.23h-4.77c.81,8.56-1.62,16.7-7.49,22.86-.58.61-1.63.52-2.21-.02-.58-.54-.7-1.6-.07-2.27,5.19-5.54,7.25-12.76,6.53-20.24-.01-.11,0-.22-.02-.33h-12.99c.07,1.75.27,3.51.64,5.27.21,1.01-.31,1.81-1,2.02-.91.28-1.91-.14-2.13-1.15-.44-2.03-.67-4.08-.75-6.14h-4.31c-.53,0-.96-.43-.96-.96v-.53c0-.53.43-.96.96-.96h4.31c.15-4.22,1.06-8.39,2.76-12.31.41-.95,1.19-1.36,2.08-1.11.78.22,1.41,1.17,1.01,2.1-1.58,3.6-2.45,7.42-2.61,11.32h12.97c.46-7.38,5.58-13.6,12.63-15.71,8.18-2.45,16.97,1.27,20.85,8.94.4.79-.04,1.76-.66,2.1-.59.33-1.74.27-2.14-.51-3.16-6.24-10.15-9.39-16.89-7.49-5.73,1.62-10.08,6.56-10.54,12.66h4.85c.64-4.3,3.98-7.75,8.43-8.28,5.31-.62,9.94,3.01,10.79,8.28h12.96c-.09-.8-.2-1.61-.33-2.42-1.17-7.14-5.59-13.05-11.86-16.34-6.6-3.46-14.25-3.46-21.15.17-5.73,3.02-10.34,8.9-11.51,15.88-.17,1.04-.92,1.68-1.91,1.54-1.03-.15-1.47-1.07-1.29-2.13,1.36-7.92,6.55-14.61,13.07-18.09,7.9-4.21,16.79-4.21,24.37-.2,7.12,3.77,12.1,10.5,13.45,18.49.17,1.03.31,2.06.42,3.1h5.02c-.03-.74-.09-1.55-.24-2.43-.99-5.9-3.38-11.4-7.15-16.01-.68-.83-.78-1.73.03-2.45.63-.55,1.71-.56,2.39.27,4.57,5.6,7.81,13.09,8.18,20.62h4.52c.53,0,.96.43.96.96v.53c0,.53-.43.96-.96.96Z"/>

      <path fill="currentColor"
        d="M46.22,40.8c-2.93.38-4.91,2.43-5.49,5.05h5.43c.19-.12.4-.21.62-.24.4-.05.78.04,1.1.24h5.45c-.7-3.45-3.98-5.46-7.11-5.05Z"/>
    </g>
  </svg>`,
  
  videos: [
    {
      id: 'cdigital-1',
      title: 'Aula en orden ',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/pjxksbx9/foca-cd-digital.jpg',
    },
    {
      id: 'cdigital-2',
      title: 'Grupos Encubiertos',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/pjxksbx9/foca-cd-digital.jpg',
    },
    {
      id: 'cdigital-3',
      title: 'Libro calificador',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/pjxksbx9/foca-cd-digital.jpg',
    },
    {
      id: 'cdigital-4',
      title: 'Réplica estratégica',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/pjxksbx9/foca-cd-digital.jpg',
    },
    {
      id: 'cdigital-5',
      title: 'Extracción de datos',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/pjxksbx9/foca-cd-digital.jpg',
    }
  ],
},
  {
    id: 'notebook',
    label: 'Notebook',
    accentColor: '#FF9F1C',
    path: 'notebook',
    description: 'Registros de reconocimiento táctico.',
    accessLevel: 'ENCRIPTADO',
    headerVideoUrl: 'assets/VIDEO2.mp4',
    // REEMPLAZA AQUÍ: SVG completo para Notebook (viewBox + 3 paths)
 iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 84.47 84.47">
    <g>
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
        d="M57,30.15h-30.39c-.57,0-1.04.47-1.04,1.04v30.84c0,.57.47,1.04,1.04,1.04h30.16l-1.45-1.79c-.31-.38-.29-.93-.1-1.29.19-.36.63-.66,1.1-.67h1.72v-28.14c0-.57-.47-1.04-1.04-1.04ZM28.59,61.61c-.73,0-1.16-.48-1.16-1.11v-27.51c0-.61.2-1.08.93-1.21.5-.08,1.34.22,1.34.86v27.9c.01.66-.59,1.06-1.12,1.06Z"/>

      <path fill="currentColor"
        d="M23.17,23.84l35.53.02c.3,0,.47-.12.67-.03.02-.06-.04-.2,0-.25-1.27-1.83-1.29-4.53,0-6.35-.02-.06-.02-.17-.02-.24l-36.18-.04c-1.18,0-2.1.29-2.74,1.29-1,1.55-.83,3.68.59,4.95.57.51,1.32.66,2.15.66Z"/>
      <path fill="currentColor"
    d="M42.23,0C18.95,0,0,18.95,0,42.23s18.95,42.23,42.23,42.23,42.23-18.95,42.23-42.23S65.52,0,42.23,0ZM56.13,70.85c-.34.33-.82.41-1.42.41h-31.53c-.86,0-1.63-.11-2.4-.33-1.7-.49-3.29-2.74-3.29-3.82l-.04-46.53c0-.97.14-1.87.42-2.58,1.07-2.73,3.31-3.42,5.96-3.41l39.11.08c.73,0,1.35-.27,1.95-.03.65.26.97.85.84,1.45-.41,1.87-2.99.11-4.21,2.05-.75,1.2-1.03,2.58-.36,3.8.34.61.64,1.25,1.3,1.51,1.89.76,2.3-.11,3.09.72.59.63-.11,1.59-.48,2.26l-.05,18.5c-.02.5-.85.71-1.19.67-.36-.04-1.08-.21-1.08-.77l-.07-17.92c0-.25-.16-.56-.29-.68-.15-.13-.44-.1-.75-.1H22.91c-.75-.01-1.42-.05-2.12-.28-.35-.11-.54-.59-.98-.36l.02,39.51c0,1.43.12,2.83,1.46,3.48.62.3,1.28.34,2.02.34l30.35.02c.52,0,2.55-.29,2.77.68.12.52.02,1.03-.3,1.34ZM65.11,70.38c-.36.44-.57.73-1.02.76-.46.03-.88-.08-1.19-.46l-2.31-2.87-2.64-3.26H25.26c-.62,0-1.14-.51-1.14-1.14V29.83c0-.62.51-1.14,1.14-1.14h33.09c.62,0,1.14.51,1.14,1.14v20c.18-.1.38-.18.61-.17l7.51.02c.83,0,1.34.62,1.34,1.43l.03,8.19,2.61.08c.46.01.86.36.98.65.21.49.11,1-.21,1.4l-7.25,8.97Z"/    </g>
  </svg>`,
 videos: [
    {
      id: 'notebook-1',
      title: 'Operación Biblioteca Viva',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/0zy23P9/focanodbook.jpg',
    },
    {
      id: 'notebook-2',
      title: 'Operación Ingesta de Fuentes',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/0zy23P9/focanodbook.jpg',
    },
    {
      id: 'notebook-3',
      title: 'Operación Resumen Controlado',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/0zy23P9/focanodbook.jpg',
    },
    {
      id: 'notebook-4',
      title: 'Operación Preguntas Guiadas',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/0zy23P9/focanodbook.jpg',
    },
    {
      id: 'notebook-5',
      title: 'Operación Dossier Consolidado',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/0zy23P9/focanodbook.jpg',
    }
  ],
  },
  {
    id: 'gemini',
    label: 'Gemini',
    accentColor: '#FF4D9D',
    path: 'gemini',
    description: 'Soporte de redes neuronales e IA.',
    accessLevel: 'RESTRINGIDO',
    headerVideoUrl: 'assets/VIDEO2.mp4',
    // REEMPLAZA AQUÍ: SVG completo para Gemini (viewBox + 3 paths)
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 94.42 94.42">
    <g>
      <path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M47.21,93.42C21.73,93.42,1,72.69,1,47.21S21.73,1,47.21,1s46.21,20.73,46.21,46.21-20.73,46.21-46.21,46.21ZM47.21,1.5C22.01,1.5,1.5,22.01,1.5,47.21s20.51,45.71,45.71,45.71,45.71-20.51,45.71-45.71S72.42,1.5,47.21,1.5Z"/>
      <g>
        <path fill="currentColor" d="M63.05,62.47c-.36.92-1.08,1.63-1.99,1.99.92.37,1.62,1.07,1.99,1.99.36-.91,1.08-1.63,1.99-1.99-.92-.37-1.63-1.07-1.99-1.99Z"/>
        <path fill="currentColor" d="M29.58,34.53c.46-1.16,1.36-2.06,2.52-2.52-1.16-.46-2.06-1.36-2.52-2.52-.46,1.16-1.37,2.06-2.52,2.52,1.17.47,2.06,1.36,2.52,2.53Z"/>
        <path fill="currentColor" d="M47.5,36.22c-2.31,5.83-6.87,10.37-12.68,12.67,5.86,2.34,10.34,6.84,12.67,12.69,2.31-5.82,6.84-10.36,12.69-12.68-5.84-2.32-10.35-6.83-12.68-12.68Z"/>
        <path fill="currentColor" d="M47.05,5.4C24.25,5.4,5.7,23.95,5.7,46.75s18.55,41.35,41.35,41.35,41.35-18.55,41.35-41.35S69.85,5.4,47.05,5.4ZM22.41,32.03c-.01-.32.24-.57.56-.57.24,0,.47-.02.69-.04,3.05-.33,5.36-2.91,5.35-5.98,0-.31.23-.57.55-.58.32,0,.56.26.56.57,0,3.34,2.7,6.04,6.03,6.02.3,0,.57.23.57.55,0,.33-.26.56-.58.56-2.64,0-4.98,1.71-5.76,4.23-.18.58-.27,1.18-.27,1.8,0,.32-.23.57-.55.58-.32,0-.56-.25-.56-.58,0-2.31-1.3-4.41-3.37-5.42-.82-.4-1.72-.61-2.64-.61-.32,0-.58-.22-.59-.53ZM68.07,64.89c-2.02,0-3.8,1.31-4.4,3.23-.14.44-.2.9-.21,1.38,0,.25-.18.44-.42.44-.24,0-.43-.19-.43-.45,0-1.76-1-3.37-2.58-4.14-.63-.31-1.31-.46-2.02-.46-.25,0-.44-.17-.45-.41,0-.24.18-.44.43-.44.18,0,.36-.01.53-.03,2.33-.25,4.1-2.22,4.09-4.57,0-.24.18-.44.42-.44.25,0,.43.2.43.44,0,2.55,2.06,4.61,4.61,4.6.23,0,.43.18.44.42,0,.25-.2.43-.44.43ZM68.5,50.67c-8.42-.02-15.89,5.45-18.38,13.5-.57,1.85-.85,3.77-.86,5.75,0,1.03-.74,1.84-1.75,1.85-1.01.01-1.8-.81-1.79-1.86.01-7.36-4.17-14.07-10.77-17.3-2.62-1.28-5.49-1.94-8.44-1.94-1.03,0-1.85-.7-1.89-1.71-.04-1.02.77-1.82,1.8-1.83.77,0,1.5-.05,2.21-.13,9.73-1.05,17.12-9.3,17.08-19.09,0-.99.74-1.83,1.75-1.85,1.04-.01,1.8.84,1.8,1.83-.02,10.66,8.61,19.28,19.27,19.22.97,0,1.81.74,1.83,1.75.01,1.04-.83,1.8-1.86,1.8Z"/>
      </g>
    </g>
  </svg>`,
  
 videos: [
    {
      id: 'gemini-1',
      title: 'Operación Enlace',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/MDDWbGt2/fokigeiny.jpg',
    },
    {
      id: 'gemini-2',
      title: 'Operación Análisis de Contexto',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/MDDWbGt2/fokigeiny.jpg',
    },
    {
      id: 'gemini-3',
      title: 'Operación Sintetizar Reporte',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/MDDWbGt2/fokigeiny.jpg',
    },
    {
      id: 'gemini-4',
      title: 'Operación Prompt Maestro',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/MDDWbGt2/fokigeiny.jpg',
    },
    {
      id: 'gemini-5',
      title: 'Operación Deploy de Agente',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/MDDWbGt2/fokigeiny.jpg',
    }
  ],
},
  {
    id: 'kactus',
    label: 'kactus',
    accentColor: '#2BFF88',
    path: 'kactus',
    description: 'Accede, controla y evoluciona tu ecosistema tecnológico.',
    accessLevel: 'INACTIVO',
    headerVideoUrl: 'assets/VIDEO2.mp4',
    // REEMPLAZA AQUÍ: SVG completo para Kactus (viewBox + 3 paths)
  iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 94.42 94.42">
    <g>
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
        d="M47.21,93.42C21.73,93.42,1,72.69,1,47.21S21.73,1,47.21,1s46.21,20.73,46.21,46.21-20.73,46.21-46.21,46.21ZM47.21,1.5C22.01,1.5,1.5,22.01,1.5,47.21s20.51,45.71,45.71,45.71,45.71-20.51,45.71-45.71S72.42,1.5,47.21,1.5Z"/>

      <path fill="currentColor"
        d="M64.59,84.79c-9.06-2.14-17.06-6.81-23.38-13.34-1.24-1.28-3.06-3.97-2.38-5.65,1.4-3.45,3.4-6.29,5.17-9.54,2.09-3.83,7.74-1.68,11.11-.91,7.01-2.96,10.37-10.65,10.87-18.01.33-4.87,3.49-8.69,7.94-9.68,4.72-1.05,9.41,1.36,11.35,5.52,2.08,4.45.8,9.63-3.23,12.51-6.59,4.72-11.66,10.66-10.82,19.1,2.26,1.92,6.64,6.53,5.02,9.27l-5.71,9.66c-.86,1.45-4.03,1.53-5.96,1.07ZM68.29,62.23c.49-4.59,1.8-8.11,4.19-11.32,2.31-2.92,4.97-5.34,8.02-7.51s3.85-6.01,2.14-9.31c-1.41-2.73-4.66-4.5-8.11-3.73-3.07.69-5.47,3.34-5.73,6.89-.55,7.46-3.45,15.16-10.22,19.45l9.7,5.54ZM70.51,78.6l3.28-5.92c-1.38-6.44-20.55-17.27-26.94-15.75l-3.42,5.92c8.96,1.01,21.96,8.42,27.08,15.74ZM68.84,81.93c-.81-1.98-1.45-3.14-2.67-4.31-5.48-5.27-12.11-9.12-19.41-11.33-1.77-.54-3.33-.6-5.37-.28.75,6.31,21.12,18.17,27.46,15.93Z"/>

      <path fill="currentColor"
        d="M36.16,67.93c-11.06-3.29-19.12-13.52-19.12-25.65,0-14.78,11.98-26.76,26.76-26.76,9.99,0,18.7,5.48,23.29,13.59,1.52-1.42,3.38-2.37,5.37-2.86-5.62-10.03-16.35-16.82-28.66-16.82-18.13,0-32.83,14.7-32.83,32.83,0,16.15,11.66,29.56,27.02,32.31-1.04-2.1-1.69-4.33-1.83-6.65Z"/>

      <path fill="currentColor"
        d="M29.5,46.06c-1.06-.69-1.42-3.91-.65-4.78s3.33-.98,4.3-.31l7.02,4.85,15.27-17.66c.72-.83,3.17-1.02,4.06-.44s1.3,3.59.57,4.43l-18.8,21.56-11.77-7.64Z"/>
    </g>
  </svg>`,
 videos: [
    {
      id: 'kactus-1',
      title: 'Operación Apertura KACTUS',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/kVCZ3Knn/focakatus.jpg',
    },
    {
      id: 'kactus-2',
      title: 'Operación Gestión de Novedades',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/kVCZ3Knn/focakatus.jpg',
    },
    {
      id: 'kactus-3',
      title: 'Operación Liquidación y Nómina',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/kVCZ3Knn/focakatus.jpg',
    },
    {
      id: 'kactus-4',
      title: 'Operación Validación de Contratos',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/kVCZ3Knn/focakatus.jpg',
    },
    {
      id: 'kactus-5',
      title: 'Operación Reportes de Talento',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/kVCZ3Knn/focakatus.jpg',
    }
  ],
  },
  {
    id: 'cun',
    label: 'CUN',
    accentColor: '#00E5FF',
    path: 'cun',
    description: 'Operaciones de red unificada central.',
    accessLevel: 'ALTO_NIVEL',
    headerVideoUrl: 'assets/VIDEO2.mp4',
    // REEMPLAZA AQUÍ: SVG completo para CUN (viewBox + 3 paths)
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 106.71 99.81">
  <g>
    <!-- cls-5 (stroke) -->
    <path fill="none" stroke="currentColor" stroke-width="1.36" stroke-miterlimit="10"
      d="M71.91,77.45l8.86.07c-.17.19-.34.36-.51.54,4.32-1.86,6.78-7.77,8.65-12.13,2.33-5.44,4.2-12.23,7.9-17.25-.03-26.51-21.54-48-48.07-48S.68,22.19.68,48.72s21.52,48.05,48.07,48.05c1.08,0,2.15-.05,3.21-.12-1.69-1.64-3.11-3.58-4.23-5.92-.52-1.1-1.01-2.21-1.46-3.33v4.19c-3.51-.7-6.21-2.51-8.64-4.8-2.72-2.69-4.83-5.77-6.59-9.34h9.41c-.16-.33-.33-.64-.49-.96-.6-1.25-1.16-2.6-1.67-3.99h-9.42c-2.53-6.82-3.73-13.97-3.98-21.29h13.93c.03-.05.06-.1.09-.15,1.65-2.47,3.88-4.09,6.28-4.8h-20.28c.2-7.19,1.41-14.3,3.95-21.28h17.41s0,21.02,0,21.02c3.66-.66,7.55.72,10.29,4.31.22.29.43.6.63.9h2.68c.29-1.7.74-3.38,1.4-4.95h-10.05s0-21.28,0-21.28h17.4c1.55,4.18,2.6,8.48,3.24,12.87,1.7-.18,3.4-.02,5.05.41-.59-4.47-1.56-8.87-3.02-13.27l10.82-.02c4.2,6.35,6.64,13.52,7.1,21.29h-4.31c.93,1.55,1.61,3.22,1.96,4.96h2.35c-.46,7.66-2.84,14.84-7.09,21.29h-10.82c.54-1.62,1-3.24,1.41-4.88-1.67.17-3.37.06-5.02-.35-.47,1.74-1.01,3.47-1.64,5.22h-2.31c.62,1.18,1.3,2.33,2.09,3.43.89,1.24,1.88,2.13,2.95,2.77.19-.4.37-.81.55-1.22ZM12.8,24.95l10.81.02c-2.29,6.96-3.42,13.84-3.67,21.27H5.7c.44-7.71,2.89-14.96,7.1-21.29ZM12.79,72.49c-4.22-6.36-6.64-13.59-7.1-21.29h14.25c.25,7.28,1.35,14.28,3.68,21.29h-10.83ZM25.55,77.42c1.78,4.04,3.95,7.6,6.88,11.14-6.01-2.35-11.32-6.17-15.75-11.07l8.87-.07ZM25.6,19.98l-8.89-.03c4.27-4.82,9.55-8.59,15.68-11.08-2.76,3.51-5.06,6.93-6.79,11.11ZM31.07,20.01c1.67-3.55,3.88-6.7,6.64-9.43,2.42-2.26,5.09-4.01,8.55-4.73l.02,14.15h-15.2ZM51.23,20.01V5.85c3.61.75,6.41,2.64,8.88,5.05,2.62,2.64,4.64,5.63,6.34,9.1h-15.22ZM71.93,20c-1.79-4.07-3.99-7.66-6.9-11.15,6.08,2.45,11.37,6.18,15.75,11.09l-8.85.06Z"/>

    <!-- cls-3 (fill) -> currentColor -->
    <path fill="currentColor" opacity="0.47" d="M46.28,19.97l-.02-14.16c-3.46.73-6.13,2.47-8.55,4.73-2.76,2.72-4.97,5.88-6.64,9.43h15.2Z"/>
    <path fill="currentColor" opacity="0.47" d="M66.44,19.97c-1.7-3.47-3.72-6.46-6.34-9.1-2.46-2.42-5.26-4.31-8.87-5.06v14.17s15.21-.01,15.21-.01Z"/>
    <path fill="currentColor" opacity="0.47" d="M25.6,19.95c1.73-4.18,4.03-7.6,6.79-11.12-6.12,2.49-11.41,6.26-15.68,11.09l8.89.03Z"/>
    <path fill="currentColor" opacity="0.47" d="M80.78,19.91c-4.38-4.91-9.67-8.65-15.75-11.1,2.92,3.49,5.11,7.09,6.9,11.16l8.85-.06Z"/>
    <path fill="currentColor" opacity="0.47" d="M19.94,46.22c.25-7.43,1.38-14.32,3.67-21.28l-10.81-.02c-4.21,6.33-6.66,13.59-7.1,21.3h14.24Z"/>
    <path fill="currentColor" opacity="0.47" d="M46.27,45.99v-21.06s-17.42,0-17.42,0c-2.53,6.98-3.74,14.1-3.95,21.3h20.36c.33-.1.66-.18,1-.24Z"/>
    <path fill="currentColor" opacity="0.47" d="M69.05,38.44c.92-.31,1.86-.51,2.8-.61-.64-4.39-1.69-8.71-3.24-12.91h-17.4s0,21.3,0,21.3h10.06c1.46-3.51,3.91-6.47,7.77-7.78Z"/>
    <path fill="currentColor" opacity="0.47" d="M87.48,46.22h4.32c-.47-7.77-2.91-14.95-7.1-21.3l-10.82.02c1.46,4.41,2.44,8.82,3.03,13.3,4.32,1.12,8.23,4.13,10.57,7.98Z"/>
    <path fill="currentColor" opacity="0.47" d="M23.62,72.48c-2.34-7.02-3.44-14.02-3.68-21.31H5.69c.46,7.71,2.88,14.95,7.1,21.31h10.83Z"/>
    <path fill="currentColor" opacity="0.47" d="M38.84,51.17h-13.94c.25,7.33,1.45,14.48,3.98,21.31h9.42c-2.48-6.88-3.48-15.15.54-21.31Z"/>
    <path fill="currentColor" opacity="0.47" d="M66.28,65.61c-1.65-.99-2.99-2.16-4.04-3.49,1.23,3.52,2.38,7.08,4.09,10.35h2.32c.63-1.74,1.17-3.48,1.63-5.21-1.38-.34-2.73-.89-3.99-1.65Z"/>
    <path fill="currentColor" opacity="0.47" d="M59.75,51.99c.04-.27.08-.54.13-.81h-2.69c.96,1.38,1.76,2.85,2.47,4.37-.1-1.14-.08-2.32.09-3.56Z"/>
    <path fill="currentColor" opacity="0.47" d="M89.45,51.18c.26,1.28.34,2.6.22,3.94-.55,5.67-4.93,9.88-10.06,11.38-1.38.59-2.83.96-4.31,1.11-.41,1.63-.88,3.26-1.41,4.87h10.82c4.25-6.46,6.63-13.64,7.09-21.3h-2.35Z"/>
    <path fill="currentColor" opacity="0.47" d="M25.54,77.41l-8.87.07c4.43,4.91,9.74,8.73,15.75,11.08-2.93-3.54-5.1-7.1-6.88-11.14Z"/>
    <path fill="currentColor" opacity="0.47" d="M44.97,83.94c-.34-.32-.67-.65-.97-1.01-1.39-1.68-2.56-3.56-3.55-5.5h-9.41c1.76,3.58,3.87,6.65,6.59,9.35,2.43,2.29,5.13,4.1,8.64,4.8v-4.19c-.46-1.14-.89-2.29-1.3-3.45Z"/>
    <path fill="currentColor" opacity="0.35" style="mix-blend-mode:multiply"
      d="M74.82,78.24c2.09.64,3.88.49,5.43-.17.17-.19.35-.37.52-.56l-8.86-.07c-.18.42-.36.82-.55,1.23.15.09.3.16.45.24.71-.7,1.75-1.05,3.01-.66Z"/>

    <!-- cls-2 (fill) -> currentColor -->
    <path fill="currentColor"
      d="M48.23,47.6c4.17-.97,10.64,38.54,26.22,38.54,11.72,0,24.25-29.82,24.25-29.82,0,0,3.97-9.69,7.77-9.69,2.05,0-9.36,53.18-31.86,53.18s-33.11-35.78-33.64-38.44c-.54-2.66,3.08-12.79,7.26-13.77Z"/>
    <path fill="currentColor"
      d="M85.1,53.42c0,6.09-4.08,10.85-9.24,11.03-5.1,0-9.24-4.94-9.24-11.03s4.14-11.03,9.24-11.03,9.24,4.94,9.24,11.03"/>
  </g>
</svg>`,
 videos: [
    {
      id: 'cun-1',
      title: 'Operación Acceso Institucional',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/RxBZYHd/foca-Web.jpg',
    },
    {
      id: 'cun-2',
      title: 'Operación Gestión de Programas',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/RxBZYHd/foca-Web.jpg',
    },
    {
      id: 'cun-3',
      title: 'Operación Control de Materias',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/RxBZYHd/foca-Web.jpg',
    },
    {
      id: 'cun-4',
      title: 'Operación Registro de Usuarios',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/RxBZYHd/foca-Web.jpg',
    },
    {
      id: 'cun-5',
      title: 'Operación Consolidación Operativa',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/RxBZYHd/foca-Web.jpg',
    }
  ],
  },
  {
    id: 'sinu',
    label: 'SINU',
    accentColor: '#FF9F1C',
    path: 'phyton',
    description: 'Análisis Estructural y Logística.',
    accessLevel: 'ENCRIPTADO',
    headerVideoUrl: 'assets/VIDEO2.mp4',
    // REEMPLAZA AQUÍ: SVG completo para PHYTON (viewBox + 3 paths)
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94.42 94.42">
  <defs>
    <clipPath id="clippath">
      <path d="M46.32,2.4C21.11,2.4.6,22.9.6,48.11s20.51,45.71,45.71,45.71,45.71-20.51,45.71-45.71S71.52,2.4,46.32,2.4Z"/>
    </clipPath>
  </defs>

  <g>
    <!-- Ring (stroke) -->
    <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
      d="M47.21,93.42C21.73,93.42,1,72.69,1,47.21S21.73,1,47.21,1s46.21,20.73,46.21,46.21-20.73,46.21-46.21,46.21ZM47.21,1.5C22.01,1.5,1.5,22.01,1.5,47.21s20.51,45.71,45.71,45.71,45.71-20.51,45.71-45.71S72.42,1.5,47.21,1.5Z"/>

    <!-- Everything clipped -->
    <g clip-path="url(#clippath)">
      <!-- group (opacity .28) -->
      <g opacity="0.28">
        <path fill="currentColor"
          d="M17.87,22.6c6.47-1.51,16.49,59.74,40.65,59.74,18.17,0,37.59-46.22,37.59-46.22,0,0,6.15-15.02,12.05-15.02,3.18,0-14.52,82.43-49.38,82.43S7.46,48.06,6.63,43.94c-.83-4.12,4.78-19.83,11.25-21.34Z"/>
        <path fill="currentColor"
          d="M75.03,31.61c0,9.44-6.32,16.81-14.32,17.1-7.91,0-14.32-7.66-14.32-17.1s6.41-17.1,14.32-17.1,14.32,7.66,14.32,17.1"/>
      </g>

      <!-- small marks (original had #e6edef + blend/opacity; kept as neutral) -->
      <path fill="#E6EDEF" d="M2.62,35.82c.13.06.25.12.37.17.02-.04.04-.08.05-.12-.28-.01-.43-.06-.43-.06Z"/>
      <path fill="#E6EDEF" opacity="0.3" d="M2.62,35.82c.13.06.25.12.37.17.02-.04.04-.08.05-.12-.28-.01-.43-.06-.43-.06Z"/>
      <path fill="#E6EDEF" opacity="0.3" d="M2.62,35.82c.13.06.25.12.37.17.02-.04.04-.08.05-.12-.28-.01-.43-.06-.43-.06Z"/>

      <!-- main fill block -->
      <path fill="currentColor"
        d="M94.94,48.43c0,26.73-21.67,48.4-48.4,48.4S-1.86,75.16-1.86,48.43,19.81.03,46.54.03s48.4,21.67,48.4,48.4ZM42.48,17.75c1.9-.52,3.08-.73,5.03-.52l.44.05c.83.09,1.61.26,2.43.47,3.95,1,7.4,3.37,8.43,7.5.31,1.26.32,2.42.25,3.7l-.19,3.42-.12,3.57c.3-.15.54-.3.8-.35.34-.07.61.32.63.64.1,1.62-.1,3.19-.33,4.8l-.23,1.6c-.08.58-.47,2.38-1.21,2.25-.15-.03-.37-.2-.57-.36-.32,2.02-.75,5.01-2.32,6.44l-.52.67.43,6.34c5.57,2.06,11.07,4.03,16.69,5.83,2.09.67,4.11,1.24,6.21,1.79,1.56,1.16,3.06,5.59,3.61,7.47l.87,2.98s.06.07.07.05l.09-.12c5.13-6.53,8.43-15.36,9.11-23.67.42-5.14.02-10.15-1.23-15.11-3.75-14.81-14.8-26.84-29.2-31.9-8.73-3.07-18.26-3.4-27.19-.95C19.02,8.59,6.81,20.74,2.51,36.16c-1.52,5.46-1.99,11-1.46,16.7.31,3.32,1.11,7.06,2.2,10.22,1.59,4.63,3.85,8.92,6.83,12.86.95-3.26,1.92-6.76,3.95-9.36.35-.28.65-.75,1.11-.89l6.38-1.89c5.29-1.71,10.45-3.56,15.68-5.49l.19-5.21c2.08,1.76,4.03,3.05,6.57,3.7.7.18,2.7.32,3.26-.23-1.44.16-3.02-.07-4.27-.7-1.68-.84-3.11-1.99-4.54-3.2-.61-.52-1.08-1.06-1.6-1.66-.58-.66-1.06-1.29-1.37-2.14-.52-1.44-.81-2.92-1.02-4.43-.24.2-.44.36-.6.38-.65.05-1.05-1.41-1.13-1.94l-.21-1.4c-.24-1.62-.45-3.2-.45-4.85,0-.35.09-.85.35-1.02.42-.26.75.1,1.16.3l-.37-8.04c-.04-.89.26-1.76.51-2.6,1.22-4.05,4.87-6.45,8.79-7.52Z"/>
    </g>
  </g>
</svg>`,
 videos: [
    {
      id: 'sinu-1',
      title: 'Operación Consulta Académica',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/dskDkDpb/focasinu.jpg',
    },
    {
      id: 'sinu-2',
      title: 'Operación Validación de Datos',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/dskDkDpb/focasinu.jpg',
    },
    {
      id: 'sinu-3',
      title: 'Operación Actualización de Registro',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/dskDkDpb/focasinu.jpg',
    },
    {
      id: 'sinu-4',
      title: 'Operación Soporte y Escalamiento',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/dskDkDpb/focasinu.jpg',
    },
    {
      id: 'sinu-5',
      title: 'Operación Cierre de Caso',
      url: 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769026502/0120_xfu0bb.mp4',
      thumbnail: 'https://i.ibb.co/dskDkDpb/focasinu.jpg',
    }
  ],
  },

  {
    id: 'perfil',
    label: 'Perfil',
    accentColor: '#9B6BFF',
    path: 'perfil',
    description: 'Credenciales y desempeño del agente.',
    accessLevel: 'OWNER_ONLY',
    headerVideoUrl: 'assets/VIDEO2.mp4',
    // REEMPLAZA AQUÍ: SVG completo para Perfil (viewBox + 3 paths)
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 94.42 94.42">
    <g>
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
        d="M47.21,93.42C21.73,93.42,1,72.69,1,47.21S21.73,1,47.21,1s46.21,20.73,46.21,46.21-20.73,46.21-46.21,46.21ZM47.21,1.5C22.01,1.5,1.5,22.01,1.5,47.21s20.51,45.71,45.71,45.71,45.71-20.51,45.71-45.71S72.42,1.5,47.21,1.5Z"/>

      <path fill="currentColor"
        d="M88.56,47.21c0-22.8-18.55-41.35-41.35-41.35S5.86,24.41,5.86,47.21c0,19.89,14.12,36.54,32.86,40.47,1.99-3.6,3.12-7.68,1.14-11.47-.49-1.24-1.71-2.01-3.12-1.78l-6.01.99c-2.04.34-3.96.36-5.76-.33-1.15-.44-2.35-1.56-2.2-2.89l.39-3.57-1.82-1.53.53-1.7c-.79-.5-1.72-1.44-1.15-2.44.27-.47.59-1.29.42-1.73-.5-1.24-3.94-1.12-3.19-2.51l4.4-8.08c.97-1.78,0-2.82-.38-4.32-1.1-4.29,1.12-8.54,2.65-12.46.69-1.77.68-3.51,1.87-5.13,1.77-2.4,4.03-4.21,6.9-5.26,7.8-2.86,18.32-2.6,25.28,2.73,5.83,3,8.94,14.44,9.18,20.26-.71,8.39-5.07,11.02-7.31,18.67-.58,2.69-1.23,5.39-.63,8.16.76,3.51,2.78,7.67,4.57,11.49,14.2-6.55,24.08-20.92,24.08-37.56Z"/>
    </g>
  </svg>`,
 videos: [
  ],
  }
];

export const FORO_ACCENT = '#00E5FF';

// INTRO VIDEO
export const INTRO_VIDEO_URL = 'https://res.cloudinary.com/dknmovwrt/video/upload/v1769025445/render_sbbygx.mp4';