/**
 * @param {T|T[]} value
 * @template T
 */
function castArray(value) {
  if (Array.isArray(value)) {
    return [...value];
  }

  return [value];
}

export { castArray as default };
