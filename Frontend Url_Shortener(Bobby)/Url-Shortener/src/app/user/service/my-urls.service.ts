import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

   manageUrlApi: string = 'http://localhost:8080/urlapp/generateurl/viewUserUrls';

  constructor(private http: HttpClient) { }

   viewAllUrls(pageNumber: number, pageSize: number, userId: number):Observable<any>{
    const params = {
      pageNumber,
      pageSize,
      userId
    }
    return this.http.get(this.manageUrlApi, { params });
  }
}
