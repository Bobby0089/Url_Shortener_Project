// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RedirectUrlService {

//   constructor(private http: HttpClient) { }

//    redirectUrl(url: string): Observable<any> {
//      const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//     return this.http.get<any>(`http://localhost:8080/urlapp/urlclick/${url}`,{ headers });
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
export class RedirectUrlService {

  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  redirectUrl(url: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/urlclick/${url}`, {
      headers: this.getAuthHeaders()
    });
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
