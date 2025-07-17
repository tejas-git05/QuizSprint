import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  // get all quiz
  public getQuiz(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  // add quiz
  public addQuiz(quiz:any) {
    return this.http.post(`${baseUrl}/quiz/`,quiz)
  }

  // deleteQuiz
  public deleteQuiz(qId:any) {
    return this.http.delete(`${baseUrl}/quiz/${qId}`)
  }

  // get single quiz
  public getQuizById(qId:any) {
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  // update Quiz
  public updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  // get quizzes by category
  public getQuizzesByCategory(catId:any) {
    return this.http.get(`${baseUrl}/quiz/category/${catId}`);
  }

}
