import { Component, OnInit } from '@angular/core';
import { InternService } from '../intern.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InternprofileComponent } from '../internprofile/internprofile.component';
import { UpdateDialogBodyComponent } from '../update-dialog-body/update-dialog-body.component';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-internmentorlist',
  templateUrl: './internmentorlist.component.html',
  styleUrls: ['./internmentorlist.component.css']
})
export class InternmentorlistComponent implements OnInit {
  roledesc: string | null = '';
  isAdmin: boolean = false;
  isMentor: boolean = true;
  isintern: boolean = false;
  mentorEmail: string | null='';
  internList: any[] = [];

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private internService: InternService
  ) {}

  ngOnInit(): void {
    this.roledesc = localStorage.getItem("role");
    this.mentorEmail = localStorage.getItem("username"); // Assume mentor's email is stored in localStorage
    this.validaterole(this.roledesc);

     if (this.isMentor && this.mentorEmail) {
      this.getInternsByMentor(this.mentorEmail);
    }
    
  }

  navigateTo(): void {
    if (this.isAdmin) {
      this.router.navigate([`dashboard`]);
    }
    else if (this.isMentor) {
      this.router.navigate([`mentordashboard`]);
    }
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  validaterole(roledesc: any) {
    if (roledesc === "admin") {
      this.isAdmin = true;
    } else if (roledesc === "mentor") {
      this.isMentor = true;
    } else {
      this.isintern = true;
    }
  }



  openProfile(intern: any): void {
    this.matDialog.open(InternprofileComponent, {
      width: '600px',
      height: '600px',
      data: intern,
    });
  }

  gotopage(internsId: any): void {
    console.log(internsId);
    this.router.navigate(['view-task/', internsId]);
    //this.sendData(interns);
  }
openEdit(intern: any): void {
  // Open a dialog for editing intern details
  // Replace `EditInternComponent` with the actual component you use for editing
  this.matDialog.open(UpdateDialogBodyComponent, {
    width: '600px',
    height: '600px',
    data: intern,
  });
}
openDialog(intern: any): void {
  this.matDialog.open(DialogBodyComponent, {
    width: '500px',
    height: '140px',
    data: intern
  });
}
deleteIntern(internId: number): void {
  // Confirm deletion
  if (confirm('Are you sure you want to delete this intern?')) {
    this.internService.deleteIntern(internId).subscribe(
      response => {
        console.log('Intern deleted successfully:', response);
        // Refresh the intern list
        this.getInternsByMentor(this.mentorEmail!);
      },
      error => {
        console.log('Error deleting intern:', error);
      }
    );
  }
}


  getInternsByMentor(mentorEmail: string) {
    this.internService.getByMentor(mentorEmail).subscribe(
      (response: any) => {
        console.log(response);
        this.internList = response;
        console.log('Fetched Interns:', this.internList);
      },
      (error) => {
        console.log('Error fetching interns:', error);
      }
    );
  }
}