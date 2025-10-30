export type QRFrameType = {
  type: string
  text: string
  text_color: string
  fill_color: string
}

export type QRColorConfig = {
  coloring: 'solid' | 'linear'
  rotation: number
  colors: string[]
}

export type QRDotsConfig = QRColorConfig & {
  type: 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded'
}

type QRCornersSquareConfig = QRColorConfig & {
  type: 'dot' | 'square' | 'extra-rounded'
}

type QRCornersDotConfig = QRColorConfig & {
  type: 'dot' | 'square'
}

export type QROptions = {
  text: string
  size: number
  margin: number
  type: 'png' | 'jpg' | 'svg'
  dots: QRDotsConfig
  cornersSquare: QRCornersSquareConfig
  cornersDot: QRCornersDotConfig
  background: QRColorConfig
  logoUrl: string
  frame: null | QRFrameType
}

export interface QRConfigData {
  url?: string
  text?: string
  email?: string
  subject?: string
  body?: string
  phone?: string
  message?: string
  latitude?: string
  longitude?: string
  locationName?: string
  type?: string
  amount?: string
  currency?: string
  store?: string
  ssid?: string
  password?: string
  security?: string
  hidden?: boolean
}

export type ColorInputType = {
  coloring: 'solid' | 'linear'
  rotation: number
  colors: string[]
}
