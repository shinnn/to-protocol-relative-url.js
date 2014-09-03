/*!
 * to-protocol-relative-url.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/to-protocol-relative-url.js
*/

window.stripProtocol = function toProtocolRelativeUrl(url) {
  if (typeof url !== 'string') {
    throw new TypeError(url + ' is not a string.');
  }

  return url.replace(/^[a-zA-Z]*?:(?=\/\/)/, '');
};
