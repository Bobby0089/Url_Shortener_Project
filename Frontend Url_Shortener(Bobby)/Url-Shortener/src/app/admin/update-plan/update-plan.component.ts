import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdatePlanService } from '../service/update-plan.service';

@Component({
  selector: 'app-update-plan',
  standalone: false,
  templateUrl: './update-plan.component.html',
  styleUrl: './update-plan.component.css'
})
export class UpdatePlanComponent {

  updatePlanForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    planname: new FormControl('', Validators.required),
    urllimit: new FormControl('', Validators.required),
    clicksperurl: new FormControl('', Validators.required),
    customerlimit: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  constructor(private service: UpdatePlanService){}

  onUpdate(){
    const obj = this.updatePlanForm.value;

    this.service.updatePlan(obj).subscribe((res:any) => {
      alert("Plan Updated");
    })
  }
}
