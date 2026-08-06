export type ContactLink = {
  label: string
  href: string
  icon: string
}

export const emails: ContactLink[] = [
  { label: 'tsikyloharanontsoa@ala-mg.com', href: 'mailto:tsikyloharanontsoa@ala-mg.com', icon: '📧' },
  { label: 'lalaina@irok.fr', href: 'mailto:lalaina@irok.fr', icon: '📧' },
]

export const githubAccounts: ContactLink[] = [
  { label: 'GitHub @TsikyLalaina', href: 'https://github.com/TsikyLalaina', icon: '💻' },
  { label: 'GitHub @lalaina-irok', href: 'https://github.com/lalaina-irok', icon: '🏢' },
]

export const linkedin: ContactLink = {
  label: 'LinkedIn Tsiky Loharanontsoa',
  href: 'https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/',
  icon: '💼',
}
