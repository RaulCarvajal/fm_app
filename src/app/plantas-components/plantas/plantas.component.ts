import { Component, OnInit } from '@angular/core';
import { Plant } from "../../interfaces/plant.interface";
import { User } from "../../interfaces/user.interface";
import { PlantasService } from "../../services/plantas.service";
import { Router } from "@angular/router";
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent implements OnInit {

  constructor(
    private router:Router, 
    private plantas:PlantasService, 
    private empresas:EmpresasService,
    private nss:NamespacesService) { }

  ngOnInit() {
    this.getClients();
    this.loadAllPlants();
    this.getNsStrings();
  }

  planta:Plant[];
  clientes:empresa[];
  load:boolean=false;
  id_cliente;
  busq:string;

  nsplanta:string = "PRUEBA"
  nslinea:string = "PRUEBA"

  loadAllPlants(){
    this.plantas.getAll().subscribe(
      (data)=>{
        this.planta=data.detail;
        this.load=true; 
      },
      (err)=>{
        console.log(err)
      });
  }

  loadPlants(){
    if(this.id_cliente=="alls"){
      this.loadAllPlants();
    }else{
      this.plantas.getAllPlantas(this.id_cliente).subscribe(
        (data)=>{
          this.planta=data.detail;
          this.load=true;
        },
        (err)=>{
          console.log(err)
        });
    }
    
  }

  vacio():boolean{
    if(this.planta.length==0){
      return true;
    }else{
      return false;
    }
  }

  getClients():any{
    this.empresas.get().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }

  plantDet(id:string){
    this.router.navigateByUrl('equipos/plantas/'+id);
  }

  newPlant(){
    this.router.navigateByUrl('equipos/plantas/nueva/n');
  }

  busqueda(){
    if(this.busq==""){
      this.loadAllPlants();
    }else{
      var regex = new RegExp(this.busq.toLowerCase());
      let temp:Plant[]=this.planta;
      this.planta=temp.filter(pln=> pln.name.toLowerCase().match(regex))
    }
  }

  getNsStrings(){
    this.nsplanta = this.nss.getLSPlantas();
    this.nslinea = this.nss.getLSLineas();
  }
 
}
