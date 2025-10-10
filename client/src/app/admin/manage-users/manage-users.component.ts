import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from '../service/manage-users.service';
import { DeactivateUserService } from '../service/deactivate-user.service';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  allUsers: any[] = [];   // full data of current page from backend
  userArray: any[] = [];  // filtered users to show

  filterUsername = '';
  filterFirstName = '';
  filterLastName = '';

  pagesize: number = 4;
  pagenumber: number = 1;
  totalRecords: number = 0;
  totalPages: number = 0;

  constructor(
    private manageUserService: ManageUsersService,
    private deactivateService: DeactivateUserService
  ) { }

  ngOnInit(): void {
    this.loadPage(this.pagenumber);
  }

  loadPage(pageNo: number): void {
    this.pagenumber = pageNo;
    this.getAllUsers(pageNo, this.pagesize);
    this.getTotal();
  }

  getAllUsers(pageNumber: number, pageSize: number): void {
    this.manageUserService.getAllUser(pageNumber - 1, pageSize).subscribe({
      next: (response: any) => {
        this.allUsers = response?.content || [];
        this.userArray = [...this.allUsers];  // Initially show all users from current page
        this.applyFilters();  // apply filter after fetching users
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.allUsers = [];
        this.userArray = [];
      }
    });
  }

  getTotal(): void {
    this.manageUserService.getTotalUsersCount().subscribe((res: number) => {
      this.totalRecords = res;
      this.totalPages = Math.ceil(this.totalRecords / this.pagesize);
    });
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  onPageChange(pageNo: number): void {
    if (pageNo >= 1 && pageNo <= this.totalPages) {
      this.loadPage(pageNo);
    }
  }

  getValue() {
    return Math.ceil(this.totalRecords / this.pagesize);
  }

  getId(id: number): void {
    this.deactivateService.deactivatedUser(id).subscribe({
      next: (response) => {
        alert('User deactivated successfully');
        // Reload users after deactivation
        this.loadPage(this.pagenumber);
      },
      error: (error) => {
        alert('Error deactivating user');
      }
    });
  }

  viewPlans(user: any) {
    // Logic for viewing user plans
    console.log('Viewing plans for user:', user);
  }

  viewURLs(user: any) {
    // Logic for viewing user URLs
    console.log('Viewing URLs for user:', user);
  }

  // Added onSearch method that was missing
  onSearch(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.filterUsername = '';
    this.filterFirstName = '';
    this.filterLastName = '';
    this.userArray = [...this.allUsers]; // Reset to show all users
    console.log('Filters cleared, showing all users:', this.userArray.length);
  }

  applyFilters(): void {
    if (!this.allUsers || this.allUsers.length === 0) {
      this.userArray = [];
      return;
    }

    this.userArray = this.allUsers.filter(user => {
      // Handle null/undefined values safely
      const username = (user?.username || '').toString().toLowerCase();
      const firstName = (user?.firstName || user?.firstname || '').toString().toLowerCase();
      const lastName = (user?.lastName || user?.lastname || '').toString().toLowerCase();

      // Check if filters are empty or match
      const usernameMatch = !this.filterUsername.trim() || username.includes(this.filterUsername.toLowerCase().trim());
      const firstNameMatch = !this.filterFirstName.trim() || firstName.includes(this.filterFirstName.toLowerCase().trim());
      const lastNameMatch = !this.filterLastName.trim() || lastName.includes(this.filterLastName.toLowerCase().trim());

      return usernameMatch && firstNameMatch && lastNameMatch;
    });

    console.log('Filter applied:', {
      totalUsers: this.allUsers.length,
      filteredUsers: this.userArray.length,
      filters: {
        username: this.filterUsername,
        firstName: this.filterFirstName,
        lastName: this.filterLastName
      }
    });
  }

  downloadCSV(): void {
    if (this.userArray.length === 0) {
      alert('No data to export');
      return;
    }

    // Define CSV headers
    const headers = ['Sr No.', 'Username', 'First Name', 'Last Name', 'Total Revenue'];
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    this.userArray.forEach((user, index) => {
      const row = [
        index + 1,
        this.escapeCsvValue(user.username || ''),
        this.escapeCsvValue(user.firstName || user.firstname || ''),
        this.escapeCsvValue(user.lastName || user.lastname || ''),
        user.revenue || 0
      ];
      csvContent += row.join(',') + '\n';
    });

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Helper method to escape CSV values that contain commas or quotes
  private escapeCsvValue(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}