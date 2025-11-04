import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ViewBlackListUserService } from '../service/view-black-list-user.service';
import { ManageUsersService } from '../service/manage-users.service';
import { ActivateUserService } from '../service/activate-user.service';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-black-list-user',
  standalone: false,
  templateUrl: './black-list-user.component.html',
  styleUrls: ['./black-list-user.component.css']
})
export class BlackListUserComponent implements OnInit {
  userArray: any[] = [];
  filteredUserArray: any[] = [];
  pagesize: number = 4;
  pagenumber: number = 1;
  totalRecords: number = 0;
  totalPages: number = 0;

  // Filter object
  filters = {
    username: '',
    firstname: '',
    lastname: ''
  };

  // Store original data for filtering
  allUsers: any[] = [];

  constructor(
    private viewBlacklistUser: ViewBlackListUserService,
    private manageUserService: ManageUsersService,
    private activateUserService: ActivateUserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    // Only execute page load if running in the browser
    this.loadPage(this.pagenumber);
    this.getTotal();
  }
}


  loadPage(pageNo: number): void {
    this.pagenumber = pageNo;
    this.getAllUsers(pageNo, this.pagesize);
    this.getTotal();
  }

  getAllUsers(pageNumber: number, pageSize: number): void {
    this.viewBlacklistUser.viewBlacklistUsers(pageNumber - 1, pageSize).subscribe({
      next: (response: any) => {
        this.userArray = response?.content || [];
        this.filteredUserArray = [...this.userArray];

        // If this is the first page load, also get all users for filtering
        if (pageNumber === 1) {
          this.getAllUsersForFiltering();
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  // Get all users for client-side filtering
  getAllUsersForFiltering(): void {
    this.viewBlacklistUser.viewBlacklistUsers(0, 1000).subscribe({
      next: (response: any) => {
        this.allUsers = response?.content || [];
      },
      error: (err) => {
        console.error('Error fetching all users for filtering:', err);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.allUsers];

    // Apply username filter
    if (this.filters.username.trim()) {
      filtered = filtered.filter(user =>
        user.username?.toLowerCase().includes(this.filters.username.toLowerCase())
      );
    }

    // Apply firstname filter
    if (this.filters.firstname.trim()) {
      filtered = filtered.filter(user =>
        user.firstname?.toLowerCase().includes(this.filters.firstname.toLowerCase())
      );
    }

    // Apply lastname filter
    if (this.filters.lastname.trim()) {
      filtered = filtered.filter(user =>
        user.lastname?.toLowerCase().includes(this.filters.lastname.toLowerCase())
      );
    }

    // Update pagination based on filtered results
    this.totalRecords = filtered.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pagesize);
    this.pagenumber = 1;

    // Apply pagination to filtered results
    const startIndex = (this.pagenumber - 1) * this.pagesize;
    const endIndex = startIndex + this.pagesize;
    this.filteredUserArray = filtered.slice(startIndex, endIndex);
  }

  removeFilters(): void {
    // Clear all filters
    this.filters = {
      username: '',
      firstname: '',
      lastname: ''
    };

    // Reset to original data
    this.pagenumber = 1;
    this.loadPage(this.pagenumber);
  }

  getTotal(): void {
    this.manageUserService.getTotalUsersCount().subscribe((res: number) => {
      this.totalRecords = res;
      this.totalPages = Math.ceil(this.totalRecords / this.pagesize);
    });
  }

  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    const totalPages = this.totalPages;
    const currentPage = this.pagenumber;

    if (totalPages <= maxPagesToShow) {
      return Array(totalPages).fill(0).map((_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array(endPage - startPage + 1).fill(0).map((_, i) => startPage + i);
  }

  onPageChange(pageNo: number): void {
    if (pageNo >= 1 && pageNo <= this.totalPages) {
      this.pagenumber = pageNo;

      // If filters are applied, handle pagination for filtered results
      if (this.hasActiveFilters()) {
        this.applyFilters();
      } else {
        this.loadPage(pageNo);
      }
    }
  }

  onPageSizeChange(event: any): void {
    this.pagesize = parseInt(event.target.value);
    this.pagenumber = 1;

    if (this.hasActiveFilters()) {
      this.applyFilters();
    } else {
      this.loadPage(this.pagenumber);
    }
  }

  hasActiveFilters(): boolean {
    return this.filters.username.trim() !== '' ||
      this.filters.firstname.trim() !== '' ||
      this.filters.lastname.trim() !== '';
  }

  getValue(): number {
    return Math.ceil(this.totalRecords / this.pagesize);
  }

  onActivate(id: any): void {
    this.activateUserService.activatedUser(id).subscribe({
      next: (response:any) => {
        alert('User Activated successfully');

        // Refresh the data
        if (this.hasActiveFilters()) {
          this.getAllUsersForFiltering();
          setTimeout(() => this.applyFilters(), 100);
        } else {
          this.loadPage(this.pagenumber);
        }
      },
      error: (error:any) => {
        alert('Error Activating user');
      }
    });
  }

  downloadCSV(): void {
    // Determine which data to export
    const dataToExport = this.hasActiveFilters() ? this.getFilteredData() : this.allUsers;

    if (dataToExport.length === 0) {
      alert('No data available to download');
      return;
    }

    // Create CSV content
    const headers = ['Sr. No.', 'Username', 'First Name', 'Last Name'];
    const csvContent = this.convertToCSV(dataToExport, headers);

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `blacklisted_users_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private getFilteredData(): any[] {
    let filtered = [...this.allUsers];

    if (this.filters.username.trim()) {
      filtered = filtered.filter(user =>
        user.username?.toLowerCase().includes(this.filters.username.toLowerCase())
      );
    }

    if (this.filters.firstname.trim()) {
      filtered = filtered.filter(user =>
        user.firstname?.toLowerCase().includes(this.filters.firstname.toLowerCase())
      );
    }

    if (this.filters.lastname.trim()) {
      filtered = filtered.filter(user =>
        user.lastname?.toLowerCase().includes(this.filters.lastname.toLowerCase())
      );
    }

    return filtered;
  }

  private convertToCSV(data: any[], headers: string[]): string {
    // Create header row
    let csv = headers.join(',') + '\n';

    // Add data rows
    data.forEach((user, index) => {
      const row = [
        index + 1,
        this.escapeCSVField(user.username || ''),
        this.escapeCSVField(user.firstname || ''),
        this.escapeCSVField(user.lastname || '')
      ];
      csv += row.join(',') + '\n';
    });

    return csv;
  }

  private escapeCSVField(field: string): string {
    // Handle fields that contain commas, quotes, or newlines
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return '"' + field.replace(/"/g, '""') + '"';
    }
    return field;
  }
}