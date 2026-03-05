// --- Generators ---
import { command as uuid }  from './uuid.js'
import { command as pw }    from './pw.js'
import { command as sha }   from './sha.js'
import { command as lorem } from './lorem.js'

// --- Encoding ---
import { command as b64 }   from './b64.js'
import { command as b64d }  from './b64d.js'
import { command as jwt }   from './jwt.js'

// --- Time ---
import { command as ts }    from './ts.js'
import { command as now }   from './now.js'
import { command as cal }   from './cal.js'
import { command as age }   from './age.js'

// --- String transforms ---
import { command as upper } from './upper.js'
import { command as lower } from './lower.js'
import { command as slug }  from './slug.js'
import { command as camel } from './camel.js'
import { command as snake } from './snake.js'
import { command as wc }    from './wc.js'

// --- Math ---
import { command as calc }  from './calc.js'

// --- CSS / units ---
import { command as px }    from './px.js'

// --- Dictionary lookups ---
import { command as ascii } from './ascii.js'
import { command as http }  from './http.js'
import { command as port }  from './port.js'
import { command as mime }  from './mime.js'
import { command as chmod } from './chmod.js'

// --- Geography ---
import { command as cc }    from './cc.js'
import { command as tel }   from './tel.js'

// --- Lookup (API) ---
import { command as zip }   from './zip.js'

// --- Help ---
import { command as help, setCommandNames } from './help.js'

export const commands = {
  uuid, pw, sha, lorem,
  b64, b64d, jwt,
  ts, now, cal, age,
  upper, lower, slug, camel, snake, wc,
  calc, px,
  ascii, http, port, mime, chmod,
  cc, tel, zip,
  '?': help,
}

setCommandNames(Object.keys(commands).filter(n => n !== '?'))
