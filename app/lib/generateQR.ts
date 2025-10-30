export function generateQR(config: object) {
  const url = `https://www.beastscan.com:5000/?json=${encodeURIComponent(JSON.stringify(config))}`
  return url
}
