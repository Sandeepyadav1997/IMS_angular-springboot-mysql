import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternService } from '../intern.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { InternprofileComponent } from '../internprofile/internprofile.component';
import { UpdateDialogBodyComponent } from '../update-dialog-body/update-dialog-body.component';

@Component({
  selector: 'app-mentordashboard',
  templateUrl: './mentordashboard.component.html',
  styleUrls: ['./mentordashboard.component.css']
})
export class MentordashboardComponent implements OnInit {
  userid: any;
  mentorDetails: any;
  mentoruserid: any;
  internDetails: any;
  isAdmin: boolean = false;
  isMentor: boolean = false;
  roledesc: any;

  constructor(private router: Router, private internService: InternService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.roledesc = localStorage.getItem("role");
    this.isAdmin = this.roledesc === 'admin';
    this.isMentor = this.roledesc === 'mentor';

    const retrievedUserId = localStorage.getItem('userId');
    if (retrievedUserId) {
      this.userid = JSON.parse(retrievedUserId);
      this.getMentorByUserId();
    } else {
      console.error('User ID not found');
    }

    this.getActiveInterns();
  }

  getMentorByUserId(): void {
    this.internService.getMentorByMentoruserid(this.userid).subscribe(
      (resp) => {
        this.mentorDetails = resp;
        this.mentoruserid = this.mentorDetails.mentorid;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getActiveInterns(): void {
    this.internService.getActiveInterns().subscribe(
      (resp) => {
        this.internDetails = resp;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openProfile(intern: any): void {
    this.matDialog.open(InternprofileComponent, {
      width: '600px',
      height: '600px',
      data: intern,
    });
  }

  deleteIntern(intern: any): void {
    this.matDialog.open(DeleteDialogComponent, {
      width: '500px',
      height: '140px',
      data: intern,
    });
  }

  openEdit(intern: any): void {
    this.matDialog.open(UpdateDialogBodyComponent, {
      width: '800px',
      height: '700px',
      data: { intern },
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }

  gotopage(internsId: any): void {
    this.router.navigate(['view-task/', internsId]);
  } 
}