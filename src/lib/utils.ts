export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const BLOCKED_TLDS = new Set(['asshole', 'shit', 'fuck', 'cunt', 'piss', 'dick', 'cock'])
const BLOCKED_DOMAINS = new Set(['poop.com', 'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.email', 'yopmail.com', 'trashmail.com', 'fakeinbox.com'])

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase()
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(trimmed)) return false
  const domain = trimmed.split('@')[1]
  const tld = domain.split('.').pop() ?? ''
  if (BLOCKED_TLDS.has(tld)) return false
  if (BLOCKED_DOMAINS.has(domain)) return false
  return true
}
