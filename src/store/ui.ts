import { create } from 'zustand'

export type Theme = 'dark' | 'light'
export type Locale = 'en' | 'fr'

type UIState = {
  theme: Theme
  locale: Locale
  placeholders: {
    name: string
    tagline: string
    email: string
  }
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  setLocale: (l: Locale) => void
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: 'dark',
  locale: 'en',
  placeholders: {
    name: 'LOHARANONTSOA Tsiky Lalaina',
    tagline: 'Full-Stack Web Developer | React & Next.js Specialist',
    email: 'tsikyloharanontsoa@ala-mg.com',
  },
  setTheme: (t) => set({ theme: t }),
  toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
  setLocale: (l) => set({ locale: l }),
}))


