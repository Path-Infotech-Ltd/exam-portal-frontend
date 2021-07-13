import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  
  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _cat: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router) { }
  qId:0;
  quiz;
  categories;


  ngOnInit(): void {
    
    this.qId=this._route.snapshot.params.qid;
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log('update QUIZ: '+this.quiz);
      },(error)=>{
        console.log(error);
        Swal.fire('Error!!!', 'Error occured while loading data', 'error');
      }
    );

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log("categories loaded from backend: "+this.categories);
        // Swal.fire('Success !!!', 'Category loaded successfully !!!', 'success' );
      },(error)=>{
        Swal.fire('Error !!!', 'Error in loading data from server !!!', 'error' );
      }
    );
  }

// Update on form submit
public updateData(){

  // common validation
      // Common validatetion
      if(this.quiz.title.trim() =='' || this.quiz.title.trim() == null){
        //alert("Username is required");
        this.snackBar.open("Title is required !!!", '',{
          duration:3000, verticalPosition:'top',
        });
        return;
      }
      if(this.quiz.maxMarks.trim() =='' || this.quiz.maxMarks == null){
        //alert("Username is required");
        this.snackBar.open("Maximum Marks is required !!!", '',{
          duration:3000, verticalPosition:'top',
        });
        return;
      }
  
      if(this.quiz.numberOfQuestions.trim() =='' || this.quiz.numberOfQuestions == null){
        //alert("Username is required");
        this.snackBar.open("Number Of Questions are required !!!", '',{
          duration:3000, verticalPosition:'top',
        });
        return;
      }
      if(this.quiz.category.cid =='' || this.quiz.numberOfQuestions == null){
        //alert("Username is required");
        this.snackBar.open("Category is required !!!", '',{
          duration:3000, verticalPosition:'top',
        });
        return;
      }

this._quiz.updateQuiz(this.quiz).subscribe(
  (data)=>{
    console.log("categories loaded from backend: "+this.quiz);
    
     Swal.fire('Success !!!', 'Quiz updated successfully !!!', 'success' ).then((e)=>{
      this.router.navigate(['/admin/quizzes']);
     });
  },(error)=>{
    Swal.fire('Error !!!', 'Error in updating quiz !!!', 'error' );
  }
 );
}
}
