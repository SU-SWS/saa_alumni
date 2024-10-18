/**
 * UTM Parameters
 * @param {*} url
 * @param {*} utms
 * @returns
 */
export const checkParams = (url, utms) => {
  let linkUrl = url;
  if (linkUrl.match(/\?/) && utms.length) {
    linkUrl += `&${utms}`;
  } else if (utms.length) {
    linkUrl += `?${utms}`;
  }
  return linkUrl;
};
