import { CommonModule, LocationStrategy } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/QuestionService/question-service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-exam',
  imports: [CommonModule,FormsModule],
  templateUrl: './start-exam.html',
  styleUrl: './start-exam.css'
})
export class StartExam {
  qid: any;
  questions: any[] = [];
  currentQuestion = 0;
  selectedAnswers: { [key: number]: any } = {};
  givenAnswer : any[] = [];
  marksGot = 0;
  attemptedQue = 0;
  correctAnswers = 0;
  isSubmitted = false;
 
  private route = inject(ActivatedRoute);
  private questionService = inject(QuestionService);
  private locationSt = inject(LocationStrategy);

  ngOnInit() {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        console.log("Questions loaded successfully", data);
        this.questions = data;

        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
        } )

      },
      (error: any) => {
        console.error("Error loading questions", error);
      } 
    );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  nextQuestion() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  goToQuestion(index: number) {
    this.currentQuestion = index;
  }

  selectAnswer(queId: number, optionKey: any) {
    this.selectedAnswers[queId] = optionKey;
  }

 

  submitExam() {
    Swal.fire({
      title: 'Do you want to submit the exam?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit',
      confirmButtonColor: '#454545',
      cancelButtonColor : '#d33',
    }).then((e)=> {
      
      // If user confirms submission
      this.isSubmitted = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if(e.isConfirmed) {
        this.correctAnswers = 0;
        this.marksGot = 0;
        this.attemptedQue = 0;


        this.questions.forEach((q) => {

      // Count only if user has attempted the question
        if (q.givenAnswer?.trim() !== '') {
          this.attemptedQue++;

        }

          if( q.givenAnswer === q.answer ) {
            this.correctAnswers++;

            let marksSingle = q.quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;

          }
        })

        const wrongAnswers = this.attemptedQue - this.correctAnswers;

        // Console output
      console.log('✅ Total Attempted Questions:', this.attemptedQue);
      console.log('✅ Correct Answers:', this.correctAnswers);
      console.log('❌ Wrong Answers:', wrongAnswers);
      console.log('🎯 Marks Obtained:', this.marksGot);
      }

    })

  }

}
