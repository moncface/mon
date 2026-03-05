import { commands } from './commands/index.js'

async function run(input) {
  const trimmed = input.trim()
  if (!trimmed) return 'Type a command — try: ?'
  const spaceIdx = trimmed.indexOf(' ')
  const cmd = spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)
  const arg = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1)
  const fn = commands[cmd]
  if (!fn) return `Unknown: "${cmd}" — try: ?`
  return (await fn(arg)) || '(empty result)'
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
