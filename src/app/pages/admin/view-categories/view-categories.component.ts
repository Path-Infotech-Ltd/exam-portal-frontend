import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})


export class ViewCategoriesComponent implements OnInit {

  categories=[];
  cid='';

  // MatPaginator Inputs
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  jobname = 'BULK_UPLOAD_CATEGORIES_JOB';
  
  constructor(
    private _category:CategoryService,
    private snackBar: MatSnackBar,
    ) { }

   
  
    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  
    onPageChanged(e) {
      let firstCut = e.pageIndex * e.pageSize;
      let secondCut = firstCut + e.pageSize;
      this._category.categories().subscribe(
        (data:any)=>{
          // this.categories = data;
          this.categories = data.slice(firstCut,secondCut);
          console.log(this.categories);
        },(error)=>{
          console.log('Error !'+error);
          // this.snackBar.open("Some error occured while loading categories", '',{
          //   duration:3000, verticalPosition:'top',
          // });
          Swal.fire('Error !!!', 'Error in loading data', 'error' );
        }
      );
    }


  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories = data;
        console.log(this.categories);
      },(error)=>{
        console.log('Error !'+error);
        // this.snackBar.open("Some error occured while loading categories", '',{
        //   duration:3000, verticalPosition:'top',
        // });
        Swal.fire('Error !!!', 'Error in loading data', 'error' );
      }
    );


    
    
  }

  deleteCategory(cid){
    Swal.fire({
      icon:"question",
      title:'Are you sure you want to delete this Category?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
    //  delete the category
      this._category.deleteCategory(cid).subscribe(
      (data:any)=>{
        this.categories = this.categories.filter((category)=>category.cid!=cid);
        Swal.fire('Success !!!', 'Category deleted successfully !!!', 'success' );
      },(error)=>{
        console.log('Error !'+error);
        Swal.fire('Error !!!', 'Error in Deleting Category', 'error' );
      }
    );
     }
    })
  }
  
  
}
