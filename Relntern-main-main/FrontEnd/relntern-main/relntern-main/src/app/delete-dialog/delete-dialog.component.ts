import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InternService } from '../intern.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private internService: InternService,
    private router: Router
  ) { }

  deleteIntern() {
    this.internService.deleteIntern(this.data.id).subscribe(
      () => {
        console.log('Intern deleted successfully');
        this.closeDialog();
        this.router.navigate(['/'], { skipLocationChange: true }).then(() => this.router.navigate(['/list']));
      },
      (err) => {
        console.log('Error deleting intern:', err);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}