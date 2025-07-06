import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  // get all questions in quiz
  public getQuestions(qId:any) {
    return this.http.get(`${baseUrl}/questions/quiz/${qId}`);
  }



}
