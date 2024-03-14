/**
 * @param {function(this: T, ...U): V} func
 * @param {ClassMethodDecoratorContext<T, func>}
 * @template T, U, V
 */ // eslint-disable-next-line object-curly-newline
function bind(func, { addInitializer, kind, name, private: isPrivate }) {
  if (kind === 'method') {
    if (isPrivate) {
      throw new SyntaxError(`Private field "#${name.toString()}" cannot be bound!`);
    }

    addInitializer(function initializer() {
      this[name] = /** @type {func} */ (this[name]).bind(this);
    });
  }
}

export { bind as default };
