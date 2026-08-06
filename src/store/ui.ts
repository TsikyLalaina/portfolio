import { create } from 'zustand'

export type Locale = 'en' | 'fr'

type UIState = {
  locale: Locale
  setLocale: (l: Locale) => void
}

export const useUIStore = create<UIState>((set) => ({
  locale: 'en',
  setLocale: (l) => set({ locale: l }),
}))
