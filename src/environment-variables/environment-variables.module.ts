import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './development';
import { devLocalhostVariables } from './development-localhost';
import { prodVariables } from './production';
import { envArgs } from './env-args';

export function environmentFactory() {
  switch(envArgs["env"]){
    case "prod": return prodVariables;
    default: return (typeof window['cordova'] !== 'undefined') ? devVariables : devLocalhostVariables
  }
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}