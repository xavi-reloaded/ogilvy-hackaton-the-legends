import {IAppError} from "./IAppError";
export class AppException extends Error implements IAppError{
  code: number;
  message: string;

  constructor(errorObj: IAppError){
    super(errorObj && errorObj.message || null);
    this.code = errorObj && errorObj.code || null;
    this.message = errorObj && errorObj.message || null;
  }
}