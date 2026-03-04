// All commands receive a single string argument (everything after the command word).
// Async commands are supported — run() awaits all results.
const commands = {

  // --- Generators ---
  uuid:  ()  => crypto.randomUUID(),
  pw:    (n) => {
    // Secure random password. Length 4–128, default 16.
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    const len = Math.min(Math.max(parseInt(n) || 16, 4), 128)
    return Array.from(crypto.getRandomValues(new Uint8Array(len)), b => chars[b % chars.length]).join('')
  },
  sha: async (t) => {
    // SHA-256 hex digest via Web Crypto API
    if (!t) return 'Usage: sha <text>'
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  },
  lorem: (n) => {
    // Returns n sentences of Lorem ipsum placeholder text (max 5)
    const s = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    ]
    return s.slice(0, Math.min(Math.max(parseInt(n) || 1, 1), 5)).join(' ')
  },

  // --- Encoding ---
  b64:   (t) => btoa(unescape(encodeURIComponent(t))),
  b64d:  (t) => { try { return decodeURIComponent(escape(atob(t))) } catch { return '(invalid base64)' } },
  jwt:   (t) => {
    // Decodes the payload section of a JWT (no signature verification)
    try {
      const p = t.split('.')[1]
      if (!p) return '(invalid JWT)'
      return JSON.stringify(JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/'))))
    } catch { return '(invalid JWT)' }
  },

  // --- Time ---
  ts:    ()  => String(Math.floor(Date.now() / 1000)),
  now:   ()  => new Date().toISOString(),
  cal: (t) => {
    // Day of week for a given date, or today if no argument.
    // T12:00:00 avoids UTC midnight off-by-one in local timezones.
    const d = t ? new Date(t + 'T12:00:00') : new Date()
    if (isNaN(d)) return 'Invalid date  e.g. cal 2026-03-15'
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  },
  age: (t) => {
    // Age in years from a birthdate (YYYY-MM-DD)
    if (!t) return 'Usage: age <YYYY-MM-DD>'
    const birth = new Date(t + 'T12:00:00')
    if (isNaN(birth)) return 'Invalid date  e.g. age 1990-05-01'
    const now = new Date()
    let a = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) a--
    return `${a} years old`
  },

  // --- String transforms ---
  upper: (t) => t.toUpperCase(),
  lower: (t) => t.toLowerCase(),
  slug:  (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  camel: (t) => t.trim().split(/[-_\s]+/).map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
  snake: (t) => t.trim().replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase(),
  wc: (t) => {
    if (!t) return 'Usage: wc <text>'
    return `${t.trim().split(/\s+/).length} words, ${t.length} chars`
  },

  // --- CSS / units ---
  px: (t) => {
    // Converts px → rem or rem → px assuming 16px base font size
    if (!t) return 'Usage: px <value>  e.g. px 24  or  px 1.5rem'
    if (t.endsWith('rem')) { const r = parseFloat(t); return isNaN(r) ? 'Invalid' : `${r * 16}px` }
    const n = parseFloat(t); return isNaN(n) ? 'Invalid' : `${+(n / 16).toFixed(4)}rem`
  },

  // --- Dictionary lookups (local, no network) ---
  ascii: (t) => {
    // Converts char → decimal code, or decimal → char. Multiple chars show a table.
    if (!t) return 'Usage: ascii <char or number>  e.g. ascii A  or  ascii 65'
    const n = parseInt(t)
    if (!isNaN(n) && String(n) === t.trim()) {
      if (n < 0 || n > 127) return 'Out of ASCII range (0–127)'
      return `${n} → '${String.fromCharCode(n)}'`
    }
    if (t.length === 1) return `'${t}' → ${t.charCodeAt(0)}`
    return t.split('').map(c => `${c}=${c.charCodeAt(0)}`).join('  ')
  },
  http: (code) => {
    const codes = {
      100:'Continue', 101:'Switching Protocols', 102:'Processing',
      200:'OK', 201:'Created', 202:'Accepted', 204:'No Content', 206:'Partial Content',
      301:'Moved Permanently', 302:'Found', 303:'See Other', 304:'Not Modified',
      307:'Temporary Redirect', 308:'Permanent Redirect',
      400:'Bad Request', 401:'Unauthorized', 403:'Forbidden', 404:'Not Found',
      405:'Method Not Allowed', 408:'Request Timeout', 409:'Conflict', 410:'Gone',
      413:'Payload Too Large', 415:'Unsupported Media Type', 422:'Unprocessable Entity',
      429:'Too Many Requests',
      500:'Internal Server Error', 501:'Not Implemented', 502:'Bad Gateway',
      503:'Service Unavailable', 504:'Gateway Timeout',
    }
    if (!code) return 'Usage: http <code>  e.g. http 404'
    const n = parseInt(code)
    return codes[n] ? `${n} ${codes[n]}` : `Unknown: ${code}`
  },
  port: (p) => {
    const ports = {
      20:'FTP data', 21:'FTP control', 22:'SSH', 23:'Telnet', 25:'SMTP',
      53:'DNS', 80:'HTTP', 110:'POP3', 143:'IMAP', 443:'HTTPS',
      465:'SMTPS', 587:'SMTP submission', 993:'IMAPS', 995:'POP3S',
      3000:'Node.js (dev)', 3306:'MySQL', 5000:'Flask (dev)', 5432:'PostgreSQL',
      5672:'AMQP / RabbitMQ', 6379:'Redis', 8000:'Django (dev)', 8080:'HTTP alt',
      8443:'HTTPS alt', 9200:'Elasticsearch', 27017:'MongoDB',
    }
    if (!p) return 'Usage: port <number>  e.g. port 443'
    const n = parseInt(p)
    return ports[n] ? `${n} — ${ports[n]}` : `Unknown: ${p}`
  },
  mime: (ext) => {
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
  },
  chmod: (octal) => {
    // Converts octal permission string to symbolic notation (e.g. 755 → rwxr-xr-x)
    if (!octal) return 'Usage: chmod <octal>  e.g. chmod 755'
    if (!/^[0-7]{3,4}$/.test(octal)) return 'Expected 3–4 octal digits  e.g. chmod 755'
    const bits = octal.length === 4 ? octal.slice(1) : octal
    const map = ['---','--x','-w-','-wx','r--','r-x','rw-','rwx']
    const sym = bits.split('').map(d => map[parseInt(d)]).join('')
    return `${sym}  (owner:${map[parseInt(bits[0])]} group:${map[parseInt(bits[1])]} other:${map[parseInt(bits[2])]})`
  },

  // --- Geography (local) ---
  cc: (t) => {
    // ISO 3166-1 alpha-2 country code → name / currency / dial code / flag emoji
    if (!t) return 'Usage: cc <code>  e.g. cc JP'
    const countries = {
      AU:{n:'Australia',      c:'AUD $',   d:'+61'},
      AT:{n:'Austria',        c:'EUR €',   d:'+43'},
      BE:{n:'Belgium',        c:'EUR €',   d:'+32'},
      BR:{n:'Brazil',         c:'BRL R$',  d:'+55'},
      CA:{n:'Canada',         c:'CAD $',   d:'+1'},
      CN:{n:'China',          c:'CNY ¥',   d:'+86'},
      HR:{n:'Croatia',        c:'EUR €',   d:'+385'},
      CZ:{n:'Czechia',        c:'CZK Kč',  d:'+420'},
      DK:{n:'Denmark',        c:'DKK kr',  d:'+45'},
      EG:{n:'Egypt',          c:'EGP £',   d:'+20'},
      FI:{n:'Finland',        c:'EUR €',   d:'+358'},
      FR:{n:'France',         c:'EUR €',   d:'+33'},
      DE:{n:'Germany',        c:'EUR €',   d:'+49'},
      GR:{n:'Greece',         c:'EUR €',   d:'+30'},
      HK:{n:'Hong Kong',      c:'HKD $',   d:'+852'},
      HU:{n:'Hungary',        c:'HUF Ft',  d:'+36'},
      IN:{n:'India',          c:'INR ₹',   d:'+91'},
      ID:{n:'Indonesia',      c:'IDR Rp',  d:'+62'},
      IE:{n:'Ireland',        c:'EUR €',   d:'+353'},
      IL:{n:'Israel',         c:'ILS ₪',   d:'+972'},
      IT:{n:'Italy',          c:'EUR €',   d:'+39'},
      JP:{n:'Japan',          c:'JPY ¥',   d:'+81'},
      KR:{n:'South Korea',    c:'KRW ₩',   d:'+82'},
      MY:{n:'Malaysia',       c:'MYR RM',  d:'+60'},
      MX:{n:'Mexico',         c:'MXN $',   d:'+52'},
      NL:{n:'Netherlands',    c:'EUR €',   d:'+31'},
      NZ:{n:'New Zealand',    c:'NZD $',   d:'+64'},
      NG:{n:'Nigeria',        c:'NGN ₦',   d:'+234'},
      NO:{n:'Norway',         c:'NOK kr',  d:'+47'},
      PK:{n:'Pakistan',       c:'PKR ₨',   d:'+92'},
      PH:{n:'Philippines',    c:'PHP ₱',   d:'+63'},
      PL:{n:'Poland',         c:'PLN zł',  d:'+48'},
      PT:{n:'Portugal',       c:'EUR €',   d:'+351'},
      RO:{n:'Romania',        c:'RON lei', d:'+40'},
      RU:{n:'Russia',         c:'RUB ₽',   d:'+7'},
      SA:{n:'Saudi Arabia',   c:'SAR ﷼',   d:'+966'},
      SG:{n:'Singapore',      c:'SGD $',   d:'+65'},
      ZA:{n:'South Africa',   c:'ZAR R',   d:'+27'},
      ES:{n:'Spain',          c:'EUR €',   d:'+34'},
      SE:{n:'Sweden',         c:'SEK kr',  d:'+46'},
      CH:{n:'Switzerland',    c:'CHF Fr',  d:'+41'},
      TW:{n:'Taiwan',         c:'TWD $',   d:'+886'},
      TH:{n:'Thailand',       c:'THB ฿',   d:'+66'},
      TR:{n:'Turkey',         c:'TRY ₺',   d:'+90'},
      UA:{n:'Ukraine',        c:'UAH ₴',   d:'+380'},
      AE:{n:'UAE',            c:'AED د.إ', d:'+971'},
      GB:{n:'United Kingdom', c:'GBP £',   d:'+44'},
      US:{n:'United States',  c:'USD $',   d:'+1'},
      VN:{n:'Vietnam',        c:'VND ₫',   d:'+84'},
    }
    const key = t.trim().toUpperCase()
    const entry = countries[key]
    if (!entry) return `Unknown: ${t}  (ISO 3166-1 alpha-2, e.g. JP US DE)`
    // Flag emoji uses surrogate pairs, which are invalid in Chrome Omnibox XML — use [XX] prefix
    return `[${key}] ${entry.n} / ${entry.c} / ${entry.d}`
  },
  tel: (t) => {
    // International dial code → country name(s). Accepts +81 or 81.
    if (!t) return 'Usage: tel <dial-code>  e.g. tel +81  or  tel 81'
    const dial = {
      '1':'United States / Canada', '7':'Russia / Kazakhstan',
      '20':'Egypt', '27':'South Africa', '30':'Greece', '31':'Netherlands',
      '32':'Belgium', '33':'France', '34':'Spain', '36':'Hungary',
      '39':'Italy', '40':'Romania', '41':'Switzerland', '43':'Austria',
      '44':'United Kingdom', '45':'Denmark', '46':'Sweden', '47':'Norway',
      '48':'Poland', '49':'Germany', '52':'Mexico', '54':'Argentina',
      '55':'Brazil', '56':'Chile', '57':'Colombia', '60':'Malaysia',
      '61':'Australia', '62':'Indonesia', '63':'Philippines',
      '64':'New Zealand', '65':'Singapore', '66':'Thailand',
      '81':'Japan', '82':'South Korea', '84':'Vietnam', '86':'China',
      '90':'Turkey', '91':'India', '92':'Pakistan', '94':'Sri Lanka',
      '98':'Iran',
      '212':'Morocco', '213':'Algeria', '216':'Tunisia',
      '221':'Senegal', '233':'Ghana', '234':'Nigeria',
      '254':'Kenya', '255':'Tanzania', '256':'Uganda',
      '351':'Portugal', '352':'Luxembourg', '353':'Ireland', '354':'Iceland',
      '358':'Finland', '380':'Ukraine', '381':'Serbia', '385':'Croatia',
      '420':'Czechia', '421':'Slovakia',
      '852':'Hong Kong', '855':'Cambodia', '880':'Bangladesh', '886':'Taiwan',
      '961':'Lebanon', '962':'Jordan', '964':'Iraq', '965':'Kuwait',
      '966':'Saudi Arabia', '971':'UAE', '972':'Israel', '974':'Qatar',
      '977':'Nepal', '994':'Azerbaijan', '995':'Georgia', '998':'Uzbekistan',
    }
    const code = t.trim().replace(/^\+/, '')
    return dial[code] ? `+${code} — ${dial[code]}` : `Unknown: +${code}`
  },

  // --- Lookup (API) ---
  zip: async (code) => {
    // Japanese postal code → address via zipcloud.ibsnet.co.jp (free, no key)
    if (!code) return 'Usage: zip <postal-code>  e.g. zip 150-0001'
    const normalized = code.replace(/-/g, '')
    if (!/^\d{7}$/.test(normalized)) return 'Expected 7 digits  e.g. zip 1500001'
    const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalized}`)
    const data = await res.json()
    if (!data.results) return `Not found: ${code}`
    const r = data.results[0]
    return `${r.address1}${r.address2}${r.address3}`
  },

  '?': () => 'uuid  pw [n]  sha  b64  b64d  jwt  ts  now  cal [date]  age <date>  upper  lower  slug  camel  snake  lorem [n]  wc  px <n>  ascii <c>  http <code>  port <n>  mime <ext>  chmod <octal>  cc <code>  tel <dial>  zip <postal>',
}

async function run(input) {
  if (!input.trim()) return 'Type a command — try: ?'
  const [cmd, ...rest] = input.trim().split(/\s+/)
  const fn = commands[cmd]
  if (!fn) return `Unknown: "${cmd}" — try: ?`
  return (await fn(rest.join(' '))) || '(empty result)'
}

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  run(text).then(result => {
    chrome.omnibox.setDefaultSuggestion({ description: escapeXml(result) })
  })
})

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const result = await run(text)
  await copyToClipboard(result)
})

async function copyToClipboard(text) {
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL('offscreen.html'),
    reasons: ['CLIPBOARD'],
    justification: 'Copy command result to clipboard',
  }).catch(() => {}) // already open = fine
  await chrome.runtime.sendMessage({ type: 'copy', text })
  setTimeout(() => chrome.offscreen.closeDocument().catch(() => {}), 300)
}

function escapeXml(s) {
  return String(s)
    // Strip XML-invalid control characters (U+0000–U+0008, U+000B, U+000C, U+000E–U+001F)
    // and surrogate pairs (flag emoji, etc.) which crash Chrome's Omnibox XML parser
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
