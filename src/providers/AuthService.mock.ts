import {Observable} from "rxjs/Observable";
import {IAuthService} from "./IAuthService";
import {LoginObject} from "../models/LoginObject";
import {Session} from "../models/Session";

export class AuthServiceMock implements IAuthService{
  login(loginObj: LoginObject): Observable<Session> {
    return Observable.of(new Session());
  }

  logout(): Observable<boolean> {
    return Observable.of(true);
  }

  refreshToken(): Observable<Session> {
    return Observable.of(new Session());
  }
}
