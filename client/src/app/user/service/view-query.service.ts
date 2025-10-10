import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ViewQueryService {
  // private readonly viewQueryApi = 'http://localhost:8080/urlapp/query/getallquery';

  // ${API_BASE_URL}

private readonly viewQueryApi = `${environment.apiUrl}/query/getallquery`;

  constructor(private http: HttpClient) { }

  ViewAllQuery(pageNumber: number, pageSize: number, userId: number): Observable<any> {
    const params ={
      pageNumber,
      pageSize,
      userId
    }
    return this.http.get<any[]>(this.viewQueryApi, {params});
  }
}
