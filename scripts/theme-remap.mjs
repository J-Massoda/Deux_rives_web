// Recolours the legacy stylesheets to the white / bright green / bright orange palette at build time.
// The legacy files keep their layout rules; only colour values and font stacks change.
// The new design layer (src/site.css) is loaded after them and carries the full visual system.

const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

function toHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}
const hex = n => n.toString(16).padStart(2, '0');
const parseHex = h => {
  h = h.replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.split('').map(c => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
};

// Palette (kept in sync with the custom properties at the top of src/site.css).
export const palette = {
  white: [255, 255, 255], soft: [244, 246, 245], tint: [234, 248, 241], line: [230, 234, 232],
  ink: [11, 20, 16], ink2: [28, 38, 34], muted: [91, 104, 99],
  green: [18, 183, 106], greenText: [10, 133, 80], greenDeep: [6, 90, 56],
  orange: [255, 90, 31], orangeText: [217, 63, 11], orangeSoft: [255, 237, 229]
};

function remapRgb(r, g, b) {
  const [h, s, l] = toHsl(r, g, b);
  const greenish = h >= 70 && h <= 175;
  const warm = h >= 15 && h < 60;
  if (l >= 97) return palette.white;
  if (l >= 90) {
    if (greenish && s >= 10) return palette.tint;
    if (warm && s >= 25) return palette.orangeSoft;
    return l >= 94 ? palette.white : palette.soft;
  }
  if (l >= 82) {
    if (greenish && s >= 12) return [189, 239, 214];
    return palette.line;
  }
  // Oranges and reds keep their role and get brighter.
  if ((h < 22 || h >= 345) && s >= 45 && l >= 40) return l >= 62 ? [255, 138, 92] : palette.orange;
  // Ochre / brown accents become the orange used for labels.
  if (warm && s >= 18 && l >= 25 && l < 82) return palette.orangeText;
  // Dark greens and near blacks become ink.
  if (l < 22) return greenish || s < 25 ? palette.ink : [r, g, b];
  if (greenish && s >= 18) {
    if (l < 38) return palette.greenDeep;
    if (l < 60) return palette.greenText;
    return [96, 214, 158];
  }
  if (s < 18) return l < 45 ? palette.ink2 : palette.muted;
  return [r, g, b];
}

const fmt = ([r, g, b], a = 1) => a >= 1 ? `#${hex(r)}${hex(g)}${hex(b)}` : `rgba(${r},${g},${b},${+a.toFixed(3)})`;

export function remapCss(css) {
  css = css.replace(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g, m => {
    const [r, g, b, a] = parseHex(m);
    return fmt(remapRgb(r, g, b), a);
  });
  css = css.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/g, (m, r, g, b, a) => {
    const alpha = a === undefined ? 1 : +a;
    // Translucent shadows and overlays keep their alpha on ink.
    if (alpha < 1 && +r < 80 && +g < 80 && +b < 80) return `rgba(11,20,16,${alpha})`;
    return fmt(remapRgb(+r, +g, +b), alpha);
  });
  // Every legacy font stack moves to the new type system; monospace stays.
  css = css.replace(/font-family\s*:\s*([^;}!]+)/g, (m, stack) =>
    /mono/i.test(stack) ? m : /serif/i.test(stack) && !/sans-serif/i.test(stack) ? 'font-family:var(--font-display)' : 'font-family:var(--font-sans)');
  // Shorthand `font:` declarations that name a family.
  css = css.replace(/font\s*:\s*([^;}]*?)(Georgia|'DM Sans'|Manrope|Inter|"DM Sans")[^;}]*/g, m => m.replace(/(Georgia|'DM Sans'|Manrope|"DM Sans")[^;}]*/, 'var(--font-sans)'));
  return css;
}

export const legacyStyles = ['styles.css', 'portfolio.css', 'editorial.css', 'reference-redesign.css', 'final-design.css', 'wave1-polish.css',
  'product-ui.css', 'flagship-pages.css', 'flagship-apps.css', 'seo-operations.css', 'wave3-apps.css', 'wave3-premium.css', 'wave4-apps.css', 'wave4-editorial.css', 'photography.css'];
