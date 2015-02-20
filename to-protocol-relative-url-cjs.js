/*!
 * to-protocol-relative-url.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/to-protocol-relative-url.js
*/
module.exports = function toProtocolRelativeUrl(url) {
  'use strict';

  if (typeof url !== 'string') {
    throw new TypeError(
      url +
      ' is not a string. Argument to to-protocol-relative-url must be a URL.'
    );
  }
  return url.replace(/^[a-zA-Z]*?:(?=\/\/)/, '');
};
