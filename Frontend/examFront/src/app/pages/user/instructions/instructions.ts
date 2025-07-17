import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/QuizService/quiz-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructions',
  imports: [CommonModule,RouterLink],
  templateUrl: './instructions.html',
  styleUrl: './instructions.css'
})
export class Instructions {

 private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);

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

}
