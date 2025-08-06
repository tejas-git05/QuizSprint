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

  // get all questions in specific quiz by quiz id for User
  public getQuestionsOfQuizForTest(qId:any) {
    return this.http.get(`${baseUrl}/questions/quiz/${qId}`);
  }

  // add question
  public addQuestion(question:any) {
    return this.http.post(`${baseUrl}/questions/`,question)
  }

  // delete question
  public deleteQuestion(queId:any) {
    return this.http.delete(`${baseUrl}/questions/${queId}`)
  }



}
