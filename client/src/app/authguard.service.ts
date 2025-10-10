import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/Login'], { queryParams: { alert: 'Please Login first' } });
      alert("Please login first");
      return false;
    }
    const userRole = this.getUserRole(token);
    const expectedRole = route.data['role'];



    // If no role is required, allow access
    if (!expectedRole) {
      return true;
    }

    // Check if user has the required role
    if (userRole !== expectedRole) {
      console.log(userRole,expectedRole)
      this.router.navigate(['/auth/Login']);
      localStorage.removeItem('token')
      alert("Access Denied");
      return false;
    }


    return true;
  }

  getUserRole(token: string): string {
  try {
    const base64UrlDecode = (str: string): string => {
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
      console.log(str,pad)
      return atob(str + pad);
    };

    const payload = JSON.parse(base64UrlDecode(token.split('.')[1]));
    
    if (Array.isArray(payload.role) && payload.role.length > 0 && payload.role[0].authority) {
      console.log(payload)
      return payload.role[0].authority;
    }

    return '';
  } catch (error) {
    console.error('Invalid token', error);
    return '';
  }
}
}

