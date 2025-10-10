import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatePlanService {

createPlanApi: string = `${environment.apiUrl}/plan/create`;

  constructor(private http: HttpClient) { }

  createPlan(obj: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(this.createPlanApi, obj,  { headers});
  }
}
