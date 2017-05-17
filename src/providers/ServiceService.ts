import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "./HttpClient";
import {PagedListService} from "../models/PagedListService";
import {ServiceType} from "../models/ServiceType";

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  private basePath = 'service';

  get(serviceType: ServiceType): Observable<PagedListService> {
    return Observable.create(observer => {
      observer.next(new PagedListService());
      observer.complete();
    });
  }
}
