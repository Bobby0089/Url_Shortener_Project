import { Component, OnInit } from '@angular/core';
import { ManageUrlService } from '../service/manage-url.service';


interface FilterCriteria {
  username?: string;
  shortUrl?: string;
  actualUrl?: string;
  clicksLeft?: string;
  totalClicks?: string;
  isCustom?: boolean;
}

@Component({
  selector: 'app-manage-urls',
  standalone: false,
  templateUrl: './manage-urls.component.html',
  styleUrls: ['./manage-urls.component.css']
})
export class ManageUrlsComponent implements OnInit {

  urlArray: any[] = [];
  allUrls: any[] = []; // Store all URLs for CSV export and filtering

  pagesize: number = 4;
  pagenumber: number = 1;
  totalRecords: number = 0;
  totalPages: number = 0;

  // Filter properties
  filterCriteria: FilterCriteria = {};
  isFiltered: boolean = false;
  filteredData: any[] = [];
  isLoadingAllData: boolean = false;

  constructor(private service: ManageUrlService) { }

  ngOnInit(): void {
    this.loadPage(this.pagenumber);
  }

  loadPage(pageNo: number): void {
    this.pagenumber = pageNo;
    this.viewAllUrls(pageNo, this.pagesize);
    this.getTotal();
  }

  viewAllUrls(pageNumber: number, pageSize: number) {
    this.service.viewAllUrls(pageNumber - 1, pageSize).subscribe({
      next: (response) => {
        this.urlArray = response?.content || [];
      },
      error: (error) => {
        console.error('Error fetching URLs:', error);
      }
    });
  }

  getTotal(): void {
    this.service.getTotalUrlCount().subscribe((res: number) => {
      this.totalRecords = res;
      console.log(this.totalRecords);
      this.totalPages = Math.ceil(this.totalRecords / this.pagesize);
    });
  }

  // Load all data for filtering and CSV export
  loadAllData(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.allUrls.length > 0) {
        resolve();
        return;
      }

      this.isLoadingAllData = true;
      
      // Calculate how many requests we need based on total records
      const maxPageSize = 100; // Reasonable page size
      const totalPages = Math.ceil(this.totalRecords / maxPageSize);
      let completedRequests = 0;
      this.allUrls = [];

      if (totalPages === 0) {
        this.isLoadingAllData = false;
        resolve();
        return;
      }

