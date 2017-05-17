import {IAppValidationError} from "./IAppValidationError";
import {ReturnError} from "./ReturnError";
import {IValidationError} from "./IValidationError";

export class ValidationErrorAppException extends Error implements IAppValidationError{
  code: number = ReturnError.VALIDATION_ERROR;
  message: string = "Validation failed";
  errors: {[key: string] :  IValidationError };

  constructor(errorObj: IAppValidationError){
    super();
    this.errors = errorObj && errorObj.errors || null;
  }
}