export type Project = {
  id: string
  title: string
  summary: string
  tags: string[]
  heroColor: string
  content: string[]
  url?: string
  /** Site refuses framing (X-Frame-Options) or sits behind auth — show `image` instead of a live iframe. */
  noEmbed?: boolean
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
    id: 'vispacem',
    title: 'KyDock (Vispacem)',
    summary: 'Product work on a French construction-management SaaS: quotes, projects, budgets, orders, time tracking and accounting.',
    tags: ['Next.js', 'tRPC', 'Prisma', 'Monorepo', 'Fullstack'],
    heroColor: 'linear-gradient(135deg, #12212f, #24435c)',
    url: 'https://app.kydock.com/fr',
    noEmbed: true,
    image: new URL('../assets/kydock.png', import.meta.url).toString(),
    content: [
      'Turborepo/pnpm monorepo hosting a dozen apps behind one design system and data layer.',
      'Dashboard of configurable widgets: order book, revenue, payment delays, document status.',
      'Project cost control: budgets planned per family and per category, matched against realised expenses.',
      'Shared filtered tree-table used across charges and project expenses, replacing duplicated per-page tables.',
      'Purchase orders, expense rollups and detail panels reconciling to the same figures.',
      'Type-safe stack end to end: tRPC procedures, Zenstack/Prisma policies, zod validation.',
      'French-language product; work delivered through reviewed PRs on a shared trunk.',
    ],
    problem: 'Construction teams planned budgets in one place and tracked real spend in another, so realised amounts never reconciled with what had been planned.',
    approach: 'Extend the existing budget domain rather than bolt on a second one: plan at category granularity, feed detail panels from the same rollup query that produces the headline figures, and consolidate the UI on one shared table component.',
    process: [
      'Rebuilt the project expenses tab on the shared filtered tree-table used by the charges page.',
      'Extracted group-by options and per-category row explosion into a module both tables share.',
      'Added per-category budget planning on top of the existing per-family model.',
      'Made budget detail panels list the expenses behind each realised amount.',
      'Aligned dialog save flows with the parent record so partial states no longer persist.',
    ],
    outcome: 'Budget and expense views that agree by construction, with noticeably less duplicated table code to maintain.',
    roles: ['Fullstack', 'Product engineering'],
    tech: ['Next.js 15', 'React', 'TypeScript', 'tRPC', 'Prisma', 'Zenstack', 'PostgreSQL', 'TailwindCSS', 'Better Auth', 'Turborepo', 'pnpm', 'Biome', 'Vitest'],
  },
  {
    id: 'seeds',
    title: 'Seeds',
    summary: 'E-commerce and production platform for a French linseed-oil paint maker: order pipeline, shipping, Stripe payments.',
    tags: ['Next.js', 'E-commerce', 'Stripe', 'Fullstack'],
    heroColor: 'linear-gradient(135deg, #1d2b1f, #3d5c3a)',
    url: 'https://www.seeds.fr/fr',
    image: new URL('../assets/seeds.png', import.meta.url).toString(),
    content: [
      'Production board moving orders through production, shipment and shipped states.',
      'Sendcloud integration for label creation, plus a manual shipment path for orders handled off-platform.',
      'Stripe checkout and webhook handling, exercised locally through the Stripe CLI bridge.',
      'Localised storefront with collections routing and 301 redirects for legacy URLs.',
      'Additive Prisma migrations so schema changes ship without downtime.',
    ],
    problem: 'Shipment creation assumed a connected Sendcloud account, which blocked operators handling orders through other carriers and billed a label for every shipment.',
    approach: 'Split "shipment created" from "order shipped" and offer manual shipment as a first-class option — no external call, no label, no billing — while leaving the Sendcloud flow untouched.',
    process: [
      'Reworked the production-board action into a modal offering both shipment paths.',
      'Added a nullable shipment-comment field via an additive migration, surfaced in the order detail.',
      'Kept status transitions explicit so creating a shipment never silently advances an order.',
      'Wrote reviewer-facing test plans for each change.',
    ],
    outcome: 'Operators can fulfil orders with any carrier without paying for unused labels, and order status stays an explicit decision.',
    roles: ['Fullstack'],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase', 'Stripe', 'Sendcloud', 'Turborepo', 'pnpm', 'Biome'],
  },
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
    id: 'blossome',
    title: 'Blossome',
    summary: 'High-conversion booking site for a beauty institute, with MVola mobile-money payment.',
    tags: ['Next.js 16', 'Supabase', 'Payments', 'Fullstack'],
    heroColor: 'linear-gradient(135deg, #3a2b23, #6b5643)',
    url: 'https://blossome-mg.vercel.app/',
    github: 'https://github.com/TsikyLalaina/blossome',
    image: new URL('../assets/blossome.png', import.meta.url).toString(),
    content: [
      'Four-step booking wizard: service, date/time slot, client details, then payment.',
      'MVola and Airtel Money payment initiation with signed callback handling.',
      'Bookings held as pending_payment and confirmed only from the payment callback.',
      'Service catalogue, gallery, beauty-school and contact pages in French.',
      'PostgreSQL schema with row-level security on Supabase; Resend for confirmation emails.',
      'Server Actions plus zod validation for every mutation, with a CSP set at the edge.',
    ],
    problem: 'A beauty institute needed online booking that Malagasy clients could actually pay for — local mobile money, not just cards — without staff manually chasing confirmations.',
    approach: 'Next.js 16 App Router with Supabase for data and auth, MVola/Airtel Money for payment, and a callback-driven state machine so a booking is only ever confirmed by a verified payment event.',
    process: [
      'Modelled services, availability slots and bookings as SQL migrations with RLS policies.',
      'Built the multi-step booking wizard with react-hook-form and zod schemas.',
      'Integrated the MVola client: token exchange, payment initiation, callback verification.',
      'Added status polling so the UI resolves as soon as the callback lands.',
      'Wired Resend confirmation emails and hardened headers with a strict CSP.',
    ],
    outcome: 'A conversion-focused institute site where clients book and pay end-to-end in mobile money, with no manual confirmation step.',
    roles: ['Fullstack'],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'Supabase', 'PostgreSQL RLS', 'MVola API', 'Airtel Money', 'Resend', 'zod', 'react-hook-form'],
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
    url: 'https://c-caremg.vercel.app/',
    github: 'https://github.com/TsikyLalaina/C-Care',
    image: new URL('../assets/c-care.png', import.meta.url).toString(),
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


