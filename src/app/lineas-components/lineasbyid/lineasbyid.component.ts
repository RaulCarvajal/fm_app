import { Component, OnInit } from '@angular/core';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Router, ActivatedRoute } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-lineasbyid',
  templateUrl: './lineasbyid.component.html',
  styleUrls: ['./lineasbyid.component.css']
})
export class LineasbyidComponent implements OnInit {
  constructor(
      private router:Router, 
      private plantas:PlantasService,
      private empresas:EmpresasService, 
      private activatedRoute:ActivatedRoute,
      private nss:NamespacesService
    ) { 
      this.nslinea = this.nss.getLSLineas();
      this.nsplanta = this.nss.getLSPlantas();
    this.id_p=this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getPlants();
    this.getClients();
  }

  nslinea: string = "";
  nsplanta: string = "";

  planta:Plant[];
  clientes:empresa[];
  lines:Lines[]; 

  nPlantas:Plant[];

  load:boolean=false;
  id_cliente;
  id_planta;
  clientSel=true;
  busq:String="";
  id_p: String="";

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  ridc: string = "";
  ridp: string = "";

  loadPlants(){
    this.id_planta='';
    this.plantas.getAllPlantas(this.id_cliente).subscribe(
    (data)=>{
      //this.lines=[];
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
  loadRet(na:any[]){
    let elemente = na.find( e => e._id == this.id_p);

    this.lines = elemente.lines;
    this.id_cliente = elemente.client;
    this.loadPlants();
    this.id_planta = this.id_p;

    this.lines = elemente.lines;
    this.load=true;
  }
  getPlants(){
    this.plantas.getAll().subscribe(
    (data)=>{;
      this.loadRet(data.detail);
    },
    (err)=>{
      console.log(err)
    });
  }
}