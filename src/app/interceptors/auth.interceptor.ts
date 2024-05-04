import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginService,private router:Router){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


     console.log("el interceptor auth se está ejecutando");

    return next.handle(req).pipe(

      catchError( e=>{

        if(e.status==401){
          if(this.loginService.isAuthenticated()){
            this.loginService.logOut();
          }
          this.router.navigate(['/login']);

        }
        if(e.status==403){
          // console.log("no tienes los privilegios"); //FORBIDDEN ROLES 403
        }


        return throwError(() => e);
      })

    );


  }
}