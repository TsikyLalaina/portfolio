export type Project = {
  id: string
  title: string
  summary: string
  tags: string[]
  heroColor: string
  content: string[]
  url?: string
  github?: string
  image?: string
  problem?: string
  approach?: string
  process?: string[]
  outcome?: string
  metrics?: { label: string, value: string }[]
  roles?: string[]
  tech?: string[]
}

export const projects: Project[] = [
  {
    id: 'ala',
    title: 'Ala',
    summary: 'A comprehensive, tech-enabled community platform uniting Madagascar’s mining and agricultural sectors.',
    tags: ['Platform', 'Web', 'Fullstack'],
    heroColor: 'linear-gradient(135deg, #1f3b4d, #213547)',
    url: 'https://ala-mg.com/',
    github: 'https://github.com/TsikyLalaina/ala-landing-page',
    image: new URL('../assets/ala.png', import.meta.url).toString(),
    content: [
      'Secure login, signup, and onboarding flows using Supabase Auth.',
      'Interactive community feeds, group management, and private direct messaging.',
      'Marketplace for product/service listings and order management.',
      'Grievance mechanism portal with a dedicated admin interface for resolution.',
      'Interactive Leaflet map integration and real-time crisis reporting.',
      'PWA configuration with service worker caching and EN/MG localization.',
    ],
    problem: 'Build a comprehensive platform uniting Madagascar’s mining and agricultural sectors, providing tools for social engagement, marketplace transactions, and grievance management.',
    approach: 'Full-stack application powered by React 19, Vite, and Supabase for auth and database, combining interactive maps, real-time features, and PWA capabilities.',
    process: [
      'Designed database schemas and authentication flows with Supabase.',
      'Developed core features including social feeds, marketplace, and messaging.',
      'Built admin dashboards for managing grievances and platform users.',
      'Integrated Leaflet for interactive maps and i18next for English/Malagasy localization.',
    ],
    outcome: 'A robust community platform facilitating regeneration efforts, empowering local communities with a rich set of digital tools.',
    roles: ['Fullstack'],
    tech: ['React 19', 'Vite', 'Supabase', 'Tailwind CSS', 'React Router v7', 'Framer Motion', 'i18next', 'Leaflet', 'PWA'],
  },
  {
    id: 'cinematic-portfolio',
    title: 'My Portfolio',
    summary: 'Animation-forward portfolio with 3D hero, intro overlay, and transitions.',
    tags: ['React', 'R3F', 'Framer Motion', 'Zustand', 'Lenis'],
    heroColor: 'linear-gradient(135deg, #313860, #2a2f45)',
    url: 'https://portfolio-alpha-neon-19.vercel.app/',
    image: new URL('../assets/portfolio.png', import.meta.url).toString(),
    content: [
      'Immersive portfolio featuring a cinematic intro, smooth scroll, and case studies.',
      'Theme toggle (dark/light), EN/FR localization, and motion-first UI design.',
      'Optimized 3D hero with bloom/vignette and adaptive design decisions.',
    ],
    problem: 'Showcasing advanced motion and 3D craft in a performant, accessible way.',
    approach: 'Blend React Three Fiber hero, Framer Motion transitions, and a11y/perf best practices.',
    process: [
      'Narrative structure + route-based transitions with AnimatePresence.',
      '3D scene composition, lighting, and restrained postprocessing.',
      'Localization and theme system via CSS variables and store.',
    ],
    outcome: 'A distinctive, memorable personal brand site with deep case studies.',
    metrics: [
      { label: 'Lighthouse', value: 'High 90s (local)' },
      { label: 'Bundle', value: 'Vite split' },
    ],
    roles: ['Frontend'],
    tech: ['React', 'TypeScript', 'R3F', 'Framer Motion', 'Zustand', 'Lenis'],
  },
  {
    id: 'ink-verse',
    title: 'Ink Verse',
    summary: 'AI-assisted writing and manhwa creation suite.',
    tags: ['Next.js', 'Fastify', 'Prisma', 'Supabase', 'Tailwind'],
    heroColor: 'linear-gradient(135deg, #22252b, #2e3140)',
    url: 'https://inkverseapp.com/',
    github: 'https://github.com/TsikyLalaina/InkVerse',
    image: new URL('../assets/inkverse.png', import.meta.url).toString(),
    content: [
      'Compose chapters with Plot Muse (SSE via Groq) and manage projects/chapters.',
      'Characters & World managers with traits editors and Supabase Storage uploads.',
      'Image generation via Fal.ai Flux models with optional BullMQ/Redis queue & webhooks.',
      'Supabase Auth guards all API routes; Prisma Postgres stores content and history.',
      'Next.js 14 client with Tailwind and motion; Fastify 5 backend in TypeScript.'
    ],
    problem: 'Create an integrated tool for writing and panel generation with robust auth, storage, and scalability.',
    approach: 'Split architecture: Next.js client + Fastify API with Prisma, Supabase Auth, queues (BullMQ/Upstash), Groq for SSE text, Fal.ai for images.',
    outcome: 'Full‑stack platform enabling project-centric writing workflows, media generation, and secure, scalable APIs.',
    process: [
      'Design the Prisma data model (Project, Chapter, Character, World, Chat, Message).',
      'Implement Supabase Auth and SSR client integration.',
      'Add Groq SSE streaming and Fal.ai image generation pipeline.',
      'Introduce Redis/BullMQ worker and webhooks for queued image jobs.',
      'Polish UI with Tailwind and motion; add a reader view for chapters.'
    ],
    roles: ['Fullstack'],
    tech: ['Next.js 14', 'Fastify 5', 'TypeScript', 'TailwindCSS', 'Prisma', 'Supabase', 'BullMQ', 'Upstash Redis', 'Groq', 'Fal.ai'],
  },
  {
    id: 'c-care',
    title: 'C-Care Anosivavaka',
    summary: 'Modern medical clinic web application for patient booking and clinic administration.',
    tags: ['Next.js', 'Medical', 'Fullstack'],
    heroColor: 'linear-gradient(135deg, #0d1b2a, #1b263b)',
    github: 'https://github.com/TsikyLalaina/C-Care',
    image: new URL('../assets/ccare.png', import.meta.url).toString(),
    content: [
      'Bilingual patient interface (EN/FR) with comprehensive medical service details.',
      'Online booking system with multi-step wizard and integrated Stripe/Mobile Money payments.',
      'Automated WhatsApp notifications for appointment confirmations.',
      'Secure administrative dashboard using Supabase Auth for clinic staff.',
      'Dynamic availability and reservation management system.',
    ],
    problem: 'Create a comprehensive digital platform for a medical clinic to streamline patient bookings, international medical tourism, and internal administration.',
    approach: 'Built a bilingual Next.js App Router application with Supabase for secure data and auth, integrating local/international payments and automated WhatsApp notifications.',
    process: [
      'Developed the patient-facing booking wizard and international medical tourism landing page.',
      'Integrated Stripe and local mobile money APIs (MVola, Airtel) for seamless transactions.',
      'Built a secure admin dashboard for managing reservations and doctor availability.',
      'Implemented next-intl for full French and English localization.',
    ],
    outcome: 'A complete clinic management and patient booking platform that enhances the healthcare experience and administrative efficiency.',
    roles: ['Fullstack'],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'next-intl', 'Stripe', 'WhatsApp API', 'Zod'],
  },
]


