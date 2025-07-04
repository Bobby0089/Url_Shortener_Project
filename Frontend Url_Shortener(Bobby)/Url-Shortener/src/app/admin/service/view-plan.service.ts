import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewPlanService {

  private viewPlanApi = 'http://localhost:8080/urlapp/plan/view';

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
