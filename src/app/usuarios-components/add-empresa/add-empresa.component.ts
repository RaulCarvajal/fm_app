import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css']
})
export class AddEmpresaComponent implements OnInit {

  constructor(
              private router:Router, 
              public fb: FormBuilder, 
              private empresaService:EmpresasService,
              private location: Location,
              private alert:AlertService) 
    {
      this.empresaForm = fb.group({
        name:['', [Validators.required]],
        description:['', [Validators.required]],
      });
    }

  empresaForm :FormGroup;

 

  ngOnInit() {
  }
  regresar(){
    this.location.back();
  }
  save(){
    this.empresaService.save(this.empresaForm.value).subscribe(
      res=>{
        this.alert.success("Empresa registrada exitosamente, sera redireccionado en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 4000);
      },err=>{
        this.alert.error("Ocurrio un error");
        console.log(err);
      }
    );
  }

}
