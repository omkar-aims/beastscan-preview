import { Resvg } from "@resvg/resvg-js";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const fontFamily = (query.font as string) || "Arial";

  const escapeSVG = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const text = escapeSVG(fontFamily);

  const width = 224;
  const height = 24;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="white" />
      <text x="0" y="20" font-family="${fontFamily}" font-size="24px" fill="black">
        ${text}
      </text>
    </svg>
  `;

  try {
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: width } });
    const pngBuffer = resvg.render().asPng();

    setHeader(event, "Content-Type", "image/png");
    return pngBuffer;
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to generate image",
    });
  }
});
