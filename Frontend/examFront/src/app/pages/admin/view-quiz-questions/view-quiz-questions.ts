import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/QuestionService/question-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  deleteQuestion(qid:any) {
     Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((
          (result) => {
            if(result.isConfirmed) {
              this.questionService.deleteQuestion(qid).subscribe({
                next : () => {
                  // Remove only the deleted question
                  this.questions = this.questions.filter((que:any) => que.queId !== qid );
                  Swal.fire('Deleted','Question has been deleted','success')
                }, error:(error) => {
                  Swal.fire('Error',error.error?.message || 'Failed to delete question', 'error');
                }
              })
            }
          }
        ))
  }

}
