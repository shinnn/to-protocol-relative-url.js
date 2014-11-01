/*!
 * to-protocol-relative-url.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/to-protocol-relative-url.js
*/

'use strict';

module.exports = function toProtocolRelativeUrl(url) {
  if (typeof url !== 'string') {
    throw new TypeError(url + ' is not a string. It should be a URL.');
  }

  return url.replace(/^[a-zA-Z]*?:(?=\/\/)/, '');
};
