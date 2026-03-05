let _names = []
export function setCommandNames(names) { _names = names }
export const command = () => _names.join('  ')
