// Decodes the payload section of a JWT (no signature verification)
export const command = (t) => {
  try {
    const p = t.split('.')[1]
    if (!p) return '(invalid JWT)'
    return JSON.stringify(JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')))) + '  (signature not verified)'
  } catch {
    return '(invalid JWT)'
  }
}
