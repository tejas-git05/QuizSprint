import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl:'./signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  constructor(private userService:UserService,private router:Router){}

    SignUpForm = new FormGroup ({
    firstName : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]),
    lastName : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]),
    email : new FormControl('',[Validators.email,Validators.required]),
    phone : new FormControl('',[Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]),
    userName : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.minLength(6),Validators.required]),
  })

  formSubmit() { 
  if (this.SignUpForm.invalid) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Form!',
      text: 'Please complete all fields correctly before submitting.',
    });
    return;
  }

  this.userService.adduser(this.SignUpForm.value).subscribe(
    (data) => {
      console.log("User registered successfully", data);
      

      Swal.fire({
        title: 'Success!',
        text: 'You have signed up successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      this.SignUpForm.reset();

      this.router.navigate(['login'])

    },
    (error) => {
      console.error("Registration failed", error);

      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: error?.error?.message || 'Registration failed! Try again.',
      });
    }
  );
  }

}

