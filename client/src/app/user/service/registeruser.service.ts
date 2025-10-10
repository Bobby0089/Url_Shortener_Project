import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  // apiUrl: string = 'http://localhost:8080/urlapp/auth/register';

  // ${API_BASE_URL}

  apiUrl: string = `${environment.apiUrl}/auth/register`;

  constructor(private http: HttpClient,) { }

  registerUser(obj:any):Observable<any>{
  return  this.http.post(this.apiUrl,obj,)
  }
}
