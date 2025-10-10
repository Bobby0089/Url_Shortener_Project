import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: false,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{

  allTransaction: any[] = [];   // full data of current page from backend
  pagesize: number = 4;
  pagenumber: number = 1;
  totalAmount: number = 0;

  constructor(private service: TransactionService){}

  ngOnInit(): void {
    this.getAllTransaction(this.pagenumber,this.pagesize)
  }

  getAllTransaction(pageNumber: number, pageSize: number): void{
    this.service.viewAllTransaction(pageNumber - 1, pageSize).subscribe({
      next: (response: any) => {
        this.allTransaction = response?.content || [];
        console.log(this.allTransaction);
        this.totalAmount = this.allTransaction.reduce((total: number, item: any) => total + (item.price || 0), 0);
        
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      
      }
    })
  }

}
