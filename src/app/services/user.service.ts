import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  // add user

  public addUser(user:any){
    if(user.username=='' || user.username == null){
      alert("Username is required");
      return;
    }
    return this.http.post(`${baseUrl}/user/`, user)
  }

  public uploadProfilePicture(uploadImageData:any){
    return this.http.post(`${baseUrl}/profilePicController/uploadProfilePicture`, uploadImageData, { observe: 'response' });
  }

  public fetchProfilePicture(profileImageData:any){
    return this.http.post(`${baseUrl}/profilePicController/fetchPic`, profileImageData);
  }

  public deleteProfilePicture(deleteProfilePicData:any){
    return this.http.post(`${baseUrl}/profilePicController/deleteProfilePic`, deleteProfilePicData);
  }
  
}
