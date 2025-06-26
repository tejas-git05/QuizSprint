import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/LoginService/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  constructor(private loginService:LoginService,private router:Router,){}

  loginForm = new FormGroup({
    userName : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  formSubmit() {
    if (this.loginForm.invalid) {
      Swal.fire('Warning', 'Please fill all required fields', 'warning');
      return;
    }

    const loginData = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };

    this.loginService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Login response : ', response);

        // Store user data in localStorage
        this.loginService.setUser(response);   
        // Get user role
        const role = this.loginService.getUserRole();
        console.log('Detected Role: ',role);
        
       // Handle redirect
        const returnUrl = this.loginService.redirectUrl || (response.role === 'ADMIN' ? '/admin' : '/user');
        this.router.navigateByUrl(returnUrl);
        this.loginService.redirectUrl = null;
      },
      error: (error) => {
        console.error('Login error', error);
        Swal.fire('Login Failed', error.error || 'Invalid credentials', 'error');
      }
    });
  }

}
