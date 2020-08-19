import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Location } from "@angular/common";
import { NamespacesService } from 'src/app/services/namespaces.service';

@Component({
  selector: 'app-ver-mi-linea',
  templateUrl: './ver-mi-linea.component.html',
  styleUrls: ['./ver-mi-linea.component.css']
})
export class VerMiLineaComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router, 
    private plantas:PlantasService, 
    private location:Location,
    private nss:NamespacesService
    ) { 
    this.id_p=this.activatedRoute.snapshot.paramMap.get("id_p");
    this.id_l=this.activatedRoute.snapshot.paramMap.get("id_l");
  }
  ngOnInit() {
    this.getPlanta();
    this.getNs()
  }
  ngDoCheck(){
    this.getLine();
  }

  nsls:string = ""; 
  nsps:string = "";

  id_p:string;
  id_l:string;
  planta:Plant;
  line:Lines;

  nombre:string="";
  ncorto:string="";
  desc:string="";

  getPlanta(){
    this.plantas.getPlanta(this.id_p).subscribe(
      res=>{
        this.planta=res.detail;
      },err=>{
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
  }
  regresar(){
    this.router.navigateByUrl('mislineas/'+this.id_p);
  }

  getNs(){
    this.nsls = this.nss.getLSLineasSing();
    this.nsps = this.nss.getLSPlantasSing();
  }
}
