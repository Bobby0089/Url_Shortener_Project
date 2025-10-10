import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssignQueryService {

  // assignQueryApi: string = 'http://localhost:8080/urlapp/query/assign';

assignQueryApi: string = `${environment.apiUrl}/query/assign`;

  constructor(private http: HttpClient) { }

  assignAQuery(obj:any):Observable<any>{
    return this.http.post(this.assignQueryApi,obj);
  }
}
