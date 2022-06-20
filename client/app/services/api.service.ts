import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Settings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = Settings.apiUrl;

  constructor(private _http: HttpClient) {}

  getTypeRequest(url: string) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: object) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: string, payload: object) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  deleteTypeRequest(url: string) {
    return this._http.delete(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }

}
