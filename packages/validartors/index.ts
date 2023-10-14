import { RegExPattern } from "..";
import { checkArgs, checkArgsArray, phonesPattern } from "../utils";
import {
  IValuesPaswordMatch,
  IErrorStrongPassword,
  IErrorIsPasswordMatch,
  IValuesStrongPassword,
} from "./types";

export class Validartors extends RegExPattern {
  constructor() {
    super("");
  }

  /**
   * @function isPasswordMatched
   * @param {string} password - The password to compare.
   * @param {string} confirmPassword - The confirmation of the password.
   * @param {number} minLength - The minimum length for the password.
   * @return {Error} - An object indicating the errors.
   */
  isPasswordMatched(values: IValuesPaswordMatch): IErrorIsPasswordMatch {
    // throw Error if password and confirmPassword type is not string.
    checkArgs(values.password, "string", "Password should be strings!");
    checkArgs(
      values.confirmPassword,
      "string",
      "Confirm Password Password should be strings!",
    );

    const error: IErrorIsPasswordMatch = {
      isTooShort:
        values.password.length < values.minLength ||
        values.confirmPassword.length < values.minLength,
      isMatched: values.password.includes(values.confirmPassword),
    };

    return error;
  }

  /**
   * @function isStrongPassword
   * @param {string} password - The password to check.
   * @param {number} minChars - Minimum number of characters (default is 2).
   * @param {number} minSymbols - Minimum number of symbols (default is 2).
   * @param {number} minNumbers - Minimum number of numbers (default is 2).
   * @return {object}
   */
  isStrongPassword({
    password,
    minChars = 2,
    minSymbols = 2,
    minNumbers = 2,
  }: IValuesStrongPassword): IErrorStrongPassword {
    const error: IErrorStrongPassword = {
      hasChar: true,
      hasSymble: true,
      hasNumber: true,
      hasUppercase: true,
    };
    // throw error if password is not string
    checkArgs(password, "string", "Password Must be string!");

    const { charCount, numberCount, symbolCount, hasUppercase } =
      this.isStrongPasswordRegex(password);

    if (charCount < minChars) {
      error.hasChar = false;
    }

    if (symbolCount < minSymbols) {
      error.hasSymble = false;
    }

    if (numberCount < minNumbers) {
      error.hasNumber = false;
    }

    if (!hasUppercase) {
      error.hasUppercase = false;
    }

    return error;
  }

  /**
   * @function isValidDate
   * @param {string} date - The date string to validate (e.g., "2023-09-05").
   * @returns {boolean}
   */
  isValidDate(date: string): boolean {
    checkArgs(
      date,
      "string",
      'Invalid date format. Please provide a date string (e.g., "2023-09-05").',
    );

    const parsedDate = new Date(date);
    // Check if the parsed date is a valid date and not NaN
    // Also, check if the parsed date string matches the input date string
    return (
      !isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === date
    );
  }

  isValidEmail(email: string): boolean {
    checkArgs(email, "string", "Email Must be string!");
    return this.isValidMail(email.toLowerCase());
  }

  /**
   * @function isValidFileExtension
   * @param {string[]} allowedExtensions - An array of allowed file extensions (e.g., ['jpg', 'png']).
   * @param {string} fileName - The name of the file to validate.
   * @return {boolean}
   * @throws {Error} - If invalid arguments are provided.
   */
  isValidFileExtension(allowedExtensions: string[], fileName: string): boolean {
    checkArgs(fileName, "string", "The fileName parameter must be a string.");

    checkArgsArray(
      allowedExtensions,
      "The allowedExtensions parameter must be an array.",
    );

    if (!allowedExtensions.length) {
      throw new Error(
        "The allowedExtensions array must contain at least one allowed extension.",
      );
    }

    const fileExtension = fileName.split(".").pop();
    if (!fileExtension) {
      throw new Error(
        `The fileName "${fileName}" does not have a valid file extension.`,
      );
    }

    return allowedExtensions.includes(fileExtension.toLowerCase());
  }

  /**
   * @function isValidPhoneNumber
   * @param {string} string - phoneNumber
   * @param {string} string - locale
   * @returns {boolean}
   */
  isValidPhoneNumber(phoneNumber: string, locale: string): boolean {
    checkArgs(phoneNumber, "string", "Phone Number Must be string!");
    // Convert the phoneNumber to a string for validation
    phoneNumber = phoneNumber.toString().trim();

    // Check if the provided locale exists in the phonesPattern
    // eslint-disable-next-line no-prototype-builtins
    if (phonesPattern.hasOwnProperty(locale)) {
      const regex = phonesPattern[locale];
      // Test if the phoneNumber matches the pattern
      return regex.test(phoneNumber);
    }

    return false;
  }

  /**
   * @function isValidURL
   * @param {string} url
   * @return {boolean}
   */
  isValidURL(url: string): boolean {
    checkArgs(url, "string", "URL must be string!");

    if (url === "") return false;
    return !this.isValidUrlPattern(url);
  }

  /**
   * @function isValidUserName
   * @param {string} userName - The username to validate.
   * @param {Array}  disallowedWords  - offensive words
   * @return {Boolean}
   */
  isValidUserName(
    userName: string,
    disallowedWords: string[] = ["admin", "root", "password"],
  ): boolean {
    checkArgs(userName, "string", "User Name must be string!");

    checkArgsArray(
      disallowedWords,
      "Disallowed Words must be an Array of String!",
    );

    // Test if the username matches the defined regex pattern.
    const isValid = this.isValidUsername(userName);
    if (isValid) {
      // Check for disallowed words (e.g., reserved words, offensive content).
      const lowerCaseUserName = userName.toLowerCase();
      if (disallowedWords.includes(lowerCaseUserName)) return false;
    }
    return isValid;
  }
}
