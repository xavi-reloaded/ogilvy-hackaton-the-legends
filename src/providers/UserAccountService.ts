import {Injectable} from '@angular/core';
import {HttpClient} from './HttpClient';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {UserAccount} from "../models/UserAccount";
import {BaseService} from "./BaseService";

@Injectable()
export class UserAccountService extends BaseService{

  private basePath = 'useraccount';

  constructor(public http: HttpClient) {
    super();
  }

  newUser(userAccount: UserAccount): Observable<UserAccount> {
    try {
      userAccount.validate();
      return this.http.post(this.basePath, userAccount).catch(this.castExceptions);
    }
    catch (e) {
      return Observable.throw(e);
    }
  }
}
