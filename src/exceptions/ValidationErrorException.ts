import {IValidationError} from "./IValidationError";

export class ValidationErrorException extends Error implements IValidationError{
  field: string;
  message: string;
  code: number;

  constructor(objectError: IValidationError){
    super();
  }

}