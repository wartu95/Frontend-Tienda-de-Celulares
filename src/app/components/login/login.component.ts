import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../../dto/login';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData:Login=new Login();
  // loginData = { username: '', password: '' };
  loading:boolean=false;

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {

    if(this.loginService.isAuthenticated()){
      this.router.navigate(['/test']);
    }

  }
  login():void{

    this.loading=true;
    // console.log(this.loginData);


    this.loginService.login(this.loginData.username,this.loginData.password).subscribe({
      next:(response)=>{

        this.router.navigate(['/test']);
        this.loginService.saveUser(response.token);
        this.loginService.saveToken(response.token);
        this.loading=false;

      },error: (err) => {
        //console.log(err);
        if(err.status){
          if(err.status>=400 || err.status<500){

            // Swal.fire({
            //   icon: 'info',
            //   title: 'Error',
            //   text: 'Credenciales incorrectas',
            //   confirmButtonText: 'OK',
            //   confirmButtonColor: '#004445',
            //   color: 'white',
            //   background:"#021C1E"
            // })

          }else if(err.status>=500){
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Error',
            //   text: 'Ocurrió un error en el servidor',
            // confirmButtonColor: '#004445',
            // color: 'white',
            // background:"#021C1E"
            // })
          }
        }

        else{
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error',
          //   text: 'Ocurrió un error',
          //   confirmButtonColor: '#004445',
          //   color: 'white',
          //   background:"#021C1E"
          // })
        }
        this.loading=false;
      },
  })

  }



}
