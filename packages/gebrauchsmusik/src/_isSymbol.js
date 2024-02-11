/**
 * @param {?} value
 * @returns {value is symbol}
 */
function isSymbol(value) {
  return typeof value === 'symbol';
}

export { isSymbol as default };
