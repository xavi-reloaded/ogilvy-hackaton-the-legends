import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {LoaderService} from "../../providers/LoaderService";
import {AuthorizationService} from "../../providers/AuthorizationService";
import {FakeAuthService} from "../../providers/FakeAuthService";

@Component({
  selector: 'page-log-out',
  templateUrl: 'log-out.html',
})
export class LogOutPage {
  
  constructor(public navCtrl: NavController,
              private authService: FakeAuthService,
              private loaderService: LoaderService,
              private authorizationService: AuthorizationService) {
  
  }

  ionViewDidLoad() {
    this.loaderService.on();
    this.authService.logout();
    this.logoutSuccess(true);
  }

  logoutSuccess(response: boolean): void{
    this.loaderService.off();
    this.authorizationService.removeCurrentSession();
    this.goToLoginPage();
  }

  logoutError(error: any): void{
    this.loaderService.off();
    this.authorizationService.removeCurrentSession();
    this.goToLoginPage();
  }

  goToLoginPage(): void{
    this.navCtrl.setRoot(LoginPage);
  }
}
