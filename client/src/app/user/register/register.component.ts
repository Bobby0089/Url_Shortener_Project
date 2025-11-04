import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from '../service/registeruser.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userArray: any[] = [];

  constructor(private http: HttpClient, private registerService: RegisterUserService, private router: Router) {
    // this.getAllUser(0, 10);
  }

  //Methods
  goToLogin() {
    this.router.navigate(['/auth/Login'])
  }

  registrationForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', Validators.required)
  });

  onRegistration() {
    const obj = this.registrationForm.value;

    this.registerService.registerUser(obj).subscribe((res: any) => {
      alert("User registered successfully");
    },
      (error: any) => {
        if (error.status === 409 || error.error?.message?.includes('already exists')) {
          alert("User already exists. Please try with a different username or email.");
        } else if (error.status === 400) {
          alert("Invalid user data. Please check your inputs.");
        } else {
          alert("Registration failed. Please try again later.");
        }
        console.error('Registration error:', error);
      });

  }

  

}

// getAllUser(pageNumber: number, pageSize: number) {
//     const params = {
//       pageNumber,
//       pageSize
//     };

//     console.log('Fetching all users...');
//     this.http.get<any[]>('http://localhost:8080/urlapp/user/getallusers',)
//       .subscribe({

//       });
//   }

//   viewPlans(plans: string[]) {
//     console.log('User Plans:', plans);
//   }

//   viewUrls(urls: string[]) {
//     console.log('Short URLs:', urls);
//   }

//   deactivateUser(userId: number) {
//     console.log('Deactivate user with ID:', userId);
//     // Add your HTTP call here
//   }

//   userPlansTotal(plans: string[]): number {
//     return plans?.length || 0;
//   }