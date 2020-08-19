import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-viewline',
  templateUrl: './viewline.component.html',
  styleUrls: ['./viewline.component.css']
}) 
export class ViewlineComponent implements OnInit, DoCheck {

 
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private plantas:PlantasService,
              private empresas:EmpresasService) { 
    this.id_p=this.activatedRoute.snapshot.paramMap.get("id_p");
    this.id_l=this.activatedRoute.snapshot.paramMap.get("id_l");
  }
  ngOnInit() {
    this.getPlanta();
  }
   ngDoCheck(){
     this.getLine();
   }


  id_p:string;
  id_l:string;
  planta:Plant;
  line:Lines;
  empresa: String = "";

  nombre:string="";
  ncorto:string="";
  desc:string="";

  load: boolean = true;

  getPlanta(){
    this.plantas.getPlanta(this.id_p).subscribe(
      res=>{
        this.planta=res.detail;
        this.getEmpresa();
      },err=>{
        console.error(err);
      }
    );
  }
  getEmpresa(){
    this.empresas.getid(this.planta.client).subscribe(
      res => {
        this.empresa = res.detail.name;
        console.log(res);
      },err => {
        console.error(err);
      }
    );
  }
  getLine(){
    this.planta.lines.forEach(el=>{
      if(el._id==this.id_l){
        this.line=el;
      }
    })
    this.nombre=this.line.name;
    this.ncorto=this.line.shortname;
    this.desc=this.line.desc;
    this.load = false;
  }
  regresar(){
    this.router.navigateByUrl('equipos/lineas/'+this.id_p);
  }
}
