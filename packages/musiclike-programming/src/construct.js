/**
 * @param {function} func
 * @param {ClassMethodDecoratorContext<?, func>}
 * @todo fix JSDOC types
 * @todo format code by ESLint rules
 */ // prettier-ignore
function construct(func, { kind, name: value, static: isStatic }) {
  if (kind === 'method') {
    return Object.defineProperty(function obj(...args) {
      const value = func.apply(this, args);

      if (isStatic) {
        return new this(value);
      }

      return new this.constructor(value);
    }, 'name', { value });
  }
}

export { construct as default };
