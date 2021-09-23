import scrollTo from 'gatsby-plugin-smoothscroll';

export const focusElement = (selector = '', { smooth = true } = {}) => {
  if (global.document !== 'undefined') {
    const el = document.querySelector(selector);

    if (el && el.focus) {
      el.focus({ preventScroll: smooth });
      if (smooth) scrollTo(selector);
    }
  }
};
