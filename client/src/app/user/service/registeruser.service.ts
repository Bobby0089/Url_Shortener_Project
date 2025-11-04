// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RegisteruserService {

//   apiUrl: string = 'http://localhost:8080/urlapp/auth/register';

//   constructor(private http: HttpClient,) { }

//   registerUser(obj:any):Observable<any>{
//   return  this.http.post(this.apiUrl,obj,)
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private readonly apiUrl = `${environment.apiUrl}/auth/register`;

  constructor(private http: HttpClient) {}

  registerUser(obj: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, obj);
  } 
}
