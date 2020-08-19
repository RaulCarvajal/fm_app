import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ModelsService } from 'src/app/services/models.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-addmodelo',
  templateUrl: './addmodelo.component.html',
  styleUrls: ['./addmodelo.component.css']
})
export class AddmodeloComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private location:Location,
    private modelosService:ModelsService,
    private alert: AlertService
  ) { 
    this.modelForm = this.fb.group({
      modelo : ['',[Validators.required]],
      tipo : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      enlaces : ['',[]]
    });
  }

  modelForm: FormGroup;
  guardando: boolean = false;

  ngOnInit() {
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
