import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ModelsService } from 'src/app/services/models.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { models } from 'src/app/interfaces/models.interface';

@Component({
  selector: 'app-vermodelo',
  templateUrl: './vermodelo.component.html',
  styleUrls: ['./vermodelo.component.css']
})
export class VermodeloComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private location:Location,
    private modelosService:ModelsService,
    private alert: AlertService,
    private activatedRoute: ActivatedRoute
  ) { 
    
    this.getModel(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  modelForm: FormGroup;
  guardando: boolean = false;

  modelo: models;

  ngOnInit() {
  }

  initForm(){
    this.modelForm = this.fb.group({
      modelo : [this.modelo.modelo, [Validators.required]],
      tipo : [this.modelo.tipo, [Validators.required]],
      descripcion : [this.modelo.descripcion, [Validators.required]],
      enlaces : [this.modelo.enlaces, []]
    });
  }

  getModel(id : string){
    this.modelosService.getbyid(id).subscribe(
      res => {
        this.modelo = res.detail;
        this.initForm();
      }, err => {
        console.log(err);
      }
    );
  }

  save(){
    this.guardando = true;
    this.modelosService.save(this.modelForm.value).subscribe(
      res => {
        this.guardando = false;
        this.alert.success("Guardado con éxito, serás redirigido en unos segundos")
        setTimeout(() => {
          this.regresar();
        }, 2000);
      }
    );
  }

  regresar(){
    this.location.back();
  }

}

