import {Component, Input} from '@angular/core';
import {ValidationErrorAppException} from "../../exceptions/ValidationErrorAppException";

@Component({
  selector: 'input-error',
  templateUrl: 'input-error.html'
})
export class InputError {

  errorsObj: any;

  @Input() containerInput: any;

  @Input() set errors(errors: ValidationErrorAppException) {
    this.errorsObj = errors;
    this.checkErrors();
  };

  constructor() {

  }

  checkErrors() {
    if (this.containerInput && this.containerInput._elementRef && this.containerInput._elementRef.nativeElement && this.containerInput._elementRef.nativeElement.classList) {
      if (this.errorsObj && this.errorsObj) {
        let input:HTMLInputElement = this.getInput();
        if(input) {
          input.onkeyup = () => {
            console.log("onkeyup");
           this.removeError();
            input.onkeyup = () => null;
          }
        }
        this.addError();
      } else {
        this.removeError();
      }
    }
  }

  addError(){
    if (this.containerInput && this.containerInput._elementRef && this.containerInput._elementRef.nativeElement && this.containerInput._elementRef.nativeElement.classList) {
      this.containerInput._elementRef.nativeElement.classList.add("has-error");
    }
  }

  removeError(){
    if (this.containerInput && this.containerInput._elementRef && this.containerInput._elementRef.nativeElement && this.containerInput._elementRef.nativeElement.classList) {
      this.containerInput._elementRef.nativeElement.classList.remove("has-error");
    }
    this.errorsObj = null;
  }

  getInput(): HTMLInputElement{
    if(this.containerInput && this.containerInput._elementRef && this.containerInput._elementRef.nativeElement ){
      let input: HTMLCollection = this.containerInput._elementRef.nativeElement.getElementsByTagName('input');
      if(input && input.length > 0){
        return <HTMLInputElement>input.item(0);
      }
      else{
        return null;
      }
    }
  }
}
