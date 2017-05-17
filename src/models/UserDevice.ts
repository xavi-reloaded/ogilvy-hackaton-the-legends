import {UserAccount} from "./UserAccount";
/**
 * Created by ecobos on 8/17/16.
 */
export class UserDevice {

  public user : UserAccount;

  constructor(public id: string,
              user: UserAccount,
              public deviceToken: string,
              public deviceOs: string,
              public osVersion: string) {
    this.user = user;
  }
}
