import {Component, OnInit} from "@angular/core";
import {AuthorizationService} from "../../providers/AuthorizationService";
import {NavController} from "ionic-angular";
import {FakeAuthService} from "../../providers/FakeAuthService";
import {ActivitiesPage} from "../activities/activities";
import {InitialConfigNamePage} from "../initial-config/initial-config-name/initial-config-name";
import {LoginPage} from "../login/login";
import {UserDeviceService} from "../../providers/UserDeviceService";
import {ActivitiesTrainerPage} from "../activitiesTrainer/activities_trainer";
import {SplashScreen} from "@ionic-native/splash-screen";
import {ServicesPage} from "../services/services";

@Component({
  template: ''
})
export class StartPage implements OnInit{

  constructor(public authorizationService: AuthorizationService,
              public authService : FakeAuthService,
              public navCtrl: NavController,
              private userDeviceService : UserDeviceService,
              private splashScreen: SplashScreen) {
  }

  ngOnInit(){
    console.info("Starting checks");
    this.check();
    this.splashScreen.hide();
  }

  check(){
    this.splashScreen.hide();
    if(this.authorizationService.isAuthenticated()){
      console.info("User is authenticated");
      this.authService.refreshToken().subscribe(
        session => this.refreshCorrect(session),
        error => this.openLoginPage());
    }else{
      this.openLoginPage()
    }
  }

  refreshCorrect(session){
    console.info("refreshCorrect");
    this.authorizationService.setCurrentSession(session);
    //this.userDeviceService.updateUserDevice();
    this.openSessionsPage();

  }


  openSessionsPage(){
    this.navCtrl.setRoot(ServicesPage);
  }

  openLoginPage(){
    this.navCtrl.setRoot(LoginPage);
  }
}
