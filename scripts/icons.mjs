export const arrowUpRight = '<svg class="inline-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M4 12 12 4M5 4h7v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const socialIcon = path => `<svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true" focusable="false">${path}</svg>`;

export const socialIcons = {
  LinkedIn: socialIcon('<circle cx="5" cy="5" r="2.25"/><path d="M3 9h4v12H3zm7 0h3.8v1.65a4.35 4.35 0 0 1 3.6-1.94c3.85 0 4.6 2.53 4.6 5.81V21h-4v-5.75c0-1.37-.02-3.14-1.92-3.14-1.93 0-2.08 1.5-2.08 3.04V21h-4z"/>'),
  TikTok: socialIcon('<path d="M12.5 1h3.8c.24 3.02 1.94 4.74 5.2 4.98v3.83a8.47 8.47 0 0 1-5.2-1.71v7.32a7.4 7.4 0 1 1-7.4-7.4c.51 0 1.02.05 1.5.15v3.99a3.57 3.57 0 1 0 2.1 3.26V1z"/>')
};
