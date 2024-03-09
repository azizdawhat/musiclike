/**
 * @param {function(this: T, ...U): V} func
 * @param {ClassMethodDecoratorContext<T, func>}
 * @template T, U, V
 */ // eslint-disable-next-line object-curly-newline
function bind(func, { addInitializer, kind, name, private: isPrivate }) {
  if (kind === 'method') {
    if (isPrivate) {
      throw new Error('Cannot bind a private method!');
    }

    addInitializer(function initializer() {
      this[name] = /** @type {func} */ (this[name]).bind(this);
    });
  }
}

/**
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

export { bind, construct };
