import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from "@angular/common";
@Component({
  selector: 'app-nuevo-mi-linea',
  templateUrl: './nuevo-mi-linea.component.html',
  styleUrls: ['./nuevo-mi-linea.component.css']
})
export class NuevoMiLineaComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, 
              private planta:PlantasService,public fb: FormBuilder,
              private location:Location) 
              {
                this.lineForm=fb.group({
                  name:['', [Validators.required]],
                  shortname:['', [Validators.maxLength(7)]],
                  desc:['', [Validators.required]],
                });
              }

ngOnInit() {
  this.id_p=this.activatedRoute.snapshot.paramMap.get("id");
  this.getName(this.id_p);
}

  lineForm:FormGroup;
  btnen:boolean=true;
  nombrecorto:string="";
  msg:boolean=false;
  msgErr:boolean=false;

  id_p:string="";

  p_namestr="";
  p_name:Plant;

  nLine:number=0;
  nDesc:string="";

  getName(id:any){
    this.planta.getPlanta(id).subscribe(
      res=>{
        this.p_name=res.detail;
        this.p_namestr = this.p_name.name;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  regresar(){
    this.router.navigateByUrl('mislineas/'+this.id_p);
  }
  save(){
    let temp:Lines=this.lineForm.value;
    let nl:any={
      'name':temp.name,
      'shortname':this.nombrecorto,
      'desc':temp.desc
    }
    this.planta.addLinea(nl, this.id_p).subscribe(
      res=>{
        this.msg=true;
        setTimeout(() => {
          this.router.navigateByUrl('mislineas/'+this.id_p);
        }, 2000);
      },err=>{
        this.msgErr=true;
        console.log(err);
      }
    );
  }
  genShrName(){
    let temp:Lines=this.lineForm.value;
    this.nombrecorto=this.p_namestr.substring(0,3).toLowerCase()+"_"+temp.name.substring(0,3).toLowerCase();
  }
  setEnable(){
    this.btnen=false;
  }
}