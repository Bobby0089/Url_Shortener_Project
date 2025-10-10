import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ViewQueryService } from '../service/view-query.service';
import { GenerateShortUrlService } from '../service/generate-short-url.service';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-my-query',
  standalone: false,
  templateUrl: './my-query.component.html',
  styleUrl: './my-query.component.css'
})
export class MyQueryComponent implements OnInit, AfterViewInit {

  allQuery: any[] = [];
  username: string | null = null;
  userDetails: any = {};
  userid: any = null;

  constructor(
    private services: GenerateShortUrlService,
    private service: ViewQueryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Keep empty or for server-safe code
  }

  ngAfterViewInit(): void {
    // Run this only in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeUser();
    }
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
        this.userDetails = response;
        this.userid = response?.id;
        if (this.userid != null) {
          this.viewQuery(0,20,this.userid);
        }
      },
      error: (error: any) => {
        console.error('Error loading user details:', error);
      }
    });
  }

  private viewQuery(pageNumber: number, pageSize: number, userId: any): void {
    this.service.ViewAllQuery(pageNumber,pageSize,userId).subscribe({
      next: (response) => {
        this.allQuery = response?.content || [];
      },
      error: (error) => {
        console.error('Error fetching queries:', error);
      }
    });
  }
}
