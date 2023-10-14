import { ValidatePasswordType } from "./types";

export class RegExPattern extends RegExp {
  // CREATE REGEXP
  public charRegex = /[A-Za-z]/g; // characters regex
  public charUpperRegex = /[A-Z]/; // characters uppercase regex
  public symbolRegex = /[$&+,:;=?@#|'<>.^*()%!-]/g; // symble regex
  public numberRegex = /[0-9]/g; // number regex
  public mailsRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,3}$/; // mails regex
  public usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Allows letters, numbers, and underscores, 3-20 characters long
  public hexcolorRegex =
    /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i; // colors regex
  public urlPatternRegex =
    /^((https?|ftp):\/\/)(www\.)?[a-zA-Z0-9@:%._+~#?&//=^\s-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._+~#?&//=]*)$/; // urls regex

  public isValidUsername(str: string): boolean {
    return this.usernameRegex.test(str);
  }

  public isValidUrlPattern(str: string): boolean {
    return this.urlPatternRegex.test(str);
  }

  public isValidMail(str: string): boolean {
    return this.mailsRegex.test(str);
  }

  public isValidHexColor(string: string) {
    return this.hexcolorRegex.test(string);
  }

  public isStrongPasswordRegex(str: string): ValidatePasswordType {
    const charCount = this.validateLengthArray(str.match(this.charRegex));
    const symbolCount = this.validateLengthArray(str.match(this.symbolRegex));
    const numberCount = this.validateLengthArray(str.match(this.numberRegex));
    const hasUppercase = this.charUpperRegex.test(str);

    return { charCount, symbolCount, numberCount, hasUppercase };
  }

  private validateLengthArray(validate: RegExpMatchArray | null) {
    return (validate || []).length;
  }
}
