import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InternService } from '../intern.service';
import { Router } from '@angular/router';
import { TaskStatusComponent } from '../task-status/task-status.component';
import { InternprofileComponent } from '../internprofile/internprofile.component';
import { EndInternshipDialogComponent } from '../end-internship-dialog/end-internship-dialog.component';

@Component({
  selector: 'app-interndashboard',
  templateUrl: './interndashboard.component.html',
  styleUrls: ['./interndashboard.component.css'],
})
export class InterndashboardComponent implements OnInit {

  internDetails: any;
  userid: any;
  taskdetails: any;
  internId: any;
  roledes: any;
  dropdownOpen = false;
  isLastWeek: boolean = false; 
  isInProgress: boolean = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private internService: InternService
  ) { }


   ngOnInit(): void {
    this.roledes = localStorage.getItem('role') || '';
    const retrievedUserId = localStorage.getItem('userId');
    if (retrievedUserId !== null) {
      this.userid = parseInt(retrievedUserId, 10);
      this.internByUserId();
    } else {
      console.error('User ID does not exist in localStorage.');
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  internByUserId(): void {
    if (this.userid !== undefined) {
      this.internService.getInternByUserId(this.userid).subscribe(
        (resp) => {
          console.log('Intern Details:', resp);
          this.internDetails = resp;
          this.internId = this.internDetails.id;
          this.getTaskById();
          this.checkLastWeek(); // Check if the internship is in the last week
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      console.error('User ID is undefined.');
    }
  }

  getTaskById(): void {
    this.internService.getTaskById(this.internId).subscribe(
      (resp) => {
        console.log('Task Details:', resp);
        this.taskdetails = resp;
        this.isInProgress = this.taskdetails.some((task: any) => task.status === 'Inprogress');  // New logic added
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openProfile(internDetails: any): void {
    this.matDialog.open(InternprofileComponent, {
      width: '600px',
      height: '600px',
      data: this.internDetails,
    });
  }

  openTaskStatus(task: any): void {
    this.matDialog.open(TaskStatusComponent, {
      width: '600px',
      height: '600px',
      data: task,
    });
  }

  logout(): void {
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }

  endInternship(): void {
    this.matDialog.open(EndInternshipDialogComponent, {
      width: '600px',
      height: '350px',
      data: { 
        id: this.internDetails.id,
        fullname: this.internDetails.fullname,    // Use the actual intern data from your component
        email: this.internDetails.email,
        startDate: this.internDetails.startDate,
        endDate: this.internDetails.endDate,
        domainId: this.internDetails.domainId,
        projectname: this.internDetails.projectname,
        mentor: this.internDetails.mentor,
        association: this.internDetails.association,
        message: "To end your internship you have to upload your internship files below."
      }
    });
  }
  

  checkLastWeek(): void {
    const startDate = new Date(this.internDetails.startDate);
    const endDate = new Date(this.internDetails.endDate);
    const today = new Date();

    if (this.internDetails.startDate && this.internDetails.endDate) {
      const timeDiff = endDate.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

      // Check if the internship is in its last week (within 7 days)
      this.isLastWeek = daysLeft <= 7 && daysLeft > 0;
    } else {
      this.isLastWeek = false;
    }
  }
}