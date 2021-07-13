import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
catId;
quizzes;
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params)=>{
        this.catId=params.catId;
        if(this.catId==0){
          console.log("Load all the quiz");
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
              console.log("Quizzes loaded successfully: "+this.quizzes);
            },(error)=>{
              console.error("Error occured while loading data"+error)
              Swal.fire('Error','Error in loading all quizzes','error');
            });
        }else{
          console.log("Load specific quiz");
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes = data;
            },(error)=>{
              console.error("Error occured while loading data"+error)
              Swal.fire('Error','Error in loading quiz data','error');
            }
          );
          
        }
      });
    this.catId=this._route.snapshot.params.catId;
    console.log('cat id in load-quiz.component.ts: '+this.catId)

    
  }

}
