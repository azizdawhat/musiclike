// eslint-disable-next-line object-curly-newline
import { isObject, isString, isSymbol, toString } from 'gebrauchsmusik';

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
        '',
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
   * @param {?} value
   * @returns {value is Note}
   */
  @bind
  static isNote(value) {
    return value instanceof this;
  }

  /**
   * @param {ConstructorParameters<typeof Note>[0]} length
   * @returns {(typeof Note)['LenUNITS'][number]|symbol}
   */
  static parseLenUnit(length) {
    const value = Number.parseFloat(length);

    if (Number.isNaN(value)) {
      return Symbol.for('Note.NaN');
    }

    if (!Number.isFinite(value) || !value) {
      return '';
    }

    return /\D+$/.exec(length)?.[0] || '';
  }

  /**
   * @type {(typeof Note)['LenUNITS'][number]|symbol}
   */
  #lenUnit = Symbol('NaN');

  /**
   */
  #value = Number.NaN;

  /**
   * @param {Note|number|string} [length]
   * @param {(typeof Note)['LenUNITS'][number]|symbol} [lenUnit]
   */
  constructor(length, lenUnit = Symbol('NaN')) {
    const value = Number.parseFloat(length);

    if (!Number.isNaN(value)) {
      const { isNote, parseLenUnit } = /** @type {typeof Note} */ (this.constructor);

      if (isNote(length) || isString(length)) {
        this.#lenUnit = parseLenUnit(length);

        this.#value = value;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (!Number.isFinite(value) || !value) {
          this.#lenUnit = '';

          this.#value = value;
        } else {
          const str = toString(lenUnit);

          if (!isObject(lenUnit) && !isString(lenUnit) && !isSymbol(lenUnit)) {
            throw new TypeError(`Cannot convert ${str} to a valid CSS <length> unit`);
          }

          if (!str.startsWith('Symbol(') && !str.startsWith('[object ') && str !== 'null') {
            this.#lenUnit = str;

            this.#value = value;
          }
        }
      }
    }
  }

  /**
   */
  toString() {
    if (isSymbol(this.#lenUnit)) {
      return `${this.#value}`;
    }

    return `${this.#value}${this.#lenUnit}`;
  }

  /**
   */
  valueOf() {
    return +this.#value;
  }
}

export { Note as default };
