export const command = (t) => {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(t), c => c.charCodeAt(0)))
  } catch {
    return '(invalid base64)'
  }
}
