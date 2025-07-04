import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/UserService/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/CategoryService/category-service';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {

   categoryForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.categoryForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields correctly.',
      });
      return;
    }

    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!', 
          text: 'Category added successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.categoryForm.reset();
      },
      error: (error) => {
        console.error("Failed to add category", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.error?.message || 'Failed to add category. Please try again.',
        });
      }
    });
  }

}
