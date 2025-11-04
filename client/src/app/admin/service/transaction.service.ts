// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TransactionService {

//   getAllTransactionApi: string = 'http://localhost:8080/urlapp/transaction/getallTransaction'

//   constructor(private http: HttpClient) { }

//   viewAllTransaction(pageNumber: number, pageSize: number): Observable<any> {
//     const token = localStorage.getItem('token');

//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//     const params = {
//       pageNumber,
//       pageSize
//     }
//     return this.http.get<any[]>(this.getAllTransactionApi, { params })
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
export class TransactionService {
  private getAllTransactionApi = `${environment.apiUrl}/transaction/getallTransaction`;

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

  viewAllTransaction(pageNumber: number, pageSize: number): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    return this.http.get(`${this.getAllTransactionApi}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers });
  }
}


