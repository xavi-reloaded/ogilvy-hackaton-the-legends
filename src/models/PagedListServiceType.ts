import {ServiceType} from "./ServiceType";
import {BasePagedList} from "./BasePagedList";
export class PagedListServiceType extends BasePagedList{
  public data: Array<ServiceType> = [];
  constructor() {
    super();
  }
}