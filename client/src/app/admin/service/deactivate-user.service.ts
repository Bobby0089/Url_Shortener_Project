// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DeactivateUserService {

//   deactivateApi: string = 'http://localhost:8080/urlapp/user/BlackListUser';

//   constructor(private http: HttpClient) { }

//   deactivatedUser(userId: any): Observable<any> {
//   const token = localStorage.getItem('token');

//   const headers = {
//     Authorization: `Bearer ${token}`
//   };

//   const params = {
//     userId: userId.toString()
//   };

//   return this.http.put(this.deactivateApi, {}, { headers, params });
// }

// }

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeactivateUserService {
  private deactivateApi = `${environment.apiUrl}/user/BlackListUser`;

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

  deactivatedUser(userId: any): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.put(this.deactivateApi, {}, { headers, params });
  }
}
