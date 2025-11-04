import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePlanService } from '../service/create-plan.service';

@Component({
  selector: 'app-create-plan',
  standalone: false,
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent {

  constructor(private createService: CreatePlanService){}

  createPlanForm: FormGroup = new FormGroup({
    planname: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    urllimit: new FormControl('', Validators.required),
    clicksperurl: new FormControl('', Validators.required),
    customerlimit: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
   
  });

  onCreatePlan(){
    const obj = this.createPlanForm.value;
    this.createService.createPlan(obj).subscribe((res:any) => {
      console.log("hii")
        alert("Plan Created");
     });
  }

}
