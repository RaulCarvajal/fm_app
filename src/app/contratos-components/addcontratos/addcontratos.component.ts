import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Location } from "@angular/common";
import { empresa } from 'src/app/interfaces/clients.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-addcontratos',
  templateUrl: './addcontratos.component.html',
  styleUrls: ['./addcontratos.component.css']
})
export class AddcontratosComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private location:Location,
    private empresaService:EmpresasService, 
    private alert:AlertService,
    private agreementService:AgreementsService) 
              {
                
              }

  empresas:empresa[];
  emg_c_id: String;
  contratoForm:FormGroup;

  ngOnInit() {
    this.loadEmpresas();
    this.initForm();
  }
  
  initForm(){
    this.contratoForm = this.fb.group(
      {
        name : ['',[Validators.required]],
        description : ['',[Validators.required]],
        start : ['',[]],
        end : ['',[]],
        single : [false,[]],
        client : ['',[Validators.required]],
        monto : ['',[Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]],
        divisa : ['',[Validators.required]],
        conceptos : this.fb.array([
          this.fb.group(
            {
              codigo : ['',[Validators.required]],
              descripcion : ['',[Validators.required]],
              precio : ['',[Validators.required,Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]]
            }
          )
        ])
      }
    );
  }

  /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  save(){
    let tempc = this.contratoForm.value;
    const temp = {
      'client' : tempc.client,
      'description' : tempc.description,
      'name' : tempc.name,
      'period' : {
        'start' : tempc.start,
        'end' : tempc.end,
        'single' : tempc.single
      },
      'monto' : tempc.monto,
      'monto_actual' : tempc.monto,
      'conceptos' : tempc.conceptos,
      'divisa' : tempc.divisa
    };
    console.log(temp);
    this.agreementService.saveContrato(temp).subscribe(
       res=>{
        this.alert.success("Contrato creado correctamente, serás redirigido en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },err=>{
        console.log(err);
        this.alert.error("Error durante el registro");
        setTimeout(() => {
          this.regresar();
        }, 1500);
      }
    );
  }
  regresar(){
    this.location.back();
  } 
  loadEmpresas(){
    this.empresaService.get().subscribe(
      res => {
        this.empresas = res.detail;
        console.log(res);
      },
      err => {
        console.error(err)
      }
    );
  }

  addConcepto(){
    const cntrs = <FormArray>this.contratoForm.controls['conceptos'];
    cntrs.push(this.fb.group({
      codigo : ['',[Validators.required]],
      descripcion : ['',[Validators.required]],
      precio : ['',[Validators.required]]
    }));
  }
  delConcepto(pind: number){
    const cntrs = <FormArray>this.contratoForm.controls['conceptos'];
    cntrs.removeAt(pind); 
  }
  get conceptos(){
    return this.contratoForm.get('conceptos') as FormArray;
  }

  setFechasSingle(){
    if(this.contratoForm.value.single){
      this.contratoForm.patchValue({ start : new Date().toISOString()});
      this.contratoForm.patchValue({ end : new Date().toISOString()});
    }else{
      this.contratoForm.patchValue({ start : ''});
      this.contratoForm.patchValue({ end : ''});
    }
  }
}