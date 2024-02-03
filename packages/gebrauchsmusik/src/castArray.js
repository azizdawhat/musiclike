/**
 * @param {T|T[]} value
 * @template T
 */
function castArray(value) {
  return Array.isArray(value) ? value.slice() : [value];
}

export { castArray as default };
