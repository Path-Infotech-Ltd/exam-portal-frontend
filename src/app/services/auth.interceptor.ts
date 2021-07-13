import { HttpInterceptor, 
         HttpRequest,HttpHandler,
         HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
// const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private login: LoginService){}
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
      
       // add jwt token from local storage in the request
       let authReq1 = req;
       const token = this.login.getToken();
       console.log("Token Inside Interceptor: "+token);
       if(token!=null){
        authReq1 = authReq1.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
       }
       return next.handle(authReq1);
    }    
}

export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
]; 