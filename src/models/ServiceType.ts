import {UserFactory} from "../factories/UserFactory";
import {Service} from "./Service";
export class ServiceType {

  public id: string;
  public name: string;
  public picture: string;
  public services: Array<Service> = [];

  constructor() {

  }
}