/**
 * Created by jordi on 2/05/17.
 */
import {Injectable} from "@angular/core";
import {LocalStorageService} from "./LocalStorageService";
import {Session} from "../models/Session";
import {UserAccount} from "../models/UserAccount";
import JSOG from "jsog";
import {IAuthorizationService} from "./IAuthorizationService";

@Injectable()
export class AuthorizationService implements IAuthorizationService {

  private localStorageService;
  private currentSession: Session = null;
  private FCMToken: string = null;

  constructor(private local: LocalStorageService) {
    this.localStorageService = local;
    this.currentSession = this.loadSessionData();
    this.FCMToken = this.loadFCMToken();
  }

  setCurrentSession(session: Session): boolean {
    this.currentSession = session;
    return this.localStorageService.setItem('pts', JSOG.stringify(session));
  }

  loadSessionData() {
    let sessionStr = this.localStorageService.getItem('pts');
    return (sessionStr) ? JSOG.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('pts');
    this.currentSession = null;
  }

  getCurrentUser(): UserAccount {
    let session: Session = this.getCurrentSession();
    return (session && session.userAccount) ? session.userAccount : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    let session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  setFCMToken(token: string): void {
    this.FCMToken = token;
    this.localStorageService.setItem('fcmToken', token);
  }

  loadFCMToken(): string {
    let token = this.localStorageService.getItem('fcmToken');
    return (token) ? token : null;
  }

  getFCMToken(): string {
    return this.FCMToken;
  }


}