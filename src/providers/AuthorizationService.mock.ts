import {IAuthorizationService} from "./IAuthorizationService";
import {Session} from "../models/Session";
import {UserAccount} from "../models/UserAccount";

export class AuthorizationServiceMock implements IAuthorizationService{
  setCurrentSession(session: Session): boolean {
    return true;
  }

  loadSessionData() {

  }

  getCurrentSession(): Session {
    return new  Session();
  }

  removeCurrentSession(): void {

  }

  getCurrentUser(): UserAccount {
    return new UserAccount();
  }

  isAuthenticated(): boolean {
    return true;
  }

  getCurrentToken(): string {
    return '';
  }

  setFCMToken(token: string): void {

  }

  loadFCMToken(): string {
    return '';
  }

  getFCMToken(): string {
    return '';
  }
}