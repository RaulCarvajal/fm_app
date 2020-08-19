import { Component, ViewChild, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { servicios } from 'src/app/interfaces/service.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AgreementsService } from 'src/app/services/agreements.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import * as moment from 'moment'; 
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Location } from "@angular/common";
import { AlertService } from 'src/app/services/alert.service';
import { consts } from 'src/app/services/reports.settings';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-iniciar-servicio',
  templateUrl: './iniciar-servicio.component.html',
  styleUrls: ['./iniciar-servicio.component.css']
})
export class IniciarServicioComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router, 
    private serviciosService:ServiciosService, 
    private userServices:UsuariosService, 
    private emgServices:EmgsService, 
    private sanitizer: DomSanitizer,
    private empresaService:EmpresasService, 
    private agreementServices: AgreementsService,
    private fb:FormBuilder, 
    private location:Location,
    private alert: AlertService,
    private nss:NamespacesService) 
    { 
      this.getNs();
      this.initForm();
      this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
      this.mala = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNlM2Y4ZmEiIGRhdGEtb3JpZ2luYWw9IiNFM0Y4RkEiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjZTNmOGZhIiBzdHlsZT0iZmlsbDojRkFFM0UzIj48L3BhdGg+PHBhdGggZD0ibTE2IDhjLTQuNDEzIDAtOCAzLjU4Ny04IDhzMy41ODcgOCA4IDggOC0zLjU4NyA4LTgtMy41ODctOC04LTh6bS00LjY2NyA2LjA0N2MwLS43NC42LTEuMzMzIDEuMzMzLTEuMzMzczEuMzMzLjU5MyAxLjMzMyAxLjMzM2MwIC43MzMtLjYgMS4zMzMtMS4zMzMgMS4zMzNzLTEuMzMzLS42LTEuMzMzLTEuMzMzem04LjQ3MiA2LjQ0OGMtLjEzLjEzLS4zMDEuMTk1LS40NzEuMTk1LS4xNzEgMC0uMzQxLS4wNjUtLjQ3MS0uMTk1LS43NjUtLjc2NS0xLjc4Mi0xLjE4NS0yLjg2My0xLjE4NXMtMi4wOTguNDIxLTIuODYyIDEuMTg2Yy0uMjYuMjYtLjY4Mi4yNi0uOTQzIDAtLjI2LS4yNi0uMjYtLjY4MiAwLS45NDMgMS4wMTYtMS4wMTYgMi4zNjgtMS41NzYgMy44MDUtMS41NzZzMi43ODguNTYgMy44MDUgMS41NzZjLjI2LjI2LjI2LjY4MiAwIC45NDJ6bS0uNDcyLTUuMTE1Yy0uNzMzIDAtMS4zMzMtLjYtMS4zMzMtMS4zMzMgMC0uNzQuNi0xLjMzMyAxLjMzMy0xLjMzM3MxLjMzMy41OTMgMS4zMzMgMS4zMzNjLjAwMS43MzMtLjU5OSAxLjMzMy0xLjMzMyAxLjMzM3oiIGZpbGw9IiM4Y2UxZWIiIGRhdGEtb3JpZ2luYWw9IiM4Q0UxRUIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0RFNEI0QiIgZGF0YS1vbGRfY29sb3I9IiM4Y2UxZWIiPjwvcGF0aD48L2c+IDwvc3ZnPg==');
      this.regular = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSIiIGRhdGEtb2xkX2NvbG9yPSIjZmZlNmUyIiBzdHlsZT0iZmlsbDojRTJGOUZGIj48L3BhdGg+PHBhdGggZD0ibTE2IDhjLTQuNDEzIDAtOCAzLjU4Ny04IDhzMy41ODcgOCA4IDggOC0zLjU4NyA4LTgtMy41ODctOC04LTh6bS01LjMzMyA2LjMzM2MwLTEuMjg2IDEuMDQ2LTIuMzMzIDIuMzMzLTIuMzMzczIuMzMzIDEuMDQ3IDIuMzMzIDIuMzMzLTEuMDQ2IDIuMzM0LTIuMzMzIDIuMzM0LTIuMzMzLTEuMDQ3LTIuMzMzLTIuMzM0em03LjUgNS44MzRoLTQuMzMzYy0uMzY4IDAtLjY2Ny0uMjk5LS42NjctLjY2N3MuMjk4LS42NjcuNjY3LS42NjdoNC4zMzNjLjM2OCAwIC42NjcuMjk5LjY2Ny42NjdzLS4yOTkuNjY3LS42NjcuNjY3em0uODMzLTMuNWMtMS4yODcgMC0yLjMzMy0xLjA0Ny0yLjMzMy0yLjMzM3MxLjA0Ni0yLjMzNCAyLjMzMy0yLjMzNCAyLjMzMyAxLjA0NyAyLjMzMyAyLjMzMy0xLjA0NiAyLjMzNC0yLjMzMyAyLjMzNHoiIGZpbGw9IiNmYzU3M2IiIGRhdGEtb3JpZ2luYWw9IiNGQzU3M0IiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmYzU3M2IiIHN0eWxlPSJmaWxsOiM0QjlEREUiPjwvcGF0aD48L2c+IDwvc3ZnPg==");
      this.buena = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iNTEyIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmU2ZTIiIHN0eWxlPSJmaWxsOiNFRkZGRTIiPjwvcGF0aD48cGF0aCBkPSJtMjYgMzJoLTIwYy0zLjMxNCAwLTYtMi42ODYtNi02di0yMGMwLTMuMzE0IDIuNjg2LTYgNi02aDIwYzMuMzE0IDAgNiAyLjY4NiA2IDZ2MjBjMCAzLjMxNC0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmU2ZTIiIGRhdGEtb3JpZ2luYWw9IiNGRkU2RTIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiNmZmU2ZTIiIHN0eWxlPSJmaWxsOiNFRkZGRTIiPjwvcGF0aD48cGF0aCBkPSJtMTYgOGMtNC40MTEgMC04IDMuNTg5LTggOHMzLjU4OSA4IDggOCA4LTMuNTg5IDgtOC0zLjU4OS04LTgtOHptMy4zMzMgNC43MWMuNzM1IDAgMS4zMzMuNTk4IDEuMzMzIDEuMzMzcy0uNTk4IDEuMzMzLTEuMzMzIDEuMzMzLTEuMzMzLS41OTctMS4zMzMtMS4zMzJjMC0uNzM2LjU5OC0xLjMzNCAxLjMzMy0xLjMzNHptLTYuNjY2IDBjLjczNSAwIDEuMzMzLjU5OCAxLjMzMyAxLjMzM3MtLjU5OCAxLjMzMy0xLjMzMyAxLjMzMy0xLjMzMy0uNTk4LTEuMzMzLTEuMzMzYy0uMDAxLS43MzUuNTk3LTEuMzMzIDEuMzMzLTEuMzMzem04Ljk3NyA1LjI3MWMtLjc3MyAyLjQ5MS0zLjA0MSA0LjE2NS01LjY0NCA0LjE2NXMtNC44NzEtMS42NzQtNS42NDQtNC4xNjVjLS4wNDctLjE1Mi0uMDE5LS4zMTcuMDc1LS40NDVzLjI0NC0uMjAzLjQwMy0uMjAzaDEwLjMzM2MuMTU5IDAgLjMwOC4wNzYuNDAzLjIwMy4wOTMuMTI5LjEyMS4yOTQuMDc0LjQ0NXoiIGZpbGw9IiNmYzU3M2IiIGRhdGEtb3JpZ2luYWw9IiNGQzU3M0IiIGNsYXNzPSIiIHN0eWxlPSJmaWxsOiMwQTlEMzEiIGRhdGEtb2xkX2NvbG9yPSIjZmM1NzNiIj48L3BhdGg+PC9nPiA8L3N2Zz4=");
    }

    finalizarForm:FormGroup;
    servicio:servicios;
    status:String;
    tec:string;
    emg:string;
    signature : string;
    proceso:boolean=false;
    stat0: boolean = false;
    stat1: boolean = false;
    stat2: boolean = false;
    stat3: boolean = false;
    tecnicos: User[];
    clientes:User[];
    tec_id:string = "";
    requestby: String = "";
    empresa: String = "";
    nombre_contrato: String = "";
    contrato:Contrato ;
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
    modalText: String = "¿Seguro de Iniciar servicio?";
    guardando: boolean = false;
    date: string = moment().format().substring(0,16);
    minDate:String = "0000-01-01T00:00";
    maxDate:String = "3000-12-311T00:00";
    hours: number = 0;
    index: number = 0;
    totalPrecio: number = 0;
    totalHoras: number = 0;
    maxHoras: boolean = false;
    cargando: boolean = false;
    autorizado: boolean =  false;
    authby: string = "null";

    enlaces:string[]; 
    nses:string = "";
    getNs(){
      this.nses = this.nss.getLSEquiposSing();
    }
    ngOnInit() {
      this.loadClients();
      this.getTecnicos();
      this.getServiceHours();
    }
    initForm(){
      this.finalizarForm = this.fb.group(
        {
          tipo_sensor : ['',[Validators.required]],
          tipo_controlador : ['',[Validators.required]],
          programa : ['',[Validators.required]],
          trabajo_realizado : ['',[Validators.required]],
          comentarios : ['',[Validators.required]],
          recomendaciones : ['',[Validators.required]],
          enlaces : ['',[]],
          date : [moment().format().substring(0,16),[Validators.required]],
          date_ini : ['',[Validators.required]],
          conceptos : this.fb.array([]),
          total : [0,[]]
        }
      );
      setTimeout(() => {
        this.cargando = true;
      }, 1500);
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
          this.enlaces = this.servicio.enlaces.split(',');
          this.finalizarForm.patchValue({ date_ini : this.servicio.start.slice(0,16)});
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
    conditonials(n:number){
      switch (n) {
        case 0:
          this.status = 'Solicitado por cliente (Falta asignar tecnico)';
          this.stat0 = true;
          this.proceso = false;
          break;
        case 1:
          this.status = 'Progamado';
          this.stat1 = true;
          this.proceso = false;          
          break;
        case 2:
          this.status = 'En proceso';
          this.proceso = false;
          this.stat2 = true;
          break;
        case 3:
          this.alert.alert("Este servicio esta realizado, pero no autorizado por el cliente. Espera a que un administrador o el cliente autorize el servicio.");
          this.status = 'Realizado/No autorizado';
          this.proceso = true;
          this.stat3 = true;
          break;
        case 4:
          this.status = 'Realizado/Autorizado';
          this.getAutorizedBy();
          this.proceso = true;
          this.autorizado = true;
          this.stat3 = true;
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
    getId(id:String):String{
      return id.substring(id.length-10,id.length);
    }
    getDate(date:any):String{
      var registro = moment(date.replace('T',' ').slice(0,16)).locale('es');
      let temp = registro.format('dddd, MMMM Do YYYY');
      return temp.charAt(0).toUpperCase()+temp.slice(1).replace('º','');
    }
    getPdf(){
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
    regresar(){
      this.location.back();
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
    inciarServicio(){
      this.serviciosService.start(this.servicio._id,this.date).subscribe(
        res => {
          this.alert.success('Servicio iniciado');
          this.status = 'En proceso';
          this.proceso = false;
          this.stat2 = true;
          this.stat1 = false;
          this.getServicio(<string>this.servicio._id);
        }, err => {
          console.error(err);
        }
      )
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
          this.contrato = req.detail;
          this.nombre_contrato = this.contrato.name;
          if(!this.contrato.period.single){
            this.minDate = this.contrato.period.start.substring(0,16);
            this.maxDate = this.contrato.period.end.substring(0,16);
          }else{
            this.minDate = "0000-01-01T00:00";
            this.maxDate =  "3000-12-311T00:00"
          }
          this.contrato.conceptos.forEach( e => {
            this.addConcepto();
          });
        },err => {
          console.error(err);
        }
      );
    }
    getServiceHours(){
      var dt = moment(this.finalizarForm.value.date_ini.replace('T',' ').slice(0,16));
      var di = moment(this.finalizarForm.value.date.replace('T',' ').slice(0,16));
      let temp = 1;
      if(di.diff(dt,'hours')>0){
        temp = di.diff(dt,'hours');
      }
      this.hours = temp;
      //this.minDate = this.finalizarForm.value.date_ini.slice(0,16);
      //this.maxDate = this.finalizarForm.value.date.slice(0,16);
    }
    finalizarServicio(){
      this.guardando = true;
      let data = this.finalizarForm.value;

      data.hours = this.hours;
      data.total = this.totalPrecio;
      data.divisa = this.contrato.divisa;

      console.log(data);
      this.serviciosService.finish( this.servicio._id, data ).subscribe(
        res => {
          if(this.contrato.period.single){
            this.agreementServices.vencer(this.contrato._id).subscribe(res => console.log(res), err => console.error(err));
          }
          this.agreementServices.restar(this.contrato._id,(this.contrato.monto_actual - data.total)).subscribe(res => console.log(res), err => console.error(err));
          this.guardando = false;
          this.stat2 = false;
          this.alert.success('Servicio correctamente finalizado recargando...');
          this.hideModal();
          this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
        }, err => {
          this.alert.error('Ocurrio un error durante el registro')
        }
      );
    }
    hideModal():void {
      document.getElementById('close-modal').click();
    }
    getSubtotal(pind){
      return this.contrato.conceptos[pind].precio*this.finalizarForm.value.conceptos[pind].horas;
    }  
    getTotal(pind){
      this.totalHoras = 0;
      this.totalPrecio = 0;

      this.getConceptos.controls[pind].patchValue( { subtotal : this.contrato.conceptos[pind].precio*this.finalizarForm.value.conceptos[pind].horas} );
      
      this.getConceptos.value.forEach( e => {
        this.totalPrecio+=e.subtotal
        this.totalHoras+=e.horas
      });

      this.finalizarForm.patchValue({total : this.totalPrecio});
      
      if(this.totalHoras != this.hours){
        this.maxHoras = false;
        this.alert.alert('La suma de horas de los conceptos no es igual a las horas de duración del servicio, por favor distribuye bien las horas entre los conceptos.');
      }else{
        this.maxHoras = true;
      }
    }
    addConcepto(){
      const cntrs = <FormArray>this.finalizarForm.controls['conceptos'];
      cntrs.push(
        this.fb.group(
          {
            codigo : [this.contrato.conceptos[this.index].codigo,[]],
            descripcion : [this.contrato.conceptos[this.index].descripcion,[]],
            horas : [0,[Validators.required]],
            precio : [this.contrato.conceptos[this.index].precio,[]],
            subtotal : [0,[]]
          }
        )
      );
      this.index++; 
    }
    get getConceptos(){
      return this.finalizarForm.get('conceptos') as FormArray;
    }
    
  }
  