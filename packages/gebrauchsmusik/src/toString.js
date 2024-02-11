/**
 * @param {?} value
 */
function toString(value) {
  try {
    return `${value}`;
  } catch {
    return /** @type {symbol} */ (value).toString();
  }
}

export { toString as default };
