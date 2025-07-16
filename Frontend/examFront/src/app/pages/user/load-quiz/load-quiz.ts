import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/QuizService/quiz-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-quiz',
  imports: [CommonModule],
  templateUrl: './load-quiz.html',
  styleUrl: './load-quiz.css'
})
export class LoadQuiz {

  catId:any;
  quizzes:any;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) { }

  ngOnInit() {
    this.catId =  this.route.snapshot.params['catId'];
    
    if(this.catId == 0) {
      console.log("Loading all quizzes");

      this.quizService.getQuiz().subscribe(
        (data:any) => {
          this.quizzes = data;
          console.log("Quizzes loaded successfully", this.quizzes);
        }, (error:any) => {
          Swal.fire('Error', 'Failed to load quizzes', 'error');
        }
      )

    } else {
      console.log("Loading specific");
      
    }
    
  }

}
