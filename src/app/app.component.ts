import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proy_app_web';

  userName: string | null = null;

  constructor(private loginService:LoginService,private router:Router) { 
    this.userName = this.loginService.getUser();
  }

  cerrarseion(){
    console.log("cerrarseion")

    this.loginService.logOut()
      this.router.navigate(['/login']);
  }

  
}
