import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category = {
    title:'',
    description:''
  }
  constructor(private _category:CategoryService,
    private _snack:MatSnackBar,
    private router: Router) {
    
   }

  ngOnInit(): void {}

  formSubmit(){
    if(this.category.title.trim() == '' || this.category.title.trim == null){
      this._snack.open("Title Required !!",'',{
        duration:3000,verticalPosition:'top',
      });
      return;
    }

    // All done
    this._category.addCategories(this.category).subscribe(
      (data:any)=>{
        console.log('Data in add-categories', data);
        this.category.title='';
        this.category.description='';
        Swal.fire('Success!!!', 'Category '+this.category.title+' added successfully !!!', 'success' );
        this.router.navigate(['/admin/categories']);
      },(error)=>{
        console.log('Error in add-categories', error);
        Swal.fire('Error!!!', 'Category '+this.category.title+' not added due to server error', 'error' );
      }
    );
  }
}
