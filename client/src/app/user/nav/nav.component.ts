import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  //Constructor
  constructor(private router: Router){}

  // //Methods
  // goToHome(){
  //   this.router.navigate(['/auth/Home'])
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/Home']);
  }

}
