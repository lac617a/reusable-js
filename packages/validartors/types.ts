export interface IValuesPaswordMatch {
  password: string;
  minLength: number;
  confirmPassword: string;
}

export interface IErrorIsPasswordMatch {
  isTooShort: boolean;
  isMatched: boolean;
}

export interface IValuesStrongPassword {
  password: string;
  minChars: number;
  minSymbols: number;
  minNumbers: number;
}

export interface IErrorStrongPassword {
  hasChar: boolean;
  hasSymble: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
}
