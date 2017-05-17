import {Session} from "../models/Session";
import {UserAccount} from "../models/UserAccount";
export interface IAuthorizationService {

  setCurrentSession(session: Session): boolean;
  loadSessionData();
  getCurrentSession(): Session;
  removeCurrentSession(): void;
  getCurrentUser(): UserAccount;
  isAuthenticated(): boolean;
  getCurrentToken(): string;
  setFCMToken(token: string): void;
  loadFCMToken() : string;
  getFCMToken() : string;
}