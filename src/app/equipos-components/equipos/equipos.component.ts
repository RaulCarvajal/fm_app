import { Component, OnInit } from '@angular/core';
import { EmgsService } from 'src/app/services/emgs.service';
import { emgs } from 'src/app/interfaces/emg.interface';
import { Router } from '@angular/router';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { models } from 'src/app/interfaces/models.interface';
import { ModelsService } from 'src/app/services/models.service';
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  constructor(private emgService: EmgsService, 
              private router: Router,
              private empresaService: EmpresasService, 
              private plantService: PlantasService,
              private modelsService:ModelsService,
              private nss:NamespacesService
              ) { 
                this.nslinea = this.nss.getLSLineas();
                this.nsplanta = this.nss.getLSPlantas();
                this.nsequipo = this.nss.getLSEquipos();
                this.getAllEmgs();
                this.loadUsers();
                this.loadPlant();
                this.getModelos();
              }

  ngOnInit() {
  }

  nslinea:string = "";
  nsplanta:string = "";
  nsequipo:string = "";

  emgs:emgs[];
  clients:empresa[];
  client_id:string;
  plant_id:string;
  line_id:string;
  plants:Plant[]; 
  lines:Lines[];
  busqByName:string="";
  busqBySerial:string="";

  modelos:models[];

  have_lines:boolean=false;

  load: boolean = true;

  getAllEmgs(){
    this.emgService.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
        setTimeout(() => {
          this.load = false;
        }, 500);
      },err=>{
        console.log(err);
      });
  }
  loadUsers(){
    this.empresaService.get().subscribe(res=>{
      this.clients=res.detail;
    },err=>{
      console.log(err);
    })
  }
  loadPlant(){
    this.plantService.getAll().subscribe(res=>{
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
    this.router.navigateByUrl('/equipos/equipos/'+id);
  }
  goNewEmg(){
    this.router.navigateByUrl('equipos/equipos/nuevo');
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

  getModelos(){
    this.modelsService.get().subscribe(
      res => this.modelos = res.detail,
      err => console.error(err)
    );
  }
  gotoAdd(){
    this.router.navigateByUrl("equipos/modelos/add");
  }
  detalleModelo(id: string){
    this.router.navigateByUrl("equipos/modelos/"+id);
  }
}
