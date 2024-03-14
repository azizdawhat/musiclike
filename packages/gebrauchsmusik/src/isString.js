/**
 * @param {?} value
 * @returns {value is string}
 */
function isString(value) {
  return typeof value === 'string';
}

export { isString as default };
