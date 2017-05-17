import {Observable} from "rxjs/Observable";
import {Session} from "../models/Session";
import {LoginObject} from "../models/LoginObject";
export interface IAuthService {
  login(loginObj: LoginObject): Observable<Session>;
  logout(): Observable<boolean>
  refreshToken(): Observable<Session>
}
