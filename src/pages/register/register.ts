import {Component} from '@angular/core';
import {MenuController, NavController, ToastController} from 'ionic-angular';
import {UserAccountService} from "../../providers/UserAccountService";
import {UserAccount} from "../../models/UserAccount";
import {Session} from "../../models/Session";
import {LoginObject} from "../../models/LoginObject";
import {LoaderService} from "../../providers/LoaderService";
import {FakeAuthService} from "../../providers/FakeAuthService";
import {ServicesPage} from "../services/services";
import {AuthorizationService} from "../../providers/AuthorizationService";
import {ValidationErrorAppException} from "../../exceptions/ValidationErrorAppException";
import {AppException} from "../../exceptions/AppException";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public userAccount: UserAccount = new UserAccount();

  public errors: any = {};

  constructor(public navCtrl: NavController,
              private menu: MenuController,
              private userAccountService: UserAccountService,
              private loaderService: LoaderService,
              private authService: FakeAuthService,
              private toastCtrl: ToastController,
              private authorizationService: AuthorizationService) {
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.createForm();
  }

  public createForm(): void {

  }

  goBackToLogin(): void {
    this.navCtrl.pop();
  }

  public onSignUp(): void {
    this.errors = {};
    this.loaderService.on();
    this.userAccountService.newUser(this.userAccount).subscribe(
      success => this.newUserSuccess(success),
      error => this.newUserError(error));

  }

  newUserSuccess(userAccount: UserAccount): void {
    this.makeLogin(userAccount.email, this.userAccount.password);
  }

  newUserError(exception: any): void {
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


  makeLogin(email: string, password: string): void {
    let loginObject: LoginObject = new LoginObject({email: email, password: password});
    loginObject.email = email;
    loginObject.password = password;
    this.authService.login(loginObject).subscribe(
      session => this.loginSuccess(session),
      error => this.loginError(<any>error));
  }

  loginSuccess(session: Session): void {
    this.loaderService.off();
    this.authorizationService.setCurrentSession(session);
    //this.userDeviceService.updateUserDevice();
    this.navCtrl.setRoot(ServicesPage);

  }

  loginError(error: any): void {
    this.loaderService.off();
    let toast = this.toastCtrl.create({
      message: error.message,
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
