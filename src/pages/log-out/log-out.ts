import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../providers/AuthService";
import {LoaderService} from "../../providers/LoaderService";
import {AuthorizationService} from "../../providers/AuthorizationService";

@Component({
  selector: 'page-log-out',
  templateUrl: 'log-out.html',
})
export class LogOutPage {
  
  constructor(public navCtrl: NavController,
              private authService: AuthService,
              private loaderService: LoaderService,
              private authorizationService: AuthorizationService) {
  
  }

  ionViewDidLoad() {
    this.loaderService.on();
    this.authService.logout().subscribe(
      response => this.logoutSuccess(response),
      error => this.logoutError(<any>error));
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
