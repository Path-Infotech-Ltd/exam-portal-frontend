import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
qid;
questions;
marksObtained=0;
correctAnswer = 0;
questionAttempted=0;
isSubmit = false;
timer: any;


constructor(
    private _locationStrategy: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params.qid;
    this.loadQuestions();
  }
  loadQuestions(): any {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any)=>{
        // this.questions=data;
        this.questions = data;  
      console.log('ques:',this.questions);  
      //  console.log("Questions :" , JSON.stringify(data));  

      this.timer = this.questions.length * 2 * 60; // Assume, Time per ques = 2 mins
      this.questions.forEach((q)=>{
        q['givenAnswer']='';
      })
        this.regulateTimer();
      },(error)=>{
        console.error("Error occured while loading data"+error)
        Swal.fire('Error','Error in loading data','error');
      }
    );
  }

  preventBackButton(){
   history.pushState(null,null,location.href);
    this._locationStrategy.onPopState(()=>{
      history.pushState(null,null,location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      denyButtonText: `Don't save`,
      icon: 'info'
    }).then((e)=>{
      if(e.isConfirmed){
       this.evalQuiz();
      }
    })
  }

  regulateTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      } else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz(){
    this.isSubmit = true;
    // Calculation
    this.questions.forEach(q => {
      if(q.givenAnswer==q.answer){
        this.correctAnswer++;
        let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksObtained+=marksSingle;
        console.log('marksSingle: ',marksSingle);
      }
      if(q.givenAnswer.trim()!=''){
        this.questionAttempted++;
      }
    });
    console.log('CorrectAnswer: ',this.correctAnswer);
    console.log('MarksObtained: ',this.marksObtained);
    console.log('Question Attempted: ',this.questionAttempted);
    console.log('maxMarks : ',this.questions[0].quiz.maxMarks);
  }
}
