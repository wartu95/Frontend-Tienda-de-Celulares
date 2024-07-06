import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { APIHttpService } from '../../../core/APIHttpService';
import { Producto } from '../../../models/Models';
import { BehaviorSubject, catchError, of, switchMap , map} from 'rxjs';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.component.html',
  styleUrl: './cambio.component.css'
})
export class CambioComponent {

  imeiControl: FormControl = this.fb.control('');
  productosEncontrados$: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  mensajeExito: boolean = false;
  mensajeError: boolean = false;
  mensaje: string =  ('')
  mostrarFormularioEspera: boolean = false;
  comentarioEspera: string = '';
  cambioRegistrado: boolean = false;
  mostrarFormulario: boolean = false;
  habilitarbotonespera: boolean = true;


  constructor(private fb: FormBuilder, private apiHttpService: APIHttpService) {
  }
  obtenerProducto() {
    const imei = this.imeiControl.value;
    
    this.apiHttpService.getBuscarProducto(imei)
      .pipe(
        switchMap((productos: Producto[]) => {
          if (productos.length > 0) {
            console.log('mismo producto')
            this.habilitarbotonespera = true;
            return of(productos);
            

          } else {
            console.log('producto similar')
            this.habilitarbotonespera = false;
            return this.apiHttpService.getBuscarProductoSimilar(imei);
          }
        }),
        catchError(error => {
          console.error('Error al obtener productos:', error);
          this.mensaje = 'Error al obtener productos.';
          return of([]); 
        })
      )
      .subscribe(
        (productos: Producto[]) => {
          this.productosEncontrados$.next(productos);
          if (productos.length === 0) {
            this.mensaje = 'No se encontraron productos.';
            this.mensajeExito = true;
          } else {
            this.mensajeError = true;
          }
        }
      );
    
  }

  hayProductoSeleccionado(): boolean {
    return this.productosEncontrados$.value.some(producto => producto.seleccionado);
  }

  realizarCambio() {
    const productoSeleccionado = this.productosEncontrados$.value.find(producto => producto.seleccionado);

    if (productoSeleccionado) {
      const imeiAntiguo = this.imeiControl.value;
      const imeiNuevo = productoSeleccionado.imei;
      console.log( imeiAntiguo, imeiNuevo)

      this.apiHttpService.RealizarCambio(imeiAntiguo, imeiNuevo)
        .subscribe(
          () => {
            
            this.mensaje = "Cambio realizado correctamente";
            this.mensajeExito = true;
            this.productosEncontrados$.next([]);
            this.imeiControl.reset();
            this.cambioRegistrado = true;

          },
          (error) => {
            console.error('Error al realizar el cambio:', error);
            this.mensaje = "Error al realizar el cambio";
            this.mensajeError = false;
          }
        );
    }else { this.mensaje = 'Por favor, selecciona un producto nuevo para el cambio'}
  }

  ponerEnEspera() {

      const imei = this.imeiControl.value;
      const comentario = this.comentarioEspera;

      this.apiHttpService.RegistrarProductoenEspera(imei, comentario)
        .subscribe(
          () => {
            this.mensaje = "Producto puesto en espera correctamente";
            this.mensajeExito = true;
            console.log(this.mensaje)
            this.productosEncontrados$.next([]); 
            this.imeiControl.reset(); 
            this.mostrarFormularioEspera = false;
            this.comentarioEspera = '';
          },
          (error) => {
            console.error('Error al poner en espera:', error);
            this.mensaje = "Error al poner en espera";
            this.mensajeError = true;
          }
        );
  }

  cancelarCambio() {
    this.imeiControl.reset();
    this.productosEncontrados$.next([]);
    this.mensajeError = null;
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  limpiarformularios(){
    this.imeiControl.reset();
    this.mostrarFormulario = false;
  }
  cancelarEspera() {
    this.mostrarFormularioEspera = false;
    this.comentarioEspera = '';
  }
  cancelarmensaje(){
    this.mensaje= "";
    this.mensajeError = false;
    this.mensajeExito = false;
  
  }
}



