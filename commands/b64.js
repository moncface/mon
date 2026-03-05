export const command = (t) => btoa(String.fromCharCode(...new TextEncoder().encode(t)))
