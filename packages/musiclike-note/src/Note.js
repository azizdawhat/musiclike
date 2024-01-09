/* eslint-disable comma-dangle, no-use-before-define */
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
   * @param {Note|number|string} length
   */ // eslint-disable-next-line consistent-return
  static parseLenUnit(length) {
    if (isSymbol(length)) {
      throw new TypeError('length is of type symbol! Not appropriate for String coercion.', {
        cause: { value: length },
      });
    }

    const value = Number.parseFloat(length);

    if (Number.isFinite(value) && value) {
      /** @type {Array<(typeof Note)['LenUNITS'][number]>} */
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
   * @param {(typeof Note)['LenUNITS'][number]} [lenUnit]
   */
  constructor(length, lenUnit) {
    if (isSymbol(length)) {
      throw new TypeError('length is of type symbol! Not appropriate for String coercion.', {
        cause: { value: length },
      });
    }

    this.#value = Number.parseFloat(length);

    if (Number.isFinite(this.#value) && this.#value) {
      this.#lenUnit = /** @type {typeof Note} */ (this.constructor).parseLenUnit(length);

      if (!this.#lenUnit) {
        if (!isObject(lenUnit) && !isString(lenUnit) && lenUnit) {
          if (isSymbol(lenUnit)) {
            throw new TypeError('lenUnit is of type symbol! Not appropriate for String coercion.', {
              cause: { value: lenUnit },
            });
          }

          throw new TypeError(
            `lenUnit is of type ${typeof lenUnit}! String coercion value wouldn't be a valid CSS <length> unit.`,
            { cause: { value: lenUnit } }
          );
        }

        this.#lenUnit = `${lenUnit ?? ''}`;

        if (this.#lenUnit.startsWith('[object ')) {
          this.#lenUnit = '';
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
/* eslint-enable comma-dangle, no-use-before-define */
/**
 * @param {?} value
 */
function isObject(value) {
  return typeof value === 'object' && value !== null;
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
