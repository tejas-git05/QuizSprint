import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/QuizService/quiz-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  imports: [CommonModule],
  templateUrl: './instructions.html',
  styleUrl: './instructions.css'
})
export class Instructions {

  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);
  private router = inject(Router);

  qid = this.route.snapshot.params['qid'];
  quiz = signal<any>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit() {
    try {
      const data = await this.quizService.getQuizById(this.qid).toPromise();
      this.quiz.set(data);
      console.log("Quiz data loaded successfully", data);
    } catch (err) {
      console.error("Error loading quiz data", err);
      this.error.set('Failed to load quiz instructions');
    } finally {
      this.isLoading.set(false);
    }
  }

  startQuiz() {
    
    Swal.fire({
      title:'Are you ready to start the quiz?',
      text: 'Make sure you have read all the instructions carefully.',
      icon: 'question',     
      showCancelButton: true,
      confirmButtonText: 'Yes, start the quiz',
      cancelButtonText: 'No, take me back',
      confirmButtonColor: '#454545',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['startExam/', this.qid]);
      } else {
        this.router.navigate(['/user/0']);
      }


    })
  }

}
