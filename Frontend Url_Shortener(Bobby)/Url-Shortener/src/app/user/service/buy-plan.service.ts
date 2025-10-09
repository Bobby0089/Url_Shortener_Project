import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyPlanService {

  private buyurl = ' https://url-shortener-backend.osc-fr1.scalingo.io/urlapp/buyplan/buy'

  constructor(private http: HttpClient) { }

  buyPlans(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(this.buyurl, data, { headers });
  }
}
