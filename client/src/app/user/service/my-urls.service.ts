// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class MyUrlsService {

//    manageUrlApi: string = 'http://localhost:8080/urlapp/generateurl/viewUserUrls';

//   constructor(private http: HttpClient) { }

//    viewAllUrls(pageNumber: number, pageSize: number, userId: number):Observable<any>{
//     const params = {
//       pageNumber,
//       pageSize,
//       userId
//     }
//     return this.http.get(this.manageUrlApi, { params });
//   }
// }


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

  private readonly manageUrlApi = `${environment.apiUrl}/generateurl/viewUserUrls`;
  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  viewAllUrls(pageNumber: number, pageSize: number, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('userId', userId.toString());

    return this.http.get<any>(this.manageUrlApi, { params, headers: this.getAuthHeaders() });
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
