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
   * @returns {?(typeof Note)['LenUNITS'][number]}
   */
  static parseLenUnit(length) {
    const value = Number.parseFloat(length);

    if (Number.isNaN(value)) {
      return null;
    }

    if (!Number.isFinite(value) || !value) {
      return '';
    }

    return /\D+$/.exec(length)?.[0] || '';
  }

  /**
   */
  #value = `${Number.NaN}`;

  /**
   * @param {Note|number|string} length
   * @param {?(typeof Note)['LenUNITS'][number]} [lenUnit]
   */
  constructor(length, lenUnit = null) {
    const value = Number.parseFloat(length);

    if (!Number.isNaN(value)) {
      if (!Number.isFinite(value) || !value) {
        this.#value = `${value}`;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isString(length) || /** @type {typeof Note} */ (this.constructor).isNote(length)) {
          this.#value = `${length}`;
        } else {
          const str = toString(lenUnit);

          if (!isObject(lenUnit) && !isString(lenUnit)) {
            throw new TypeError(`Cannot convert ${str} to a valid CSS <length> unit`);
          }

          if (!str.startsWith('[object ') && str !== 'null') {
            this.#value = `${value}${str}`;
          }
        }
      }
    }
  }

  /**
   */
  toString() {
    return this.#value;
  }

  /**
   */
  valueOf() {
    return Number.parseFloat(this);
  }
}

export { Note as default };
