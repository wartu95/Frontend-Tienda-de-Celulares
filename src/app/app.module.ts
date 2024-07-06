import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { TestComponent } from './components/test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './components/producto/producto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { CambioComponent } from './components/cambio/cambio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    ProductoComponent,
    ClienteComponent,
    TicketComponent,
    TecnicoComponent,
    CambioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
