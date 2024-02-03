/**
 * @param {number} value
 * @param {number} maxValue
 * @param {number} minValue
 * @see {@link https://en.wikipedia.org/wiki/Clamping_(graphics)}
 */
function clamp(value, maxValue, minValue) {
  return Math.max(Math.min(maxValue, value), minValue);
}

export { clamp as default };
