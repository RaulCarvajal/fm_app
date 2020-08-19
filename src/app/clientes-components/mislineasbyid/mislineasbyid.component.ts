import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Router, ActivatedRoute } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-mislineasbyid',
  templateUrl: './mislineasbyid.component.html',
  styleUrls: ['./mislineasbyid.component.css']
})
export class MislineasbyidComponent implements OnInit {

  constructor(
    private router:Router, 
    private plantas:PlantasService, 
    private auth:AuthService, 
    private activatedRoute:ActivatedRoute,
    private nss:NamespacesService
    ) 
  { 
    this.getNs();
    this.id_p=this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.loadPlants();  
    this.getPlants();
  }

  nslp:string = "";
  nsls:string = ""; 
  nspp:string = "";
  nsps:string = "";

  planta:Plant[];
  clns:User[];
  lines:Lines[];

  nPlantas:Plant[];

  load:boolean=false;
  id_cliente;
  id_planta;
  busq:String="";
  id_p: String="";

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  loadPlants(){
    this.id_planta='';
    this.plantas.getAllPlantas(this.auth.getEmpresaId()).subscribe(
    (data)=>{
      //this.lines=[];
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
  plantDet(id:string){
    this.router.navigateByUrl('mislineas/'+this.id_p+"/"+id);
  }
  goNewLine(){
    this.router.navigateByUrl('mislineas/nueva/'+this.id_p);
  }
  loadLineas(){
    this.planta.forEach(el=>{
      if(el._id==this.id_p){
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

  getNs(){
    this.nsls = this.nss.getLSLineasSing();
    this.nslp = this.nss.getLSLineas();
    this.nspp = this.nss.getLSPlantas();
    this.nsps = this.nss.getLSPlantasSing();
  }
}