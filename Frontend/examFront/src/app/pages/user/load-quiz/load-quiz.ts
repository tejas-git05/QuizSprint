import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/QuizService/quiz-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-quiz',
  imports: [CommonModule,RouterLink],
  templateUrl: './load-quiz.html',
  styleUrl: './load-quiz.css'
})
export class LoadQuiz {

  catId:any;
  quizzes:any;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) { }

  ngOnInit() {
    
    this.route.params.subscribe((params) => {
      this.catId =  params['catId'];
      console.log(params);

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
      this.quizService.getQuizzesByCategory(this.catId).subscribe(
        (data:any) => {
          this.quizzes = data;
        }, (error:any) => {
          Swal.fire('Error', 'Failed to load quizzes for category', 'error');
          console.error('Error loading quizzes by category:', error);
        } 
      )
    }
     });
    
  }

    
    

}
