import Note from '@musiclike/note';
// eslint-disable-next-line import/no-unresolved
import bind from '@musiclike/note/bind';
/* eslint-disable max-len, object-curly-newline */
import { castArray, clamp, isNumber, isString, isUndefined, toString } from 'gebrauchsmusik';

class Pitch {
  /**
   * @memberof Pitch
   * @readonly
   * @static
   */
  static get WRITING_MODES() {
    return Object.freeze(
      /** @type {const} */ ([
        'horizontal-tb',
        'sideways-lr',
        'sideways-rl',
        'vertical-lr',
        'vertical-rl',
        // eslint-disable-next-line comma-dangle
      ])
    );
  }

  /**
   * @param {?} value
   * @returns {value is Pitch}
   */
  @bind
  static isPitch(value) {
    return value instanceof this;
  }

  /**
   */
  #fontSize = new Note(16, 'px');

  /**
   */
  #height = new Note();

  /**
   */
  #lineHeight = new Note(24, 'px');

  /**
   */
  #width = new Note();

  /**
   * @type {(typeof Pitch)['WRITING_MODES'][number]}
   */
  #writingMode = 'horizontal-tb';

  /**
   * @param {Partial<ReturnType<Pitch['valueOf']>>|Pitch} [obj]
   */
  constructor(obj = {}) {
    const { fontSize, height, width, writingMode } = /** @type {typeof Pitch} */ (this.constructor).isPitch(obj)
      ? obj.valueOf()
      : obj;

    if (!isUndefined(fontSize)) {
      this.fontSize = fontSize;
    }

    if (!isUndefined(height)) {
      this.height = height;
    }

    if (!isUndefined(width)) {
      this.width = width;
    }

    if (!isUndefined(writingMode)) {
      this.writingMode = writingMode;
    }
  }

  /**
   * @memberof Pitch
   */
  get fontSize() {
    return this.#fontSize;
  }

