import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { AuthguardService } from '../../authguard.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userLogin!: FormGroup;
  siteKey: string = '6LchH0MrAAAAAP_bDLHFyAFDKtwKTbneBiMg1A3I'; // Google reCAPTCHA site key
  errorMessage: string = '';
  isLoading: boolean = false;
  isBrowser: boolean = false;
  userRole: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: AuthguardService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in browser
  }

  ngOnInit(): void {
    this.userLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  onLogin() {
    this.errorMessage = ''; // Clear previous errors
    
    if (this.userLogin.invalid) {
      this.errorMessage = "Please fill all required fields correctly and complete the CAPTCHA.";
      return;
    }

    this.isLoading = true;
    
    const loginData = {
      username: this.userLogin.value.username,
      password: this.userLogin.value.password,
      role: this.userLogin.value.role
    };

    this.loginService.login(loginData).subscribe({
      next: (res: any) => {
        console.log('Login successful');
        this.isLoading = false;

        if (res.accessToken) {
          this.loginService.storeAuthToken(res.accessToken);
          console.log("Token stored: " + res.accessToken);
          this.userRole = this.auth.getUserRole(res.accessToken);
        }

        // Navigate based on role
        if (this.userRole === 'ROLE_ADMIN' ) {
          this.router.navigate(['/admin/DashBoard']);
        } else if (this.userRole === 'ROLE_CUSTOMER') {
          this.router.navigate(['/user/DashBoard']);
        } else {
          alert("Invalid Credentials");
          this.router.navigate(['/auth/Home']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        this.isLoading = false;

        if (error.status === 401) {
          this.errorMessage = "Invalid username, password, or role. Please try again.";
        } else if (error.status === 403) {
          this.errorMessage = "Access denied. Please check your credentials.";
        } else if (error.status === 404) {
          this.errorMessage = "User not found. Please check your username.";
        } else if (error.status === 0) {
          this.errorMessage = "Unable to connect to server. Please check your internet connection.";
        } else {
          this.errorMessage = "Login failed. Please try again later.";
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
    // Remove the reCAPTCHA script
    const script = document.querySelector('script[src*="recaptcha"]');
    if (script) {
      script.remove();
    }

    // Optionally delete the global grecaptcha object
    if ((window as any).grecaptcha) {
      delete (window as any).grecaptcha;
    }
  }
  }


  
}
