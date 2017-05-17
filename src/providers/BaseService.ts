import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ValidationErrorException} from "../exceptions/ValidationErrorException";
import {ReturnError} from "../exceptions/ReturnError";
import {ValidationWrongEmailFormatException} from "../exceptions/ValidationWrongEmailFormatException";
import {ValidationErrorAppException} from "../exceptions/ValidationErrorAppException";
import {AppException} from "../exceptions/AppException";
import {ValidationFieldRequiredException} from "../exceptions/ValidationFieldRequiredException";

@Injectable()
export class BaseService {

  constructor() {}

  public castExceptions(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if(error && error.code){
      if(error.code == 620) {
        let errorParsed: { [key: string]: ValidationErrorException } = {};
        if (error && error.errors && error.errors.length > 0) {
          for (let errorT of error.errors) {
            if(errorT.code == ReturnError.VALIDATION.REQUIRED) {
              errorParsed[errorT.field] = new ValidationFieldRequiredException({field: errorT.field});
            }
            else if(errorT.code == ReturnError.VALIDATION.WRONG_EMAIL_FORMAT) {
              errorParsed[errorT.field] = new ValidationWrongEmailFormatException({field: errorT.field});
            }
          }
        }
        return Observable.throw(new ValidationErrorAppException({code: error.code, message: errMsg, errors: errorParsed}));
      }
      else {
        return Observable.throw(new AppException({code: error.code, message: errMsg}));
      }
    }else{
      return Observable.throw(error);
    }
  }

}
