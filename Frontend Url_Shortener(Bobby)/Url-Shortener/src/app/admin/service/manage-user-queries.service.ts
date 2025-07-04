import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserQueriesService {

  private baseUrl = 'http://localhost:8080/urlapp/query/view';
  private responseUserQueryApi = 'http://localhost:8080/urlapp/query/adminResponse';

  constructor(private http: HttpClient) { }

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  
  viewAllQueries(pageNumber: number, pageSize: number): Observable<any> {
    const params = {
      pageNumber,
      pageSize
    };
    const headers = this.getAuthHeaders();
    return this.http.get(this.baseUrl, { params, headers });
  }

  
  submitQueryResponse(userQueryId: number, responseObj: any): Observable<any> {
    const params = { userQueryId: userQueryId.toString() };
    const headers = this.getAuthHeaders();
    return this.http.put(this.responseUserQueryApi, responseObj, { params, headers });
  }
}
