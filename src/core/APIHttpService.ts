import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GTicket, Producto } from "../models/Models";



@Injectable({
    providedIn: 'root'
})
export class APIHttpService {
    
    constructor(private http: HttpClient) { }

    getProductos(): Observable<any> {
        return this.http.get('http://localhost:8080/api/v1/producto/lista')
    }

    getClientes(): Observable<any> {
        return this.http.get('http://localhost:8080/api/cliente')
    }

    postTicket(gticket: GTicket){
        return this.http.post('http://localhost:8080/api/v1/documento-cambio/registrar-ticket-doc-cambio',gticket)
    }




}