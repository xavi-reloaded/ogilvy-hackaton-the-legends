/**
 * Created by jordi on 2/05/17.
 */
import {UserAccount} from "./UserAccount";
import {UserFactory} from "../factories/UserFactory";
export class Session {

    public id: string;
    public token: string;
    public userAccount: UserAccount = null;

    constructor() {
        //this.userAccount = UserFactory.createFromObject(userAccount);
    }
}