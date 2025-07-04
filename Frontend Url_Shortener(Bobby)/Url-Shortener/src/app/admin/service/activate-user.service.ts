import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateUserService {

 activateApi: string = 'http://localhost:8080/urlapp/user/RemoveFromBlackList';

  constructor(private http: HttpClient) { }

  activatedUser(userId: any): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const params = {
    userId: userId.toString()
  };

  return this.http.put(this.activateApi, {}, { headers, params });
}
}
