import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newline',
  templateUrl: './newline.component.html',
  styleUrls: ['./newline.component.css']
})
export class NewlineComponent implements OnInit {

  constructor(
    private router:Router, 
    private activatedRoute:ActivatedRoute, 
    private planta:PlantasService,
    public fb: FormBuilder,
    private location:Location,
    private alert: AlertService ) 
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

  id_p:string="";

  p_namestr="";
  p_name:Plant;

  nLine:number=0;
  nDesc:string="";

  saving: boolean = false;

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
    this.router.navigateByUrl('equipos/lineas/'+this.id_p);
  }
  save(){
    let temp:Lines=this.lineForm.value;
    let nl:any={
      'name':temp.name,
      'shortname':this.nombrecorto,
      'desc':temp.desc
    }
    this.saving =  true;
    this.planta.addLinea(nl, this.id_p).subscribe(
      res=>{
        this.alert.success("Registrado conrretamente, en unos segundos serás redireccionado.");
        setTimeout(() => {
          this.router.navigateByUrl('equipos/lineas/'+this.id_p);
        }, 4000);
      },err=>{
        this.alert.error("Ocurrio un error durante el registro");
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
