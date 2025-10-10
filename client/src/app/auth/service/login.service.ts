// login.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: any;
  role?: string;
  message?: string;
  // Add other properties based on your API response
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private loginApi = 'http://localhost:8080/urlapp/auth/login';

  private loginApi = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) { }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginApi, loginData);
  }

storeAuthToken(token: string): void {
  localStorage.setItem('token', token); // Correct method
}
}