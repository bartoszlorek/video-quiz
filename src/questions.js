/**
 * Compatibility with Node.js
 */
function encodeQuestions(data) {
  const encoded = encodeURIComponent(JSON.stringify(data));
  return Buffer.from(encoded).toString('base64');
}

/**
 * Compatibility with the browser
 */
function decodeQuestions(data) {
  return JSON.parse(decodeURIComponent(window.atob(data)));
}

module.exports = {
  encodeQuestions,
  decodeQuestions,
};
