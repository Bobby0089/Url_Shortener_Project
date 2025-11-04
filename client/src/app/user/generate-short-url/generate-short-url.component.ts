import { Component, OnInit } from '@angular/core';
import { GenerateShortUrlService } from '../service/generate-short-url.service';
import { jwtDecode } from 'jwt-decode'; 
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Plan {
  id?: number;
  planname: string;
  type: string;
  urllimit: number;
  clicksperurl: number;
  customurllimit: number;
  price: number;
}

@Component({
  selector: 'app-generate-short-url',
  standalone: false,  
  templateUrl: './generate-short-url.component.html',
  styleUrls: ['./generate-short-url.component.css']
})
export class GenerateShortUrlComponent implements OnInit {

  // User and authentication
  username: string | null = null;
  userDetails: any = {};
  userid: any = null;
  
  // URL generation
  longUrl: string = '';
  shortUrl: string = '';
  customUrl: string = '';
  selectedPlanId: any = null;
  
  // Plans
  userplans: Plan[] = [];
  
  // UI state
  isLoading: boolean = false;
  customUrlEnabled: boolean = false;
  isGenerating: boolean = false;
  
  constructor(
    private service: GenerateShortUrlService,
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

  generateShortUrl(): void {
    if (!this.validateBasicFields()) {
      return;
    }

    this.isGenerating = true;
    
    this.service.generateShortUrl(this.longUrl, this.userid, this.selectedPlanId).subscribe({
      next: (res) => {
        this.handleSuccessfulGeneration(res.shortUrl);
      },
      error: (err) => {
        this.handleGenerationError(err);
      },
      complete: () => {
        this.isGenerating = false;
      }
    });
  }

  generateCustomShortUrl(): void {
    if (!this.validateCustomFields()) {
      return;
    }

    this.isGenerating = true;

    this.service.generateCustomShortUrl(
      this.longUrl, 
      this.userid, 
      this.selectedPlanId, 
      this.customUrl
    ).subscribe({
      next: (res) => {
        this.handleSuccessfulGeneration(res.shortUrl);
      },
      error: (err) => {
        this.handleGenerationError(err);
      },
      complete: () => {
        this.isGenerating = false;
      }
    });
  }

  private validateBasicFields(): boolean {
    if (!this.longUrl?.trim()) {
      // this.showPopup('Please enter a valid URL.', undefined, 'error');
      return false;
    }

    if (!this.selectedPlanId) {
      // this.showPopup('Please select a plan.', undefined, 'error');
      return false;
    }

    if (!this.userid) {
      // this.showPopup('User authentication error. Please refresh and try again.', undefined, 'error');
      return false;
    }

    return true;
  }

  private validateCustomFields(): boolean {
    if (!this.validateBasicFields()) {
      return false;
    }

    if (!this.customUrl?.trim()) {
      // this.showPopup('Please enter a custom URL.', undefined, 'error');
      return false;
    }

    return true;
  }

  private handleSuccessfulGeneration(shortUrl: string): void {
    this.shortUrl = shortUrl;
    this.resetForm();
    // this.showPopup('Short URL created successfully!', shortUrl, 'success');
    this.loadUserPlans(); // Refresh remaining URLs
  }

  private handleGenerationError(err: any): void {
    const errorMessage = err?.error?.message || 'Something went wrong while generating the URL.';
    // this.showPopup(errorMessage, undefined, 'error');
    console.error('URL generation error:', err);
  }

  private resetForm(): void {
    this.longUrl = '';
    this.customUrl = '';
    this.selectedPlanId = null;
  }

  async copyToClipboard(value: string): Promise<void> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        // this.showPopup('URL copied to clipboard!', undefined, 'success');
      } else {
        // Fallback for older browsers or non-secure contexts
        this.fallbackCopyToClipboard(value);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // this.showPopup('Failed to copy to clipboard.', undefined, 'error');
    }
  }

  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      // this.showPopup('URL copied to clipboard!', undefined, 'success');
    } catch (err) {
      console.error('Fallback copy failed:', err);
      // this.showPopup('Failed to copy to clipboard.', undefined, 'error');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  loadUserPlans(): void {
    if (!this.userid) {
      console.warn('Cannot load plans: userid is not available');
      return;
    }

    this.isLoading = true;
    
    this.service.getUserPlans(this.userid).subscribe({
      next: (response) => { 
        this.userplans = response || [];
        console.log('User plans loaded:', this.userplans);
      },
      error: (error) => {
        console.error('Error loading user plans:', error);
        // this.showPopup('Failed to load user plans.', undefined, 'error');
        this.userplans = [];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
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
    
    this.service.getUserDetails(name).subscribe({
      next: (response) => {
        this.userDetails = response;
        this.userid = response?.id;
        
        if (this.userid) {
          this.loadUserPlans();
          console.log('User details loaded:', this.userDetails);
        } else {
          console.error('User ID not found in response');
          // this.showPopup('Failed to load user information.', undefined, 'error');
        }
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        // this.showPopup('User not found. Please check your authentication.', undefined, 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onPlanChange(): void {
    // Reset custom URL when plan changes
    this.customUrl = '';
    
    // Check if selected plan supports custom URLs
    const selectedPlan = this.userplans.find(plan => plan.id === this.selectedPlanId);
    this.customUrlEnabled = selectedPlan ? selectedPlan.customurllimit > 0 : false;
  }

  // showPopup(message: string, shortUrl?: string, type: 'success' | 'error' = 'error'): void {
  //   // Create a background overlay
  //   const overlay = document.createElement('div');
  //   Object.assign(overlay.style, {
  //     position: 'fixed',
  //     top: '0',
  //     left: '0',
  //     width: '100vw',
  //     height: '100vh',
  //     backgroundColor: 'rgba(0, 0, 0, 0.3)',
  //     backdropFilter: 'blur(5px)',
  //     zIndex: '999'
  //   });

  //   // Create the popup
  //   const popup = document.createElement('div');
  //   const bgColor = type === 'success' ? '#ffffff' : '#ffffff';
  //   const textColor = type === 'success' ? '#28a745' : '#dc3545';
  //   const buttonColor = type === 'success' ? '#28a745' : '#dc3545';

  //   popup.innerHTML = `
  //     <div style="margin-bottom: 20px; font-size: 22px; color: ${textColor};">${message}</div>
  //     ${shortUrl ? `
  //       <div style="font-size: 18px; color: #007BFF; word-break: break-all; margin-bottom: 15px;">${shortUrl}</div>
  //       <button id="popup-copy-btn" style="
  //         margin-right: 10px;
  //         background: #007BFF;
  //         color: #ffffff;
  //         border: none;
  //         padding: 12px 24px;
  //         border-radius: 10px;
  //         cursor: pointer;
  //         font-weight: bold;
  //         font-size: 18px;
  //       ">Copy URL</button>
  //     ` : ''}
  //     <button id="popup-close-btn" style="
  //       background: ${buttonColor};
  //       color: #ffffff;
  //       border: none;
  //       padding: 12px 24px;
  //       border-radius: 10px;
  //       cursor: pointer;
  //       font-weight: bold;
  //       font-size: 18px;
  //     ">Close</button>
  //   `;
  
  //   Object.assign(popup.style, {
  //     position: 'fixed',
  //     top: '50%',
  //     left: '50%',
  //     transform: 'translate(-50%, -50%)',
  //     backgroundColor: bgColor,
  //     padding: '40px 60px',
  //     borderRadius: '16px',
  //     zIndex: '1000',
  //     boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
  //     fontWeight: 'bold',
  //     maxWidth: '600px',
  //     textAlign: 'center',
  //     fontSize: '18px',
  //   });
  
  //   document.body.appendChild(overlay);
  //   document.body.appendChild(popup);
  
  //   // Close button behavior
  //   const closeBtn = popup.querySelector('#popup-close-btn') as HTMLButtonElement;
  //   closeBtn?.addEventListener('click', () => {
  //     popup.remove();
  //     overlay.remove();
  //   });

  //   // Copy button behavior (if shortUrl is provided)
  //   if (shortUrl) {
  //     const copyBtn = popup.querySelector('#popup-copy-btn') as HTMLButtonElement;
  //     copyBtn?.addEventListener('click', () => {
  //       this.copyToClipboard(shortUrl);
  //       popup.remove();
  //       overlay.remove();
  //     });
  //   }

  //   // Close on overlay click
  //   overlay.addEventListener('click', () => {
  //     popup.remove();
  //     overlay.remove();
  //   });
  // }
}
