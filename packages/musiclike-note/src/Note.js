import { isObject, isString, toString } from 'gebrauchsmusik';

import bind from './Note.bind.js';
/* eslint-disable consistent-return */
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
        // eslint-disable-next-line comma-dangle
      ])
    );
  }

  /**
   * @param {NonNullable<ConstructorParameters<typeof Note>[0]>} length
   */
  static isLenUnitOptional(length) {
    const value = Number.parseFloat(length);

    if (value) {
      return !Number.isFinite(value);
    }

    return true;
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
  @bind
  static parseLenUnit(length) {
    if (!this.isLenUnitOptional(length)) {
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

    const { isLenUnitOptional, parseLenUnit } = /** @type {typeof Note} */ (this.constructor);

    if (!isLenUnitOptional(length)) {
      if (/\D+$/.test(length)) {
        this.#lenUnit = parseLenUnit(length);
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
/* eslint-enable consistent-return */
export { Note as default };
