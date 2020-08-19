import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Router } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NamespacesService } from 'src/app/services/namespaces.service';
@Component({
  selector: 'app-mis-lineas',
  templateUrl: './mis-lineas.component.html',
  styleUrls: ['./mis-lineas.component.css']
})
export class MisLineasComponent implements OnInit {
 
  constructor(
    private router:Router, 
    private plantas:PlantasService, 
    private auth:AuthService, 
    private alert: AlertService,
    private nss:NamespacesService
  ) { }

  ngOnInit() {
    this.getNs();
    this.loadPlants();
    this.alert.alert(`Primero seleccionar ${this.nsls} para que mueste las ${this.nspp} correspondientes a esa ${this.nsls}.`);
  }

  nslp:string = "";
  nsls:string = ""; 
  nspp:string = "";
  nsps:string = "";

  planta:Plant[];
  clns:User[];
  lines:Lines[];

  load:boolean=false;
  id_planta;
  busq:String="";

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  loadPlants(){
    this.id_planta='';
    this.plantas.getAllPlantas(this.auth.getEmpresaId()).subscribe(
    (data)=>{
      this.lines=[];
      this.planta=data.detail;
      if( this.planta.length == 0 ){
        this.sinPlantas = true;
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
  plantDet(id:string){
    this.router.navigateByUrl('mislineas/'+this.id_planta+"/"+id);
  }
  goNewLine(){
    this.router.navigateByUrl('mislineas/nueva/'+this.id_planta);
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

  getNs(){
    this.nsls = this.nss.getLSLineasSing();
    this.nslp = this.nss.getLSLineas();
    this.nspp = this.nss.getLSPlantas();
    this.nsps = this.nss.getLSPlantasSing();
  }
}