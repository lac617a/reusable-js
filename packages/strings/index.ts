import { RegExPattern } from "..";
import { checkArgs } from "../utils";

export class Strings extends RegExPattern {
  constructor() {
    super("");
  }
  /**
   * @function capitalize
   * @param {string} string - string to capitalize
   * @return {string} string
   * @throws {Error}
   */
  public capitalize = (string: string): string =>
    this.tranformCapitalize(string);
  /**
   * @function capitalizeAll
   * @param {string} string - string to capitalize
   * @return {string} string
   * @throws {Error}
   */
  public capitalizeAll = (string: string): string =>
    this.tranformCapitalize(string, true);

  /**
   * @function truncatedString
   * @param {string} string - The input string to truncate.
   * @param {number} [start=0] - The starting index for truncation.
   * @param {number} [end=30] - The ending index for truncation.
   * @return {string} - The truncated string.
   * @throws {Error} - Throws an error if the arguments are of incorrect types.
   */
  public truncatedString(
    string: string,
    start: number = 0,
    end: number = 30,
  ): string {
    checkArgs(string, "string", "Argument should be a String!");
    checkArgs(start, "number", "Argument should be a Number!");
    checkArgs(end, "number", "Argument should be a Number!");
    const trimedString = string.trim();

    // Return the original string if it's empty or if start >= end
    if (trimedString === "" || start >= end) return trimedString;
    if (start >= string?.length) return string;
    if (string?.length <= end) return trimedString.slice(start, string?.length);

    return trimedString.slice(start, end) + "...";
  }

  /**
   * @function blacklist
   * @param {string} string - string of color (e.g., #f1f1f1).
   * @return {boolean} boolean
   * @throws {Error}
   */
  public isHexColor(string: string): boolean {
    checkArgs(string, "string", "Argument should be a String!");
    return this.isValidHexColor(string);
  }

  /**
   * @function blacklist
   * @param {string} string - to modified
   * @param {string} chars - replace for empty
   * @return {string} string
   * @throws {Error}
   */
  public blacklist(string: string, chars: string): string {
    return this.blacklistOrwhitelist(string, chars, true);
  }

  /**
   * @function whitelist
   * @param {string} string - to modified
   * @param {string} chars - replace for empty
   * @return {string} string
   * @throws {Error}
   */
  public whitelist(string: string, chars: string): string {
    return this.blacklistOrwhitelist(string, chars);
  }

  /**
   * @function capitalizeAll
   * @param {string} string - string to comparate
   * @param {string} comparison - string to comparate
   * @return {boolean} boolean
   * @throws {Error}
   */
  public equals(string: string, comparison: string): boolean {
    checkArgs(string, "string", "Argument should be a String!");
    checkArgs(comparison, "string", "Argument should be a String!");
    return string === comparison;
  }

  /**
   * @function isUppercase
   * @param {string} string - string to comparate with toLowerCase
   * @return {boolean} boolean
   * @throws {Error}
   */
  isLowercase(string: string): boolean {
    checkArgs(string, "string", "Argument should be a String!");
    return string === string.toLowerCase();
  }
  /**
   * @function isUppercase
   * @param {string} string - string to comparate with toUpperCase
   * @return {boolean} boolean
   * @throws {Error}
   */
  public isUppercase(string: string): boolean {
    checkArgs(string, "string", "Argument should be a String!");
    return string === string.toUpperCase();
  }

  private blacklistOrwhitelist(
    string: string,
    chars: string,
    blacklist?: boolean,
  ): string {
    checkArgs(string, "string", "Argument should be a String!");
    checkArgs(chars, "string", "Argument should be a String!");
    if (blacklist) return string.replace(new RegExp(`[${chars}]+`, "g"), "");
    return string.replace(new RegExp(`[^${chars}]+`, "g"), "");
  }

  private tranformCapitalize = (string: string, all = false): string => {
    checkArgs(string, "string", "Argument should be a String!");
    if (string.trim() === "") return string;
    const stringWords = string.charAt(0).toUpperCase() + string.slice(1).trim();

    if (all) {
      const wordsArray = stringWords.split(" ");
      for (let i = 0; i < wordsArray.length; i++) {
        wordsArray[i] = wordsArray[i][0].toUpperCase() + wordsArray[i].slice(1);
      }
      return wordsArray.join(" ");
    }

    return stringWords;
  };
}
