// Converts octal permission string to symbolic notation (e.g. 755 → rwxr-xr-x)
export const command = (octal) => {
  if (!octal) return 'Usage: chmod <octal>  e.g. chmod 755'
  if (!/^[0-7]{3,4}$/.test(octal)) return 'Expected 3–4 octal digits  e.g. chmod 755'
  const bits = octal.length === 4 ? octal.slice(1) : octal
  const map = ['---','--x','-w-','-wx','r--','r-x','rw-','rwx']
  const sym = bits.split('').map(d => map[parseInt(d)]).join('')
  return `${sym}  (owner:${map[parseInt(bits[0])]} group:${map[parseInt(bits[1])]} other:${map[parseInt(bits[2])]})`
}
