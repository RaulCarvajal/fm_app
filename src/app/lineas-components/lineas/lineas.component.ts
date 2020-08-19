import { Component, OnInit } from '@angular/core';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Router } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { AlertService } from 'src/app/services/alert.service';
import { NamespacesService } from 'src/app/services/namespaces.service';


@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  constructor(
    private router:Router, 
    private plantas:PlantasService, 
    private empresas:EmpresasService,
    private alert: AlertService,
    private nss:NamespacesService
    ) { 
      this.nslinea = this.nss.getLSLineas();
      this.nsplanta = this.nss.getLSPlantas();
      this.alert.alert(`Primero debe seleccionar un cliente para conocer sus ${this.nsplanta} y ${this.nslinea}.`);
    }

  ngOnInit() {
    this.getClients();
  }

  nslinea:string = "";
  nsplanta:string = "";

  planta:Plant[];
  clientes:empresa[];
  lines:Lines[];

  load:boolean=false;
  id_cliente;
  id_planta;
  clientSel=true;
  busq:String="";

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  loadPlants(){
    this.id_planta='';
    this.plantas.getAllPlantas(this.id_cliente).subscribe(
    (data)=>{
      this.lines=[];
      this.planta=data.detail;
      this.clientSel = false;
      if( this.planta.length == 0 ){
        this.sinPlantas = true;
        this.clientSel = true;
      }else{
        this.sinPlantas = false;
      }
    },
    (err)=>{
      console.log(err)
    });
  }
  vacio():boolean{
    if(this.lines.length==0){
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
    this.router.navigateByUrl('equipos/lineas/'+this.id_planta+"/"+id);
  }
  goNewLine(){
    this.router.navigateByUrl('equipos/lineas/nueva/'+this.id_planta);
  }
  loadLineas(){
    this.planta.forEach(el=>{
      if(el._id==this.id_planta){
        this.lines=el.lines;
        //console.log(el);
      }
      this.load=true;
    });
  }

  busqueda(){
    if(this.busq==""){
      this.loadLineas();
    }else{
      var regex = new RegExp(this.busq.toLowerCase());
      let temp:Lines[]=this.lines;
      this.lines=temp.filter(lns => lns.name.toLowerCase().match(regex))
    }
  }
}
