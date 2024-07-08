export const slugify = (str = '') =>
  str
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gi, '-') // Replace all non-alphanum characters with hyphens
    .replaceAll(/-{2,}/g, '-') // Replace groups of multiple hyphens with a single hyphen
    .replace(/^-/, '') // No leading hyphen
    .replace(/-$/, ''); // No trailing hyphen
