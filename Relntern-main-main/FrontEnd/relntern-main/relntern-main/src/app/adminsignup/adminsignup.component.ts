import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InternService } from '../intern.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {
  registerForm!: FormGroup;
  isAdmin: boolean = false;
  isMentor: boolean = false;
  isIntern: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private internService: InternService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      adminName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z\\s]*')]],
      email: ['', [Validators.required, Validators.email]],
      adminPhone: ['', [Validators.pattern('[0-9]{10}')]]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.internService.registerAdmin(this.registerForm.value).subscribe(
        (signupResp: any) => {
          console.log(signupResp);
          this.router.navigate(['adminregister']); // Redirect to home or dashboard page
        },
        (signupErr: any) => {
          console.error(signupErr);
          this.toastr.error('Signup failed. Please try again.');
        }
      );
    } else {
      this.toastr.error('Please enter valid details');
    }
  }

  navigateTo(): void {
    if (this.isAdmin) {
      this.router.navigate(['dashboard']);
    } else if (this.isMentor) {
      this.router.navigate(['mentordashboard']);
    } else if (this.isIntern) {
      this.router.navigate(['interndashboard']);
    }
  }

  logout(): void {
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }
}