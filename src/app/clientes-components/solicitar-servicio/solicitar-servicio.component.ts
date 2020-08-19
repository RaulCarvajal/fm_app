import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AgreementsService } from 'src/app/services/agreements.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { Location } from "@angular/common";
import { AlertService } from 'src/app/services/alert.service';

@Component({ 
  selector: 'app-solicitar-servicio',
  templateUrl: './solicitar-servicio.component.html',
  styleUrls: ['./solicitar-servicio.component.css']
})
export class SolicitarServicioComponent implements OnInit {

  constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private serviciosService:ServiciosService,
              private alert:AlertService, private auth: AuthService, private configServices:ConfigurationService,
              private agreementsServices:AgreementsService, private location:Location) 
  {
    this.serviciosForm = fb.group(
      {
        emg : ['',[Validators.required]],
        type : ['',[Validators.required]],
        date : ['',[Validators.required]],
        desc : ['',[Validators.required]],
        agreement : ['',[Validators.required]]
      }
    );
  }

  tecnicos:User[];
  emgs:emgs[];
  emg_c_id: String;
  serviciosForm:FormGroup;
  fecAnt: boolean;
  tipos: any;

  contratos: Contrato[];
  minDate:String = "0000-01-01T00:00";
  maxDate:String = "3000-12-311T00:00";

  //For email
  admin:User;

  ngOnInit() {
    this.loadTecnicos();
    this.loadEmgs();
    this.getAdmin();
    this.getTipos();
    this.loadContratosId();
  }

  getTipos(){
    this.configServices.getTipos().subscribe(
      res => {
        this.tipos = res.detail;
      },err => {
        console.log(err);
      }
    );
  }

  getDate(date:any):string{
    return date.slice(0,16).replace('T',' a las ');
  }

  loadTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  loadEmgs(){
    this.emgServices.getByClient(this.auth.getEmpresaId()).subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  getAdmin(){
    this.userServices.getAdmin().subscribe(
      res=>{
        this.admin=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  getClientId(){
    let temp = this.serviciosForm.value.emg;
    this.emgs.forEach(emg => {
      if(emg._id==temp){
        this.emg_c_id=emg.client;
      }
    });
  }
   /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  save(){
    this.getClientId();
    let temp = this.serviciosForm.value;
    temp.status = 0;
    temp.client =  this.emg_c_id;
    temp.requested_by = this.auth.getId();
    console.log(temp);
    this.serviciosService.save(temp).subscribe(
      res=>{
        this.alert.success('Servicio solicitado correctamente, se le notificó al administrador para que haga seguimiento a tu solicitúd.');
        this.serviciosService.emailSolicitar({
                                              "email" : this.admin.info.email,
                                              "name" : this.admin.info.name,
                                              "client" : this.auth.getName(),
                                              "date" : this.getDate(temp.date),
                                              "id" : res.detail._id.substring(res.detail._id.length-10,res.detail._id.length)
                                              }).subscribe(
                                                res=>{
                                                  console.log(res);
                                                },err=>{
                                                  console.error(err);
                                                }
                                              )
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },err=>{
        this.alert.success('Ocurrio un error ');
        setTimeout(() => {
          this.regresar();
        }, 1500);
      }
    );
  }
  regresar(){
    this.location.back();
  }
  loadContratosId(){
    this.agreementsServices.getContratosActivosByClient(this.auth.getEmpresaId()).subscribe(
    res => {
      this.contratos = res.detail;
      this.alert.alert('No existe ningun contrato dentro del registro, por favor primero solicitar al administrador que resgiste un contrato para poder solicitar un servicio.');
    },err => {
      console.error(err);
    });
  }
  selectContrato(){
    let temp:Contrato = this.contratos.find( el => el._id == this.serviciosForm.value.agreement);
    if(!temp.period.single){
      this.minDate = temp.period.start.substring(0,16);
      this.maxDate = temp.period.end.substring(0,16);
    }else{
      this.minDate = "0000-01-01T00:00";
      this.maxDate =  "3000-12-311T00:00"
    }
  }
}