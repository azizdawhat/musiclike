/**
 * @param {{new(...args: T[]): U}} Value
 * @param {ClassDecoratorContext}
 * @see {@link https://2ality.com/2022/10/javascript-decorators.html#example%3A-making-classes-function-callable}
 * @template T, U
 */ // eslint-disable-next-line consistent-return
function call(Value, { kind, name: value }) {
  if (kind === 'class') {
    return Object.defineProperty(
      /** @param  {...T} args */ // eslint-disable-next-line prefer-arrow-callback
      function func(...args) {
        return new Value(...args);
      },
      'name', // eslint-disable-next-line comma-dangle
      { value }
    );
  }
}

export { call as default };
