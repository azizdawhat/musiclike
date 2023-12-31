import call from './Note.call.js';
/* eslint-disable function-paren-newline, indent, no-use-before-define */
@call
class Note {
  /**
   * @readonly
   * @static
   * @memberof Note
   */
  static get LenUNITS() {
    return Object.freeze(
      /** @type {const} */ ([
        '%',
        'Q',
        'cap',
        'ch',
        'cm',
        'cqb',
        'cqh',
        'cqi',
        'cqmax',
        'cqmin',
        'cqw',
        'dvb',
        'dvh',
        'dvi',
        'dvmax',
        'dvmin',
        'dvw',
        'em',
        'ex',
        'ic',
        'in',
        'lh',
        'lvb',
        'lvh',
        'lvi',
        'lvmax',
        'lvmin',
        'lvw',
        'mm',
        'pc',
        'pt',
        'px',
        'rcap',
        'rch',
        'rem',
        'rex',
        'ric',
        'rlh',
        'svb',
        'svh',
        'svi',
        'svmax',
        'svmin',
        'svw',
        'vb',
        'vh',
        'vi',
        'vmax',
        'vmin',
        'vw',
        // eslint-disable-next-line comma-dangle
      ])
    );
  }

  /**
   * @param {Note|number|string} length
   */ // eslint-disable-next-line consistent-return
  static parseLenUnit(length) {
    if (isSymbol(length)) {
      // prettier-ignore
      throw new TypeError('length is of type symbol! Not appropriate for String coercion.',
      { cause: { value: length } });
    }

    const value = Number.parseFloat(length);

    if (Number.isFinite(value) && value) {
      const [lenUnit] = `${length}`.match(/\D+$/) ?? [];

      if (lenUnit) {
        return lenUnit;
      }
    }
  }

  /**
   */
  #lenUnit = '';

  /**
   */
  #value = Number.NaN;

  /**
   * @param {Note|number|string} [length]
   * @param {(typeof Note)['LenUNITS'][number]} [unit]
   */
  constructor(length, unit) {
    if (isSymbol(length)) {
      // prettier-ignore
      throw new TypeError('length is of type symbol! Not appropriate for String coercion.',
      { cause: { value: length } });
    }

    this.#value = Number.parseFloat(length);

    if (Number.isFinite(this.#value) && this.#value) {
      this.#lenUnit = /** @type {typeof Note} */ (this.constructor).parseLenUnit(length);

      if (!this.#lenUnit) {
        // prettier-ignore
        if (!isObject(unit) && !isString(unit) && unit) {
          if (isSymbol(unit)) {
            throw new TypeError('unit is of type symbol! Not appropriate for String coercion.',
            { cause: { value: unit } });
          }

          throw new Error(`unit is of type ${typeof unit}! String coercion value wouldn't be a valid CSS <length> unit.`,
          { cause: { value: unit } });
        }

        this.#lenUnit = `${unit ?? ''}`;

        if (this.#lenUnit.startsWith('[object ')) {
          this.#lenUnit = '';
        }
      }
    }
  }

  /**
   * @param {'string'} [hint]
   */
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.#value}${this.#lenUnit}`;
    }

    return this.#value;
  }

  /**
   */ // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return /** @type {const} */ ('Note');
  }
}
/* eslint-enable function-paren-newline, indent, no-use-before-define */
/**
 * @param {?} value
 */
function isObject(value) {
  return !!value && typeof value === 'object';
}

/**
 * @param {?} value
 */
function isString(value) {
  return typeof (value ?? {}).valueOf() === 'string';
}

/**
 * @param {?} value
 */
function isSymbol(value) {
  return typeof value === 'symbol';
}
// eslint-disable-next-line object-curly-newline
export { Note as default, isObject, isString, isSymbol };
