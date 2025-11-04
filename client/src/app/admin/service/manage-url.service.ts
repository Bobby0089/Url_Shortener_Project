// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ManageUrlService {

//   manageUrlApi: string = 'http://localhost:8080/urlapp/generateurl/view';
//   totalCountApi: string = 'http://localhost:8080/urlapp/generateurl/count';

//   constructor(private http: HttpClient) { }

//   viewAllUrls(pageNumber: number, pageSize: number): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//     const params = {
//       pageNumber: pageNumber.toString(),
//       pageSize: pageSize.toString(),
//     };
//     return this.http.get(this.manageUrlApi, { params, headers });
//   }

//   getTotalUrlCount(): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//     return this.http.get<any>(this.totalCountApi, { headers });
//   }

//   // Optional: Add method for filtered results if your backend supports it
//   viewFilteredUrls(pageNumber: number, pageSize: number, filters: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//     const params = {
//       pageNumber: pageNumber.toString(),
//       pageSize: pageSize.toString(),
//       ...filters
//     };
//     return this.http.get(this.manageUrlApi, { params, headers });
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
export class ManageUrlService {
  private manageUrlApi = `${environment.apiUrl}/generateurl/view`;
  private totalCountApi = `${environment.apiUrl}/generateurl/count`;

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

  viewAllUrls(pageNumber: number, pageSize: number): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get(this.manageUrlApi, { params, headers });
  }

  getTotalUrlCount(): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.totalCountApi, { headers });
  }

  viewFilteredUrls(pageNumber: number, pageSize: number, filters: any): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      ...filters
    };
    return this.http.get(this.manageUrlApi, { params, headers });
  }
}
