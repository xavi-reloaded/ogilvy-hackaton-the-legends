import {IValidationError} from "./IValidationError";
import {ValidationErrorException} from "./ValidationErrorException";
import {ReturnError} from "./ReturnError";
export class ValidationWrongEmailFormatException extends ValidationErrorException {
  message: string = 'Wrong email format';
  code: number = ReturnError.VALIDATION.WRONG_EMAIL_FORMAT;

  constructor(errorObj?: IValidationError) {
    super(errorObj);
    this.field = errorObj && errorObj.field || null;
  }
}