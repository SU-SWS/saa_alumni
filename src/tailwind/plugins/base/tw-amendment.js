/**
 * Amends utilities provided by TailwindCSS core.
 */

module.exports = function () {
  return function ({ addBase }) {
    addBase({
      // TW su-break-words utility uses "line-wrap: break-word" which doesn't support break up long email addresses
      // Adding "word-break: break-word" add support for long email addresses
      ".su-break-words": {
        wordBreak: "break-word",
      },
    });
  };
};
