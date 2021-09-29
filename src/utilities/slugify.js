export const slugify = (str = '') =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/i, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
