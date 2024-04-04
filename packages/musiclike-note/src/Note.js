import { bind, construct } from '@musiclike/programming';

import { isObject, isString } from 'gebrauchsmusik';

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
        '',
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
   * @memberof Note
   */
  #value = `${Number.NaN}`;

  /**
   * @param {Note|number|string} length
   */
  constructor(length, obj = /** @type {typeof Note} */ (this.constructor).parseLenUnit(length)) {
    const value = Number.parseFloat(length);

    if (!Number.isFinite(value) || !value) {
      this.#value = `${value}`;
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isString(length) || /** @type {typeof Note} */ (this.constructor).isNote(length)) {
        this.#value = `${length}`;
      } else {
        const lenUnit = `${obj}`.trim();
        // prettier-ignore
        if (!isObject(obj) && !isString(obj)) {
          throw new TypeError([
            `Cannot convert "${lenUnit}" to a supported CSS <length> unit!`,
            `${this.constructor.name}() constructor takes an arguments[1] of type string`,
            'or an arguments[1] of type object and converts it to a value of type string.',
          ].join(' '), {
            cause: { value: obj },
          });
        }

        try {
          JSON.parse(lenUnit);
        } catch {
          if (lenUnit !== {}.toString.apply(obj)) {
            this.#value = `${value}${lenUnit}`;
          }
        }
      }
    }
  }

  /**
   * @param {number} [fractionDigits]
   * @returns {Note}
   */ // prettier-ignore
  @construct
  toExponential(fractionDigits) {
    return `${(+this).toExponential(fractionDigits)}${/** @type {typeof Note} */ (this.constructor).parseLenUnit(this)}`;
  }

  /**
   * @param {number} [digits]
   * @returns {Note}
   */
  @construct
  toFixed(digits) {
    return `${(+this).toFixed(digits)}${/** @type {typeof Note} */ (this.constructor).parseLenUnit(this)}`;
  }

  /**
   * @param {number} [precision]
   * @returns {Note}
   */
  @construct
  toPrecision(precision) {
    return `${(+this).toPrecision(precision)}${/** @type {typeof Note} */ (this.constructor).parseLenUnit(this)}`;
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
