/**
 * Compatible with the Node.js.
 */
exports.encodeBase64 = function (data) {
  const encoded = encodeURIComponent(JSON.stringify(data));
  return Buffer.from(encoded).toString('base64');
};

/**
 * Compatible with the browser environment.
 */
exports.decodeBase64 = function (data) {
  return JSON.parse(decodeURIComponent(window.atob(data)));
};
