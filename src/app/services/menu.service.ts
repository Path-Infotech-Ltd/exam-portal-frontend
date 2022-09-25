import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

    // current logged in user
    public getAllMenu(){
      //    alert("getCurrentUser: "+localStorage.getItem('token')+"URL: "+`${baseUrl}/current-user`);
          return this.http.get(`${baseUrl}/menuController/`);
        }
}
