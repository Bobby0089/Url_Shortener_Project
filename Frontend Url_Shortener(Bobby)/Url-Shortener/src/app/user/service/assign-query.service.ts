import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignQueryService {

  assignQueryApi: string = 'http://localhost:8080/urlapp/query/assign';

  constructor(private http: HttpClient) { }

  assignAQuery(obj:any):Observable<any>{
    return this.http.post(this.assignQueryApi,obj);
  }
}
