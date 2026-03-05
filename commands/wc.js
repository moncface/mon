export const command = (t) => {
  if (!t) return 'Usage: wc <text>'
  return `${t.trim().split(/\s+/).length} words, ${t.length} chars`
}
