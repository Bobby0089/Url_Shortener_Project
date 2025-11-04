// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ActivateUserService {

//  activateApi: string = 'http://localhost:8080/urlapp/user/RemoveFromBlackList';

//   constructor(private http: HttpClient) { }

//   activatedUser(userId: any): Observable<any> {
//   const token = localStorage.getItem('token');

//   const headers = {
//     Authorization: `Bearer ${token}`
//   };

//   const params = {
//     userId: userId.toString()
//   };

//   return this.http.put(this.activateApi, {}, { headers, params });
// }
// }



import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { of, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivateUserService {

  private activateApi: string = `${environment.apiUrl}/user/RemoveFromBlackList`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // detect SSR or browser
  ) { }

  // activatedUser(userId: any): Observable<any> {
  //   let headers = new HttpHeaders();
  //   let params = new HttpParams().set('userId', userId.toString());

  //   // Only access localStorage if we are in the browser
  //   if (isPlatformBrowser(this.platformId)) {
  //     const token = localStorage.getItem('token'); // safe for browser
  //     if (token) {
  //       headers = headers.set('Authorization', `Bearer ${token}`);
  //     }
  //   }

  //   return this.http.put(this.activateApi, {}, { headers, params });
  // }

  activatedUser(userId: any): Observable<any> {
  if (!isPlatformBrowser(this.platformId)) {
    console.log('Skipping ActivateUser API call on server-side');
    return new Observable(observer => {
      observer.next(null); // return empty response
      observer.complete();
    });
  }

  let headers = new HttpHeaders();
  const params = new HttpParams().set('userId', userId.toString());

  const token = localStorage.getItem('token');
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.put(this.activateApi, {}, { headers, params });
}

}
