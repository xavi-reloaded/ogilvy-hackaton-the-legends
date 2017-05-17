import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "./HttpClient";
import {PagedListServiceType} from "../models/PagedListServiceType";

@Injectable()
export class ServiceTypeService {

  constructor(private http: HttpClient) {
  }

  private basePath = 'servicetype';

  get(page?: number, pageSize?: number, fields?: number, search?: number, sort?: number): Observable<PagedListServiceType> {
    // return this.http.get(this.basePath, page, pageSize, fields, search, sort);
    return Observable.create(observer => {
      observer.next(new PagedListServiceType());
      observer.complete();
    });
  }
}
