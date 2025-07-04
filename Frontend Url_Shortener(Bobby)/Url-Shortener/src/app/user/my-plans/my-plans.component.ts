import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GenerateShortUrlService } from '../service/generate-short-url.service';

@Component({
  selector: 'app-my-plans',
  standalone: false,
  templateUrl: './my-plans.component.html',
  styleUrl: './my-plans.component.css'
})
export class MyPlansComponent implements OnInit {

  Api: string = 'http://localhost:8080/urlapp/buyplan/viewplan';
  planArray: any[] = [];
  username: string | null = null;
  userDetails: any = {};
  userid: any = null;

  constructor(
    private services: GenerateShortUrlService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.initializeUser();

  }

  viewMyPlan(userId: number) {
    this.http.get<any>(`${this.Api}/${userId}`).subscribe({
      next: ( response ) => {
        this.planArray = response || [];
        console.log(this.planArray);
      },
      error: ( error ) => {
        console.error('Error fetching plans:', error);
      }
    })

  }

  private initializeUser(): void {
    const username = this.getSubFromToken('token');

    if (username) {
      this.username = username;
      console.log('Username:', this.username);
      this.getUserFromUserName(username);
    } else {
      console.error('Authentication failed - no valid token');
    }
  }

  private getSubFromToken(tokenKey: string = 'token'): string | null {
    try {
      if (!isPlatformBrowser(this.platformId)) {
        console.warn('Not running in the browser — localStorage is not available.');
        return null;
      }

      const token = localStorage.getItem(tokenKey);
      if (!token) {
        console.warn('No token found in localStorage');
        return null;
      }

      const decoded: any = jwtDecode(token);
      return typeof decoded.sub === 'string' ? decoded.sub : null;

    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  private getUserFromUserName(name: string): void {
    if (!name?.trim()) {
      console.error('Invalid username provided');
      return;
    }
    this.services.getUserDetails(name).subscribe({

      next: (response: any) => {
        console.log("hii");
        this.userDetails = response;
        console.log(response.id);
        this.userid = response?.id
        console.log(this.userid);
        this.viewMyPlan(this.userid);
      },
      error: (error: any) => {
        console.error('Error loading user details:', error);
      },

    });
  }

}
