import { isObject, isString, toString } from 'gebrauchsmusik';

import bind from './Note.bind.js';

class Note {
  /**
   * @memberof Note
   * @readonly
   * @static
   */
  static get LenUNITS() {
    return Object.freeze(
      /** @type {const} */ ([
        'cap',
        'ch',
        'ex',
        'ic',
        'rcap',
        'rch',
        'rex',
        'ric',
        // ,
        '%',
        'Q',
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
        'rem',
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
   * @param {?} value
   * @returns {value is Note}
   */
  @bind
  static isNote(value) {
    return value instanceof this;
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
        const str = toString(lenUnit);

        if (!isObject(lenUnit) && !isString(lenUnit)) {
          throw new TypeError(`Cannot convert ${str} to a valid CSS <length> unit`);
        }

        if (!str.startsWith('[object ') && str !== 'null') {
          this.#lenUnit = str;
        }
      }
    }
  }

  /**
   */
  toString() {
    return this.#value + this.#lenUnit;
  }

  /**
   */
  valueOf() {
    return this.#value;
  }
}

export { Note as default };