      // Make multiple requests to get all data
      for (let page = 0; page < totalPages; page++) {
        this.service.viewAllUrls(page, maxPageSize).subscribe({
          next: (response) => {
            this.allUrls = [...this.allUrls, ...(response?.content || [])];
            completedRequests++;
            
            if (completedRequests === totalPages) {
              this.isLoadingAllData = false;
              resolve();
            }
          },
          error: (error) => {
            console.error('Error loading all data:', error);
            this.isLoadingAllData = false;
            reject(error);
          }
        });
      }
    });
  }

  // Apply Filters
  async applyFilters(): Promise<void> {
    try {
      await this.loadAllData();
      this.performFiltering();
    } catch (error) {
      console.error('Error applying filters:', error);
      alert('Error loading data for filtering. Please try again.');
    }
  }

  private performFiltering(): void {
    this.filteredData = this.allUrls.filter(url => {
      let matches = true;

      // Filter by username
      if (this.filterCriteria.username && this.filterCriteria.username.trim()) {
        matches = matches && url.name?.toLowerCase().includes(this.filterCriteria.username.toLowerCase());
      }

      // Filter by short URL
      if (this.filterCriteria.shortUrl && this.filterCriteria.shortUrl.trim()) {
        matches = matches && url.shortCode?.toLowerCase().includes(this.filterCriteria.shortUrl.toLowerCase());
      }

      // Filter by actual URL
      if (this.filterCriteria.actualUrl && this.filterCriteria.actualUrl.trim()) {
        matches = matches && url.originalUrl?.toLowerCase().includes(this.filterCriteria.actualUrl.toLowerCase());
      }

      // Filter by clicks left
      if (this.filterCriteria.clicksLeft) {
        const clicksLeft = url.totalclicks || 0;
        switch (this.filterCriteria.clicksLeft) {
          case '0-5':
            matches = matches && (clicksLeft >= 0 && clicksLeft <= 5);
            break;
          case '6-10':
            matches = matches && (clicksLeft >= 6 && clicksLeft <= 10);
            break;
          case '10+':
            matches = matches && (clicksLeft > 10);
            break;
        }
      }

      // Filter by total clicks (if you have this field)
      if (this.filterCriteria.totalClicks && url.totalClicksCount !== undefined) {
        const totalClicks = url.totalClicksCount || 0;
        switch (this.filterCriteria.totalClicks) {
          case '0-5':
            matches = matches && (totalClicks >= 0 && totalClicks <= 5);
            break;
          case '6-10':
            matches = matches && (totalClicks >= 6 && totalClicks <= 10);
            break;
          case '10+':
            matches = matches && (totalClicks > 10);
            break;
        }
      }

      // Filter by custom URL
      if (this.filterCriteria.isCustom !== undefined) {
        matches = matches && (url.customUrl === this.filterCriteria.isCustom);
      }

      return matches;
    });

    this.isFiltered = true;
    this.totalRecords = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pagesize);
    this.pagenumber = 1;
    this.applyPaginationToFiltered();
  }

  // Apply pagination to filtered results
  applyPaginationToFiltered(): void {
    const startIndex = (this.pagenumber - 1) * this.pagesize;
    const endIndex = startIndex + this.pagesize;
    this.urlArray = this.filteredData.slice(startIndex, endIndex);
  }

  // Remove Filters
  removeFilters(): void {
    this.filterCriteria = {};
    this.isFiltered = false;
    this.filteredData = [];
    this.pagenumber = 1;
    this.getTotal(); // Reset total records
    this.loadPage(this.pagenumber);
  }

  // Download CSV
  async downloadCSV(): Promise<void> {
    try {
      let dataToExport: any[];
      
      if (this.isFiltered) {
        dataToExport = this.filteredData;
      } else {
        await this.loadAllData();
        dataToExport = this.allUrls;
      }
      
      if (dataToExport.length === 0) {
        alert('No data available to download');
        return;
      }

      const csvContent = this.convertToCSV(dataToExport);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `urls-data-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Error preparing data for download. Please try again.');
    }
  }

  private convertToCSV(data: any[]): string {
    const headers = ['Sr. No.', 'Username', 'Short URL', 'Actual URL', 'Is Custom', 'Clicks Left'];
    const csvArray = [headers.join(',')];

    data.forEach((url, index) => {
      const row = [
        index + 1,
        `"${(url.name || '').replace(/"/g, '""')}"`, // Escape quotes
        `"${(url.shortCode || '').replace(/"/g, '""')}"`,
        `"${(url.originalUrl || '').replace(/"/g, '""')}"`,
        url.customUrl ? 'Yes' : 'No',
        url.totalclicks || 0
      ];
      csvArray.push(row.join(','));
    });

    return csvArray.join('\n');
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  onPageChange(pageNo: number): void {
    if (pageNo >= 1 && pageNo <= this.totalPages) {
      this.pagenumber = pageNo;
      
      if (this.isFiltered) {
        this.applyPaginationToFiltered();
      } else {
        this.loadPage(pageNo);
      }
    }
  }

  getValue(): number {
    return Math.ceil(this.totalRecords / this.pagesize);
  }

  // Get serial number for display
  getSerialNumber(index: number): number {
    return (this.pagenumber - 1) * this.pagesize + index + 1;
  }

  // Helper method to check if any filters are active
  hasActiveFilters(): boolean {
    return !!(this.filterCriteria.username || 
             this.filterCriteria.shortUrl || 
             this.filterCriteria.actualUrl || 
             this.filterCriteria.clicksLeft || 
             this.filterCriteria.totalClicks || 
             this.filterCriteria.isCustom !== undefined);
  }
}