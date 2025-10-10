import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewPlanService {

  //  ${API_BASE_URL}

  // private viewPlanApi = 'http://localhost:8080/urlapp/plan/view';

private viewPlanApi = `${environment.apiUrl}/plan/view`;

  constructor(private http: HttpClient) { }

  getAllPlan(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get(this.viewPlanApi, { params });
  }
}
