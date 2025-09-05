import type {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";

export const defaultQROption = {
  width: 250,
  height: 250,
  type: "canvas" as DrawType,
  margin: 10,
  qrOptions: {
    typeNumber: 0 as TypeNumber,
    mode: "Byte" as Mode,
    errorCorrectionLevel: "M" as ErrorCorrectionLevel,
  },
  image: "/qr-logo/qr-logo-0.png",
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    color: "#000000",
    type: "square" as DotType,
    gradient: null,
  },
  backgroundOptions: {
    color: "#ffffff",
    gradient: null,
  },
  cornersSquareOptions: {
    color: "#000000",
    type: "square" as CornerSquareType,
    gradient: null,
  },
  cornersDotOptions: {
    type: "square" as CornerDotType,
    color: "#000000",
    gradient: null,
  },
};

export const qrTemplates = [
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-2.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#007AFF",
      type: "extra-rounded" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#ffffff",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#007AFF",
      type: "rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#007AFF",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-3.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#f44336",
      type: "rounded" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#f5f5f5",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#f44336",
      type: "square" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#f44336",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-4.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#4285f4",
      type: "dots" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#ffffff",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#4285f4",
      type: "extra-rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#4285f4",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-10.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#ff5722",
      type: "dots" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#f5f5f5",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#ff5722",
      type: "extra-rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#ff5722",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-6.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#2196f3",
      type: "square" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#ffffff",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#2196f3",
      type: "square" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#2196f3",
      type: "square" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-12.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#4caf50",
      type: "rounded" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#f0f0f0",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#4caf50",
      type: "rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#4caf50",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-15.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#03a9f4",
      type: "dots" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#eeeeee",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#03a9f4",
      type: "square" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#03a9f4",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-0.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#9c27b0",
      type: "classy" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#ffffff",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#9c27b0",
      type: "extra-rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#9c27b0",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-14.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#673ab7",
      type: "square" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#f5f5f5",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#673ab7",
      type: "rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#673ab7",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
  {
    width: 150,
    height: 150,
    type: "canvas" as DrawType,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    image: "/qr-logo/qr-logo-9.png",
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
    },
    dotsOptions: {
      color: "#ff9800",
      type: "dots" as DotType,
      gradient: null,
    },
    backgroundOptions: {
      color: "#ffffff",
      gradient: null,
    },
    cornersSquareOptions: {
      color: "#ff9800",
      type: "extra-rounded" as CornerSquareType,
      gradient: null,
    },
    cornersDotOptions: {
      color: "#ff9800",
      type: "dot" as CornerDotType,
      gradient: null,
    },
  },
];
