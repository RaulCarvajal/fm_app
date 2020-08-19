import { Component, OnInit } from '@angular/core';
import { Plant } from "../../interfaces/plant.interface";
import { User } from "../../interfaces/user.interface";
import { PlantasService } from "../../services/plantas.service";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-mis-plantas',
  templateUrl: './mis-plantas.component.html',
  styleUrls: ['./mis-plantas.component.css']
})
export class MisPlantasComponent implements OnInit {

  constructor(
    private router:Router, 
    private plantas:PlantasService, 
    private usuarios:UsuariosService, 
    private auth: AuthService,
    private nsS:NamespacesService) { }

  ngOnInit() {
    this.getNs()
    this.getClients();
    this.loadAllPlants();
  }

  planta:Plant[];
  clns:User[];
  clientes:User[];
  load:boolean=false;
  busq:string;

  pnp:string = "";
  pns:string = "";
  lnp:string = "";


  loadAllPlants(){
    this.plantas.getAllPlantas(this.auth.getEmpresaId()).subscribe(
      (data)=>{
        this.planta=data.detail;
        this.load=true;
      },
      (err)=>{
        console.log(err)
      });
  }

  vacio():boolean{
    if(this.planta.length==0){
      return true;
    }else{
      return false;
    }
  }

  getClients():any{
    this.usuarios.getAllClients().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }

  plantDet(id:string){
    this.router.navigateByUrl('misplantas/'+id);
  }

  newPlant(){
    this.router.navigateByUrl('misplantas/nueva');
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

  getNs(){
    this.pnp = this.nsS.getLSPlantas();
    this.pns = this.nsS.getLSPlantasSing();
    this.lnp = this.nsS.getLSLineas();
  }

}
