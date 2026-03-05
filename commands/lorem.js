// Returns n sentences of Lorem ipsum placeholder text (max 5)
export const command = (n) => {
  const s = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  ]
  return s.slice(0, Math.min(Math.max(parseInt(n) || 1, 1), 5)).join(' ')
}
