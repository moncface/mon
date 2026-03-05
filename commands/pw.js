// Secure random password. Length 4–128, default 16.
export const command = (n) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  const len = Math.min(Math.max(parseInt(n) || 16, 4), 128)
  return Array.from(crypto.getRandomValues(new Uint8Array(len)), b => chars[b % chars.length]).join('')
}
