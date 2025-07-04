import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdatePlanService {

  updatePlanApi: string = 'http://localhost:8080/urlapp/plan/update';

  constructor(private http: HttpClient) { }

  updatePlan(obj:any):Observable<any>{
    const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };
    return this.http.put(this.updatePlanApi,obj,{headers});
  }
}
