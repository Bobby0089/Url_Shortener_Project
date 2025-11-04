// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BuyPlanService {

//   private buyurl = 'http://localhost:8080/urlapp/buyplan/buy'

//   constructor(private http: HttpClient) { }

//   buyPlans(data: any): Observable<any> {
//     const token = localStorage.getItem('token');

//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//     return this.http.post(this.buyurl, data, { headers });
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
export class BuyPlanService {

  private readonly buyUrl = `${environment.apiUrl}/buyplan/buy`;
  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  buyPlans(data: any): Observable<any> {
    return this.http.post<any>(this.buyUrl, data, { headers: this.getAuthHeaders() });
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
