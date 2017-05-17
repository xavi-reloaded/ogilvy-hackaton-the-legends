import {Injectable} from "@angular/core";
import {LoadingController} from "ionic-angular";
import {ILoaderService} from "./ILoaderService";

@Injectable()
export class LoaderService implements ILoaderService{

  private counter = 0;
  private loader;

  constructor(private loadingController: LoadingController) {
  }

  on(message: string = null) {
    console.log("Loader onn");
    if (this.counter > 0) {
      this.loader.dismiss();
    }

    this.loader = this.loadingController.create({
      content: message
    });
    this.loader.present();
    this.counter++;
  }

  off(force: boolean = false) {

    setTimeout(() => {
      console.log("Loader off");
      this.counter--;
      if (this.counter === 0 || force) {
        this.loader.dismiss();
        this.counter = 0;
      }
    }, 200);
  }
}
