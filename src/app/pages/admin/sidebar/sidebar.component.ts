import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu = null;
  constructor(public login: LoginService,
    public _menuService: MenuService) { }

  ngOnInit(): void {
    this.getMenu();
  }
  public logout(){
    this.login.logout();
    window.location.reload();
 // this.login.loginStatusSubject.next(false);
    this.getMenu();
  }


  getMenu() {
    this._menuService.getAllMenu().subscribe(
      (menu:any)=>{
        this.menu=menu;
       console.log('MENU ITMES: ',menu);
       alert('MENU ITMES: '+menu);
      },
      (error)=>{
        alert('error');
      });
    throw new Error('Method not implemented.');
  }

}
