  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { ManageUserQueriesService } from '../service/manage-user-queries.service';

  @Component({
    selector: 'app-manage-queries',
    standalone: false,
    templateUrl: './manage-queries.component.html',
    styleUrls: ['./manage-queries.component.css']
  })
  export class ManageQueriesComponent implements OnInit {
    queriesArray: any[] = [];
    usernameFilter: string = '';
    userqueryid!: number;
    obj = {
        status: "Resolved",
        responseText: "",
        resolved: true
      }

      @ViewChild('responsetext') inputRef!: ElementRef;

    constructor(private service: ManageUserQueriesService) { }

    ngOnInit(): void {
      this.viewQueries(0, 10);
    }

    viewQueries(pageNumber: number, pageSize: number) {
      this.service.viewAllQueries(pageNumber, pageSize).subscribe({
        next: (response: any) => {
          this.queriesArray = response?.content || [];
          this.userqueryid = response.id;
        },
        error: (err) => {
          console.error('Error fetching Queries:', err);
        }
      });
    }

    submitResponse(userqueryid: number, responseText: string): void {
    const trimmedResponse = responseText.trim();

    if (!trimmedResponse) {
      alert('Response cannot be empty.');
      return;
    }

    const obj = {
      status: "Resolved",
      responseText: trimmedResponse,
      resolved: true
    };

    this.service.submitQueryResponse(userqueryid, obj).subscribe({
      next:(response: any)  => {
        alert('Response submitted successfully!');
        this.viewQueries(0, 10); // Refresh data
      },
      error: (err:any) => {
        console.error('Error submitting response:', err);
        alert('Failed to submit response.');
      }
    });
  }

  }
