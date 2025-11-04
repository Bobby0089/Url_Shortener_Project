// checkout-dialog-component.component.ts
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuyPlanService } from '../service/buy-plan.service';
import { GenerateShortUrlService } from '../service/generate-short-url.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export interface DialogData {
  selectedPlans: any[];
  totalAmount: number;
}

@Component({
  selector: 'app-checkout-dialog-component',
  standalone: false,
  templateUrl: './checkout-dialog-component.component.html',
  styleUrls: ['./checkout-dialog-component.component.css']
})
export class CheckoutDialogComponentComponent implements OnInit {

  // User and authentication
  username: string | null = null;
  userDetails: any = {};
  userid: any = null;

  selectedPlans: any[] = [];
  showCheckout: boolean = false;
  purchasedPlanIds: number[] = [];

  isLoading: boolean = false;
  isPurchasing: boolean = false; // Add loading state for purchase

  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: BuyPlanService,
    private services: GenerateShortUrlService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  private initializeUser(): void {
    const username = this.getSubFromToken('token');
    
    if (username) {
      this.username = username;
      console.log('Username:', this.username);
      this.getUserFromUserName(username);
    } else {
      console.error('Authentication failed - no valid token');
      // this.showPopup('Authentication failed. Please log in again.', undefined, 'error');
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

    this.isLoading = true;
    
    this.services.getUserDetails(name).subscribe({
      next: (response) => {
        this.userDetails = response;
        this.userid = response?.id;
        
        if (this.userid) {
          console.log('User details loaded:', this.userDetails);
        } else {
          console.error('User ID not found in response');
        }
      },
      error: (error) => {
        console.error('Error loading user details:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  // Fixed onBuy method to make API call
  onBuy(): void {
    if (this.data.selectedPlans.length === 0) {
      alert('No plans selected for purchase.');
      return;
    }

    if (!this.userid) {
      alert('User not found. Please log in again.');
      return;
    }

    this.isPurchasing = true;

    const payload = {
      userId: this.userid,
      planIds: this.data.selectedPlans.map(plan => plan.id)
    };

    this.service.buyPlans(payload).subscribe({
      next: (response) => {
        console.log('Plans purchased successfully:', response);
        alert('Plans purchased successfully!');
        this.dialogRef.close('purchased'); // Close with success result
      },
      error: (error) => {
        console.error('Error purchasing plans:', error);
        alert(error.error?.message || 'Something went wrong during purchase.');
        this.isPurchasing = false;
      },
      complete: () => {
        this.isPurchasing = false;
      }
    });
  }

  // Keep the old buyPlans method for backward compatibility (if needed elsewhere)
  buyPlans() {
    const userData = localStorage.getItem('userdetails');
    if (!userData) {
      alert('User not found. Please log in.');
      return;
    }

    const user = JSON.parse(userData);
    const payload = {
      userId: user.id,
      planIds: this.selectedPlans.map(p => p.id)
    };

    this.service.buyPlans(payload).subscribe({
      next: () => {
        this.purchasedPlanIds.push(...this.selectedPlans.map(p => p.id));
        this.selectedPlans = [];
        this.showCheckout = false;
        alert('Plans purchased successfully!');
      },
      error: (err:any) => {
        console.error(err);
        alert(err.error.message || 'Something went wrong.');
      }
    });
  }

  proceedToCheckout() {
    if (this.selectedPlans.length === 0) {
      alert('Please select at least one plan.');
      return;
    }
    this.showCheckout = true;
  }

  closeCheckout() {
    this.showCheckout = false;
  }

  isSelected(plan: any): boolean {
    return this.selectedPlans.some(p => p.id === plan.id);
  }
}