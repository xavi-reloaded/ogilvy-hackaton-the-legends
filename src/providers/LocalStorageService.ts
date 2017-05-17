/**
 * Created by jordi on 2/05/17.
 */
import {Injectable} from "@angular/core";
// import {Storage, LocalStorage} from "ionic-angular";
@Injectable()
export class LocalStorageService {

    constructor() {
        // this.local = new Storage(LocalStorage);
    }

    setItem(name: string, value: string): void {
        window.localStorage.setItem(name, value);
        // this.local.set(name, value);
    }

    getItem(name: string): string {
        return window.localStorage.getItem(name);
        // return this.local.get(name);
    }

    removeItem(name: string): void {
        // this.local.remove(name);
        window.localStorage.removeItem(name);
    }
}