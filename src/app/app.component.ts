import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import {StartPage} from "../pages/startPage/startPage";
import {LogOutPage} from "../pages/log-out/log-out";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = StartPage;

  constructor(platform: Platform,
              statusBar: StatusBar) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
    });
  }

  closeSession(){
    this.nav.setRoot(LogOutPage);
  }
}

