// // import { HttpClient } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class ManageUsersService {

// //   apiUrl: string = 'http://localhost:8080/urlapp/user/getallusers';
// //   totalCountApi: string = 'http://localhost:8080/urlapp/user/count'

// //   constructor(private http: HttpClient) { }

// //   getAllUser(pageNumber: number, pageSize: number): Observable<any> {
// //     const token = localStorage.getItem('token');

// //     const headers = {
// //       Authorization: `Bearer ${token}`
// //     };
// //     const params = {
// //       pageNumber,
// //       pageSize
// //     }
// //     return this.http.get<any[]>(this.apiUrl, { headers, params });
// //   }

// //   getTotalUsersCount(): Observable<any> {
// //     const token = localStorage.getItem('token');
// //     const headers = {
// //       Authorization: `Bearer ${token}`
// //     };
// //     return this.http.get<any>(this.totalCountApi, { headers });
// //   }

// // }

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ManageUserQueriesService {

//   private baseUrl = 'https://intuitive-art-production.up.railway.app/urlapp/query/view';
//   private responseUserQueryApi = 'https://intuitive-art-production.up.railway.app/urlapp/query/adminResponse';
//   private isBrowser: boolean;

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   private getAuthHeaders(): HttpHeaders {
//     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     if (this.isBrowser) {
//       const token = localStorage.getItem('token');
//       if (token) headers = headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   }

//   viewAllQueries(pageNumber: number, pageSize: number): Observable<any> {
//     const headers = this.getAuthHeaders();
//     const params = { pageNumber, pageSize };
//     return this.http.get(this.baseUrl, { params, headers });
//   }

//   submitQueryResponse(userQueryId: number, responseObj: any): Observable<any> {
//     const headers = this.getAuthHeaders();
//     const params = { userQueryId: userQueryId.toString() };
//     return this.http.put(this.responseUserQueryApi, responseObj, { params, headers });
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  private apiUrl = `${environment.apiUrl}/user/getallusers`;
  private totalCountApi = `${environment.apiUrl}/user/count`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getAllUser(pageNumber: number, pageSize: number): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = { pageNumber, pageSize };
    return this.http.get<any[]>(this.apiUrl, { headers, params });
  }

  getTotalUsersCount(): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.totalCountApi, { headers });
  }
}
