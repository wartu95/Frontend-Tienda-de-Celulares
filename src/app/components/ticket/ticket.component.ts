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
mensajeExito: boolean = false;
mensajeError: boolean = false;
mensaje: string = '';

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
          this.mensaje = 'Su ticket ha sido ingresado correctamente, el equipo esta dentro de la garantia.';
          this.mensajeExito = true;
        }else if(ticketResponse == 1){
          this.mensaje = 'Su ticket no ha sido registrado, el equipo no se encuentra dentro del plazo de garantia.';
          this.mensajeError = true;
        }else if(ticketResponse == 3){
          this.mensaje = 'Su ticket no ha sido registrado, Ya existe un ticket con el imei ingresado';
          this.mensajeError = true;
        }else {
          console.log(ticketResponse)
          this.mensaje = 'Su ticket no ha sido registrado, el imei no corresponde a esta tienda.';
          this.mensajeError = true;
        }

      },
      (error) => {
        console.error("Error al crear ticket:", error);
        this.ticketForm.reset();
        this.mensaje = '';
        this.mensajeError = true;
        
      }
    );
  } else { 
  }
}

Recargar(){
  this.mensaje = '';
  this.mensajeError = false;
  this.ticketForm.reset();
}

ocultarmensaje() {
  this.mensaje = '';
  this.mensajeError = false;
  this.mensajeExito = false;
}
}
