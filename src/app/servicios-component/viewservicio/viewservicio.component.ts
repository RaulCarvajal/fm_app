import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { servicios } from 'src/app/interfaces/service.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { consts } from 'src/app/services/reports.settings';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-viewservicio',
  templateUrl: './viewservicio.component.html',
  styleUrls: ['./viewservicio.component.css']
})
export class ViewservicioComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router,           
    private serviciosService:ServiciosService, 
    private userServices:UsuariosService, 
    private emgServices:EmgsService, 
    private sanitizer: DomSanitizer,
    private empresaService:EmpresasService, 
    private agreementServices: AgreementsService,
    private alert:AlertService,
    private auth: AuthService,
    private nss:NamespacesService) 
    { 
      this.getNs(); 
      this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
      this.mala = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNlM2Y4ZmEiIGRhdGEtb3JpZ2luYWw9IiNFM0Y4RkEiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjZTNmOGZhIiBzdHlsZT0iZmlsbDojRkFFM0UzIj48L3BhdGg+PHBhdGggZD0ibTE2IDhjLTQuNDEzIDAtOCAzLjU4Ny04IDhzMy41ODcgOCA4IDggOC0zLjU4NyA4LTgtMy41ODctOC04LTh6bS00LjY2NyA2LjA0N2MwLS43NC42LTEuMzMzIDEuMzMzLTEuMzMzczEuMzMzLjU5MyAxLjMzMyAxLjMzM2MwIC43MzMtLjYgMS4zMzMtMS4zMzMgMS4zMzNzLTEuMzMzLS42LTEuMzMzLTEuMzMzem04LjQ3MiA2LjQ0OGMtLjEzLjEzLS4zMDEuMTk1LS40NzEuMTk1LS4xNzEgMC0uMzQxLS4wNjUtLjQ3MS0uMTk1LS43NjUtLjc2NS0xLjc4Mi0xLjE4NS0yLjg2My0xLjE4NXMtMi4wOTguNDIxLTIuODYyIDEuMTg2Yy0uMjYuMjYtLjY4Mi4yNi0uOTQzIDAtLjI2LS4yNi0uMjYtLjY4MiAwLS45NDMgMS4wMTYtMS4wMTYgMi4zNjgtMS41NzYgMy44MDUtMS41NzZzMi43ODguNTYgMy44MDUgMS41NzZjLjI2LjI2LjI2LjY4MiAwIC45NDJ6bS0uNDcyLTUuMTE1Yy0uNzMzIDAtMS4zMzMtLjYtMS4zMzMtMS4zMzMgMC0uNzQuNi0xLjMzMyAxLjMzMy0xLjMzM3MxLjMzMy41OTMgMS4zMzMgMS4zMzNjLjAwMS43MzMtLjU5OSAxLjMzMy0xLjMzMyAxLjMzM3oiIGZpbGw9IiM4Y2UxZWIiIGRhdGEtb3JpZ2luYWw9IiM4Q0UxRUIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0RFNEI0QiIgZGF0YS1vbGRfY29sb3I9IiM4Y2UxZWIiPjwvcGF0aD48L2c+IDwvc3ZnPg==');
      this.regular = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjZmZlNmUyIiBzdHlsZT0iZmlsbDojRTJGOUZGIj48L3BhdGg+PHBhdGggZD0ibTE2IDhjLTQuNDEzIDAtOCAzLjU4Ny04IDhzMy41ODcgOCA4IDggOC0zLjU4NyA4LTgtMy41ODctOC04LTh6bS01LjMzMyA2LjMzM2MwLTEuMjg2IDEuMDQ2LTIuMzMzIDIuMzMzLTIuMzMzczIuMzMzIDEuMDQ3IDIuMzMzIDIuMzMzLTEuMDQ2IDIuMzM0LTIuMzMzIDIuMzM0LTIuMzMzLTEuMDQ3LTIuMzMzLTIuMzM0em03LjUgNS44MzRoLTQuMzMzYy0uMzY4IDAtLjY2Ny0uMjk5LS42NjctLjY2N3MuMjk4LS42NjcuNjY3LS42NjdoNC4zMzNjLjM2OCAwIC42NjcuMjk5LjY2Ny42NjdzLS4yOTkuNjY3LS42NjcuNjY3em0uODMzLTMuNWMtMS4yODcgMC0yLjMzMy0xLjA0Ny0yLjMzMy0yLjMzM3MxLjA0Ni0yLjMzNCAyLjMzMy0yLjMzNCAyLjMzMyAxLjA0NyAyLjMzMyAyLjMzMy0xLjA0NiAyLjMzNC0yLjMzMyAyLjMzNHoiIGZpbGw9IiNmYzU3M2IiIGRhdGEtb3JpZ2luYWw9IiNGQzU3M0IiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmYzU3M2IiIHN0eWxlPSJmaWxsOiM0QjlEREUiPjwvcGF0aD48L2c+IDwvc3ZnPg==");
      this.buena = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmU2ZTIiIHN0eWxlPSJmaWxsOiNFRkZGRTIiPjwvcGF0aD48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmU2ZTIiIHN0eWxlPSJmaWxsOiNFRkZGRTIiPjwvcGF0aD48cGF0aCBkPSJtMTYgOGMtNC40MTEgMC04IDMuNTg5LTggOHMzLjU4OSA4IDggOCA4LTMuNTg5IDgtOC0zLjU4OS04LTgtOHptMy4zMzMgNC43MWMuNzM1IDAgMS4zMzMuNTk4IDEuMzMzIDEuMzMzcy0uNTk4IDEuMzMzLTEuMzMzIDEuMzMzLTEuMzMzLS41OTctMS4zMzMtMS4zMzJjMC0uNzM2LjU5OC0xLjMzNCAxLjMzMy0xLjMzNHptLTYuNjY2IDBjLjczNSAwIDEuMzMzLjU5OCAxLjMzMyAxLjMzM3MtLjU5OCAxLjMzMy0xLjMzMyAxLjMzMy0xLjMzMy0uNTk4LTEuMzMzLTEuMzMzYy0uMDAxLS43MzUuNTk3LTEuMzMzIDEuMzMzLTEuMzMzem04Ljk3NyA1LjI3MWMtLjc3MyAyLjQ5MS0zLjA0MSA0LjE2NS01LjY0NCA0LjE2NXMtNC44NzEtMS42NzQtNS42NDQtNC4xNjVjLS4wNDctLjE1Mi0uMDE5LS4zMTcuMDc1LS40NDVzLjI0NC0uMjAzLjQwMy0uMjAzaDEwLjMzM2MuMTU5IDAgLjMwOC4wNzYuNDAzLjIwMy4wOTMuMTI5LjEyMS4yOTQuMDc0LjQ0NXoiIGZpbGw9IiNmYzU3M2IiIGRhdGEtb3JpZ2luYWw9IiNGQzU3M0IiIGNsYXNzPSIiIHN0eWxlPSJmaWxsOiMwQTlEMzEiIGRhdGEtb2xkX2NvbG9yPSIjZmM1NzNiIj48L3BhdGg+PC9nPiA8L3N2Zz4=");
    }

  ngOnInit() {
    this.loadClients();
    this.getTecnicos();
  }

  servicio:servicios;
  status:String;
  tec:string;
  emg:string;
  proceso:boolean=false;
  stat0: boolean = false;
  btnen:boolean = true;
  tecnicos: User[];
  clientes:User[];
  tec_id:string = "";
  nfec:String;
  requestby: String = "";
  empresa: String = "";
  contrato: String = "";
  minDate: string = "0000-01-01T00:00";
  maxDate: string =  "3000-12-311T00:00"

  //email data
  tec_email:string;
  tec_name:string;
  cli_email:string;
  cli_name:string;

  //Calificaciones imgs
  mala : SafeUrl; 
  regular : SafeUrl;
  buena : SafeUrl;
  malac : boolean = false; 
  regularc : boolean = false;
  buenac : boolean = false;
  score : String  = "";
  scoretext : String  = "";
  
  load: boolean = true;

  //boolean
  autorizado: boolean =  false;
  authby: string = "null";

  enlaces:string[];
  //Namespace
  nses:string = "";
  getNs(){
    this.nses = this.nss.getLSEquiposSing();
  }
  loadClients(){
    this.userServices.getAllClients().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  getServicio(id:string){
    this.serviciosService.getById(id).subscribe(
      res=>{
        this.servicio=res.detail;
        this.conditonials(this.servicio.status);
        this.getTec();
        this.getEmg();
        this.getScore();
        this.getRequested();
        this.getEmpresa();
        this.getContrato();
        this.nfec  = this.servicio.date;
        //this.enlaces = this.servicio.enlaces.split(',');
        setTimeout(() => {
          this.load = false;
        }, 1000);
      },err=>{
        console.error(err);
      }
    );
  }
  /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */

  btnAuth:boolean = false;
  
  conditonials(n:number){
    switch (n) {
      case 0:
        this.status = 'Solicitado por cliente (Falta asignar tecnico)';
        this.proceso = false;
        this.stat0 = true;
        break;
      case 1:
        this.status = 'Progamado';
        this.proceso = false;
        break;
      case 2:
        this.status = 'En proceso';
        this.proceso = false;
        break; 
      case 3:
        this.alert.alert("Este servicio esta realizado, pero no autorizado por el cliente. Tu puedes autorizarlo como administrador de sistema, o esperar a que el cliente de la autolización.");
        this.status = 'Realizado/No autorizado';
        this.proceso = true;
        this.btnAuth = true;
        this.autorizado = true;
        break;
      case 4:
        this.status = 'Realizado/Autorizado';
        this.getAutorizedBy();
        this.proceso = true;
        break;
    }
  }
  getScore(){
    switch (this.servicio.score) {
      case 0:
        this.malac = true;
        this.score = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNlM2Y4ZmEiIGRhdGEtb3JpZ2luYWw9IiNFM0Y4RkEiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjZTNmOGZhIiBzdHlsZT0iZmlsbDojRkFFM0UzIj48L3BhdGg+PHBhdGggZD0ibTE2IDhjLTQuNDEzIDAtOCAzLjU4Ny04IDhzMy41ODcgOCA4IDggOC0zLjU4NyA4LTgtMy41ODctOC04LTh6bS00LjY2NyA2LjA0N2MwLS43NC42LTEuMzMzIDEuMzMzLTEuMzMzczEuMzMzLjU5MyAxLjMzMyAxLjMzM2MwIC43MzMtLjYgMS4zMzMtMS4zMzMgMS4zMzNzLTEuMzMzLS42LTEuMzMzLTEuMzMzem04LjQ3MiA2LjQ0OGMtLjEzLjEzLS4zMDEuMTk1LS40NzEuMTk1LS4xNzEgMC0uMzQxLS4wNjUtLjQ3MS0uMTk1LS43NjUtLjc2NS0xLjc4Mi0xLjE4NS0yLjg2My0xLjE4NXMtMi4wOTguNDIxLTIuODYyIDEuMTg2Yy0uMjYuMjYtLjY4Mi4yNi0uOTQzIDAtLjI2LS4yNi0uMjYtLjY4MiAwLS45NDMgMS4wMTYtMS4wMTYgMi4zNjgtMS41NzYgMy44MDUtMS41NzZzMi43ODguNTYgMy44MDUgMS41NzZjLjI2LjI2LjI2LjY4MiAwIC45NDJ6bS0uNDcyLTUuMTE1Yy0uNzMzIDAtMS4zMzMtLjYtMS4zMzMtMS4zMzMgMC0uNzQuNi0xLjMzMyAxLjMzMy0xLjMzM3MxLjMzMy41OTMgMS4zMzMgMS4zMzNjLjAwMS43MzMtLjU5OSAxLjMzMy0xLjMzMyAxLjMzM3oiIGZpbGw9IiM4Y2UxZWIiIGRhdGEtb3JpZ2luYWw9IiM4Q0UxRUIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0RFNEI0QiIgZGF0YS1vbGRfY29sb3I9IiM4Y2UxZWIiPjwvcGF0aD48L2c+IDwvc3ZnPg==';
        this.scoretext = "Experiencia Mala";
        break;
      case 1:
        this.regularc = true;
        this.score = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjZmZlNmUyIiBzdHlsZT0iZmlsbDojRTJGOUZGIj48L3BhdGg+PHBhdGggZD0ibTE2IDhjLTQuNDEzIDAtOCAzLjU4Ny04IDhzMy41ODcgOCA4IDggOC0zLjU4NyA4LTgtMy41ODctOC04LTh6bS01LjMzMyA2LjMzM2MwLTEuMjg2IDEuMDQ2LTIuMzMzIDIuMzMzLTIuMzMzczIuMzMzIDEuMDQ3IDIuMzMzIDIuMzMzLTEuMDQ2IDIuMzM0LTIuMzMzIDIuMzM0LTIuMzMzLTEuMDQ3LTIuMzMzLTIuMzM0em03LjUgNS44MzRoLTQuMzMzYy0uMzY4IDAtLjY2Ny0uMjk5LS42NjctLjY2N3MuMjk4LS42NjcuNjY3LS42NjdoNC4zMzNjLjM2OCAwIC42NjcuMjk5LjY2Ny42NjdzLS4yOTkuNjY3LS42NjcuNjY3em0uODMzLTMuNWMtMS4yODcgMC0yLjMzMy0xLjA0Ny0yLjMzMy0yLjMzM3MxLjA0Ni0yLjMzNCAyLjMzMy0yLjMzNCAyLjMzMyAxLjA0NyAyLjMzMyAyLjMzMy0xLjA0NiAyLjMzNC0yLjMzMyAyLjMzNHoiIGZpbGw9IiNmYzU3M2IiIGRhdGEtb3JpZ2luYWw9IiNGQzU3M0IiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmYzU3M2IiIHN0eWxlPSJmaWxsOiM0QjlEREUiPjwvcGF0aD48L2c+IDwvc3ZnPg==';
        this.scoretext = "Experiencia Buena";
        break;
      case 2:
        this.buenac = true
        this.score = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmU2ZTIiIHN0eWxlPSJmaWxsOiNFRkZGRTIiPjwvcGF0aD48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmU2ZTIiIHN0eWxlPSJmaWxsOiNFRkZGRTIiPjwvcGF0aD48cGF0aCBkPSJtMTYgOGMtNC40MTEgMC04IDMuNTg5LTggOHMzLjU4OSA4IDggOCA4LTMuNTg5IDgtOC0zLjU4OS04LTgtOHptMy4zMzMgNC43MWMuNzM1IDAgMS4zMzMuNTk4IDEuMzMzIDEuMzMzcy0uNTk4IDEuMzMzLTEuMzMzIDEuMzMzLTEuMzMzLS41OTctMS4zMzMtMS4zMzJjMC0uNzM2LjU5OC0xLjMzNCAxLjMzMy0xLjMzNHptLTYuNjY2IDBjLjczNSAwIDEuMzMzLjU5OCAxLjMzMyAxLjMzM3MtLjU5OCAxLjMzMy0xLjMzMyAxLjMzMy0xLjMzMy0uNTk4LTEuMzMzLTEuMzMzYy0uMDAxLS43MzUuNTk3LTEuMzMzIDEuMzMzLTEuMzMzem04Ljk3NyA1LjI3MWMtLjc3MyAyLjQ5MS0zLjA0MSA0LjE2NS01LjY0NCA0LjE2NXMtNC44NzEtMS42NzQtNS42NDQtNC4xNjVjLS4wNDctLjE1Mi0uMDE5LS4zMTcuMDc1LS40NDVzLjI0NC0uMjAzLjQwMy0uMjAzaDEwLjMzM2MuMTU5IDAgLjMwOC4wNzYuNDAzLjIwMy4wOTMuMTI5LjEyMS4yOTQuMDc0LjQ0NXoiIGZpbGw9IiNmYzU3M2IiIGRhdGEtb3JpZ2luYWw9IiNGQzU3M0IiIGNsYXNzPSIiIHN0eWxlPSJmaWxsOiMwQTlEMzEiIGRhdGEtb2xkX2NvbG9yPSIjZmM1NzNiIj48L3BhdGg+PC9nPiA8L3N2Zz4=';
        this.scoretext = "Experiencia Excelente";
        break;
      default:
        break;
    }
  }
  getTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  getTec(){
    this.userServices.getUser(<any>this.servicio.tecnico).subscribe(
      res=>{
        let temp:User=res.detail;
        this.tec=temp.info.name;
      },err=>{
        console.error(err);
      }
    );
  }
  getEmg(){
    this.emgServices.getById(<any>this.servicio.emg).subscribe(
      res=>{
        let temp:emgs=res.detail;
        this.emg=temp.info.name;
      },err=>{
        console.error(err);
      }
    );
  }
  getId(id:string):string{
    return id.substring(id.length-5,id.length);
  }
  getDate(date:any):String{
    var registro = moment(date.replace('T',' ').slice(0,16)).locale('es');
    let temp = registro.format('dddd, MMMM Do YYYY, h:mm a');
    return temp.charAt(0).toUpperCase()+temp.slice(1).replace('º','');
  }
  getPdf(){
    this.alert.alert('En unos segundos se descargará su PDF.');
    let data: any = {
      template: { "shortid" : consts.reporte_id  }, 
      data : {id : this.servicio._id.substring(this.servicio._id.length-5,this.servicio._id.length),
              emg : this.emg,
              tec : this.tec,
              type : this.servicio.type,
              desc : this.servicio.desc,
              status : this.status,
              date : this.getDate(this.servicio.date),
              start : this.getDate(this.servicio.start),
              finish : this.getDate(this.servicio.finish),
              observ : this.servicio.observ,
              signature : this.servicio.signature,
              score : this.score,
              scoretext : this.scoretext,
              trabajo_realizado : this.servicio.observ.trabajo_realizado,
              comentarios : this.servicio.observ.comentarios,
              recomendaciones : this.servicio.observ.recomendaciones,
              requestby : this.requestby,
              empresa : this.empresa,
              contrato : this.contrato,
              tipo_sensor : this.servicio.service_details.tipo_sensor,
              tipo_controlador : this.servicio.service_details.tipo_controlador,
              tipo_programa : this.servicio.service_details.programa
          },
    options : { 'timeout': 60000 }
    };
    this.serviciosService.getPdf(data,"servicio");
  }
  getRemito(){
    this.alert.alert('En unos segundos se descargará su PDF.');
    let data: any = {
      template: { "shortid" : consts.remito_id  }, 
      data : {
            proveedor : "",
            contrato : this.contrato,
            remision : this.servicio._id.substring(this.servicio._id.length-10,this.servicio._id.length),
            descripcion_corta : this.servicio.desc,
            hora : this.servicio.hours,
            total : this.servicio.payment.total,
            divisa : this.servicio.payment.divisa,
            fecha : this.getDate(this.servicio.finish),
            descripcion_larga : this.servicio.observ.trabajo_realizado,
            conceptos : this.servicio.conceptos
          },
    options : { 'timeout': 60000 }
    };
    this.serviciosService.getPdf(data,"remito");
  }
  regresar(){ 
    this.router.navigateByUrl('/servicios');
  }
  enBut(){
    this.btnen=false;
  }
  asigTec(){
    this.serviciosService.asigTec(this.servicio._id,this.tec_id, this.nfec).subscribe(
      res => {
        this.alert.success('Técnico asignado correctamente, se le notificará en seguida');
        this.stat0 = false;
        this.getEmailData(this.servicio.client,this.tec_id);
        this.serviciosService.emailProgramar({
                                                "email_tecnico" : this.tec_email,
                                                "email_cliente" : this.cli_email,
                                                "nameTec" : this.tec_name,
                                                "nameCli" : this.cli_name,
                                                "date" : this.getDate(this.nfec),
                                                "id" : this.servicio._id.substring(this.servicio._id.length-10,this.servicio._id.length)
                                              }).subscribe(res=>{
                                              },err=>{
                                              });
        setTimeout(() => {
          this.regresar()
        }, 3000);
      },err => {
        this.alert.error('Ocurrio un error durante la asignación');
        setTimeout(() => {
          this.regresar();
        }, 3000);
      }
    );
  }
  getEmailData(idc,idt){
    this.clientes.forEach(async e=>{
      if(idc==e._id){
        this.cli_email=e.info.email;
        this.cli_name=e.info.name;
      }
    });
    this.tecnicos.forEach(async e=>{
      if(idt==e._id){
        this.tec_email=e.info.email;
        this.tec_name=e.info.name;
      }
    });
  }
  getRequested(){
    this.userServices.getUser(<string>this.servicio.requested_by).subscribe(
      req => {
        let e:User = req.detail;
        this.requestby = e.info.name;
      },err => {
        console.error(err);
      }
    );
  }
  getAutorizedBy(){
    this.userServices.getUser(<string>this.servicio.autorized_by).subscribe(
      req => {
        let e:User = req.detail;
        this.authby = e.info.name;
      },err => {
        console.error(err);
      }
    );
  }
  getEmpresa(){
    this.empresaService.getid(this.servicio.client).subscribe(
      req => {
        let e:empresa = req.detail;
        this.empresa = e.name;
      },err => {
        console.error(err);
      }
    );
  }
  getContrato(){
    this.agreementServices.getContratoById(<string>this.servicio.agreement).subscribe(
      req => {
        let e:Contrato = req.detail;
        this.contrato = e.name;
        if(!e.period.single){
          this.minDate = e.period.start.substring(0,16);
          this.maxDate = e.period.end.substring(0,16);
        }else{
          this.minDate = "0000-01-01T00:00";
          this.maxDate =  "3000-12-311T00:00";
        }
      },err => {
        console.error(err);
      }
    );
  }

  gotoActualizar(){
    this.router.navigateByUrl(`servicios/editar/${this.servicio._id}`);
    //console.log(`servicios/editar/${this.servicio._id}`);
  }

  autorizar(){
    this.alert.confirm(
      "Al autorizar el servicio este se calificará como experiencia \"Buena\" y una firma personalizada del sistema, aparte se guardará tu usuario como la persona que autorizo el servicio. <br>¿Desea autorizar el servicio?.", 
      ()=>{
        let req = {
          score : 2,
          firma : 'data:image/png;base64,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',
          autorized_by :  this.auth.getId()
        };
        console.log(req);
        this.serviciosService.auth(this.servicio._id, req).subscribe(res =>{
          this.alert.success("Servicio autorizado, serás redigido en unos segundos");
          setTimeout(() => {
            this.regresar();
          }, 2000);
        },err => {
          console.error(err);
        })
      },
      ()=>{ this.alert.message("Ningun cambio registrado")}
    );
  }
} 
