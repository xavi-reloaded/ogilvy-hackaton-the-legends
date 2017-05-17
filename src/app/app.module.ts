import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, InjectionToken, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

// PROVIDERS - SERVICES
import { HttpClient } from "../providers/HttpClient";
import { AuthService } from "../providers/AuthService";
import { UserAccountService } from "../providers/UserAccountService";
import {AuthorizationService} from "../providers/AuthorizationService";
import {LocalStorageService} from "../providers/LocalStorageService";
import {ServicesPage} from "../pages/services/services";
import {UserDeviceService} from "../providers/UserDeviceService";
import {StartPage} from "../pages/startPage/startPage";
import {LoaderService} from "../providers/LoaderService";
import {LogOutPage} from "../pages/log-out/log-out";
import {ServiceService} from "../providers/ServiceService";
import {ServiceTypeService} from "../providers/ServiceTypeService";
import {EnvironmentsModule} from "../environment-variables/environment-variables.module";
import {InputErrorModule} from "../components/input-error/input-error.module";



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    ServicesPage,
    StartPage,
    LogOutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicPageModule,
    EnvironmentsModule,
    InputErrorModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    RegisterPage,
    ServicesPage,
    StartPage,
    LogOutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    AuthService,
    AuthorizationService,
    UserAccountService,
    LocalStorageService,
    UserDeviceService,
    LoaderService,
    ServiceTypeService,
    ServiceService]
})
export class AppModule {}
