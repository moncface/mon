// Expression evaluator without eval (blocked in MV3 service workers).
// Supports: + - * / ** parentheses sqrt/floor/ceil/round/abs/log
// Constants: pi, e  |  Percent: "15% of 3980", "3980 + 10%", "3980 - 10%"
export const command = (expr) => {
  if (!expr) return 'Usage: calc <expr>  e.g. calc 1920/1080  or  calc 15% of 3980'
  let s = expr.trim()
    .replace(/(\d+(?:\.\d+)?)\s*%\s+of\s+(\d+(?:\.\d+)?)/gi, '($1/100*$2)')
    .replace(/(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)%/g,     '($1+$1*$2/100)')
    .replace(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)%/g,      '($1-$1*$2/100)')
    .replace(/\bpi\b/gi, String(Math.PI))
    .replace(/\be\b/g,   String(Math.E))
  let i = 0
  const skip = () => { while (s[i] === ' ') i++ }
  const parseExpr = () => {
    let v = parseTerm(); skip()
    while (s[i] === '+' || s[i] === '-') {
      const op = s[i++]; skip(); const r = parseTerm(); skip()
      v = op === '+' ? v + r : v - r
    }
    return v
  }
  const parseTerm = () => {
    let v = parsePow(); skip()
    while ((s[i] === '*' || s[i] === '/') && s.slice(i, i+2) !== '**') {
      const op = s[i++]; skip(); const r = parsePow(); skip()
      v = op === '*' ? v * r : v / r
    }
    return v
  }
  const parsePow = () => {
    const v = parseUnary(); skip()
    if (s.slice(i, i+2) === '**') { i += 2; skip(); return Math.pow(v, parsePow()) }
    return v
  }
  const parseUnary = () => {
    skip()
    if (s[i] === '-') { i++; return -parsePrimary() }
    if (s[i] === '+') { i++; return  parsePrimary() }
    return parsePrimary()
  }
  const parsePrimary = () => {
    skip()
    if (s[i] === '(') {
      i++; const v = parseExpr(); skip(); if (s[i] === ')') i++; return v
    }
    const fns = {sqrt:Math.sqrt, floor:Math.floor, ceil:Math.ceil, round:Math.round, abs:Math.abs, log:Math.log, sin:Math.sin, cos:Math.cos, tan:Math.tan}
    for (const fn of Object.keys(fns)) {
      if (s.slice(i).toLowerCase().startsWith(fn + '(')) {
        i += fn.length + 1; const v = parseExpr(); skip(); if (s[i] === ')') i++
        return fns[fn](v)
      }
    }
    const m = s.slice(i).match(/^\d+(?:\.\d+)?/)
    if (m) { i += m[0].length; return parseFloat(m[0]) }
    throw new Error(`unexpected "${s[i] ?? 'end'}"`)
  }
  try {
    const result = parseExpr()
    if (!isFinite(result)) return isNaN(result) ? 'Error: invalid expression' : String(result)
    const fmt = Number.isInteger(result) ? result : +result.toPrecision(10)
    return `${expr.trim()} = ${fmt}`
  } catch(e) {
    return `Error: ${e.message}  (e.g. calc 3980*0.15)`
  }
}
