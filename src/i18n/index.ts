import { useMemo } from 'react'
import { useUIStore } from '../store/ui'

type Dict = Record<string, string>

const en: Dict = {
  nav_projects: 'Projects',
  nav_about: 'About',
  nav_contact: 'Contact',
  hero_title: 'LOHARANONTSOA Tsiky Lalaina',
  hero_tagline: 'Full-Stack Web Developer | React & Next.js Specialist',
  projects_title: 'Projects',
  projects_desc: 'Selected work with motion-first UI and 3D accents.',
  about_title: 'About',
  about_desc: "I'm a passionate web developer with a Bachelor's degree from EMiT Fianarantsoa, specializing in building modern, scalable, and performance-driven web applications.",
  contact_title: 'Contact',
  contact_desc: 'Available for freelance projects and long‑term collaborations.',
  contact_send: 'Send message',
  email_me: 'Email me',
  footer_text: 'Crafted with React, R3F, Framer Motion.'
}

const fr: Dict = {
  nav_projects: 'Projets',
  nav_about: 'À propos',
  nav_contact: 'Contact',
  hero_title: 'LOHARANONTSOA Tsiky Lalaina',
  hero_tagline: 'Développeur Web Full‑Stack | Spécialiste React & Next.js',
  projects_title: 'Projets',
  projects_desc: 'Sélection de travaux avec UI orientée motion et accents 3D.',
  about_title: 'À propos',
  about_desc: "Développeur passionné (licence EMiT Fianarantsoa), spécialisé dans des applications web modernes, scalables et performantes.",
  contact_title: 'Contact',
  contact_desc: 'Ouvert aux collaborations et opportunités. Construisons quelque chose de remarquable.',
  contact_send: 'Envoyer le message',
  email_me: 'M’écrire',
  footer_text: 'Réalisé avec React, R3F, Framer Motion.'
}

const dicts = { en, fr }

export function useI18n() {
  const locale = useUIStore((s) => s.locale)
  return useMemo(() => {
    const d = dicts[locale]
    return (key: keyof typeof en) => d[key]
  }, [locale])
}


