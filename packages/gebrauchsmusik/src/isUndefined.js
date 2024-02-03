/**
 * @param {?} value
 * @returns {value is undefined}
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

export { isUndefined as default };
