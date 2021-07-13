import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  saveSuccess: boolean;
  constructor(private userService: UserService,
    private snackBar: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
    gender: '',
    about: '',
    enabled: true,
    profileImage: '',
    createdBy: '',
    errorCode:'',
    errorDescription:'',
    status:'',
  };
  public error: any; 
  ngOnInit(): void {
  }

  formSubmit(){
    console.log("inside signup components: ",this.user);
    if(this.user.username.trim() =='' || this.user.username == null){
      //alert("Username is required");
      this.snackBar.open("Username is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.user.password.trim() =='' || this.user.password == null){
      //alert("Username is required");
      this.snackBar.open("Password is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.user.firstName.trim() =='' || this.user.firstName == null){
      //alert("Username is required");
      this.snackBar.open("First name is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.user.lastName.trim() =='' || this.user.lastName == null){
      //alert("Username is required");
      this.snackBar.open("Last name is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.user.email.trim() =='' || this.user.email == null){
      //alert("Username is required");
      this.snackBar.open("Email id is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.user.phone =='' || this.user.phone == null){
      //alert("Username is required");
      this.snackBar.open("Phone number is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    // addUser: UserService
    
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log("response from backend: ",data);
        this.user=data;
        if(this.user.status=='FAILURE'){
          Swal.fire('Error !!!', this.user.username+' '+this.user.errorDescription, 'error' );    
        }else{
          Swal.fire('Success', 'Username '+this.user.username+' registered successfully !!!<br>User Id is: '+data.id, 'success' );
        }
      },
      (error)=>{
        //error
        console.log("Something went wrong: ",error);
        //this.error = JSON.stringify(error) ;
          
        // alert("Something went wrong: "+error);
        this.snackBar.open("Something went wrong !!!", error.error,{
          duration:3000, verticalPosition:'top',
        });
        
      }
    );
  }
}
