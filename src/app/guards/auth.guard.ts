import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../services/login.service";



export const authGuard:CanActivateFn=(route,state)=>{

    const loginService=inject(LoginService);
    const router=inject(Router); 
    
    const isTokenExpired=():boolean=>{
        const loginService=inject(LoginService);
        
        let token=loginService.token;
        let payload=loginService.getTokenData(token);
        let now=new Date().getTime() /1000;
    
        if(payload.exp<now){
            return true;
        }
        return false;
    
        }


    if(loginService.isAuthenticated()){
  
        if(isTokenExpired()){//test expired token
          loginService.logOut();
        console.log("sesión expirada")
          router.navigate(['/login']);

          return false;
        }

        return true;
      }
      console.log("debes logearte")

      router.navigate(['/login']);
    return false;

    };




