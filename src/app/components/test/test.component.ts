import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private http: HttpClient,private ruta:Router ) { } // Inyecta HttpClient

  testRole() {


    this.ruta.navigate(['/producto'])

   /* this.http.get('http://localhost:8080/test').subscribe({
      next: (response) => {
        console.log(response); // Maneja la respuesta del servidor
      },
      error: (error) => {
        console.error('Error fetching data: ', error); // Maneja errores
      }
    });

*/

  }

}



