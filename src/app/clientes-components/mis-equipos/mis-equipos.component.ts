import { Component, OnInit } from '@angular/core';
import { EmgsService } from 'src/app/services/emgs.service';
import { emgs } from 'src/app/interfaces/emg.interface';
import { Router } from '@angular/router';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-mis-equipos',
  templateUrl: './mis-equipos.component.html',
  styleUrls: ['./mis-equipos.component.css']
})
export class MisEquiposComponent implements OnInit {

  constructor(
    private emgService: EmgsService, 
    private router: Router,
    private auth: AuthService, 
    private plantService: PlantasService,
    private nss:NamespacesService)
    {
      this.getNs()
      this.getAllEmgs();
      this.loadPlant();
    }

  ngOnInit() {
  }

  nsps: string = "";
  nsls: string = "";
  nsep: string = "";

  emgs:emgs[];
  client_id:string;
  plant_id:string;
  line_id:string;
  plants:Plant[]; 
  lines:Lines[];
  busqByName:string="";
  busqBySerial:string="";

  have_lines:boolean=false;

  getAllEmgs(){
    this.emgService.getByClient(this.auth.getEmpresaId()).subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.log(err);
    });
  }
  loadPlant(){
    this.plantService.getAllPlantas(this.auth.getEmpresaId()).subscribe(
      res=>{
        this.plants=res.detail;
      },err=>{
        console.log(err);
      })
  }
  loadLines(){
    this.line_id="";
    this.plants.forEach(el=>{
      if(el._id==this.plant_id){
        this.lines=el.lines;
      }
    });
    if(this.lines.length==0){
      this.have_lines=false;
    }else{
      this.have_lines=true;
    }
  }
  loadEmgsByClient(){
    this.line_id="";
    this.plant_id="";
    this.emgs=[];
    if(this.client_id==""|| this.client_id=="alls"){
      this.getAllEmgs();
    }else{
      this.emgService.getByClient(this.client_id).subscribe(
        res=>{
          this.emgs=res.detail;
        },err=>{
          console.log(err);
        }); 
    }
  }
  loadEmgsByPlant(){
    this.loadLines();
    if(this.plant_id==""|| this.plant_id=="alls"){
      this.getAllEmgs();
    }else{
    this.emgService.getByPlant(this.plant_id).subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.log(err);
      }); 
    }
  }
  loadEmgsByPlantAndLines(){
    this.client_id="";
    this.emgs=[];
    this.emgService.getByPlantAndLine(this.plant_id,this.line_id).subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.log(err);
      });
  }
  detEmg(id:string){
    this.router.navigateByUrl('misequipos/'+id);
  }
  goNewEmg(){
    this.router.navigateByUrl('misequipos/nuevo');
  }
  busquedaByName(){
    this.client_id="";
    this.plant_id="";
    this.line_id="";
    if(this.busqByName==""){
      this.getAllEmgs();
    }else{
      var regex = new RegExp(this.busqByName.toLowerCase());
      let temp:emgs[]=this.emgs;
      this.emgs=temp.filter(emg => emg.info.name.toLowerCase().match(regex))
    }
  }
  busquedaBySerial(){
    this.client_id="";
    this.plant_id="";
    this.line_id="";
    if(this.busqBySerial==""){
      this.getAllEmgs();
    }else{
      var regex = new RegExp(this.busqBySerial.toLowerCase());
      let temp:emgs[]=this.emgs;
      this.emgs=temp.filter(emg => emg.info.serial.toLowerCase().match(regex))
    }
  }
  getStatus(s:Number){
    if(s==1){
      return "Desactivado";
    }else{
      return "Activo"
    }
  }

  getNs(){
    this.nsls = this.nss.getLSLineasSing();
    this.nsps = this.nss.getLSPlantasSing();
    this.nsep = this.nss.getLSEquipos()
  }

}