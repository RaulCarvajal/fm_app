import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import { NamespacesService } from 'src/app/services/namespaces.service';

 
@Component({
  selector: 'app-add-planta',
  templateUrl: './add-planta.component.html',
  styleUrls: ['./add-planta.component.css']
})
export class AddPlantaComponent implements OnInit {

  constructor(
    public fb: FormBuilder, 
    private router:Router, 
    private clientes:EmpresasService, 
    private plantas:PlantasService, 
    private auth:AuthService,
    private location:Location,
    private alert:AlertService,
    private nss:NamespacesService)
  { 
    this.plantaForm=fb.group({
      client:['', [Validators.required]],
      name:['', [Validators.required]],
      code:['', [Validators.required]],
      ename:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required, Validators.minLength(10)]],
    });
  }
 
  ngOnInit() {
    this.getNameC();
    this.nsplanta = this.nss.getLSPlantas();
  }

  clients:empresa[];
  plantaForm:FormGroup;
  saving:boolean = false;
  nsplanta = "";

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
      'client' : temp.client,
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
        this.saving = false;
        this.alert.success("La planta fue exitosamente registrada, serás redirigido en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 4000);
      },err=>{
        this.saving = false;
        this.alert.error("Error durante el registro");
        console.log(err);
      }
    );
  }

}
