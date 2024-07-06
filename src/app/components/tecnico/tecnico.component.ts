import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Solicitud } from '../../../models/Models';
import { APIHttpService } from '../../../core/APIHttpService';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.css',
})
export class TecnicoComponent {
  imeiControl: FormControl;
  mensaje: string = '';
  mostrarFormulario: boolean = false;
  solicitud: Solicitud | null = null;
  mostrarFormularioRechazo: boolean = false;
  comentarioRechazo: string = '';
  botonesHabilitados: boolean = false;
  mensajeExito: boolean = false;
  mensajeError: boolean = false;

  constructor(private fb: FormBuilder, private apiHttpService: APIHttpService) {
    this.imeiControl = this.fb.control('');
  }

  evaluarEquipo() {
    const imei = this.imeiControl.value;

    this.apiHttpService.evaluarEquipo(imei).subscribe(
      (respuesta: any) => {
        if (respuesta === 0) {
          this.mensaje = 'El equipo ingreso correctamente a evaluacion';
          this.obtenerSolicitudCambio(imei);
          this.botonesHabilitados = true;
          this.mensajeExito = true;
          this.ocultarFormulario();
        } else if (respuesta === 1) {
          this.mensaje = 'El imei ingresado ya fue evaluado';
          this.obtenerSolicitudCambio(imei);
          this.mensajeExito = true;
          this.ocultarFormulario();
          this.botonesHabilitados = false;
        } else {
          this.mensaje = 'Error al evaluar el equipo';
          this.mensajeError = true;
        }
        this.imeiControl.reset();
      },
      (error) => {
        console.error('Error al evaluar el equipo:', error);
        this.mensaje = 'Error al evaluar el equipo';
      }
    );
  }
  obtenerSolicitudCambio(imei: string) {
    this.apiHttpService.getSolicitudPorImei(imei).subscribe(
      (solicitud: Solicitud) => {
        this.solicitud = solicitud;
      },
      (error) => {
        console.error('Error al obtener la solicitud de cambio:', error);
      }
    );
  }
  ocultarFormulario() {
    this.imeiControl.reset();
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  aprobarSolicitud() {
    if (this.solicitud) {
      this.apiHttpService
        .aprobarSolicitud(this.solicitud.imeiInRevision)
        .subscribe(
          () => {
            this.mensaje = 'El equipo cumple con los requisitos para el cambio';
            this.mensajeExito = true;
            this.obtenerSolicitudCambio(this.solicitud.imeiInRevision)
            this.botonesHabilitados = false;
            // this.solicitud = null;
          },
          (error) => {
            console.error('Error al aprobar la solicitud:', error);
            this.mensaje = 'Error al aprobar la solicitud', error;
            this.mensajeError = true;
          }
        );
    }
  }
  rechazarSolicitud() {
    if (this.solicitud) {
      this.solicitud.comment = this.comentarioRechazo;
      this.apiHttpService
        .rechazarSolicitud(
          this.solicitud.imeiInRevision,
          this.solicitud.comment
        )
        .subscribe(
          () => {
            this.mensaje = 'El Equipo fue rechazado';
            this.mostrarFormularioRechazo = false;
            this.mostrarFormulario = true;
            this.obtenerSolicitudCambio(this.solicitud.imeiInRevision);
          },
          (error) => {
            console.error('Error al rechazar la solicitud:', error);
            this.mensaje = 'Error al rechazar la solicitud';
          }
        );
    }
  }
  cancelarRechazo() {
    this.mostrarFormularioRechazo = false;
    this.comentarioRechazo = '';
  }
  nuevaevaluacion() {
    this.cancelarRechazo();
    this.ocultarFormulario();
    this.ocultarmensaje();
    this.solicitud = null;
  }
  ocultarmensaje() {
    this.mensaje = '';
    this.mensajeError = false;
  }
}
