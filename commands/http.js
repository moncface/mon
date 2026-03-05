export const command = (code) => {
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
}
