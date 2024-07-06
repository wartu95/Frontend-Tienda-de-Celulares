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
  mensajeError: string | null = null;
  mensaje: string =  ('')
  mostrarFormularioEspera: boolean = false;
  comentarioEspera: string = '';
  cambioRegistrado: boolean = false;


  constructor(private fb: FormBuilder, private apiHttpService: APIHttpService) {
  }


  // obtenerProducto() {
  //   const imei = this.imeiControl.value;
  //   this.apiHttpService.getBuscarProductoSimilar(imei).pipe(
  //     switchMap((producto: Producto | null) => {
  //       if(producto){
  //         return of(producto);
  //       }else{
  //         return this.apiHttpService.getBuscarProductoSimilar(imei).pipe(
  //         catchError(error => {
  //           console.log('Error al obtener productos similares', error);
  //           this.mensajeError = 'No se ';
  //           return of(null);
  //         })
  //         );
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error al obtener el producto: ' , error);
  //       this.mensajeError = 'Error al obtener el producto';
  //       return of(null);
  //     })
  //   ).subscribe((producto: Producto | null) => {
  //     this.producto = producto;
  //    console.log(producto)
  //     if(!producto){
  //       this.mensajeError = 'No se encontraron productos ni productos similares.';
  //     }
  //   }
  // );
  // }
  obtenerProducto() {
    const imei = this.imeiControl.value;
    
    this.apiHttpService.getBuscarProductoSimilar(imei)
      .pipe(
        switchMap((productos: Producto[]) => {
          if (productos.length > 0) {
            console.log('mismo producto')
            return of(productos);
          } else {
            console.log('producto similar')
            return this.apiHttpService.getBuscarProductoSimilar(imei);
          }
        }),
        catchError(error => {
          console.error('Error al obtener productos:', error);
          this.mensajeError = 'Error al obtener productos.';
          return of([]); 
        })
      )
      .subscribe(
        (productos: Producto[]) => {
          this.productosEncontrados$.next(productos);
          if (productos.length === 0) {
            this.mensajeError = 'No se encontraron productos.';
          } else {
            this.mensajeError = null;
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
            this.productosEncontrados$.next([]);
            this.imeiControl.reset();
            this.cambioRegistrado = true;
          },
          (error) => {
            console.error('Error al realizar el cambio:', error);
            this.mensajeError = "Error al realizar el cambio";
          }
        );
    }else { this.mensajeError = 'Por favor, selecciona un producto nuevo para el cambio'}
  }

  ponerEnEspera() {

      const imei = this.imeiControl.value;
      const comentario = this.comentarioEspera;

      this.apiHttpService.RegistrarProductoenEspera(imei, comentario)
        .subscribe(
          () => {
            this.mensaje = "Producto puesto en espera correctamente";
            console.log(this.mensaje)
            this.productosEncontrados$.next([]); 
            this.imeiControl.reset(); 
            this.mostrarFormularioEspera = false;
            this.comentarioEspera = '';
          },
          (error) => {
            console.error('Error al poner en espera:', error);
            this.mensajeError = "Error al poner en espera";
          }
        );
  }

  cancelarCambio() {
    this.imeiControl.reset();
    this.productosEncontrados$.next([]);
    this.mensajeError = null;
  }

  cancelarEspera() {
    this.mostrarFormularioEspera = false;
    this.comentarioEspera = '';
  }
}



