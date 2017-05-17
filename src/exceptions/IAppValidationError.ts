import {IValidationError} from "./IValidationError";
export interface IAppValidationError{
  code?: number;
  message?: string;
  errors: {[key: string] :  IValidationError }
}