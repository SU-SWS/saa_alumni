export const slugify = (str = '') =>
  str
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/i, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
