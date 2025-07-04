import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../../services/QuizService/quiz-service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/CategoryService/category-service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-quiz.html',
  styleUrl: './add-quiz.css'
})
export class AddQuiz implements OnInit {

  categories: any[] = []; // Added type annotation

  addQuiz = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    maxMarks: new FormControl('', Validators.required),
    numberOfQuestions: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required) // Added category control
  });

  constructor(
    private quizService: QuizService, 
    private categoryServ: CategoryService
  ) { }

  ngOnInit(): void {  
    this.categoryServ.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire({icon:'error', title:'Error', text:'Error in loading data from server'});
      }
    );
  }

  onSubmit() {
    if (this.addQuiz.invalid) {
      Swal.fire({icon:'warning', title:'Incomplete Form', text:'Please fill in all required fields'});
      return;
    }

    // Format the data to match API expectations
    const quizData = {
      ...this.addQuiz.value,
      category: {
        cid: this.addQuiz.value.category
      }
    };

    this.quizService.addQuiz(quizData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!',
          text: `Quiz "${this.addQuiz.value.title}" added successfully`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.addQuiz.reset();
      },
      error: (error) => {
        console.log("Failed to add Quiz", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.error?.message || 'Failed to add Quiz. Please try again.'
        }); 
      }
    });
  }
}