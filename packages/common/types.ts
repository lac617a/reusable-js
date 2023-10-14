export type ValidatePasswordType = {
  charCount: number;
  symbolCount: number;
  numberCount: number;
  hasUppercase: boolean;
};

export interface IObject {
  [key: string]: any;
}

export interface IOptions {
  /**
   * When `true`, values explicitly provided as `undefined` will override existing values, though properties that are simply omitted won't affect anything.
   * When `false`, values explicitly provided as `undefined` won't override existing values.
   *
   * Default: `true`
   */
  allowUndefinedOverrides: boolean;

  /**
   * When `true` it will merge array properties.
   * When `false` it will replace array properties with the last instance entirely instead of merging their contents.
   *
   * Default: `true`
   */
  mergeArrays: boolean;

  /**
   * When `true` it will ensure there are no duplicate array items.
   * When `false` it will allow duplicates when merging arrays.
   *
   * Default: `true`
   */
  uniqueArrayItems: boolean;
}
