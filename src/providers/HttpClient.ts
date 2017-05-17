/**
 * Created by jordi on 2/05/17.
 */
import {Inject, Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
//TODO: AuthorizationService
import {Observable} from "rxjs";
import JSOG from "jsog";
import {AuthorizationService} from "./AuthorizationService";
import {EnvVariables} from "../environment-variables/environment-variables.token";

@Injectable()
export class HttpClient {
  private http;
  private baseUrl: string;

  constructor(http: Http, private authorizationService: AuthorizationService,  @Inject(EnvVariables) public envVariables) {
    this.http = http;
    this.baseUrl = envVariables.apiEndpoint;
    alert(envVariables.apiEndpoint);
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    if (this.authorizationService.isAuthenticated()) {
      headers.append('X-AUT-TOKEN', this.authorizationService.getCurrentToken());
    }
  }

  get(url: string, page?: number, pageSize?: number, fields?: number, search?: number, sort?: number) {

    let params: Array<String> = [];
    params.push('page=' + ((page) ? page : 0));
    params.push('pageSize=' + ((pageSize || pageSize == 0) ? pageSize : 20));

    if (fields) {
      params.push('fields=' + fields);
    }
    if (search) {
      params.push('search=' + search);
    }
    if (sort) {
      params.push('sort=' + sort);
    }

    url = this.baseUrl + url;
    url = url + '?' + params.join('&');

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).map(this.extractData)
      .catch(this.handleError);
  }

  deleteData(url: string) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    }).map(this.extractData)
      .catch(this.handleError);
  }

  deleteWithData(url: string, data: any) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers,
      body: JSOG.stringify(data)
    }).map(this.extractData)
      .catch(this.handleError);
  }

  post(url: string, data: any) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, JSOG.stringify(data), {
      headers: headers
    }).map(this.extractData)
      .catch(this.handleError);
  }

  put(url: string, data: any) {
    url = this.baseUrl + url;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, JSOG.stringify(data), {
      headers: headers
    }).map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let string = res.text();
    let body = JSOG.parse(string);
    return body || {};
  }

  private handleError(res: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let string = res.text();
    let body = JSOG.parse(string);
    return Observable.throw(body || {});
  }
}