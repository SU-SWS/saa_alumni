export const focusElement = (selector = '') => {
  if (global.document !== 'undefined') {
    const el = document.querySelector(selector);

    if (el && el.focus) el.focus();
  }
};
