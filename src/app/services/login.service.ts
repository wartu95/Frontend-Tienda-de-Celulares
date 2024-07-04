import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../dto/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private _user?:Login;
  private _token?:string;

  constructor(private http:HttpClient) { }



  login(username: string, password: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });


     const body = JSON.stringify({ name: username, password: password });

    return this.http.post<any>("http://localhost:8080/login", body, { headers });

  }


  public get loginD():Login{

    if(this._user!=null){

      return this._user;

    }else if(this._user==null && sessionStorage.getItem('usuario')!=null){

      this._user=JSON.parse(sessionStorage.getItem('usuario') || '{}') as Login;//nwe**

      return this._user;
    }
    return new Login();

  }


  public get token():string{

    if(this._token!=null){

      return this._token;

    }else if(this._token==null && sessionStorage.getItem('token')!=null){

      this._token=sessionStorage.getItem('token');

      return this._token;
    }
    return null;

  }



saveUser(accessToken:string):void{

  let payload=this.getTokenData(accessToken);
  this._user=new Login();
  this._user.name=payload.sub;
  this._user.roles=payload.roles;

  sessionStorage.setItem('usuario',JSON.stringify(this._user));
}

saveToken(accessToken:string):void{

  this._token=accessToken;
  sessionStorage.setItem('token',accessToken);

}

getTokenData(accessToken:string):any{
  if(accessToken!=null){
    return JSON.parse(window.atob(accessToken.split(".")[1]));
  }
  return null;
}


isAuthenticated():boolean{
  let payload=this.getTokenData(this.token);

  if(payload!=null && payload.sub && payload.sub.length>0){

    return true;
  }
  return false;
}

hasRole(role:string):boolean{

  if(this.loginD.roles.includes(role)){
    return true;
  }
  return false;
}

logOut():void{

  this._token=null;
  this._user=null;
  sessionStorage.clear();
  sessionStorage.removeItem('usuario');
  sessionStorage.removeItem('token');
}

public getUser(): string | null{
  return this.login ? this.login.name : null
}
}
