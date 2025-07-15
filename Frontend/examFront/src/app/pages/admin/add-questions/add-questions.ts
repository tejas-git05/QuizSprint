import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/QuestionService/question-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-questions',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-questions.html',
  styleUrl: './add-questions.css'
})
export class AddQuestions implements OnInit {
  
  qId =[];
  qTitle:any;
  question : any = {
      quiz: {},
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
  }

  questionForm = new FormGroup({
    content: new FormControl('', Validators.required),
    option1: new FormControl('', Validators.required),
    option2: new FormControl('', Validators.required),
    option3: new FormControl('', Validators.required),
    option4: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  })

  constructor( private actRoute:ActivatedRoute, private questionService:QuestionService ) { }
  
  ngOnInit(): void {
    this.qId = this.actRoute.snapshot.params['qid'];
    this.qTitle = this.actRoute.snapshot.params['title'];
    this.question.quiz = this.qId;

    this.questionService.addQuestion(this.questionForm).subscribe(
      (data:any) => {

      }
    )
  }


  onSubmit() {
  if (this.questionForm.invalid) {
    this.questionForm.markAllAsTouched();
    return;
  }

  // Add quiz ID
  const formData = {
    ...this.questionForm.value,
    quiz: {
      qId: this.qId
    }
  };
  this.questionService.addQuestion(formData).subscribe(
    (data:any) => {
      Swal.fire({title: 'Success!',
                text: `Question added successfully`,
                icon: 'success',
                confirmButtonText: 'OK'
              });
      this.questionForm.reset();
    },
    (error) => {
            console.log("Failed to add Quiz", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error?.error?.message || 'Failed to add Quiz. Please try again.'
            }); 
    }

  )

  console.log('Submitting question:', formData);
  }

  getFilledOptions(): string[] {
  return ['option1', 'option2', 'option3', 'option4']
    .map(opt => this.question[opt])
    .filter(opt => opt && opt.trim() !== '');
  }

}