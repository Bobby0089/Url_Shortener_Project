import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserQueriesService {
  private baseUrl = `${environment.apiUrl}/query/view`;
  private responseUserQueryApi = `${environment.apiUrl}/query/adminResponse`;

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
      headers = headers.set('Content-Type', 'application/json');
    }
    return headers;
  }

  viewAllQueries(pageNumber: number, pageSize: number): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = { pageNumber, pageSize };
    return this.http.get(this.baseUrl, { params, headers });
  }

  submitQueryResponse(userQueryId: number, responseObj: any): Observable<any> {
    if (!this.isBrowser()) return of(null);

    const headers = this.getAuthHeaders();
    const params = { userQueryId: userQueryId.toString() };
    return this.http.put(this.responseUserQueryApi, responseObj, { params, headers });
  }
}
