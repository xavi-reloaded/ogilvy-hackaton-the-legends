import {IValidationError} from "./IValidationError";
import {ValidationErrorException} from "./ValidationErrorException";
import {ReturnError} from "./ReturnError";
export class ValidationFieldRequiredException extends ValidationErrorException{
  message: string= 'Is required';
  code: number = ReturnError.VALIDATION.REQUIRED;

  constructor(errorObj?: IValidationError){
    super(errorObj);
    this.field = errorObj && errorObj.field || null;
  }
}