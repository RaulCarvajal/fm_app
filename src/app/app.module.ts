import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field'
import { SignaturePadModule } from 'angular2-signaturepad';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './basic-components/footer/footer.component';
import { NavbarComponent } from './basic-components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { UsuariosComponent } from './usuarios-components/usuarios/usuarios.component';
import { PlantasComponent } from './plantas-components/plantas/plantas.component';
import { LineasComponent } from './lineas-components/lineas/lineas.component';
import { EquiposComponent } from './equipos-components/equipos/equipos.component';
import { ServiciosComponent } from './servicios-component/servicios/servicios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosService } from './services/usuarios.service';
import { PlantasService } from './services/plantas.service';
import { EmgsService } from './services/emgs.service';
import { ServiciosService } from './services/servicios.service';
import { ConfigurationService } from './services/configuration.service';
import { AgreementsService } from './services/agreements.service';
import { EmpresasService } from './services/empresas.service';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatSnackBarModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
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
import { MiCuentaComponent } from './basic-components/mi-cuenta/mi-cuenta.component';
import { LineasbyidComponent } from './lineas-components/lineasbyid/lineasbyid.component';
import { MisPlantasComponent } from './clientes-components/mis-plantas/mis-plantas.component';
import { MisLineasComponent } from './clientes-components/mis-lineas/mis-lineas.component';
import { MisEquiposComponent } from './clientes-components/mis-equipos/mis-equipos.component';
import { MisServiciosComponent } from './clientes-components/mis-servicios/mis-servicios.component';
import { SolicitarServicioComponent } from './clientes-components/solicitar-servicio/solicitar-servicio.component';
import { MisServiciosTecComponent } from './tecnicos-components/mis-servicios-tec/mis-servicios-tec.component';
import { AddservicioTecComponent } from './tecnicos-components/addservicio-tec/addservicio-tec.component';
import { IniciarServicioComponent } from './tecnicos-components/iniciar-servicio/iniciar-servicio.component';
import { EditarPlantaComponent } from './plantas-components/editar-planta/editar-planta.component';

//Vistas clientes
import { VerMiPlantaComponent } from './clientes-components/ver-mi-planta/ver-mi-planta.component';
import { VerMiLineaComponent } from './clientes-components/ver-mi-linea/ver-mi-linea.component';
import { VerMiEquipoComponent } from './clientes-components/ver-mi-equipo/ver-mi-equipo.component';
import { NuevoMiEquipoComponent } from './clientes-components/nuevo-mi-equipo/nuevo-mi-equipo.component';
import { NuevoMiLineaComponent } from './clientes-components/nuevo-mi-linea/nuevo-mi-linea.component';
import { NuevoMiPlantaComponent } from './clientes-components/nuevo-mi-planta/nuevo-mi-planta.component';
import { MislineasbyidComponent } from './clientes-components/mislineasbyid/mislineasbyid.component';
import { VerMiServicioComponent } from './clientes-components/ver-mi-servicio/ver-mi-servicio.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ContratosComponent } from './contratos-components/contratos/contratos.component';
import { AddcontratosComponent } from './contratos-components/addcontratos/addcontratos.component';
import { ViewcontratoComponent } from './contratos-components/viewcontrato/viewcontrato.component';
import { AddEmpresaComponent } from './usuarios-components/add-empresa/add-empresa.component';
import { EditarcontratoComponent } from './contratos-components/editarcontrato/editarcontrato.component';
import { ScannerComponent } from './scanner/scanner.component';
import { AddservicioemgComponent } from './servicios-component/addservicioemg/addservicioemg.component';
import { ServiciosemgComponent } from './servicios-component/serviciosemg/serviciosemg.component';
import { EditaremgComponent } from './equipos-components/editaremg/editaremg.component';
import { AddservicioemgTecComponent } from './tecnicos-components/addservicioemg-tec/addservicioemg-tec.component';
import { SolicitarServicioemgComponent } from './clientes-components/solicitar-servicioemg/solicitar-servicioemg.component';
import { MisServiciosemgComponent } from './clientes-components/mis-serviciosemg/mis-serviciosemg.component';
import { UpdateUserComponent } from './usuarios-components/update-user/update-user.component';
import { AddmodeloComponent } from './equipos-components/addmodelo/addmodelo.component';
import { VermodeloComponent } from './equipos-components/vermodelo/vermodelo.component';
import { ChartsModule } from 'ng2-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// tslint:disable-next-line: no-unused-expression
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    InicioComponent,
    UsuariosComponent,
    PlantasComponent,
    LineasComponent,
    EquiposComponent,
    ServiciosComponent,
    ViewUserComponent,
    AddUserComponent,
    ViewPlantasComponent,
    AddPlantaComponent,
    NewlineComponent,
    ViewlineComponent,
    AddemgComponent,
    ViewemgComponent,
    AddservicioComponent,
    ViewservicioComponent,
    MiCuentaComponent,
    LineasbyidComponent,
    MisPlantasComponent,
    MisLineasComponent,
    MisEquiposComponent,
    MisServiciosComponent,
    SolicitarServicioComponent,
    MisServiciosTecComponent,
    IniciarServicioComponent,
    VerMiPlantaComponent,
    VerMiLineaComponent,
    VerMiEquipoComponent,
    NuevoMiEquipoComponent,
    NuevoMiLineaComponent,
    NuevoMiPlantaComponent,
    MislineasbyidComponent,
    VerMiServicioComponent,
    AddservicioTecComponent,
    ConfigurationComponent,
    ContratosComponent,
    AddcontratosComponent,
    ViewcontratoComponent,
    AddEmpresaComponent,
    EditarcontratoComponent,
    ScannerComponent,
    AddservicioemgComponent,
    ServiciosemgComponent,
    EditaremgComponent,
    AddservicioemgTecComponent,
    SolicitarServicioemgComponent,
    MisServiciosemgComponent,
    EditarPlantaComponent,
    UpdateUserComponent,
    AddmodeloComponent,
    VermodeloComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SignaturePadModule,
    ZXingScannerModule,
    MatFormFieldModule,
    MatSelectModule,
    ChartsModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [
    LoginService,
    AuthService,
    UsuariosService,
    PlantasService,
    EmgsService,
    ServiciosService,
    ConfigurationService,
    AgreementsService,
    EmpresasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
