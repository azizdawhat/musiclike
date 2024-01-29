/**
 * @param {function} value
 * @param {ClassMemberDecoratorContext}
 */ // eslint-disable-next-line object-curly-newline
function bind(value, { addInitializer, kind, name, static: isStatic }) {
  if (isStatic && kind === 'method') {
    addInitializer(function callbackFn() {
      this[name] = /** @type {value} */ (this[name]).bind(this);
    });
  }
}

export { bind as default };
