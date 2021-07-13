import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  };
  constructor(private snackBar: MatSnackBar,
    private login: LoginService,
    private router: Router) { }
 
  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log("Login button clicked !!!");
    if(this.loginData.username.trim() =='' || this.loginData.username == null){
      //alert("Username is required");
      this.snackBar.open("Username is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }
    if(this.loginData.password.trim() =='' || this.loginData.password == null){
      //alert("Username is required");
      this.snackBar.open("Password is required !!!", '',{
        duration:3000, verticalPosition:'top',
      });
      return;
    }

    // Request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        if(data!=null){
       //success
        console.log("success: ",data);
        console.log("token: ",data.token);
        
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log("User Details: "+user);

            // redirect to ADMIN/NORMAL Dashboard based on user role
            if(this.login.getUserRole()=='ADMIN'){
              // ADMIN Dashboard
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
              
            }else if(this.login.getUserRole()=='NORMAL'){
              // NORMAL User Dashboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
             // location.reload();
            }
          }, 
          (error)=>{
            console.log('Error !'+error);
            Swal.fire('Error','Invalid Credentials!!! Please enter correct details', 'error');  
          }
        ); 
      }else{
        Swal.fire('Error','Invalid Credentials!!! Please enter correct details', 'error');  
      }
      },
      (error)=>{
        //error
        console.log("Something went wrong: ",error);
        this.snackBar.open("Something went wrong !!!", '',{
          duration:3000, verticalPosition:'top',
        });
        
      }
    );
  }

}