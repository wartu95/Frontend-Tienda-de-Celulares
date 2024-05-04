import { inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
;
import { LoginService } from '../services/login.service';



export const roleGuard:CanActivateFn=(route,state)=>{

const loginService=inject(LoginService);
const router=inject(Router); 

if(!loginService.isAuthenticated()){
    return false;
  }

  let roles=route.data['role'] as string[];

  let hasRole = false;
  roles.forEach(role => {
      if (loginService.hasRole(role)) {
         hasRole =  true;
      }
  });
  if(hasRole){return true}

  console.log("rol no tiene acceso")
  router.navigate(['/login'])
  return false;
};