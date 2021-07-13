import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { QuizService } from 'src/app/services/quiz.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[];  
  qId='';
  jobname = 'BULK_UPLOAD_QUIZZES_JOB';

    // MatPaginator Inputs
    length = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];
  
    // MatPaginator Output
    pageEvent: PageEvent;
  
  constructor(
    private _quiz:QuizService,
    private snackBar: MatSnackBar,
    
  ) { }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        // this.quizzes = data;
        this.quizzes = data.slice(firstCut,secondCut);
        console.log(this.quizzes);
      },(error)=>{
        console.log('Error !'+error);
        Swal.fire('Error !!!', 'Error in loading data', 'error' );
      }
    );
  }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        // this.quizzes = data;
        this.quizzes = data.slice(0,this.pageSize);
        console.log(this.quizzes);
      },(error)=>{
        console.log('Error !'+error);
        Swal.fire('Error !!!', 'Error in loading data', 'error' );
      }
    );
  }


  deleteQuiz(qId){
    Swal.fire({
      icon:"question",
      title:'Are you sure you want to delete this Quiz?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        // delete the quiz
      this._quiz.deleteQuiz(qId).subscribe(
      (data)=>{
        this.quizzes = this.quizzes.filter((quiz)=>quiz.qId!=qId);
        Swal.fire('Success !!!', 'Quiz deleted successfully !!!', 'success' );
        // location.reload();
      },(error)=>{
        console.log('Error !'+error);
        Swal.fire('Error !!!', 'Error in Deleting Quiz', 'error' );
      });
     }
    })

  }

}
