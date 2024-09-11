import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternService } from '../intern.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { UpdateDialogBodyComponent } from '../update-dialog-body/update-dialog-body.component';
import { InternprofileComponent } from '../internprofile/internprofile.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  internDetails: any;
  isAdmin: boolean = false;
  isMentor: boolean = false;
  isintern: boolean = false;
  roledesc: any;

  constructor(private router: Router, private internService: InternService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getActiveInterns();
    this.roledesc = localStorage.getItem("role");
    this.validaterole(this.roledesc);
  }

  validaterole(roledesc: any) {
    if (roledesc == "admin") {
      this.isAdmin = true;
    }
    else if (roledesc == "mentor") {
      this.isMentor = true
    }
    else {
      this.isintern = true;
    }
  }

  getActiveInterns(): void {
    this.internService.getActiveInterns().subscribe(
      (resp) => {
        console.log(resp);
        this.internDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // deleteIntern(internId: number) {
  //   this.matDialog.open(DeleteDialogComponent, {
  //     width: '500px',
  //     height: '140px',
  //     data: { id: internId } 
  //   });
  // }

  openEdit(intern: any): void {
    console.log(intern);
    this.matDialog.open(UpdateDialogBodyComponent, {
      width: '800px',
      height: '700px',
      data: { intern }
    });
    // this.openDialog(this.internDetails.id)
  }

  openDialog(intern: any): void {
    console.log(intern);
    
    this.matDialog.open(DialogBodyComponent, {
      width: '500px',
      height: '140px',
      data: intern
    });
  }

  logout() {
    localStorage.removeItem('role')
    this.router.navigate([``]);
  }

  closeDialog() {
    this.matDialog.closeAll();
  }

  openProfile(intern: any): void {
    this.matDialog.open(InternprofileComponent, {
      width: '600px',
      height: '600px',
      data: intern,
    });
  }


  navigateTo(): void {
    if (this.isAdmin) {
      this.router.navigate([`dashboard`]);
    }
    else if (this.isMentor) {
      this.router.navigate([`mentordashboard`]);
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }

  gotopage(internsId: any): void {
    console.log(internsId);
    this.router.navigate(['view-task/', internsId]);
    //this.sendData(interns);
  }

  sendData(interns: any) {
    console.log(interns)
    this.internService.sendData(interns);
  }
  refresh(): void {
    window.location.reload();
  }
}
