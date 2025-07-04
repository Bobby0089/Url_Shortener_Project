import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViewQueryService {
  private readonly viewQueryApi = 'http://localhost:8080/urlapp/query/getallquery';

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
