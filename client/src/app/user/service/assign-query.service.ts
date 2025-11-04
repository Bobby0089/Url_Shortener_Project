// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AssignQueryService {

//   assignQueryApi: string = 'http://localhost:8080/urlapp/query/assign';

//   constructor(private http: HttpClient) { }

//   assignAQuery(obj:any):Observable<any>{
//     return this.http.post(this.assignQueryApi,obj);
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssignQueryService {

  private readonly assignQueryApi = `${environment.apiUrl}/query/assign`;
  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  assignAQuery(obj: any): Observable<any> {
    return this.http.post<any>(this.assignQueryApi, obj, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
