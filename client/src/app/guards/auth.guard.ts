// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

//   canActivate(): boolean {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         return true;
//       } else {
//         this.router.navigate(['/login']);
//         return false;
//       }
//     } else {
//       // On server (SSR/prerender), allow access or handle differently
//       return true;
//     }
//   }
// }


import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('role'); // your stored role
      const expectedRole = route.data['role'];       // role from route

      if (token && (!expectedRole || userRole === expectedRole)) {
        return true;
      } else {
        // optionally you can redirect differently for role mismatch
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // On server (SSR/prerender), allow access or handle differently
      return true;
    }
  }
}
