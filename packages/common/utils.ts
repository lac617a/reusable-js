import { checkArgs, checkArgsArray } from "../utils";
import { IObject, IOptions } from "./types";

export class Utils {
  private mergeOptions: IOptions = {
    allowUndefinedOverrides: true,
    mergeArrays: true,
    uniqueArrayItems: true,
  };

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @param {Object} obj The source object.
   * @param {...(string|string[])} [keys] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): object =>
    Object.fromEntries(
      keys.filter(key => key in obj).map(key => [key, obj[key]]),
    ) as Pick<T, K>;

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @param {Object} obj The source object.
   * @param {...(string|string[])} [...keys] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * inclusivePick(object, 'c');
   * // => { 'a': 1, 'c': 3 }
   */
  inclusivePick = <T extends object, K extends string | number | symbol>(
    obj: T,
    ...keys: K[]
  ): object =>
    Object.fromEntries(
      keys.map(key => [key, obj[key as unknown as keyof T]]),
    ) as { [key in K]: key extends keyof T ? T[key] : undefined };

  /**
   * The opposite of `pick`; this method creates an object composed of the
   * own and inherited enumerable property paths of `object` that are not omitted.
   *
   * **Note:** This method is considerably slower than `pick`.
   *
   * @param {Object} obj The source object.
   * @param {...(string|string[])} [keys] The property paths to omit.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * omit(object, ['a', 'c']);
   * // => { 'b': '2' }
   */
  omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): object =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
    ) as Omit<T, K>;

  /**
   * Validated tha the object really is an `object`.
   *
   * @param {Object} obj The source object.
   * @returns {Boolean} Returns boolean
   * @example
   *
   * var object = { a: 1, 'b': '2', 'c': 3 };
   *
   * isObject(object);
   * // => true
   */
  isObject(obj: object): boolean {
    checkArgs(obj, "object", "Argument should be a Object!");
    if (typeof obj === "object" && obj !== null) {
      if (typeof Object.getPrototypeOf === "function") {
        const prototype = Object.getPrototypeOf(obj);
        return prototype === Object.prototype || prototype === null;
      }
      return Object.prototype.toString.call(obj) === "[object Object]";
    }
    return false;
  }

  /**
   * Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @param {...Object} [objects] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  merge = <T extends IObject[]>(...objects: T): IObject =>
    objects.reduce((result, current) => {
      if (Array.isArray(current)) {
        throw new TypeError(
          "Arguments provided to deepmerge must be objects, not arrays.",
        );
      }

      Object.keys(current).forEach(key => {
        if (["__proto__", "constructor", "prototype"].includes(key)) {
          return;
        }

        if (Array.isArray(result[key]) && Array.isArray(current[key])) {
          result[key] = this.mergeOptions.mergeArrays
            ? this.mergeOptions.uniqueArrayItems
              ? Array.from(
                  new Set((result[key] as unknown[]).concat(current[key])),
                )
              : [...result[key], ...current[key]]
            : current[key];
        } else if (this.isObject(result[key]) && this.isObject(current[key])) {
          result[key] = this.merge(
            result[key] as IObject,
            current[key] as IObject,
          );
        } else {
          result[key] =
            current[key] === undefined
              ? this.mergeOptions.allowUndefinedOverrides
                ? current[key]
                : result[key]
              : current[key];
        }
      });
      return result;
    }, {});

  /**
   * Clones the given `array`, moves the item to a new position in the array,
   * and then returns the new `array`. The given `array` is not mutated.
   *
   * **Note:** If negative, it will begin that many elements from the end.
   *
   * @param {Array} [array] - The source Array.
   * @param {number} fromIndex - The index of item to move.
   * @param {number} toIndex - The index of where to move the item.
   * @returns {Array} Returns `Array`.
   * @example
   *
   * const input = ["a", "b", "c"];
   * arrayMoveImmutable(input, 1, 2);
   * // => ["a", "c", "b"];
   */
  public arrayMoveImmutable<List>(
    array: List[],
    fromIndex: number,
    toIndex: number,
  ): List[] {
    checkArgsArray(array, "The array parameter must be an array.");
    array = [...array];
    this.arrayMoveMutable<List>(array, fromIndex, toIndex);
    return array;
  }

  private arrayMoveMutable<T>(array: T[], fromIndex: number, toIndex: number) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

      const [item] = array.splice(fromIndex, 1);
      array.splice(endIndex, 0, item);
    }
  }
}
