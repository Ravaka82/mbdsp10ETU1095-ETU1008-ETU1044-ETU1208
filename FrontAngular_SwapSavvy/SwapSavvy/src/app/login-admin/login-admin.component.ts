import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ServiceAdminService } from '../services/service-admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'] 
})
export class LoginAdminComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder, private apiService: ServiceAdminService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.apiService.loginAdmin(credentials).subscribe(
        response => {
          console.log('Login successful', response);
          localStorage.setItem('userEmail', response.admin.email);
          this.errorMessage = null;
          this.router.navigate(['AccueilAdmin']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your email and password.';
        }
      );
    }
  }
}
