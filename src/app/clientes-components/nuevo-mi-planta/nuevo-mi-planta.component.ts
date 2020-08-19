import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from "./../../services/usuarios.service";
import { User } from 'src/app/interfaces/user.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from "@angular/common";
@Component({
  selector: 'app-nuevo-mi-planta',
  templateUrl: './nuevo-mi-planta.component.html',
  styleUrls: ['./nuevo-mi-planta.component.css']
})
export class NuevoMiPlantaComponent implements OnInit {

  constructor(public fb: FormBuilder, private router:Router, private plantas:PlantasService, private auth:AuthService, private location:Location)
  { 
    this.plantaForm=fb.group({
      name:['', [Validators.required]],
      code:['', [Validators.required]],
      ename:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required, Validators.minLength(10)]],
    });
  }
 
  ngOnInit() {
  }

  plantaForm:FormGroup;
  msg:boolean=false;
  msgErr:boolean=false;


  regresar(){
    this.location.back();
  }

  save(){
    let temp=this.plantaForm.value;
    let nPlant:any={
      'client' : this.auth.getEmpresaId(),
      'name' : temp.name,
      'code' : temp.code,
      'boss' : {
        'name' : temp.ename,
        'email' : temp.email,
        'phone' : temp.phone
      },
      "meta":{
        "registred_by" : this.auth.getId()
      }
    };
    this.plantas.crear(nPlant).subscribe(
      res=>{
        this.msg=true;
        setTimeout(() => {
          this.regresar();
        }, 2000);
      },err=>{
        this.msgErr=true;
        console.log(err);
      }
    );
  }

}