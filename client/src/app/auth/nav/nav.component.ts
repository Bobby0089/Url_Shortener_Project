import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  //constructor
  constructor(private router: Router) { }


  //Methods
  goToLogin() {
    this.router.navigate(['/auth/Login'])
  }

}
