import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiCuentaComponent } from './basic-components/mi-cuenta/mi-cuenta.component';
import { UsuariosComponent } from './usuarios-components/usuarios/usuarios.component';
import { PlantasComponent } from './plantas-components/plantas/plantas.component';
import { LineasComponent } from './lineas-components/lineas/lineas.component';
import { LineasbyidComponent } from './lineas-components/lineasbyid/lineasbyid.component';
import { EquiposComponent } from './equipos-components/equipos/equipos.component';
import { ServiciosComponent } from './servicios-component/servicios/servicios.component';
import { ViewUserComponent } from './usuarios-components/view-user/view-user.component';
import { AddUserComponent } from './usuarios-components/add-user/add-user.component';
import { ViewPlantasComponent } from './plantas-components/view-plantas/view-plantas.component';
import { AddPlantaComponent } from './plantas-components/add-planta/add-planta.component';
import { NewlineComponent } from './lineas-components/newline/newline.component';
import { ViewlineComponent } from './lineas-components/viewline/viewline.component';
import { AddemgComponent } from './equipos-components/addemg/addemg.component';
import { ViewemgComponent } from './equipos-components/viewemg/viewemg.component';
import { AddservicioComponent } from './servicios-component/addservicio/addservicio.component';
import { ViewservicioComponent } from './servicios-component/viewservicio/viewservicio.component';
import { MisPlantasComponent } from './clientes-components/mis-plantas/mis-plantas.component';
import { MisLineasComponent } from './clientes-components/mis-lineas/mis-lineas.component';
import { MisEquiposComponent } from './clientes-components/mis-equipos/mis-equipos.component';
import { MisServiciosComponent } from './clientes-components/mis-servicios/mis-servicios.component';
import { SolicitarServicioComponent } from './clientes-components/solicitar-servicio/solicitar-servicio.component';
import { MisServiciosTecComponent } from './tecnicos-components/mis-servicios-tec/mis-servicios-tec.component';
import { AddservicioTecComponent } from './tecnicos-components/addservicio-tec/addservicio-tec.component';
import { IniciarServicioComponent } from './tecnicos-components/iniciar-servicio/iniciar-servicio.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ContratosComponent } from './contratos-components/contratos/contratos.component';
import { AddcontratosComponent } from './contratos-components/addcontratos/addcontratos.component';
import { ViewcontratoComponent } from './contratos-components/viewcontrato/viewcontrato.component';
import { EditarcontratoComponent } from './contratos-components/editarcontrato/editarcontrato.component';
import { AddEmpresaComponent } from './usuarios-components/add-empresa/add-empresa.component';
import { AddservicioemgComponent } from './servicios-component/addservicioemg/addservicioemg.component';
import { ServiciosemgComponent } from './servicios-component/serviciosemg/serviciosemg.component';
import { EditaremgComponent } from './equipos-components/editaremg/editaremg.component';
import { AddservicioemgTecComponent } from './tecnicos-components/addservicioemg-tec/addservicioemg-tec.component';
import { UpdateUserComponent } from './usuarios-components/update-user/update-user.component';

//Vistas clientes
import { VerMiPlantaComponent } from './clientes-components/ver-mi-planta/ver-mi-planta.component';
import { VerMiLineaComponent } from './clientes-components/ver-mi-linea/ver-mi-linea.component';
import { VerMiEquipoComponent } from './clientes-components/ver-mi-equipo/ver-mi-equipo.component';
import { NuevoMiEquipoComponent } from './clientes-components/nuevo-mi-equipo/nuevo-mi-equipo.component';
import { NuevoMiLineaComponent } from './clientes-components/nuevo-mi-linea/nuevo-mi-linea.component';
import { NuevoMiPlantaComponent } from './clientes-components/nuevo-mi-planta/nuevo-mi-planta.component';
import { MislineasbyidComponent } from './clientes-components/mislineasbyid/mislineasbyid.component';
import { VerMiServicioComponent } from './clientes-components/ver-mi-servicio/ver-mi-servicio.component';
import { SolicitarServicioemgComponent } from './clientes-components/solicitar-servicioemg/solicitar-servicioemg.component';
import { MisServiciosemgComponent } from './clientes-components/mis-serviciosemg/mis-serviciosemg.component';
import { EditarPlantaComponent } from './plantas-components/editar-planta/editar-planta.component';

