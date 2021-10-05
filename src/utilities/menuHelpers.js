// Helper function to check if something has aria-expanded set to true
export const isExpanded = (x) => x.getAttribute('aria-expanded') === 'true';

// Helper function to check if window is undefined
export const isBrowser = typeof window !== 'undefined';
