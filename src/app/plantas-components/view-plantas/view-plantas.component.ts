import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { PlantasService } from "./../../services/plantas.service";
import { UsuariosService } from "./../../services/usuarios.service";
import { Plant } from "./../../interfaces/plant.interface";
import { User } from 'src/app/interfaces/user.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-view-plantas',
  templateUrl: './view-plantas.component.html',
  styleUrls: ['./view-plantas.component.css']
})
export class ViewPlantasComponent implements OnInit {

  constructor(
              private activatedRoute:ActivatedRoute, 
              private router:Router, 
              private plantas:PlantasService, 
              private usuarios:UsuariosService,
              private empresas:EmpresasService,
              private location: Location,
              private alert: AlertService,
              private nsService:NamespacesService) { 
    this.id=this.activatedRoute.snapshot.paramMap.get("id")
  }
  id:string;
  ngOnInit() {
    this.getPlanta();
  }

  reg_by:User; 
  reg_bystr:string="";
  reg_date:string="";
  planta:Plant;
  empresa: String = "";

  actualizado:boolean=false;
  load: boolean = true;

  nslinea:string = "PRUEBA"

  getPlanta(){
    this.plantas.getPlanta(this.id).subscribe(
      res=>{
        this.nslinea = this.nsService.getLSLineas();
        this.planta=res.detail;
        this.getName(this.planta.meta.registred_by);
        this.getDate(this.planta.meta.registred_date);
        this.getEmpresa();
        this.load = false;

      },err=>{
        console.error(err);
      }
    );
  }
  getEmpresa(){
    this.empresas.getid(this.planta.client).subscribe(
      res => {
        this.empresa =  res.detail.name;
      },err => {
      }
    );
  }
  regresar(){
    this.location.back();
  }
  getName(id:any){
    this.usuarios.getUser(id).subscribe(
      res=>{
        this.reg_by=res.detail;
        this.reg_bystr = this.reg_by.info.name;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  getDate(ut:string){
    var registro = moment(ut.replace('T',' ').slice(0,16)).locale('es');
    this.reg_date = registro.format('dddd, MMMM Do YYYY');
    this.reg_date =  this.reg_date.charAt(0).toUpperCase()+this.reg_date.slice(1).replace('º','');
  }
  plantDet(id:string){
    this.router.navigateByUrl('equipos/lineas/'+this.planta._id+"/"+id);
  }
  gotoActualizar(){
    this.router.navigateByUrl('equipos/plantas/editar/'+this.id);
  }
}
