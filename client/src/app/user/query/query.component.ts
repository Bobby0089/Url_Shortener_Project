import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GenerateShortUrlService } from '../service/generate-short-url.service';
import { AssignQueryService } from '../service/assign-query.service';

@Component({
  selector: 'app-query',
  standalone: false,
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})

export class QueryComponent implements OnInit {

  username: string | null = null;
  userDetails: any = {};
  userid: any = null;
  test: string = '';

  @ViewChild('assignQuery') queryInput!: ElementRef;

  constructor(
    private services: GenerateShortUrlService,
    private service: AssignQueryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.initializeUser();
    console.log(this.username, this.userid)

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
        this.userid = response?.id
      },
      error: (error: any) => {
        console.error('Error loading user details:', error);
      },

    });
  }


  showInput() {
    this.test = this.queryInput.nativeElement.value;

    const obj = {
      queryText: this.test,
      userid: this.userid
    };

    this.service.assignAQuery(obj).subscribe({
      next: (respose:any) => {
        alert('Query assigned successfully:');
      },
      error: (error:any) => {
        alert('Failed to assign query:');
      }
    })
  }
}