import {validate} from "email-validator";
import {ValidationFieldRequiredException} from "../exceptions/ValidationFieldRequiredException";
import {ValidationErrorException} from "../exceptions/ValidationErrorException";
import {ValidationErrorAppException} from "../exceptions/ValidationErrorAppException";
import {ValidationWrongEmailFormatException} from "../exceptions/ValidationWrongEmailFormatException";
export class UserAccount{
  public firstName:string;
  public lastName:string;
  public email:string;
  public password:string;
  public profilePic?:string;
  public profilePicThumbnail?:string;
  public id?:string;

  constructor(){

  }

  validate(): boolean{
    let validationErrors: { [key: string]: ValidationErrorException } = {};
    if((!this.firstName || (this.firstName && this.firstName.length == 0))){
      validationErrors['firstName'] = new ValidationFieldRequiredException({field: 'firstName'});
    }
    if((!this.lastName || (this.lastName && this.lastName.length == 0))){
      validationErrors['lastName'] = new ValidationFieldRequiredException({field: 'lastName'});
    }
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