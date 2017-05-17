import {Injectable} from "@angular/core";
import {Session} from "../models/Session";
import {LoginObject} from "../models/LoginObject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "./HttpClient";
import {BaseService} from "./BaseService";
import {IAuthService} from "./IAuthService";


@Injectable()
export class FakeAuthService extends BaseService implements IAuthService{

  constructor(private http: HttpClient) {
    super();
    this.forcedResponse = '';
  }

  private basePath = 'authorize';
  private forcedResponse: string;

  login(loginObj: LoginObject): Observable<Session> {
    try {
      loginObj.validate();
    }
    catch (e) {
      return Observable.throw(e);
    }
  }

  logout(): Observable<boolean> {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  refreshToken(): Observable<Session> {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}
