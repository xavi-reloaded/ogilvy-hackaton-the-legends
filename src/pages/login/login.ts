import {Component} from '@angular/core';
import {Keyboard, MenuController, NavController, ToastController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import {LoginObject} from "../../models/LoginObject";
import {Session} from "../../models/Session";
import {AuthService} from "../../providers/AuthService";
import {AuthorizationService} from "../../providers/AuthorizationService";
import {ServicesPage} from "../services/services";
import {LoaderService} from "../../providers/LoaderService";
import {AppException} from "../../exceptions/AppException";
import {ValidationErrorAppException} from "../../exceptions/ValidationErrorAppException";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginUser: LoginObject = new LoginObject();
  public errors :any = {};

  constructor(private navCtrl: NavController,
              private keyboard: Keyboard,
              private authService: AuthService,
              private authorizationService: AuthorizationService,
              private loaderService: LoaderService,
              private toastCtrl: ToastController,
              private menu: MenuController)
  {
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  makeLogin(): void {
    this.loaderService.on();
    if(this.keyboard) {
      this.keyboard.close();
    }
    this.authService.login(this.loginUser).subscribe(
        session => this.loginCorrect(session),
        error => this.loginError(<any>error));
  }

  loginCorrect(session: Session): void {
    this.loaderService.off();
    this.authorizationService.setCurrentSession(session);
    //this.userDeviceService.updateUserDevice();
    this.goServicesPage();
  }

  loginError(exception: any): void {
    if (exception && exception.constructor) {
      if (exception.constructor.name == ValidationErrorAppException.name) {
        this.errors = exception.errors;
      }
      else if (exception.constructor.name == AppException.name) {
        let toast = this.toastCtrl.create({
          message: exception.message,
          duration: 3000,
          position: 'bottom',
          showCloseButton: true
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }
    }
    this.loaderService.off();
  }

  goToCreateAccountPage(){
    this.navCtrl.push(RegisterPage);
  }

  goServicesPage(){
    this.navCtrl.setRoot(ServicesPage);
  }
}
