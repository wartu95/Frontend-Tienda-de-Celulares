import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor{


  constructor(private loginService:LoginService){};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("el interceptor token se está ejecutando");

    let token=this.loginService.token;

    if(token!=null){
      const autReq =req.clone(
        {
          headers:req.headers.set('Authorization','Bearer '+ token)
        }
      );


      return next.handle(autReq);
    }


    return next.handle(req);
  }
}