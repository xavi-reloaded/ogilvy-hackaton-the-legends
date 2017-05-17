// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  App, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform,
  ToastController, Config
} from 'ionic-angular';
import {KeyboardMock, NavMock, PlatformMock, ToastMock, MenuMock, ConfigMock} from "./mocks-ionic";
import {TestBed} from "@angular/core/testing";
import {AuthService} from "../src/providers/AuthService";
import {LoaderService} from "../src/providers/LoaderService";
import {AuthorizationService} from "../src/providers/AuthorizationService";
import {LoaderServiceMock} from "../src/providers/LoaderService.mock";
import {AuthorizationServiceMock} from "../src/providers/AuthorizationService.mock";
import {AuthServiceMock} from "../src/providers/AuthService.mock";
import {InputErrorModule} from "../src/components/input-error/input-error.module";

export interface IConfigureTestingModule{
  components: Array<any>;
  providers?: Array<any>;
  imports?: Array<any>;
}

export class TestUtils {
  public static beforeEachCompiler(configureTestingModule: IConfigureTestingModule): Promise<{fixture: any, instance: any}> {
    configureTestingModule.providers = configureTestingModule.providers || [];
    configureTestingModule.imports = configureTestingModule.imports || [];

    return TestUtils.configureIonicTestingModule(configureTestingModule)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(configureTestingModule.components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(configureTestingModule: IConfigureTestingModule): typeof TestBed {
    configureTestingModule.providers = configureTestingModule.providers || [];
    configureTestingModule.imports = configureTestingModule.imports || [];
    return TestBed.configureTestingModule({
      declarations: [
        ...configureTestingModule.components,
      ],
      providers: [
        App, Form, Keyboard, DomController, MenuController, NavController,
        {provide: Platform, useClass: PlatformMock},
        {provide: Config, useClass: ConfigMock},
        {provide: NavController, useClass: NavMock},
        {provide: Keyboard, useClass: KeyboardMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: AuthorizationService, useClass: AuthorizationServiceMock},
        {provide: LoaderService, useClass: LoaderServiceMock},
        {provide: ToastController, useClass: ToastMock},
        {provide: MenuController, useClass: MenuMock},
        ...configureTestingModule.providers
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        InputErrorModule,
        ...configureTestingModule.imports
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
