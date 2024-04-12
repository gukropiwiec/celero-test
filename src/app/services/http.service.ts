import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  private apiURI = 'https://gateway.marvel.com:443/v1/public'
  private apiKey = 'a918759ae6249931686d32f3d47de597'
  private limit = 100

  constructor(private httpClient: HttpClient) { }

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('apikey', this.apiKey);
    httpParams = httpParams.append('limit', this.limit)

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }

    const url = `${this.apiURI}/${endpoint}`;
    return this.httpClient.get<T>(url, { params: httpParams });
  }
}