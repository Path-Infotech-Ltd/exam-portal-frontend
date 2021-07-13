import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar,
    private _question: QuestionService,
  ) { }

  qId:0;
  title='';
  questions = [];

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    this.title=this._route.snapshot.params.title;
    console.log('qid: '+this.qId+' || '+this.title);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(this.questions);
      }
    );
  }

  deleteQuestion(qid){
    // alert(qid);
    Swal.fire({
      icon:"info",
      title:'Are you sure you want to delete this question?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
    this._question.deleteQuestion(qid).subscribe(
      (data)=>{
        Swal.fire('Success', 'Question deleted successfully', 'success');
        this.questions = this.questions.filter((q)=>q.quesId!=qid);
      },(error)=>{
        Swal.fire('Error', 'Error occured while deleting the question: '+error, 'error');
      }
      );
       }
      })
    }

}
