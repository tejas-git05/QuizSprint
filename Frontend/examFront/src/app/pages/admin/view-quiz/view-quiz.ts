import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/QuizService/quiz-service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  standalone: true,  // Added this
  imports: [CommonModule, RouterLink],
  templateUrl: './view-quiz.html',
  styleUrl: './view-quiz.css'
})
export class ViewQuiz implements OnInit {
  
  quizzes: any[] = [];  // Changed variable name to plural
  isLoading = false;     // Added loading state
  animatedCards:boolean[]=[];

  constructor(private quizService: QuizService) { }
  
  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.isLoading = true;
    this.quizService.getQuiz().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        this.isLoading = false;

        // Start animation after quizzes are set
        this.animatedCards = Array(this.quizzes.length).fill(false);
        this.quizzes.forEach((_, index) => {
          setTimeout(() => {
            this.animatedCards[index] = true;
          }, index * 400); // 100ms staggered delay
        });
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error loading quizzes:', error);
        Swal.fire('Error', 'Failed to load quizzes', 'error');
      }
    });
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.quizService.deleteQuiz(qId).subscribe({
          next: () => {
            // Corrected filter syntax
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId !== qId);
            this.isLoading = false;
            Swal.fire('Deleted!', 'Quiz has been deleted.', 'success');
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error deleting quiz:', error);
            Swal.fire('Error', error.error?.message || 'Failed to delete quiz', 'error');
          }
        });
      }
    });
  }
}