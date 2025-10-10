// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RedirectUrlService {

//   constructor(private http: HttpClient) { }

//    redirectUrl(url: string): Observable<any> {
//      const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//     return this.http.get<any>(`http://localhost:8080/urlapp/urlclick/${url}`,{ headers });
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedirectUrlService {

  private redirectApi = `${environment.apiUrl}/urlclick/`; // ✅ Dynamic base URL

  constructor(private http: HttpClient) { }

  redirectUrl(shortUrl: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    // ✅ Use dynamic API URL for production
    return this.http.get<any>(`${this.redirectApi}${shortUrl}`, { headers });
  }
}