  /**
   * @memberof Pitch
   * @see {@link https://m2.material.io/design/typography/understanding-typography.html#type-properties}
   */
  set fontSize(value) {
    const values = castArray(value);
    // eslint-disable-next-line no-shadow
    for (const [index, value, key = ['fontSize', 'lineHeight'][index]] of values.entries()) {
      if (!key) {
        break;
      }

      if (!Note.isNote(value) && !isNumber(value)) {
        throw new TypeError(`Pitch.prototype.${key} ${toString(value)} is neither a Note instance nor a number`);
      }

      if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(`Invalid Pitch.prototype.${key} <length>`);
      }

      if (+value) {
        if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
          throw new Error(`Invalid Pitch.prototype.${key} <length>`);
        }
      }
    }

    const [fontSize, lineHeight = fontSize * (3 / 2)] = values;

    this.#fontSize = new Note(Math.round(clamp(fontSize, (Number.MAX_SAFE_INTEGER - 3) / 2, 4)), 'px');
    // prettier-ignore
    this.#lineHeight = new Note(Math.ceil(clamp(lineHeight, this.#fontSize * 2, this.#fontSize * (6 / 5)) / 4) * 4, 'px');
  }

  /**
   * @memberof Pitch
   */
  get height() {
    return this.#height;
  }

  /**
   * @memberof Pitch
   */
  set height(value) {
    if (!Note.isNote(value) && !isNumber(value)) {
      throw new TypeError(`Pitch.prototype.height ${toString(value)} is neither a Note instance nor a number`);
    }

    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError('Invalid Pitch.prototype.height <length>');
    }

    if (+value) {
      if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
        throw new Error('Invalid Pitch.prototype.height <length>');
      }
    }

    this.#height = new Note(Math.round(value), 'px');
  }

  /**
   * @memberof Pitch
   * @readonly
   */
  get lineHeight() {
    return this.#lineHeight;
  }

  /**
   * @param {NonNullable<ConstructorParameters<typeof Note>[0]>} length
   * @returns {Note}
   */
  parseLen(length) {
    // prettier-ignore
    const { LenUNITS: [, , , , , , , , ...LenUNITS], isLenUnitOptional, parseLenUnit } = Note;

    const value = Number.parseFloat(length);

    if (isLenUnitOptional(length)) {
      return new Note(value);
    }

    const lenUnit = parseLenUnit(length) || 'em';

    if (!LenUNITS.includes(lenUnit)) {
      return new Note();
    }

    const { constructor, fontSize, height, lineHeight, width, writingMode } = this;
    // prettier-ignore
    const { WRITING_MODES: [, ...WRITING_MODES] } = /** @type {typeof Pitch} */ (constructor);

    if (lenUnit === '%') {
      return new Note((value * fontSize) / 100, 'px');
    }

    if (lenUnit === 'Q') {
      return new Note(value * (96 / (2.54 * 40)), 'px');
    }

    if (lenUnit === 'cm') {
      return new Note(value * (96 / 2.54), 'px');
    }

    if (lenUnit === 'cqb') {
      return this.parseLen(new Note(value, 'vb'));
    }

    if (lenUnit === 'cqh') {
      return this.parseLen(new Note(value, 'vh'));
    }

    if (lenUnit === 'cqi') {
      return this.parseLen(new Note(value, 'vi'));
    }

    if (lenUnit === 'cqmax') {
      return this.parseLen(new Note(value, 'vmax'));
    }

    if (lenUnit === 'cqmin') {
      return this.parseLen(new Note(value, 'vmin'));
    }

    if (lenUnit === 'cqw') {
      return this.parseLen(new Note(value, 'vw'));
    }

    if (lenUnit === 'dvb') {
      return this.parseLen(new Note(value, 'vb'));
    }

    if (lenUnit === 'dvh') {
      return this.parseLen(new Note(value, 'vh'));
    }

    if (lenUnit === 'dvi') {
      return this.parseLen(new Note(value, 'vi'));
    }

    if (lenUnit === 'dvmax') {
      return this.parseLen(new Note(value, 'vmax'));
    }

    if (lenUnit === 'dvmin') {
      return this.parseLen(new Note(value, 'vmin'));
    }

    if (lenUnit === 'dvw') {
      return this.parseLen(new Note(value, 'vw'));
    }

    if (lenUnit === 'em') {
      return new Note(value * fontSize, 'px');
    }

    if (lenUnit === 'in') {
      return new Note(value * 96, 'px');
    }

    if (lenUnit === 'lh') {
      return new Note(value * lineHeight, 'px');
    }

    if (lenUnit === 'lvb') {
      return this.parseLen(new Note(value, 'vb'));
    }

    if (lenUnit === 'lvh') {
      return this.parseLen(new Note(value, 'vh'));
    }

    if (lenUnit === 'lvi') {
      return this.parseLen(new Note(value, 'vi'));
    }

    if (lenUnit === 'lvmax') {
      return this.parseLen(new Note(value, 'vmax'));
    }

    if (lenUnit === 'lvmin') {
      return this.parseLen(new Note(value, 'vmin'));
    }

    if (lenUnit === 'lvw') {
      return this.parseLen(new Note(value, 'vw'));
    }

    if (lenUnit === 'mm') {
      return new Note(value * (96 / (2.54 * 10)), 'px');
    }

    if (lenUnit === 'pc') {
      return new Note(value * (96 / 6), 'px');
    }

    if (lenUnit === 'pt') {
      return new Note(value * (96 / 72), 'px');
    }

    if (lenUnit === 'rem') {
      return new Note(value * 16, 'px');
    }

    if (lenUnit === 'rlh') {
      return new Note(value * 24, 'px');
    }

    if (lenUnit === 'svb') {
      return this.parseLen(new Note(value, 'vb'));
    }

    if (lenUnit === 'svh') {
      return this.parseLen(new Note(value, 'vh'));
    }

    if (lenUnit === 'svi') {
      return this.parseLen(new Note(value, 'vi'));
    }

    if (lenUnit === 'svmax') {
      return this.parseLen(new Note(value, 'vmax'));
    }

    if (lenUnit === 'svmin') {
      return this.parseLen(new Note(value, 'vmin'));
    }

    if (lenUnit === 'svw') {
      return this.parseLen(new Note(value, 'vw'));
    }

    if (lenUnit === 'vb') {
      if (WRITING_MODES.includes(writingMode)) {
        return this.parseLen(new Note(value, 'vw'));
      }

      return this.parseLen(new Note(value, 'vh'));
    }

    if (lenUnit === 'vh') {
      return new Note((value * height) / 100, 'px');
    }

    if (lenUnit === 'vi') {
      if (WRITING_MODES.includes(writingMode)) {
        return this.parseLen(new Note(value, 'vh'));
      }

      return this.parseLen(new Note(value, 'vw'));
    }

    if (lenUnit === 'vmax') {
      if (height < width) {
        return this.parseLen(new Note(value, 'vw'));
      }

      return this.parseLen(new Note(value, 'vh'));
    }

    if (lenUnit === 'vmin') {
      if (height < width) {
        return this.parseLen(new Note(value, 'vh'));
      }

      return this.parseLen(new Note(value, 'vw'));
    }

    if (lenUnit === 'vw') {
      return new Note((value * width) / 100, 'px');
    }

    return new Note(value, 'px');
  }

  /**
   */
  valueOf() {
    const { fontSize, height, lineHeight, width, writingMode } = this;
    /* eslint-enable max-len, object-curly-newline */
    return {
      height,
      width,
      writingMode,
      fontSize: [fontSize, lineHeight],
    };
  }

  /**
   * @memberof Pitch
   */
  get width() {
    return this.#width;
  }

  /**
   * @memberof Pitch
   */
  set width(value) {
    if (!Note.isNote(value) && !isNumber(value)) {
      throw new TypeError(`Pitch.prototype.width ${toString(value)} is neither a Note instance nor a number`);
    }

    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError('Invalid Pitch.prototype.width <length>');
    }

    if (+value) {
      if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
        throw new Error('Invalid Pitch.prototype.width <length>');
      }
    }

    this.#width = new Note(Math.round(value), 'px');
  }

  /**
   * @memberof Pitch
   */
  get writingMode() {
    return this.#writingMode;
  }

  /**
   * @memberof Pitch
   */
  set writingMode(value) {
    if (!isString(value)) {
      throw new TypeError(`Pitch.prototype.writingMode ${toString(value)} is not a string`);
    }

    this.#writingMode = value;
  }
}

export { Pitch as default };
