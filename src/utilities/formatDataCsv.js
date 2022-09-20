const { EOL } = require('os');

/**
 * Format for CSV export.
 * @param {*} data
 *  Rows of arrays of strings
 * @returns
 */
const formatData = (data) => {
  let ret = '';
  data.forEach((row) => {
    ret += `${row.concat(',').slice(0, -1)}${EOL}`;
  });

  ret += EOL;
  return ret;
};

export default formatData;
