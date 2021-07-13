import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid;
quiz;
  constructor(
    private _active: ActivatedRoute,
    private _quiz: QuizService,
    private _location: Location,
    private _router: Router,
    ) { }
    
backClicked() {
  this._location.back();
}

ngOnInit(): void {
  this.qid=this._active.snapshot.params.qid;
  this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
      this.quiz=data;
      console.log("Quiz loaded successfully: "+this.quiz);
    },(error)=>{
      console.error("Error occured while loading data"+error)
      Swal.fire('Error','Error in loading all quizzes','error');
    });
}

  startQuiz(){
    Swal.fire({
      icon:"warning",
      title:'Are you sure you want to take the test ?',
      // showDenyButton:true,
      confirmButtonText:'Start',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
  //  Navigate the Start Quiz page
    this._router.navigate(['/start/'+this.qid])
     }
    })
  }
}
