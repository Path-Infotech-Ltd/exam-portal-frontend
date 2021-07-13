import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {
  categories=[];
  constructor(
    private _cat: CategoryService,
    public login: LoginService,
  ) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },(error)=>{
        console.log('Error occured while loading categories: '+error);
        Swal.fire('Error', 'Error occured while loading categories', 'error');
      }
    );
  }

  public logout(){
    this.login.logout();
    window.location.reload();
 // this.login.loginStatusSubject.next(false);
  }

}
