import { Component, OnInit } from '@angular/core';
import { ViewPlanService } from '../service/view-plan.service';

@Component({
  selector: 'app-view-plan',
  standalone: false,
  templateUrl: './view-plan.component.html',
  styleUrl: './view-plan.component.css'
})
export class ViewPlanComponent implements OnInit{

  plans:any[]=[];

  pageNumber: number = 0;
  pageSize : number = 10;

  constructor(private viewService : ViewPlanService){}

  ngOnInit(): void {
    this.getAllPlans(this.pageNumber,this.pageSize);
  }

  getAllPlans(pageNumber: number, pageSize: number){
    this.viewService.getAllPlan(pageNumber,pageSize).subscribe({
       next: (response: any) => {
        this.plans = response?.content || [];
        console.log(response);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

}
