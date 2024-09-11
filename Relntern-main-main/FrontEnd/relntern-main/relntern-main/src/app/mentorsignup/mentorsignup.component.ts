import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InternService } from '../intern.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mentorsignup',
  templateUrl: './mentorsignup.component.html',
  styleUrls: ['./mentorsignup.component.css']
})
export class MentorsignupComponent implements OnInit {

  mentorDetails: any;
  passwordMismatch = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private internService: InternService,
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMentor();
  }

  myForm = this.fb.group({
    mentoremail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rpwd: ['', [Validators.required]]
  });

  get email(): FormControl {
    return this.myForm.get("mentoremail") as FormControl;
  }

  get password(): FormControl {
    return this.myForm.get("password") as FormControl;
  }

  get rpwd(): FormControl {
    return this.myForm.get("rpwd") as FormControl;
  }

  getMentor(): void {
    this.internService.getMentor().subscribe(
      (resp) => {
        this.mentorDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  alreadyExistToastr() {
    this.toastr.warning("Login to continue", "User already exists", {
      timeOut: 3000
    });
  }

  errorToastr() {
    this.toastr.error("Contact the admin/mentor", "Error registering", {
      timeOut: 3000
    });
  }

  successToastr() {
    this.toastr.success("Registered Successfully", "Mentor", {
      timeOut: 3000
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.password.value !== this.rpwd.value) {
        this.passwordMismatch = true;
        this.toastr.warning("Passwords do not match", "Warning", { timeOut: 3000 });
        return;
      } else {
        this.passwordMismatch = false;
      }
  
      this.authService.postregisterMentor(this.myForm.value).subscribe(
        (resp: any) => {
          if (resp.result === "User already exists") {
            this.alreadyExistToastr();
            this.router.navigate(['/login']);
          } else if (resp.result === "User saved Successfully") {
            this.successToastr();
          } else if (resp.result === "Some error occurred") {
            this.errorToastr();
          }
  
          this.myForm.reset();
        },
        (error) => {
          console.error('Error registering mentor:', error.message || error);
          this.errorToastr();
        }
      );
    } else {
      console.log('Registration form is invalid');
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}