import {Injectable} from "@angular/core";
import {Session} from "../models/Session";
import {LoginObject} from "../models/LoginObject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "./HttpClient";
import {BaseService} from "./BaseService";
import {IAuthService} from "./IAuthService";

@Injectable()
export class AuthService extends BaseService implements IAuthService{

  constructor(private http: HttpClient) {
    super();
  }

  private basePath = 'authorize';

  login(loginObj: LoginObject): Observable<Session> {
    try {
      loginObj.validate();
      return this.http.post(this.basePath + '/login', loginObj).catch(this.castExceptions);
    }
    catch (e) {
      return Observable.throw(e);
    }
  }

  logout(): Observable<boolean> {
    return this.http.post(this.basePath + '/logout', {}).catch(this.castExceptions);
  }

  refreshToken(): Observable<Session> {
    return this.http.get(this.basePath + '/refreshtoken').catch(this.castExceptions);
  }
}
