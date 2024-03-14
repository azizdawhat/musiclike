/**
 * @param {?} value
 * @returns {value is object}
 */
function isObject(value) {
  return typeof value === 'object';
}

export { isObject as default };
