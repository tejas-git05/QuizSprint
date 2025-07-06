import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  QuizService } from '../../../services/QuizService/quiz-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/CategoryService/category-service';



@Component({
  selector: 'app-update-quiz',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './update-quiz.html',
  styleUrl: './update-quiz.css'
})
export class UpdateQuiz implements OnInit {

  qId:any;
  quiz:any;
  quizForm!: FormGroup;
  categories: any[] = [];


constructor(
  private route: ActivatedRoute,
  private quizService: QuizService,
  private categoryService: CategoryService,
  private fb: FormBuilder
) {}

ngOnInit(): void {
  this.qId = this.route.snapshot.params['qid'];

    // Initialize form
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      maxMarks: ['', Validators.required],
      numberOfQuestions: ['', Validators.required],
      category: ['', Validators.required]
    });

    //  Get quiz data
    this.quizService.getQuizById(this.qId).subscribe((quiz: any) => {
      this.quiz = quiz;
      this.quizForm.patchValue({
        title: quiz.title,
        description: quiz.description,
        maxMarks: quiz.maxMarks,
        numberOfQuestions: quiz.numberOfQuestions,
        category: quiz.category?.cid
      });
    });

    // Get category list
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  
  onSubmit(): void {
    if (this.quizForm.valid) {
    const updatedQuiz = {
      qId: this.qId,
      title: this.quizForm.value.title,
      description: this.quizForm.value.description,
      maxMarks: this.quizForm.value.maxMarks,
      numberOfQuestions: this.quizForm.value.numberOfQuestions,
      category: {
        cid: this.quizForm.value.category
      }
    };

    this.quizService.updateQuiz(updatedQuiz).subscribe(
      (response) => {
        console.log('Quiz updated successfully', response);
        Swal.fire('Success', 'Quiz updated successfully', 'success');
      },
      (error) => {
        console.error('Error updating quiz', error);
        Swal.fire('Error', 'Failed to update quiz', 'error');
      }
    );
  }
  }

}
