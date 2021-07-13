import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  // load all quiz
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quiz){
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  // delete Quiz
  public deleteQuiz(qId){
    return this._http.delete(`${baseUrl}/quiz/${qId}`, { responseType: 'text' });
  } 

  // get single quiz
  public getQuiz(qId){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  } 

  // update quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  // Get quizzes of category
  public getQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  // Get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

    // Get active quizzes of category
    public getActiveQuizzesOfCategory(cid){
      return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
    }
}
