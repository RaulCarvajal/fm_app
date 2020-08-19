import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { Location } from '@angular/common';
import { Plant } from 'src/app/interfaces/plant.interface';

@Component({
  selector: 'app-editar-planta',
  templateUrl: './editar-planta.component.html',
  styleUrls: ['./editar-planta.component.css']
})
export class EditarPlantaComponent implements OnInit {

  constructor(
    public fb: FormBuilder, 
    private router:Router, 
    private clientes:EmpresasService, 
    private plantas:PlantasService, 
    private auth:AuthService,
    private location:Location,
    private alert:AlertService,
    private activatedRoute:ActivatedRoute)
  { 
    this.getNameC();
    this.getPlanta(this.activatedRoute.snapshot.paramMap.get("id"));
  }
 
  ngOnInit() {
    
  }

  clients:empresa[];
  plantaForm:FormGroup;
  saving:boolean = false;
  planta:Plant;
  cargando:boolean = true;

  initForm(){
    this.plantaForm = this.fb.group({
      client : [this.planta.client, [Validators.required]],
      name : [this.planta.name, [Validators.required]],
      code : [this.planta.code, [Validators.required]],
      ename : [this.planta.boss.name, [Validators.required]],
      email : [this.planta.boss.email, [Validators.required, Validators.email]],
      phone : [this.planta.boss.phone, [Validators.required, Validators.minLength(10)]],
      _id : [this.planta._id,[]],
      meta : [this.planta.meta]
    });
    this.cargando = false;
  }
  getPlanta(id:any){
    this.plantas.getPlanta(id).subscribe(
      res=>{
        this.planta=res.detail;
        this.initForm();
      },err=>{
        console.error(err);
      }
    );
  }
  getNameC(){
    this.clientes.get().subscribe(
      res=>{
        this.clients=res.detail;
        //this.selec2data=this.genObservable(this.genArrayList());
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  regresar(){
    this.location.back();
  }
  save(){
    this.saving = true;
    let temp=this.plantaForm.value;
    let nPlant:any={
      '_id' : temp._id,
      'client' : temp.client,
      'name' : temp.name,
      'code' : temp.code,
      'boss' : {
        'name' : temp.ename,
        'email' : temp.email,
        'phone' : temp.phone
      },
      "meta":{
        "registred_by" : temp.meta.registred_by,
        "registred_date" : temp.meta.registred_date
      }
    };
    console.log(nPlant);
    this.plantas.updatePlanta(nPlant).subscribe(
      res=>{
        this.saving = false;
        this.alert.success("La planta fue exitosamente actualizada, serás redirigido en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 2500);
      },err=>{
        this.saving = false;
        this.alert.error("Error durante la actualización");
        console.log(err);
      }
    );
  }

}
