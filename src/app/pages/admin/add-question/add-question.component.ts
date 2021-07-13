import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(private _route:ActivatedRoute,
    private _question:QuestionService,
    private snackBar: MatSnackBar,) { }

  qId:0;
  qTitle='';
  question = {
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;

    this.question.quiz['qId']=this.qId;
    // alert(this.title);
  }

  formSubmit(){
        // Common validatetion
        if(this.question.content.trim() =='' || this.question.content.trim() == null){
          //alert("Username is required");
          this.snackBar.open("Question is required !!!", '',{
            duration:3000, verticalPosition:'top',
          });
          return;
        }
        if(this.question.option1.trim() =='' || this.question.option1 == null){
          //alert("Username is required");
          this.snackBar.open("Option 1 is required !!!", '',{
            duration:3000, verticalPosition:'top',
          });
          return;
        }
    
        if(this.question.option2.trim() =='' || this.question.option2 == null){
          //alert("Username is required");
          this.snackBar.open("Option 2 is required !!!", '',{
            duration:3000, verticalPosition:'top',
          });
          return;
        }
       
        // call Add Question api on server
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success', 'Question added successfully. Add another question.', 'success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },(error)=>{
        Swal.fire('Error', 'Error occured while adding Question', 'error');
      }
    );
  }
}
