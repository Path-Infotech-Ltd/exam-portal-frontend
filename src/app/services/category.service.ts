import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  
  // load all the categories
  public categories(){
    return this._http.get(`${baseUrl}/category/`);
  }

  // add new category
  public addCategories(category){
    return this._http.post(`${baseUrl}/category/`,category);
  }

  // delete category
  public deleteCategory(cid:string):Observable<any>{
    return this._http.delete(`${baseUrl}/category/${cid}`, { responseType: 'text' });
  } 
}
