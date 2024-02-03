import isSymbol from './_isSymbol.js';

/**
 * @param {?} value
 */
function toString(value) {
  return isSymbol(value) ? value.toString() : `${value}`;
}

export { toString as default };
