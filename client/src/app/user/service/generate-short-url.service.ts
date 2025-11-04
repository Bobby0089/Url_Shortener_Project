// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GenerateShortUrlService {

//   private shorturl = "http://localhost:8080/urlapp/generateurl/short"
//    private customShortUrl = 'http://localhost:8080/urlapp/generateurl/customshort'

//   constructor(private http: HttpClient) { }

//    getUserPlans(userId: any): Observable<any[]> {
//     const token = localStorage.getItem('token');

//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//     return this.http.get<any[]>(`http://localhost:8080/urlapp/buyplan/viewplan/${userId}`, {headers});
//   }

//    generateShortUrl(originalUrl: string, userId: number, planid: number): Observable<any> {
//   const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//   const payload = { originalUrl, userId, planid };
//   return this.http.post<any>(this.shorturl, payload, { headers });
// }

//    generateCustomShortUrl(originalUrl: string, userId: number, planid: number, customUrl: string): Observable<any> {
//   const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//   const payload = { originalUrl, userId, planid, customUrl };
//   return this.http.post<any>(this.customShortUrl, payload, { headers });
// }

//   getUserDetails(username:string):Observable<any>{
//     const token = localStorage.getItem('token');

//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//     return this.http.get(`http://localhost:8080/urlapp/user/getAUser/${username}`,{headers});
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
export class GenerateShortUrlService {

  private readonly shortUrl = `${environment.apiUrl}/generateurl/short`;
  private readonly customShortUrl = `${environment.apiUrl}/generateurl/customshort`;
  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getUserPlans(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/buyplan/viewplan/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  generateShortUrl(originalUrl: string, userId: number, planId: number): Observable<any> {
    const payload = { originalUrl, userId, planId };
    return this.http.post<any>(this.shortUrl, payload, { headers: this.getAuthHeaders() });
  }

  generateCustomShortUrl(originalUrl: string, userId: number, planId: number, customUrl: string): Observable<any> {
    const payload = { originalUrl, userId, planId, customUrl };
    return this.http.post<any>(this.customShortUrl, payload, { headers: this.getAuthHeaders() });
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/getAUser/${username}`, {
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
