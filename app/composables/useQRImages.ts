export const useQRImages = () => {
  const images = Array.from(
    { length: 18 },
    (_, i) => `/qr-logo/qr-logo-${i}.png`
  );
  return images;
};
