/* eslint-disable comma-dangle, consistent-return, no-use-before-define */
class Note {
  /**
   * @memberof Note
   * @readonly
   * @static
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
      ])
    );
  }

  /**
   * @param {NonNullable<ConstructorParameters<typeof Note>[0]>} length
   */
  static parseLenUnit(length) {
    const value = Number.parseFloat(length);

    if (Number.isFinite(value) && value) {
      /** @type {(typeof Note)['LenUNITS'][number][]} */
      const [lenUnit] = `${length}`.match(/\D+$/) || [];

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
   * @param {(typeof Note)['LenUNITS'][number]} [lenUnit]
   */
  constructor(length, lenUnit = '') {
    this.#value = Number.parseFloat(length);

    if (Number.isFinite(this.#value) && this.#value) {
      if (/\D+$/.test(length)) {
        this.#lenUnit = /** @type {typeof Note} */ (this.constructor).parseLenUnit(length);
      } else {
        if (!isString(lenUnit) && typeof lenUnit !== 'object') {
          throw new TypeError(
            `Cannot convert a ${capitalize(typeof lenUnit)} value to a valid CSS <length> unit`,
            { cause: { value: lenUnit } }
          );
        }

        const str = `${lenUnit}`;

        if (!str.startsWith('[object ') && str !== 'null') {
          this.#lenUnit = str;
        }
      }
    }
  }

  /**
   */
  toString() {
    return `${this.#value}${this.#lenUnit}`;
  }

  /**
   */
  valueOf() {
    return this.#value;
  }
}
/* eslint-enable comma-dangle, consistent-return, no-use-before-define */
/**
 * @param {string} str
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * @param {?} value
 */
function isString(value) {
  return typeof (value ?? {}).valueOf() === 'string';
}

export { Note as default, isString };
