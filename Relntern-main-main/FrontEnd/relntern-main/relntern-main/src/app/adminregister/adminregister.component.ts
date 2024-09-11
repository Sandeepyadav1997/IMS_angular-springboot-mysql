import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InternService } from '../intern.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent implements OnInit {
  adminDetails: any;
  passwordMismatch = false;

  myForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private internService: InternService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.myForm = this.fb.group({
      adminemail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rpwd: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  get email(): FormControl {
    return this.myForm.get('adminemail') as FormControl;
  }

  get password(): FormControl {
    return this.myForm.get('password') as FormControl;
  }

  get rpwd(): FormControl {
    return this.myForm.get('rpwd') as FormControl;
  }

  getAdmins(): void {
    this.internService.getAdmins().subscribe(
      (resp) => {
        this.adminDetails = resp;
      },
      (err) => {
        console.error('Error fetching admin details:', err);
      }
    );
  }

  alreadyExistToastr() {
    this.toastr.warning('Login to continue', 'User already exists', { timeOut: 3000 });
  }

  errorToastr() {
    this.toastr.error('Contact the admin/mentor', 'Error registering', { timeOut: 3000 });
  }

  successToastr() {
    this.toastr.success('Registered Successfully', 'Admin', { timeOut: 3000 });
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.password.value !== this.rpwd.value) {
        this.passwordMismatch = true;
        this.toastr.warning('Passwords do not match', 'Warning', { timeOut: 3000 });
        return;
      } else {
        this.passwordMismatch = false;
      }

      this.authService.postregisterAdmin(this.myForm.value).subscribe(
        (resp: any) => {
          if (resp.result === 'User already exists') {
            this.alreadyExistToastr();
            localStorage.removeItem('role')
            this.router.navigate([``]);

          } else if (resp.result === 'User saved successfully') {
            this.successToastr();
          } else if (resp.result === 'Some error occurred') {
            this.errorToastr();
          }

          this.myForm.reset();
        },
        (error) => {
          console.error('Error registering admin:', error.message || error);
          this.errorToastr();
        }
      );
    } else {
      console.log('Registration form is invalid');
    }
  }

  goToPage(pageName: string): void {
    this.router.navigate([pageName]);
  }
}