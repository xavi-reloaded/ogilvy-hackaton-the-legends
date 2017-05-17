import {ValidationFieldRequiredException} from "../exceptions/ValidationFieldRequiredException";
import {ValidationErrorException} from "../exceptions/ValidationErrorException";
import {ValidationWrongEmailFormatException} from "../exceptions/ValidationWrongEmailFormatException";
import {ValidationErrorAppException} from "../exceptions/ValidationErrorAppException";
import {validate} from "email-validator";
interface ILoginObject{
  email: string;
  password: string;
}
export class LoginObject implements ILoginObject{
  public email: string;
  public password: string;
  constructor(object?: ILoginObject) {
    this.email = object && object.email || null;
    this.password = object && object.password || null;
  }

  validate(): boolean{
    let validationErrors: { [key: string]: ValidationErrorException } = {};
    if((!this.email || (this.email && this.email.length == 0))){
      validationErrors['email'] = new ValidationFieldRequiredException({field: 'email'});
    }else if(!validate(this.email)){
      validationErrors['email'] = new ValidationWrongEmailFormatException({field: 'email'});
    }
    if((!this.password || (this.password && this.password.length == 0))){
      validationErrors['password'] = new ValidationFieldRequiredException({field: 'password'});
    }
    if(Object.keys(validationErrors).length > 0){
      throw new ValidationErrorAppException({errors: validationErrors});
    }
    else{
      return true;
    }
  }
}
