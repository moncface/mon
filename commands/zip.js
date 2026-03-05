// Japanese postal code → address via zipcloud.ibsnet.co.jp (free, no key)
export const command = async (code) => {
  if (!code) return 'Usage: zip <postal-code>  e.g. zip 150-0001'
  const normalized = code.replace(/-/g, '')
  if (!/^\d{7}$/.test(normalized)) return 'Expected 7 digits  e.g. zip 1500001'
  try {
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalized}`)
    const data = await res.json()
    if (!data.results) return `Not found: ${code}`
    const r = data.results[0]
    return `${r.address1}${r.address2}${r.address3}`
  } catch {
    return 'Error: Network issue or API down'
  }
}
