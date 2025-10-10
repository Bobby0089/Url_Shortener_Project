import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav2',
  standalone: false,
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.css'
})
export class Nav2Component {

  //constructor
  constructor(private router: Router) { }


  //Methods
  goToLogin() {
    this.router.navigate(['/auth/Login'])
  }

}
