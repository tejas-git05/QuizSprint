import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-quiz',
  imports: [CommonModule],
  templateUrl: './view-quiz.html',
  styleUrl: './view-quiz.css'
})
export class ViewQuiz {

  Quiz = [
    {
      qid:12,
      title:'Basic Of Java',
      description:'this is ...',
      maxMarks:100,
      numOfQue:20,
      active:'Active'
    },
    {
      qid:13,
      title:'Basic Of Python',
      description:'this is ...',
      maxMarks:100,
      numOfQue:20,
      active:'False'
    },
    {
      qid:13,
      title:'Basic Of Python',
      description:'this is ...',
      maxMarks:100,
      numOfQue:20,
      active:'False'
    },
    {
      qid:13,
      title:'Basic Of Python',
      description:'this is ...',
      maxMarks:100,
      numOfQue:20,
      active:'False'
    }
  ]

}
