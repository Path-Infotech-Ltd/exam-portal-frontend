import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http: HttpClient
  ) { }

  public getQuestionsOfQuiz(qid){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // add question
  public addQuestion(question){
    return this._http.post(`${baseUrl}/question/`, question);
  }

  // delete question
  public deleteQuestion(qId){
    return this._http.delete(`${baseUrl}/question/${qId}`);
  }

  // get questions of a quiz
  public getQuestionsOfQuizForTest(qid){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }
}
