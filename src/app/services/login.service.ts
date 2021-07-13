import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }


  // current logged in user
  public getCurrentUser(){
//    alert("getCurrentUser: "+localStorage.getItem('token')+"URL: "+`${baseUrl}/current-user`);
    return this.http.get(`${baseUrl}/user/current-user`);
  }
  // generate Token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generateToken`, loginData);
  }

  // login user: set token in localStorage
  public loginUser(token){
    localStorage.setItem('token',token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  // isLogin: check whether user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else{
      return true;
    }
  }

  // Logout: remove token & user details from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token
  public getToken(){
    return localStorage.getItem('token');
  }

  // set user details in local storage
  public setUser(user){
    localStorage.setItem("user", JSON.stringify(user));
  }

  // get user details
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
