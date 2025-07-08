import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/QuestionService/question-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-quiz-questions',
  imports: [CommonModule,RouterLink],
  templateUrl: './view-quiz-questions.html',
  styleUrl: './view-quiz-questions.css'
})
export class ViewQuizQuestions implements OnInit {
  
  qId:any;
  qTitle:any;
  questions:any ;

  constructor( private actRout:ActivatedRoute, private questionService:QuestionService ) {

  }
  
  ngOnInit(): void {
    this.qId = this.actRout.snapshot.params['qid'];
    this.qTitle = this.actRout.snapshot.params['title'];
   console.log(this.qId);
   console.log(this.qTitle);

   this.questionService.getQuestions(this.qId).subscribe(
    (data:any) => {
      console.log(data);
      this.questions = data;
    },
    (error) => {
      console.log('view questions error');
    }
   )
   
  }

}
