import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuService } from 'src/app/services/menu.service';
import { getMatIconNameNotFoundError } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user=null;
  image: string;
  menu=null;
  // imageSrc = 'assets/yashkmr0680.jpeg'  


  profileImageData={
    imageType: 'PROFILE_IMAGE',
    username:  '',
  }

  base64Data: any;
  retrieveResonse: any={
    profilePictureStatus:false,
  };
  retrievedImage: any;

  constructor(public login: LoginService,
    private _userService: UserService,
    private _menuService: MenuService,
    private router: Router,) { 
    // this.image='.../../../assets/sunilkmr5775.jpeg';
  }
  
  ngOnInit(): void {
   
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe(data=>{
         this.isLoggedIn=this.login.isLoggedIn();
         this.user=this.login.getUser();
         this.getProfilePic();
    })
    this.getProfilePic();
    this. getMenu();
  }
 public  getMenu() {
    this._menuService.getAllMenu().subscribe(
      (menu:any)=>{
        this.menu=menu;
       console.log('MENU ITMES: ',menu);
      //  alert('MENU ITMES: '+menu);
      },
      (error)=>{
        alert('error');
      });
    throw new Error('Method not implemented.');
  }

  getProfilePic(){
    //Make a call to Spring Boot to get the Image Bytes.
  const profileImageData = new FormData();
  this.profileImageData.username=this.user.username;

  profileImageData.append('imageType', this.profileImageData.imageType);
  profileImageData.append('username', this.profileImageData.username);
  // alert("getImage(): "+this.profileImageData.imageType+" | "+this.profileImageData.username);
  this._userService.fetchProfilePicture(this.profileImageData)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        if(this.retrieveResonse.profilePicStatus==false || this.retrieveResonse.profilePicStatus==undefined){
          // alert('onUpload response: '+this.retrieveResonse.profilePicStatus);
          this.retrievedImage = 'https://www.w3schools.com/howto/img_avatar.png';
          //this.deletImage=false;
        } else{
          
        // alert('onUpload response: '+this.retrieveResonse.profilePicStatus);
        console.log('onUpload response: '+this.retrieveResonse.profilePicStatus);
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
        
      }, (error)=>{
        this.retrievedImage = 'https://www.w3schools.com/howto/img_avatar.png';
      }
    );
    console.log('this.retrieveResonse.profilePicStatus: '+this.retrieveResonse.profilePicStatus);
    console.log('this.retrievedImage: '+this.retrievedImage);
  }

  

  public logout(){
    this.login.logout();
    window.location.reload();
 // this.login.loginStatusSubject.next(false);
  }
}
