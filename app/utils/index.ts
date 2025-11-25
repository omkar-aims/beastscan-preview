export function capitalize(str: string | undefined): string {
  if (!str) return "";
  return str?.[0]?.toUpperCase() + str?.slice(1) || "";
}

export function applyTokens(template: string, data: Record<string, any>) {
  let output = template;

  Object.entries(data).forEach(([key, value]) => {
    const token = `[${key}]`;
    output = output.replaceAll(token, value ?? "");
  });

  return output;
}

export function applyColors(
  template: string,
  palette: { primary: string; secondary: string }
) {
  if (!template) return "";

  let output = template;

  const map = {
    PRIMARY_COLOR: palette.primary,
    SECONDARY_COLOR: palette.secondary,
  };

  Object.entries(map).forEach(([key, value]) => {
    output = output.replaceAll(`[${key}]`, value ?? "");
  });

  return output;
}
