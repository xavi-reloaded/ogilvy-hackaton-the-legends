import {UserFactory} from "../factories/UserFactory";
import {ServiceType} from "./ServiceType";
export class Service {

  public serviceType: ServiceType = null;

  constructor(public id: string,
              public name: string,
              public price: number,
              public time: number,
              serviceType: ServiceType) {
    this.serviceType = UserFactory.createFromObject(serviceType);
  }
}