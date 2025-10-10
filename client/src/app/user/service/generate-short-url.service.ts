import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // ✅ use environment

@Injectable({
  providedIn: 'root'
})
export class GenerateShortUrlService {

  // ✅ Base URL from environment file
  private shorturl = `${environment.apiUrl}/generateurl/short`;
  private customShortUrl = `${environment.apiUrl}/generateurl/customshort`;
  private viewPlanUrl = `${environment.apiUrl}/buyplan/viewplan`;
  private getUserDetailsUrl = `${environment.apiUrl}/user/getAUser`;

  constructor(private http: HttpClient) {}

  // ✅ Fetch all plans of a user
  getUserPlans(userId: any): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any[]>(`${this.viewPlanUrl}/${userId}`, { headers });
  }

  // ✅ Generate a short URL
  generateShortUrl(originalUrl: string, userId: number, planid: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const payload = { originalUrl, userId, planid };
    return this.http.post<any>(this.shorturl, payload, { headers });
  }

  // ✅ Generate a custom short URL
  generateCustomShortUrl(originalUrl: string, userId: number, planid: number, customUrl: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const payload = { originalUrl, userId, planid, customUrl };
    return this.http.post<any>(this.customShortUrl, payload, { headers });
  }

  // ✅ Get user details
  getUserDetails(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.getUserDetailsUrl}/${username}`, { headers });
  }
}
