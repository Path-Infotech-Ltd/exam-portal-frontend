import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private _userService: UserService,) { }
  user=null;
  profileImageData={
    imageType: 'PROFILE_IMAGE',
    username:  '',
  }

  base64Data: any;
  retrieveResonse: any={
    profilePictureStatus:false,
  };
  retrievedImage: any;
  ngOnInit(): void {
    // this.getProfilePic();
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
        if(this.retrieveResonse.profilePicStatus==false){
          // alert('onUpload response: '+this.retrieveResonse.profilePicStatus);
          this.retrievedImage = 'https://www.w3schools.com/howto/img_avatar.png'
          //this.deletImage=false;
        } else{
          
        // alert('onUpload response: '+this.retrieveResonse.profilePicStatus);
        console.log('onUpload response: '+this.retrieveResonse.profilePicStatus);
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
        
      }
    );
  }
}
