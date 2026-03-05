// Converts px → rem or rem → px assuming 16px base font size
export const command = (t) => {
  if (!t) return 'Usage: px <value>  e.g. px 24  or  px 1.5rem'
  if (t.endsWith('rem')) { const r = parseFloat(t); return isNaN(r) ? 'Invalid' : `${r * 16}px` }
  const n = parseFloat(t); return isNaN(n) ? 'Invalid' : `${+(n / 16).toFixed(4)}rem`
}
