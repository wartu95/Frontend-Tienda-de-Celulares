import { Component, viewChild } from '@angular/core';
import { APIHttpService } from '../../../core/APIHttpService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GTicket, Ticket } from '../../../models/Models';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
httpService: APIHttpService;

constructor( private http:APIHttpService, private formBuilder: FormBuilder, private route: Router){
  this.httpService = http;
}


gticketAPI: GTicket[] = []

ticketForm = this.formBuilder.group({
  imei: ['', Validators.required], 
  comment: ['', Validators.required],

});

submitGenerarTicket() {
  if (this.ticketForm.valid) {
    const gticket: GTicket = {
      imei: this.ticketForm.value.imei, 
      comment: this.ticketForm.value.comment,

    };

    this.httpService.postTicket(gticket).subscribe(
      (ticketResponse: any) => { 

        console.log("Ticket creado:", ticketResponse);
        this.ticketForm.reset();
        if(ticketResponse === 2){
        alert('Su ticket ha sido ingresado correctamente, esta dentro de garantia');
        }else if(ticketResponse == 1){
          alert('Imei fuera de garantia.')
        }else {
          alert('Imei no existe')
        }

      },
      (error) => {
        console.error("Error al crear ticket:", error);
        this.ticketForm.reset();
        alert('Ingresaste un equipo ya consultado');
      }
    );
  } else {
    
    console.error("Formulario inválido");  
  }
}

Recargar(){
  this.ticketForm.reset();
}
}
