import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'
import { validate } from 'json-schema';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

categories = [];
quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid:'',
    },
  };

  constructor(private _quiz: QuizService,
    private snackBar: MatSnackBar,
    private _cat:CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log("categories loaded from backend: "+this.categories);
        // Swal.fire('Success !!!', 'Category loaded successfully !!!', 'success' );
      },(error)=>{
        Swal.fire('Error !!!', 'Error loading data from server !!!', 'error' );
      }
    );

  }

  addQuiz(){
    console.log(this.quizData);

    // Common validatetion
    if(this.quizData.title.trim() =='' || this.quizData.title.trim() == null){
      //alert("Username is required");
      this.snackBar.open("Title is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.quizData.maxMarks.trim() =='' || this.quizData.maxMarks == null){
      //alert("Username is required");
      this.snackBar.open("Maximum Marks is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }

    if(this.quizData.numberOfQuestions.trim() =='' || this.quizData.numberOfQuestions == null){
      //alert("Username is required");
      this.snackBar.open("Number Of Questions are required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.quizData.category.cid =='' || this.quizData.numberOfQuestions == null){
      //alert("Username is required");
      this.snackBar.open("Category is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }

    // call Add Quiz api on server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        this.categories=data;
        // console.log("Quiz added successfully: "+this.categories);
        Swal.fire('Success !!!', 'Quiz added successfully !!!', 'success' ).then((e)=>{
          this.router.navigate(['/admin/quizzes']);
         });
        
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid:'',
          },
        };
      },(error)=>{
        Swal.fire('Error !!!', 'Error occured while adding quiz !!!', 'error' );
        console.log("Error while adding Quiz: "+error);
      }
    );
  }

}
