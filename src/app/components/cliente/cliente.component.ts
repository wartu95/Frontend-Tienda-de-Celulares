import { Component } from '@angular/core';
import { APIHttpService } from '../../../core/APIHttpService';
import { FormBuilder } from '@angular/forms';
import { Cliente } from '../../../models/Models';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {




  httpService: APIHttpService;

  constructor(private http: APIHttpService, private formBuilder: FormBuilder) {
    this.httpService = http;
  }

 clientesAPI: Cliente[] = []

  clienteForm = this.formBuilder.group({
    customerId: 0,
    name: '',
    email: '',
    phone: '',
    address:''

  })

  

  
  ngOnInit(): void {
    
    this.submitCargarClientes()
    
  }

  submitCargarClientes(){
    this.http.getClientes().subscribe(
      data => {
        this.clientesAPI = data
      }
    )
  }
  


}
