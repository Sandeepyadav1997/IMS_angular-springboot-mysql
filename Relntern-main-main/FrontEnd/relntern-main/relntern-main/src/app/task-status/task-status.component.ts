import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InternService } from '../intern.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {

  taskDetails: any;
  statusList = ["Inprogress" , "Completed", ];

  constructor(
    private dialogRef: MatDialogRef<TaskStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private internService: InternService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.taskDetails = data;
  }

  taskStatusForm = this.fb.group({
    task: [{ value: '', disabled: true }],
    description: [{ value: '', disabled: true }],
    start: [{ value: '', disabled: true }],
    end: [{ value: '', disabled: true }],
    status: ['', Validators.required],
    actualstart: ['', Validators.required],
    actualend: ['', Validators.required],
  });

  ngOnInit() {
    this.populateForm();
  }

  populateForm() {
    this.taskStatusForm.patchValue({
      task: this.taskDetails.task,
      description: this.taskDetails.description,
      start: this.taskDetails.start,
      end: this.taskDetails.end
    });
  }

  isStatusCompleted(): boolean {
    return this.taskStatusForm.get('status')?.value === 'Completed';
  }

  onActualEndChange(event: Event) {
    // You can perform any additional actions here if needed
  }

  update() {
    const formData = this.taskStatusForm.getRawValue(); // getRawValue to include disabled fields
    const statusString: any = formData.status?.toString();
    formData.status = statusString;

    this.successToastr();
    this.internService.updateTask(this.taskDetails.id, formData).subscribe(
      (resp) => {
        console.log('Update Response:', resp);
      }
    );
  }

  successToastr() {
    this.toastr.success("Updated Successfully", "Task", {
      timeOut: 4000
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
