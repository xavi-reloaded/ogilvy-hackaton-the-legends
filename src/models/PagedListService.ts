import {BasePagedList} from "./BasePagedList";
import {Service} from "./Service";
export class PagedListService extends BasePagedList{
  public data: Array<Service> = [];
  constructor() {
    super();
  }
}