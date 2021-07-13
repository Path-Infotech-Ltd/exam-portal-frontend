import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user = null;
  name = 'Angular 4';
  url = '';
  deletImage:boolean=false;
  profilePicStatus:boolean;

  constructor(private login: LoginService,
    private _userService: UserService,
    private router: Router
    ) { }

selectedFile: File;
retrievedImage: any;
base64Data: any;
retrieveResonse: any={
  profilePictureStatus:false,
};
message: string;
imageName: any;

profilePicData={
  jobName: 'PROFILE_PIC_UPLOAD_JOB',
}
deleteProfilePicData={
  jobName: 'PROFILE_PIC_DELETE_JOB',
 username:'',
}

getDeleteProfilePicData={
  // profilePictureStatus:false,
}

profileImageData={
  imageType: 'PROFILE_IMAGE',
  username:  '',
}

posts : {
 body:{
   status:'',
   errorDescription:'',
 }
};
//Gets called when the user selects an image
public onFileChanged(event) {
  //Select File
  this.selectedFile = event.target.files[0];
 this.onUpload() ;
}


//Gets called when the user clicks on submit to upload the image
onUpload() {
  // console.log(this.selectedFile);
  const uploadImageData = new FormData();
  uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
  uploadImageData.append('jobName', this.profilePicData.jobName);
  uploadImageData.append('username', this.user.username);
  // alert("onUpload(): "+this.profilePicData.jobName+" | "+this.user.username);
  this._userService.uploadProfilePicture(uploadImageData).subscribe((response:any) => {
    if (response.status === 200) {
      this.posts=response;
      if(response.body.status=='FAILURE'){
      Swal.fire('Error !!!',response.body.errorDescription,'error');
      return;
      }else{
        console.log('onUpload response: '+this.posts);
        this.message = 'Profile picture uploaded successfully';
        Swal.fire('Success !!!',this.message,'success').then((e)=>{
          this.getImage();
          this.deletImage=true;
          location.reload();
        });
    }
    } else {
      this.message = 'Image not uploaded successfully';
      Swal.fire('Error !!!',this.message,'error');
    }
  });
}

  getImage() {
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
          this.deletImage=false;
        } else{
          
        // alert('onUpload response: '+this.retrieveResonse.profilePicStatus);
        console.log('onUpload response: '+this.retrieveResonse.profilePicStatus);
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          
          
        }
        
      }
    );
     
}

// public delete(){
//   //Make a call to Spring Boot to get the Image Bytes.
//   const deleteProfilePicData = new FormData();
//   this.deleteProfilePicData.username=this.user.username;
//   deleteProfilePicData.append('jobName', this.deleteProfilePicData.jobName);
//   deleteProfilePicData.append('username', this.deleteProfilePicData.username);
//   // alert("delete(): "+this.deleteProfilePicData.jobName+" | "+this.deleteProfilePicData.username);
//   this._userService.deleteProfilePicture(this.deleteProfilePicData)
//     .subscribe(
//       (data) => {
//         this.getDeleteProfilePicData=data
//         console.log('delete response: '+data);
//         this.message = 'Profile picture deleted successfully';
//         Swal.fire('Success !!!',this.message,'success').then((e)=>{
//           this.getImage();
//           this.deletImage=true;
//           location.reload();
//          });
//       }
//     );
//   this.deletImage=false;
// }

public delete(){
  Swal.fire({
    icon:"warning",
    title:'Are you sure you want to delete profile picture?',
    confirmButtonText:'Delete',
    showCancelButton:true,
  }).then((result)=>{
    if(result.isConfirmed){
      const deleteProfilePicData = new FormData();
      this.deleteProfilePicData.username=this.user.username;
      deleteProfilePicData.append('jobName', this.deleteProfilePicData.jobName);
      deleteProfilePicData.append('username', this.deleteProfilePicData.username);

      // delete the quiz
    this._userService.deleteProfilePicture(this.deleteProfilePicData)
    .subscribe(
      (data) => {
        this.getDeleteProfilePicData=data
        console.log('delete response: '+data);
        this.message = 'Profile picture deleted successfully';
        Swal.fire('Success !!!',this.message,'success').then((e)=>{
          this.getImage();
          this.deletImage=true;
          location.reload();
         });
      }
    );
  this.deletImage=false;
   }
  })

}

ngOnInit(): void {
  this.login.getCurrentUser().subscribe(
      (user:any)=>{
        this.user=user;
        this.getImage();
      },
      (error)=>{
        alert('error');
      });
  }

}