/**
 * @param {?} value
 * @returns {value is number}
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates}
 */
function isNumber(value) {
  return typeof value === 'number';
}

export { isNumber as default };
