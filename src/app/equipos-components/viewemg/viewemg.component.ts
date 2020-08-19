import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmgsService } from 'src/app/services/emgs.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { emgs, Info } from 'src/app/interfaces/emg.interface';
import { Plant } from 'src/app/interfaces/plant.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from "@angular/common";
import { AuthService } from 'src/app/services/auth.service';
import { consts } from '../../services/reports.settings'
import { NamespacesService } from 'src/app/services/namespaces.service';
@Component({
  selector: 'app-viewemg',
  templateUrl: './viewemg.component.html',
  styleUrls: ['./viewemg.component.css']
})
export class ViewemgComponent implements OnInit{

  constructor(private activatedRoute:ActivatedRoute, 
              private emgService:EmgsService, 
              private empresaService:EmpresasService, 
              private plantasService:PlantasService, 
              private router:Router,
              private alert: AlertService,
              private location: Location,
              private auth: AuthService,
              private nss:NamespacesService
              ) { 
                this.nslinea = this.nss.getLSLineas();
                this.nsplanta = this.nss.getLSPlantas();
                this.nsequipo = this.nss.getLSEquipos();
                this.nslineaS = this.nss.getLSLineasSing();
                this.nsplantaS = this.nss.getLSPlantasSing();
                this.nsequipoS = this.nss.getLSEquiposSing();
    this.getEmg(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    
  } 

  nslinea:string = "";
  nsplanta:string = "";
  nsequipo:string = "";
  nslineaS:string = "";
  nsplantaS:string = "";
  nsequipoS:string = "";

  emg:emgs;

  nombre:string;
  modelo:string;
  tipo:string;
  descripcion:string;
  serie:string;
  
  cl:empresa;
  cliente:String;
  pl:Plant;
  planta:string;
  linea:string;
  cod_pro:string;

  enlaces:string[];
  extra:string; 

  load: boolean = true;

  loadStrings(){
    let info:Info=this.emg.info;
    this.nombre=info.name;
    this.modelo=info.model;
    this.tipo=info.type;
    this.descripcion=info.description;
    this.serie=info.serial;
    this.cod_pro = this.emg.cod_pro;
    this.enlaces = this.emg.enlaces.split(',');
    this.emg.extras.length==0? this.extra = "Sin información extra registrada":this.extra = this.emg.extras;
    this.load = false;
  }
  getEmg(id:string){
    this.emgService.getById(id).subscribe(res=>{
      if(res.detail == null){
        this.alert.alert('NO EXISTE EL EQUIPO QUE ESCANEO, INTENTAR DE NUEVO.');
        setTimeout(() => {
          this.regresar();          
        }, 1000);
      }
      this.emg=res.detail;
      this.getClient(); 
    },req=>{
      this.alert.alert('NO EXISTE EL EQUIPO QUE ESCANEO, INTENTAR DE NUEVO.');
      setTimeout(() => {
        this.regresar();          
      }, 1000);
      console.log(req);
    });
  }
  getClient(){
    let emp:string=this.emg.client;
    this.empresaService.getid(emp).subscribe(
      res=>{
        this.cl=res.detail;
        this.cliente=this.cl.name;
        this.getPlant();
      },
      err=>{
        console.log(err);
        return "Indefinido";
      }
    );
  }
  getPlant(){
    this.plantasService.getPlanta(this.emg.plant).subscribe(
      res=>{
        this.pl=res.detail;
        this.planta=this.pl.name;
        this.pl.lines.forEach(el=>{
          if(el._id==this.emg.line){
            this.linea=el.name+"";
          }
        });
        this.loadStrings();
      },
      err=>{
        console.log(err);
        return "Indefinido";
      }
    );
  }
  activado():string{
    if(!this.emg.active){
      return "Inactivo";
    }else{
      return "Activo";
    }
  }
  estatus():string{
    switch (this.emg.status) {
      case 0:
        return "En producción";
        break;
      case 1:
        return "En mantenimiento";
        break;
      case 2:
        return "En reparación";
        break;

      default:
        break;
    }
  }
  regresar(){
    this.location.back();
  }
  actDesStr():string{
    if(this.emg.active){
      return "Desactivar";
    }else{
      return "Activar";
    }
  }
  actDes(){
    this.alert.confirm(
      "¿Desea cambiar el estatus al equipo EMG?",
      ()=>{
        this.load = true;
        this.emgService.actDes(<string>this.activatedRoute.snapshot.paramMap.get("id"),this.emg.active).subscribe(
          data=>{
            setTimeout(()=>{
              this.regresar();
            },4000);
            this.alert.success("Actualizado correctamente. Serás redirigido en unos segundos.");
            this.getEmg(<string>this.activatedRoute.snapshot.paramMap.get("id"));
            this.load = false;
          },err=>{
            console.log(err);
            this.alert.error("Ocurrio un error durante la actualización.");
          });
      },
      ()=>{
        this.alert.error("Sin cambios en el registro");
      }
      );
  }
  getPdf(){
    this.alert.alert("Tu PDF se descargará en unos segundos.");
    let data:any={
        template: { "shortid" :  consts.ficha_id }, 
        data : {
          id: this.emg._id.substring(0,10),
          nombre: this.nombre,
          cliente:this.cliente,
          planta:this.planta,
          linea:this.linea,
          estatus:this.estatus(),
          modelo:this.modelo,
          tipo:this.tipo,
          desc:this.descripcion,
          serie:this.serie,
          qr:this.emg.qr,
          cod_pro:this.cod_pro
        },
        options : { "timeout": 60000 }
     };

    this.emgService.getPdf(data);
  }

  gotoNewService(){
    switch (this.auth.getRole()) {
      case 0:
        this.router.navigateByUrl(`servicios/nuevo/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
      case 1:
        this.router.navigateByUrl(`misservicios-tec/nuevo/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        //this.router.navigateByUrl(`servicios/nuevo/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
      case 2:
        this.alert.message('Cliente');
        //this.router.navigateByUrl(`servicios/nuevo/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
      default:
        break;
    }
  }
  gotoServices(){
    switch (this.auth.getRole()) {
      case 0:
        this.router.navigateByUrl(`servicios/emg/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
      case 2:
        this.alert.message('Cliente');
        //this.router.navigateByUrl(`servicios/nuevo/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
      default:
        this.router.navigateByUrl(`servicios/emg/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
    }
  }

  gotoEditar(){
    switch (this.auth.getRole()) {
      case 0:
        this.router.navigateByUrl(`equipos/equipos/editar/${this.activatedRoute.snapshot.paramMap.get('id')}/false`)
        break;
      case 2:
        this.alert.message('Cliente');
        //this.router.navigateByUrl(`servicios/nuevo/${this.activatedRoute.snapshot.paramMap.get('id')}`)
        break;
      default:
        this.router.navigateByUrl(`equipos/equipos/editar/${this.activatedRoute.snapshot.paramMap.get('id')}/false`)
        break;
    }
  }
  
}
