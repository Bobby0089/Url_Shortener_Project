import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  apiUrl: string = 'http://localhost:8080/urlapp/user/getallusers';
  totalCountApi: string = 'http://localhost:8080/urlapp/user/count'

  constructor(private http: HttpClient) { }

  getAllUser(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {
      pageNumber,
      pageSize
    }
    return this.http.get<any[]>(this.apiUrl, { headers, params });
  }

  getTotalUsersCount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<any>(this.totalCountApi, { headers });
  }

}
