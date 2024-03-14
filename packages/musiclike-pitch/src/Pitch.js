import Note from '@musiclike/note';

import { isUndefined } from 'gebrauchsmusik';

class Pitch {
  /**
   * @memberof Pitch
   */
  #fontSize = new Note(16, 'px');

  /**
   * @memberof Pitch
   */
  #height = new Note();

  /**
   * @memberof Pitch
   */
  #lineHeight = new Note(24, 'px');

  /**
   * @memberof Pitch
   */
  #width = new Note();

  /**
   * @param {Partial<ReturnType<Pitch['valueOf']>>|Pitch} [obj]
   */
  constructor(obj = {}) {
    // eslint-disable-next-line object-curly-newline
    const { fontSize, height, lineHeight, width } = obj;

    if (!isUndefined(fontSize)) {
      this.fontSize = fontSize;
    }

    if (!isUndefined(height)) {
      this.height = height;
    }

    if (!isUndefined(lineHeight)) {
      this.lineHeight = lineHeight;
    }

    if (!isUndefined(width)) {
      this.width = width;
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
   */
  set fontSize(value) {
    const message = [
      `Invalid ${this.constructor.name}.prototype.fontSize <length>!`,
      'Specified length must be represented by',
    ].join(' ');

    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError(`${message} a nonnegative <number> less than 2^53.`, { cause: { value } });
    }

    if (+value) {
      if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
        throw new Error(`${message} an absolute length unit "px".`, { cause: { value } });
      }
    }

    this.#fontSize = new Note(+value, 'px').toFixed();
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
    const message = [
      `Invalid ${this.constructor.name}.prototype.height <length>!`,
      'Specified length must be represented by',
    ].join(' ');

    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError(`${message} a nonnegative <number> less than 2^53.`, { cause: { value } });
    }

    if (+value) {
      if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
        throw new Error(`${message} an absolute length unit "px".`, { cause: { value } });
      }
    }

    this.#height = new Note(+value, 'px').toFixed();
  }

  /**
   * @memberof Pitch
   */
  get lineHeight() {
    return this.#lineHeight;
  }

  /**
   * @memberof Pitch
   */
  set lineHeight(value) {
    const message = [
      `Invalid ${this.constructor.name}.prototype.lineHeight <length>!`,
      'Specified length must be represented by',
    ].join(' ');

    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError(`${message} a nonnegative <number> less than 2^53.`, { cause: { value } });
    }

    if (+value) {
      if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
        throw new Error(`${message} an absolute length unit "px".`, { cause: { value } });
      }
    }

    this.#lineHeight = new Note(+value, 'px').toFixed();
  }

  /**
   */
  valueOf() {
    // eslint-disable-next-line object-curly-newline
    const { fontSize, height, lineHeight, width } = this;

    return {
      fontSize,
      height,
      lineHeight,
      width,
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
    const message = [
      `Invalid ${this.constructor.name}.prototype.width <length>!`,
      'Specified length must be represented by',
    ].join(' ');

    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError(`${message} a nonnegative <number> less than 2^53.`, { cause: { value } });
    }

    if (+value) {
      if (Note.isNote(value) && Note.parseLenUnit(value) !== 'px') {
        throw new Error(`${message} an absolute length unit "px".`, { cause: { value } });
      }
    }

    this.#width = new Note(+value, 'px').toFixed();
  }
}

export { Pitch as default };
