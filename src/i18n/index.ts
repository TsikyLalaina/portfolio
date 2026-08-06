import { useMemo } from 'react'
import { useUIStore } from '../store/ui'

type Dict = Record<string, string>

const en: Dict = {
  nav_work: 'Work',
  nav_about: 'About',
  nav_contact: 'Contact',

  hero_role: 'Full-Stack Developer',
  hero_tagline: 'I design and build modern, scalable web platforms — from community marketplaces to booking systems with mobile-money payments.',
  hero_location: 'Antananarivo, Madagascar',
  hero_available: 'Available worldwide',
  hero_scroll: 'Scroll',

  work_eyebrow: 'Selected Work',
  work_title_1: 'Things I have',
  work_title_2: 'built',

  process_eyebrow: 'How I Work',
  process_title_1: 'From idea to',
  process_title_2: 'production',

  about_eyebrow: 'About',
  about_title_1: 'Behind the',
  about_title_2: 'code',
  about_lede: 'I turn business problems into elegant, performance-driven digital products.',
  about_p1: "I'm a web developer with a Bachelor's degree from EMiT Fianarantsoa, specializing in modern, scalable web applications. I've shipped community platforms, clinic booking systems, e-commerce pipelines and construction-management SaaS — end to end, from database schema to motion design.",
  about_p2: 'Based in Madagascar, working with clients and teams worldwide, in English and French.',
  about_stat_projects: 'Projects shipped',
  about_stat_years: 'Years building',
  about_stat_langs: 'Languages',

  contact_eyebrow: 'Contact',
  contact_line1: "Let's build",
  contact_line2: 'something',
  contact_emails: 'Email',
  contact_github: 'GitHub',
  contact_social: 'Elsewhere',
  contact_form_label: 'Or write from here',
  contact_send: 'Send message',

  footer_text: 'Designed & built with React, R3F and Framer Motion.',
}

const fr: Dict = {
  nav_work: 'Projets',
  nav_about: 'À propos',
  nav_contact: 'Contact',

  hero_role: 'Développeur Full-Stack',
  hero_tagline: 'Je conçois et développe des plateformes web modernes et scalables — des marketplaces communautaires aux systèmes de réservation avec paiement mobile money.',
  hero_location: 'Antananarivo, Madagascar',
  hero_available: 'Disponible partout',
  hero_scroll: 'Défiler',

  work_eyebrow: 'Projets choisis',
  work_title_1: 'Ce que j’ai',
  work_title_2: 'construit',

  process_eyebrow: 'Ma méthode',
  process_title_1: 'De l’idée à la',
  process_title_2: 'production',

  about_eyebrow: 'À propos',
  about_title_1: 'Derrière le',
  about_title_2: 'code',
  about_lede: 'Je transforme des problèmes métier en produits digitaux élégants et performants.',
  about_p1: "Développeur web diplômé de l'EMiT Fianarantsoa, spécialisé dans les applications web modernes et scalables. J'ai livré des plateformes communautaires, des systèmes de réservation médicale, des pipelines e-commerce et des SaaS de gestion BTP — de bout en bout, du schéma de base de données au motion design.",
  about_p2: 'Basé à Madagascar, je travaille avec des clients et équipes du monde entier, en français et en anglais.',
  about_stat_projects: 'Projets livrés',
  about_stat_years: 'Années de dev',
  about_stat_langs: 'Langues',

  contact_eyebrow: 'Contact',
  contact_line1: 'Construisons',
  contact_line2: 'ensemble',
  contact_emails: 'Email',
  contact_github: 'GitHub',
  contact_social: 'Ailleurs',
  contact_form_label: 'Ou écrivez-moi d’ici',
  contact_send: 'Envoyer',

  footer_text: 'Conçu et développé avec React, R3F et Framer Motion.',
}

const dicts = { en, fr }

export function useI18n() {
  const locale = useUIStore((s) => s.locale)
  return useMemo(() => {
    const d = dicts[locale]
    return (key: keyof typeof en) => d[key] ?? en[key] ?? key
  }, [locale])
}
