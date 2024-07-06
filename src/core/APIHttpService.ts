import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  GTicket, Producto, Solicitud } from "../models/Models";



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

    evaluarEquipo(imei: string){
        return this.http.put('http://localhost:8080/api/v1/documento-cambio/actualizar-revision',{imei})
    }

    getSolicitudPorImei(imei: string): Observable<Solicitud>{
        const params = new HttpParams().set('imei',imei);
        return this.http.get<Solicitud>(`http://localhost:8080/api/v1/documento-cambio/doc-cambio-tikcet-imei`, {params});
    }

    aprobarSolicitud(imei: string){
        return this.http.put('http://localhost:8080/api/v1/documento-cambio/actualizar-aprobado', {imei});
    }

    rechazarSolicitud(imei: string, comment:string){
        return this.http.put('http://localhost:8080/api/v1/documento-cambio/actualizar-rechazado',{imei, comment})
    }

    getBuscarProducto(imei: string):Observable<Producto[]>{
        const params = new HttpParams().set('imei',imei);
        return this.http.get<Producto[]>('http://localhost:8080/api/v1/producto/buscar-reemplazo', {params});
    }

    getBuscarProductoSimilar(imei: string):Observable<Producto[]>{
        const params = new HttpParams().set('imei',imei);
        return this.http.get<Producto[]>('http://localhost:8080/api/v1/producto/buscar-reemplazo-similar', {params});
    }

    RealizarCambio(oldImei: string , newImei: string){
        return this.http.put('http://localhost:8080/api/v1/documento-cambio/registra-cambio-equipo', {oldImei, newImei});
    }

    RegistrarProductoenEspera(imei:string, comment: string){
        return this.http.put('http://localhost:8080/api/v1/documento-cambio/actualizar-espera', {imei, comment});
    }
}

