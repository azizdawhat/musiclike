import isSymbol from './isSymbol.js';

/**
 * @param {?} value
 */
function toString(value) {
  if (isSymbol(value)) {
    return value.toString();
  }

  return `${value}`;
}

export { toString as default };
