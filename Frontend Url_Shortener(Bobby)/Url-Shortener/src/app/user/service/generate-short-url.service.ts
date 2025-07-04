import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateShortUrlService {

  private shorturl = "http://localhost:8080/urlapp/generateurl/short"
   private customShortUrl = 'http://localhost:8080/urlapp/generateurl/customshort'

  constructor(private http: HttpClient) { }

   getUserPlans(userId: any): Observable<any[]> {
    const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };
    return this.http.get<any[]>(`http://localhost:8080/urlapp/buyplan/viewplan/${userId}`, {headers});
  }

   generateShortUrl(originalUrl: string, userId: number, planid: number): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const payload = { originalUrl, userId, planid };
  return this.http.post<any>(this.shorturl, payload, { headers });
}

   generateCustomShortUrl(originalUrl: string, userId: number, planid: number, customUrl: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const payload = { originalUrl, userId, planid, customUrl };
  return this.http.post<any>(this.customShortUrl, payload, { headers });
}

  getUserDetails(username:string):Observable<any>{
    const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };
    return this.http.get(`http://localhost:8080/urlapp/user/getAUser/${username}`,{headers});
  }
}
