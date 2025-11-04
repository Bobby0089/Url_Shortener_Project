// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CreatePlanService {

//   createPlanApi: string = 'http://localhost:8080/urlapp/plan/create';

//   constructor(private http: HttpClient) { }

//   createPlan(obj: any): Observable<any> {
//     const token = localStorage.getItem('token');

//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//     return this.http.post(this.createPlanApi, obj,  { headers});
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatePlanService {

  private createPlanApi: string = `${environment.apiUrl}/plan/create`;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // createPlan(obj: any): Observable<any> {
  //   let headers = new HttpHeaders();

  //   if (this.isBrowser) {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       headers = headers.set('Authorization', `Bearer ${token}`);
  //     }
  //   }

  //   return this.http.post(this.createPlanApi, obj, { headers });
  // }

  createPlan(obj: any): Observable<any> {
  if (!this.isBrowser) {
    console.log('Skipping createPlan API call on server-side');
    return new Observable(observer => {
      observer.next(null); // return empty response
      observer.complete();
    });
  }

  let headers = new HttpHeaders();
  const token = localStorage.getItem('token');
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post(this.createPlanApi, obj, { headers });
}
}
