export const formatPatternName = (pattern: string) => {
  return pattern
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}
