import { Component } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { APIHttpService } from '../../../core/APIHttpService';
import { FormBuilder } from '@angular/forms';
import { Producto } from '../../../models/Models';
import { state } from '@angular/animations';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {


  httpService: APIHttpService;

  constructor(private http: APIHttpService, private formBuilder: FormBuilder) {
    this.httpService = http;
  }

  productosAPI: Producto[] = []

  productoForm = this.formBuilder.group({
    imei: "",
    brand: "",
    model: "",
    price: 0,
    state_product_id: 0
  })




  
  ngOnInit(): void {
    
    this.submitCargarProductos()
    
  }

  submitCargarProductos(){
    this.http.getProductos().subscribe(
      data => {
        this.productosAPI = data
      }
    )
  }
  


}
