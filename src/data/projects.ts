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
    title: 'ALA',
    summary: 'Marketing landing page for ALA with a clean, responsive design.',
    tags: ['Landing', 'Web'],
    heroColor: 'linear-gradient(135deg, #1f3b4d, #213547)',
    url: 'https://ala-azure.vercel.app/',
    github: 'https://github.com/TsikyLalaina/ala-landing-page.git',
    image: new URL('../assets/ala.png', import.meta.url).toString(),
    content: [
      'Cinematic hero: foreground video fade into parallax background with gradient tint.',
      'Investor-focused sections: benefits, impact stats marquee, testimonials.',
      'Interactive Leaflet map of Madagascar hubs (replaceable with real data).',
      'PWA: install prompt, offline fallback, service worker precache.',
      'EN/MG localization with i18next and localStorage persistence.',
    ],
    problem: 'Communicate Ala\'s regenerative vision uniting mining and agriculture to investors in a performant, accessible way.',
    approach: 'Static React + Vite landing with motion-first storytelling, parallax, interactive map, i18n, and PWA for resilience.',
    process: [
      'Component-driven sections (Hero, Features, Impact, HowItWorks, Testimonials, Map, Header/Footer).',
      'Performance and a11y: preload LCP media, reduced-motion aware animations, mobile-first high-contrast UI.',
      'Service worker and manifest for installability and offline support.',
    ],
    outcome: 'Deployed to Vercel with fast loads, offline support, and a clear investor narrative.',
    roles: ['Frontend'],
    tech: ['React 19', 'Vite', 'Framer Motion', 'React Parallax', 'i18next', 'Leaflet', 'PWA'],
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
    url: 'https://ink-verse.vercel.app/',
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
]


