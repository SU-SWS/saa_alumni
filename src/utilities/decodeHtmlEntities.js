/**
 * Use the Dom to decode HTML entities
 * @param {string} str
 * @returns string
 */
export const decodeHtmlEntities = (str) => {
  const tempElement = document.createElement('textarea');
  tempElement.innerHTML = str;
  return tempElement.value;
};