import { AddmodeloComponent } from './equipos-components/addmodelo/addmodelo.component';
import { VermodeloComponent } from './equipos-components/vermodelo/vermodelo.component';

import { ScannerComponent } from './scanner/scanner.component';

import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'inicio', component : InicioComponent},
  {path : 'scanner', component : ScannerComponent},
  {path : 'usuarios', component : UsuariosComponent},
  {path : 'usuarios/nuevaempresa', component : AddEmpresaComponent},
  {path : 'usuarios/nuevo', component : AddUserComponent},
  {path : 'usuarios/editar/:id', component : UpdateUserComponent},
  {path : 'usuarios/:id', component : ViewUserComponent},
  {path : 'equipos/plantas', component : PlantasComponent},
  {path : 'equipos/plantas/:id', component : ViewPlantasComponent},
  {path : 'equipos/plantas/nueva/:id', component : AddPlantaComponent},
  {path : 'equipos/plantas/editar/:id', component : EditarPlantaComponent},
  {path : 'equipos/lineas', component : LineasComponent},
  {path : 'equipos/lineas/:id', component : LineasbyidComponent},
  {path : 'equipos/lineas/nueva/:id', component : NewlineComponent},
  {path : 'equipos/lineas/:id_p/:id_l', component : ViewlineComponent},
  {path : 'equipos/equipos', component : EquiposComponent},
  {path : 'equipos/equipos/nuevo', component : AddemgComponent},
  {path : 'equipos/equipos/:id', component : ViewemgComponent},
  {path : 'equipos/modelos/add', component : AddmodeloComponent},
  {path : 'equipos/modelos/:id', component : VermodeloComponent},
  {path : 'equipos/equipos/editar/:id/:c', component : EditaremgComponent},
  {path : 'servicios', component : ServiciosComponent},
  {path : 'servicios/emg/:id', component : ServiciosemgComponent},
  {path : 'servicios/nuevo', component : AddservicioComponent},
  {path : 'servicios/nuevo/:id', component : AddservicioemgComponent},
  {path : 'servicios/:id', component : ViewservicioComponent},
  {path : 'configuracion', component : ConfigurationComponent},
  {path : 'contratos', component : ContratosComponent},
  {path : 'contratos/nuevo', component : AddcontratosComponent},
  {path : 'contratos/:id', component : ViewcontratoComponent},
  {path : 'contratos/editar/:id', component : EditarcontratoComponent},
  
  //Cliente
  {path : 'misplantas', component : MisPlantasComponent},
  {path : 'misplantas/nueva', component : NuevoMiPlantaComponent},
  {path : 'misplantas/:id', component : VerMiPlantaComponent},
  {path : 'mislineas', component : MisLineasComponent},
  {path : 'mislineas/:id', component : MislineasbyidComponent},
  {path : 'mislineas/nueva/:id', component : NuevoMiLineaComponent},
  {path : 'mislineas/:id_p/:id_l', component : VerMiLineaComponent},
  {path : 'misequipos', component : MisEquiposComponent},
  {path : 'misequipos/nuevo', component : NuevoMiEquipoComponent},
  {path : 'misequipos/:id', component : VerMiEquipoComponent},
  {path : 'misequipos/editar/:id/:c', component : EditaremgComponent},
  {path : 'misservicios', component : MisServiciosComponent},
  {path : 'misservicios/emg/:id', component : MisServiciosemgComponent},
  {path : 'misservicios/solicitar', component : SolicitarServicioComponent},
  {path : 'misservicios/solicitar/:id', component : SolicitarServicioemgComponent},
  {path : 'misservicios/:id', component : VerMiServicioComponent},
  //Tecnicos
  {path : 'misservicios-tec', component : MisServiciosTecComponent},
  {path : 'misservicios-tec/nuevo', component : AddservicioTecComponent},
  {path : 'misservicios-tec/nuevo/:id', component : AddservicioemgTecComponent},
  {path : 'misservicios-tec/:id', component : IniciarServicioComponent},
  {path : 'micuenta', component : MiCuentaComponent},

  //Registro de admin
  {path : 'registro', component : RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }