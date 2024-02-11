/**
 * @param {?} value
 * @returns {value is bigint}
 */
function isBigInt(value) {
  return typeof value === 'bigint';
}

export { isBigInt as default };
