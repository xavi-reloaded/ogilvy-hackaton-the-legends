/**
 * Created by ecobos on 8/16/16.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "./HttpClient";
import {UserDevice} from "../models/UserDevice";
import {AuthorizationService} from "./AuthorizationService";
declare var device : any;

@Injectable()
export class UserDeviceService {

  constructor(private http: HttpClient, private authorizationService : AuthorizationService) {
  }

  private basePath = 'UserDevice/';

  updateUserDevice(): void{
    this.http.put(this.basePath, this.getDeviceInfo()).subscribe(
      (data) => this.deviceUpdated(data),
      (error) => this.deviceUpdateError(error)
    );
  }

  private deviceUpdated(device){
    console.info("Device Updated successfully", device);
  }

  private deviceUpdateError(error){
    console.error("Device update error", error);
  }

  private getDeviceInfo() : UserDevice{
    try{
      return new UserDevice(device.uuid, this.authorizationService.getCurrentUser(), this.authorizationService.getFCMToken(), device.platform, device.version);
    }catch(e){
      return new UserDevice("browser", this.authorizationService.getCurrentUser(), "token", "platform", "version")
    }
  }

}
