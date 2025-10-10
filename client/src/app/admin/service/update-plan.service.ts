import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdatePlanService {

  // ${API_BASE_URL}

  // updatePlanApi: string = 'http://localhost:8080/urlapp/plan/update';

  updatePlanApi: string = `${environment.apiUrl}/plan/update`;

  constructor(private http: HttpClient) { }

  updatePlan(obj:any):Observable<any>{
    const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };
    return this.http.put(this.updatePlanApi,obj,{headers});
  }
}
