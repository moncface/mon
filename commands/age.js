// Age in years from a birthdate (YYYY-MM-DD)
export const command = (t) => {
  if (!t) return 'Usage: age <YYYY-MM-DD>'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return 'Invalid format  e.g. age 1990-05-01'
  const birth = new Date(t.trim() + 'T12:00:00')
  if (isNaN(birth)) return 'Invalid date  e.g. age 1990-05-01'
  const now = new Date()
  let a = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) a--
  return `${a} years old`
}
