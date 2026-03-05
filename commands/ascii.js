// Converts char → decimal code, or decimal → char. Multiple chars show a table.
export const command = (t) => {
  if (!t) return 'Usage: ascii <char or number>  e.g. ascii A  or  ascii 65'
  const n = parseInt(t)
  if (!isNaN(n) && String(n) === t.trim()) {
    if (n < 0 || n > 127) return 'Out of ASCII range (0–127)'
    return `${n} → '${String.fromCharCode(n)}'`
  }
  if (t.length === 1) return `'${t}' → ${t.charCodeAt(0)}`
  return t.split('').map(c => `${c}=${c.charCodeAt(0)}`).join('  ')
}
