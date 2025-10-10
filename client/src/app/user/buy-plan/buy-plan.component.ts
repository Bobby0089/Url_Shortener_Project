// buy-plan.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ViewPlanService } from '../../admin/service/view-plan.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponentComponent } from '../checkout-dialog-component/checkout-dialog-component.component';

export interface Plan {
  id?: number;
  planname: string;
  type: string;
  urllimit: number;
  clicksperurl: number;
  customurllimit: number;
  price: number;
}

@Component({
  selector: 'app-buy-plan',
  standalone: false,
  templateUrl: './buy-plan.component.html',
  styleUrl: './buy-plan.component.css'
})
export class BuyPLanComponent implements OnInit {

  plans: Plan[] = [];
  selectedPlans: Plan[] = [];
  currentIndex: number = 0;

  pageNumber: number = 0;
  pageSize: number = 10;

  readonly dialog = inject(MatDialog);

  constructor(private viewplan: ViewPlanService) {}

  ngOnInit(): void {
    this.getAllPlan(this.pageNumber, this.pageSize);
  }

  getAllPlan(pageNumber: number, pageSize: number) {
    this.viewplan.getAllPlan(pageNumber, pageSize).subscribe({
      next: (response) => {
        this.plans = response?.content || [];
      },
      error: (error) => {
        console.error('Error fetching plans:', error);
      }
    });
  }

  // Add plan to selected plans
  buyPlan(plan: Plan) {
    const existingPlan = this.selectedPlans.find(p => p.planname === plan.planname);
    if (!existingPlan) {
      this.selectedPlans.push(plan);
    }
  }

  // Remove plan from selected plans
  removePlan(planName: string) {
    this.selectedPlans = this.selectedPlans.filter(plan => plan.planname !== planName);
  }

  // Check if plan is already selected
  isPlanSelected(plan: Plan): boolean {
    return this.selectedPlans.some(p => p.planname === plan.planname);
  }

  // Calculate total amount
  getTotalAmount(): number {
    return this.selectedPlans.reduce((total, plan) => total + plan.price, 0);
  }

  // Open checkout dialog with selected plans
  openDialog(): void {
    if (this.selectedPlans.length === 0) {
      alert('Please select at least one plan before checkout.');
      return;
    }

    const dialogRef = this.dialog.open(CheckoutDialogComponentComponent, {
      width: '500px',
      data: {
        selectedPlans: this.selectedPlans,
        totalAmount: this.getTotalAmount()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'purchased') {
        // Handle successful purchase
        this.selectedPlans = [];
        alert('Purchase completed successfully!');
      }
    });
  }

  showNextPlan() {
    if (this.plans.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.plans.length;
      console.log(this.plans);
    }
  }
}