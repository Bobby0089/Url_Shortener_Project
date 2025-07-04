import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  apiUrl: string = 'http://localhost:8080/urlapp/auth/register';

  constructor(private http: HttpClient,) { }

  registerUser(obj:any):Observable<any>{
  return  this.http.post(this.apiUrl,obj,)
  }
}
