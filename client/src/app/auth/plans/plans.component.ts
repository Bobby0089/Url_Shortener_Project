import { Component, OnInit } from '@angular/core';
import { ViewPlanService } from '../../admin/service/view-plan.service';

@Component({
  selector: 'app-plans',
  standalone: false,
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {

  plans:any[]=[];
  currentIndex: number = 0;

  pageNumber: number = 0;
  pageSize : number = 10;

  constructor(private viewplan: ViewPlanService){}

  ngOnInit(): void {
    this.getAllPlan(this.pageNumber,this.pageSize);
  }

  getAllPlan(pageNumber: number, pageSize: number){
    
    this.viewplan.getAllPlan(pageNumber,pageSize).subscribe({
      next: (response) => {
        this.plans = response?.content || [];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    })
  }

  showNextPlan() {
    if (this.plans.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.plans.length;
      console.log(this.plans)
    }
  }

}
