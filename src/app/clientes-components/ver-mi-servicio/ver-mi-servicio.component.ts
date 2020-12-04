import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { empresa } from 'src/app/interfaces/clients.interface';
import { Location } from "@angular/common";
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AuthService } from 'src/app/services/auth.service';
import { consts } from 'src/app/services/reports.settings';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-ver-mi-servicio',
  templateUrl: './ver-mi-servicio.component.html',
  styleUrls: ['./ver-mi-servicio.component.css']
}) 
export class VerMiServicioComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router, 
    private serviciosService:ServiciosService, 
    private userServices:UsuariosService, 
    private emgServices:EmgsService, 
    private sanitizer: DomSanitizer,
    private empresaService:EmpresasService, 
    private agreementServices: AgreementsService,
    private location: Location, 
    private alert:AlertService,
    private auth: AuthService,
    private fb:FormBuilder,
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
    this.initForm();
  }

  autorizarForm:FormGroup;
  initForm(){
    this.autorizarForm = this.fb.group({
      score : ["",Validators.required],
      firma : [""],
      autorized_by : [this.auth.getId()]
    });
  }

  servicio:servicios;
  status:String;
  tec:string;
  emg:string;
  proceso:boolean=false;
  stat0: boolean = false;
  btnen:boolean = true;
  msg:boolean = false;
  tecnicos: User[];
  clientes:User[];
  tec_id:string = "";
  nfec:String;
  requestby: String = "";
  empresa: String = "";
  contrato: String = "";

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
  
  //boolean
  autorizado: boolean =  false;
  authby: string = "null";

  guardando: boolean = false;
  signature : string;

  enlaces:string[]; 

  //Namespace
  nses:string = "";
  getNs(){
    this.nses = this.nss.getLSEquiposSing();
  }

  //Signature
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
    private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
      'minWidth': 1,
      'canvasWidth': 600,
      'canvasHeight': 300,
      'penColor' :  'rgb(0, 0, 0)'
    };
    ngAfterViewInit() {
      // this.signaturePad is now available
      this.signaturePad.set('minWidth', 2); // set szimek/signature_pad options at runtime
      this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }
    drawComplete() {
      // will be notified of szimek/signature_pad's onEnd event
      //console.log(this.signaturePad.toDataURL());
      this.signature = this.signaturePad.toDataURL();
    }
    drawStart() {
      // will be notified of szimek/signature_pad's onBegin event
      console.log('begin drawing');
    }
    clearSg(){
      this.signaturePad.clear();
    }
  //Signature

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
        this.nfec = this.servicio.date.slice(0,16).replace("T"," a las ");
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
      this.alert.alert("Este servicio esta realizado, pero no autorizado por el administrador. Tu puedes autorizarlo como cliente, o pedirle a un administrador que lo haga.");
      this.status = 'Realizado/No autorizado';
      this.proceso = true;
      break;
    case 4:
      this.status = 'Realizado/Autorizado';
      this.getAutorizedBy();
      this.proceso = true;
      this.autorizado = true;
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
    this.serviciosService.getPdf(data, 'servicio');
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
    this.location.back();
  }
  enBut(){
    this.btnen=false;
  }
  asigTec(){
    this.serviciosService.asigTec(this.servicio._id,this.tec_id, this.nfec).subscribe(
      res => {
        console.log(res);
        this.msg = true;
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
        }, 1000);
      },err => {
        console.error(err);
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
      },err => {
        console.error(err);
      }
    );
  }
  autorizar(){
    let req = this.autorizarForm.value;
    req.firma = this.signature;
    console.log(req);
    this.serviciosService.auth(this.servicio._id, req).subscribe(res =>{
      this.alert.success("Servicio autorizado, serás redigido en unos segundos");
      this.hideModal();
      setTimeout(() => {
        this.regresar();
      }, 2000);
    },err => {
      console.error(err);
    })
  }
  hideModal():void {
    document.getElementById('close-modal').click();
  }

  empty(){

  }
}