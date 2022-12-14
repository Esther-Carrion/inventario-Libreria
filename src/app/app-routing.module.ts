import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LibroComponent } from './components/libro/libro.component';
import { LibroformComponent } from './components/libroform/libroform.component';
import { ListReservaComponent } from './components/list-reserva/list-reserva.component';
import { ModalNotaVComponent } from './components/modal-nota-v/modal-nota-v.component';
import { NotaVentaComponent } from './components/nota-venta/nota-venta.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UsuarioFormsComponent } from './components/usuario-forms/usuario-forms.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ReporteDiarioComponent } from './components/reporte-diario/reporte-diario.component';
import { ReportePersonalizadoComponent } from './components/reporte-personalizado/reporte-personalizado.component';

const routes: Routes = [
  {path:'login',component:UserLoginComponent},
  {path:'lista',component:LibroComponent},//,canActivate:[AuthGuard]
  {path:'formulario',component:LibroformComponent},
  {path:'registroUsuarios',component:UsuarioFormsComponent},
  {path:'usuarios',component:UsuariosComponent},//,canActivate:[AuthGuard]
  {path:'registroUsuarios/:id',component:UsuarioFormsComponent},
  {path:'formulario/:id',component:LibroformComponent},
  {path:'notas_de_venta',component:NotaVentaComponent},//,canActivate:[AuthGuard]
  {path:'nueva_nota_de_venta',component:ModalNotaVComponent},
  {path:'reservas',component:ListReservaComponent},
  {path:'nueva_reserva',component:ReservasComponent},
  {path:'reservas/:id',component:ListReservaComponent},
  {path:'reporte_diario',component:ReporteDiarioComponent},
  {path:'reporte',component:ReportePersonalizadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
