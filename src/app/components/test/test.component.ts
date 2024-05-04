import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private http: HttpClient) { } // Inyecta HttpClient

  testRole() {
    this.http.get('http://localhost:8080/test').subscribe({
      next: (response) => {
        console.log(response); // Maneja la respuesta del servidor
      },
      error: (error) => {
        console.error('Error fetching data: ', error); // Maneja errores
      }
    });
  }

}



