import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-conatiner',
  standalone: false,
  templateUrl: './conatiner.component.html',
  styleUrl: './conatiner.component.css'
})
export class ConatinerComponent {

  constructor(private router: Router) {

  }

  goToRegister(){
   this.router.navigate(['user/Register']);
  }

}
