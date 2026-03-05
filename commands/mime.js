export const command = (ext) => {
  const types = {
    html:'text/html', htm:'text/html', css:'text/css',
    js:'application/javascript', mjs:'application/javascript', ts:'application/typescript',
    json:'application/json', xml:'application/xml', txt:'text/plain',
    csv:'text/csv', md:'text/markdown', pdf:'application/pdf',
    png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', gif:'image/gif',
    webp:'image/webp', svg:'image/svg+xml', ico:'image/x-icon', avif:'image/avif',
    mp3:'audio/mpeg', wav:'audio/wav', ogg:'audio/ogg',
    mp4:'video/mp4', webm:'video/webm', mov:'video/quicktime',
    woff:'font/woff', woff2:'font/woff2', ttf:'font/ttf',
    zip:'application/zip', gz:'application/gzip', tar:'application/x-tar',
    wasm:'application/wasm',
  }
  if (!ext) return 'Usage: mime <ext>  e.g. mime png'
  const key = ext.toLowerCase().replace(/^\./, '')
  return types[key] ? `${key} → ${types[key]}` : `Unknown: ${ext}`
}
