import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUrlService {

  manageUrlApi: string = 'http://localhost:8080/urlapp/generateurl/view';
  totalCountApi: string = 'http://localhost:8080/urlapp/generateurl/count';

  constructor(private http: HttpClient) { }

  viewAllUrls(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    };
    return this.http.get(this.manageUrlApi, { params, headers });
  }

  getTotalUrlCount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any>(this.totalCountApi, { headers });
  }

  // Optional: Add method for filtered results if your backend supports it
  viewFilteredUrls(pageNumber: number, pageSize: number, filters: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      ...filters
    };
    return this.http.get(this.manageUrlApi, { params, headers });
  }
}