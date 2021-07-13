import { Component, OnInit, EventEmitter, ViewChild, ViewEncapsulation, Inject, ElementRef } from '@angular/core';
import {  FileUploadService } from 'src/app/services/file-upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  
  message = '';
  errorMsg = '';
  jobname = '';

  selectedFile?: FileList;
  user = null;

  posts : {
    body:{
      status:'',
      errorDescription:'',
    }
  };
  constructor(
    private login: LoginService,
    private _active: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.jobname=this._active.snapshot.params.jobname;
    this.login.getCurrentUser().subscribe(
      (user:any)=>{
        this.user=user;
      },
      (error)=>{
        alert('error');
      });
  }

  public selectFile(event:any): void {
    //Select File
    this.selectedFile = event.target.files;
  
  }


  uploadFile(){
    this.errorMsg = '';
    this.message = '';
    const uploadFile = new FormData();
    const file: File | null = this.selectedFile.item(0);
    uploadFile.append('file', file);
    uploadFile.append('jobName', this.jobname);
    uploadFile.append('username', this.user.username);
    
    var fileText = "";
    fileText = fileText + '<p align="left"> JOB NAME: <strong>'+this.jobname+'</strong> <br>'
    fileText = fileText + 'USER NAME: <strong>'+this.user.username+'</strong> <br>'
    fileText = fileText + 'FILE NAME: <strong>'+file.name+'</strong></p>'
  // Meldungstext = Meldungstext + '<p align="left"> second paragraph block.. with linebreak <br>'
  // Meldungstext = Meldungstext + 'second line to second block </p>' 
  // Meldungstext = Meldungstext + '<p align="left">tex ti third paragraph here </p>'
  // Meldungstext = Meldungstext + '<strong>Last line WITHOUT paragraph = is showed centered (swal default) </strong>'
  
  Swal.fire({
      icon:"warning",
      title:'Are you sure you want to upload the file ?',
      // showDenyButton:true,
      confirmButtonText:'Yes',
      showCancelButton:true, 
      html: fileText,
    }).then((result)=>{
      if(result.isConfirmed){
        if (this.selectedFile) {
          if (file) {
          if (!this.validateFile(file.name)) {
           this.errorMsg= 'Only csv file format is supported.';
            return ;
          }
          this.fileUploadService.uploadProfilePicture(uploadFile).subscribe((response:any) => {
            if (response.status === 200) {
              this.posts=response;
              if(response.body.status=='FAILURE'){
              // Swal.fire('Error !!!',response.body.errorDescription,'error');
              this.errorMsg = response.body.errorDescription;
              return;
              }else{
                console.log('onUpload response: '+this.posts);
                this.message = 'File uploaded successfully';
              
            }
            } else {
              this.errorMsg = 'Some error occured. File not uploaded.';
              // Swal.fire('Error !!!',this.message,'error');
            }
          });
        }
        this.selectedFile = undefined;
      }
     }
    })
  }


  // uploadFile(): void {
  //     this.errorMsg = '';
  //     this.message = '';
  //     const uploadFile = new FormData();
  //     const file: File | null = this.selectedFile.item(0);
  //     uploadFile.append('file', file);
  //     uploadFile.append('jobName', this.jobname);
  //     uploadFile.append('username', this.user.username);
  //     if (this.selectedFile) {
  //       if (file) {
  //       if (!this.validateFile(file.name)) {
  //        this.errorMsg= 'Only csv file format is supported.';
  //         return ;
  //       }
  //       this.fileUploadService.uploadProfilePicture(uploadFile).subscribe((response:any) => {
  //         if (response.status === 200) {
  //           this.posts=response;
  //           if(response.body.status=='FAILURE'){
  //           // Swal.fire('Error !!!',response.body.errorDescription,'error');
  //           this.errorMsg = response.body.errorDescription;
  //           return;
  //           }else{
  //             console.log('onUpload response: '+this.posts);
  //             this.message = 'File uploaded successfully';
            
  //         }
  //         } else {
  //           this.errorMsg = 'Some error occured. File not uploaded.';
  //           // Swal.fire('Error !!!',this.message,'error');
  //         }
  //       });
  //     }
  //     this.selectedFile = undefined;
  //   }
  // }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'ms-excel') {
        return true;
    }
    else {
        return false;
    }
}
}
