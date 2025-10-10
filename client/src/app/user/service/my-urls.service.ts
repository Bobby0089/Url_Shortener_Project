import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyUrlsService {

  //  manageUrlApi: string = 'http://localhost:8080/urlapp/generateurl/viewUserUrls';

  //  ${API_BASE_URL}

  manageUrlApi: string = `${environment.apiUrl}/generateurl/viewUserUrls`;

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
