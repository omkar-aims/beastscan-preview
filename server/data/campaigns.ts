export interface Campaign {
  id: number;
  type: string;
  name: string;
  config: Record<string, string>;
  qrOption: object;
  url: string;
  mode: "dynamic" | "static";
  createdAt: Date;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    type: "Website",
    name: "My awesome campaign",
    config: {
      url: "https://www.lakhanifinancialservices.com/",
    },
    mode: "dynamic",
    createdAt: new Date(),
    qrOption: {
      width: 280,
      height: 280,
      type: "canvas",
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "M",
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
        type: "extra-rounded",
        gradient: null,
      },
      backgroundOptions: {
        color: "#ffffff",
        gradient: null,
      },
      cornersSquareOptions: {
        color: "#007AFF",
        type: "rounded",
        gradient: null,
      },
      cornersDotOptions: {
        color: "#007AFF",
        type: "dot",
        gradient: null,
      },
      data: "http://localhost:3000/0gkWc8if",
    },
    url: "http://localhost:3000/0gkWc8if",
  },
  {
    id: 1,
    type: "Website",
    name: "My awesome campaign",
    config: {
      url: "https://www.lakhanifinancialservices.com/",
    },
    mode: "dynamic",
    createdAt: new Date(),
    qrOption: {
      width: 280,
      height: 280,
      type: "canvas",
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "M",
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
        type: "extra-rounded",
        gradient: null,
      },
      backgroundOptions: {
        color: "#ffffff",
        gradient: null,
      },
      cornersSquareOptions: {
        color: "#007AFF",
        type: "rounded",
        gradient: null,
      },
      cornersDotOptions: {
        color: "#007AFF",
        type: "dot",
        gradient: null,
      },
      data: "http://localhost:3000/0gkWc8if",
    },
    url: "http://localhost:3000/0gkWc8if",
  },
  {
    id: 1,
    type: "Website",
    name: "My awesome campaign",
    config: {
      url: "https://www.lakhanifinancialservices.com/",
    },
    mode: "dynamic",
    createdAt: new Date(),
    qrOption: {
      width: 280,
      height: 280,
      type: "canvas",
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "M",
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
        type: "extra-rounded",
        gradient: null,
      },
      backgroundOptions: {
        color: "#ffffff",
        gradient: null,
      },
      cornersSquareOptions: {
        color: "#007AFF",
        type: "rounded",
        gradient: null,
      },
      cornersDotOptions: {
        color: "#007AFF",
        type: "dot",
        gradient: null,
      },
      data: "http://localhost:3000/0gkWc8if",
    },
    url: "http://localhost:3000/0gkWc8if",
  },
];
