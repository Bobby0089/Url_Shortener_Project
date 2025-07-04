import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  getAllTransactionApi: string = 'http://localhost:8080/urlapp/transaction/getallTransaction'

  constructor(private http: HttpClient) { }

  viewAllTransaction(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {
      pageNumber,
      pageSize
    }
    return this.http.get<any[]>(this.getAllTransactionApi, { params })
  }


}
