// // login.service.ts
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// export interface LoginResponse {
//   token?: string;
//   user?: any;
//   role?: string;
//   message?: string;
//   // Add other properties based on your API response
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   private loginApi = 'http://localhost:8080/urlapp/auth/login';

//   constructor(private http: HttpClient) { }

//   login(loginData: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(this.loginApi, loginData);
//   }

// storeAuthToken(token: string): void {
//   localStorage.setItem('token', token); // Correct method
// }
// }

// login.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  user?: any;
  role?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginApi = `${environment.apiUrl}/auth/login`;
  private isBrowser: boolean = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginApi, loginData);
  }

  storeAuthToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  getAuthToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  clearAuthToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }
}
