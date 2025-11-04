// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ViewPlanService {

//   private viewPlanApi = 'http://localhost:8080/urlapp/plan/view';

//   constructor(private http: HttpClient) { }

//   getAllPlan(pageNumber: number, pageSize: number): Observable<any> {
//     const token = localStorage.getItem('token');

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     const params = new HttpParams()
//       .set('pageNumber', pageNumber.toString())
//       .set('pageSize', pageSize.toString());

//     return this.http.get(this.viewPlanApi, { params });
//   }
// }

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewPlanService {
  private viewPlanApi = `${environment.apiUrl}/plan/view`;

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

  getAllPlan(pageNumber: number, pageSize: number): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get(this.viewPlanApi, { headers, params });
  }
}
