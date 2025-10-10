import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewBlackListUserService {

  // ${API_BASE_URL}

  // viewBlacklistUser: string = 'http://localhost:8080/urlapp/user/getallblockusers';

  viewBlacklistUser: string = `${environment.apiUrl}/user/getallblockusers`;

  constructor(private http: HttpClient) { }

  viewBlacklistUsers(pageNumber: number, pageSize: number):Observable<any>{
    const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };
    const params = {
      pageNumber,
      pageSize
    }
    return this.http.get<any[]>(this.viewBlacklistUser, { headers,params });
  }
}
