import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { CambioComponent } from './components/cambio/cambio.component';


export const routes: Routes = [
{ path: '',   redirectTo: '/login', pathMatch: 'full' },
{path:'login',component:LoginComponent},
{path:'test',component:TestComponent,canActivate:[authGuard,roleGuard],data:{role:['ROLE_SALE','ROLE_TECH']}},
{path:'producto',component:ProductoComponent,canActivate:[authGuard,roleGuard],data:{role:['ROLE_SALE']}},
{path:'cliente',component:ClienteComponent,canActivate:[authGuard,roleGuard],data:{role:['ROLE_SALE','ROLE_SALE']}},
{path:'ticket',component:TicketComponent,canActivate:[authGuard,roleGuard],data:{role:['ROLE_SALE']}},
{path:'tecnico',component:TecnicoComponent,canActivate:[authGuard,roleGuard],data:{role:['ROLE_TECH']}},
{path:'cambio',component:CambioComponent,canActivate:[authGuard,roleGuard],data:{role:['ROLE_SALE']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
