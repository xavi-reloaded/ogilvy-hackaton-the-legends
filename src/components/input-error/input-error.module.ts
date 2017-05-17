import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InputError } from './input-error';

@NgModule({
  declarations: [
    InputError,
  ],
  imports: [
    IonicPageModule.forChild(InputError),
  ],
  exports: [
    InputError
  ]
})
export class InputErrorModule {}
