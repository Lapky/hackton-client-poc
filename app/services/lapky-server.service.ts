import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LapkyServerService {
  constructor(private http: HttpClient){
  }

  public test() : Observable<any> {
      return this.get<string>('https://yvz159lp0b.execute-api.eu-central-1.amazonaws.com/default/lapkiService?TableName=MyTable');
  }

  get<T>(url:string) : Observable<T> {
    var options = this.getOptions();
    return this.http.get<T>(url, options);
  }

  post<T>(url:string) : Observable<T> {
    var options = this.getOptions();
    return this.http.post<T>(url, options);
  }

  getOptions() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('x-api-key', 'yx6mxXdtCb9Zm1hGKw43o97ruSr2MJX71CCZrVFT');

    const options = {
        headers: headers
    };

    options['responseType'] = "json";

    return options;
  }
}




