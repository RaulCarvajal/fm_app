import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Location } from "@angular/common";
import { empresa } from 'src/app/interfaces/clients.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Contrato } from 'src/app/interfaces/agreement.interface';

@Component({
  selector: 'app-editarcontrato',
  templateUrl: './editarcontrato.component.html',
  styleUrls: ['./editarcontrato.component.css']
})
export class EditarcontratoComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private location:Location,
    private empresaService:EmpresasService, 
    private alert:AlertService,
    private agreementService:AgreementsService,
    private activatedRoute:ActivatedRoute) 
              {
                
              }

  empresas:empresa[];
  emg_c_id: String;
  contratoForm:FormGroup;

  loading :boolean = true;

  contrato:Contrato;

  ngOnInit() {
    this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loadEmpresas();
    //this.initForm();
  }
  
  initForm(){
    this.contratoForm = this.fb.group(
      {
        name : [this.contrato.name,[Validators.required]],
        description : [this.contrato.description,[Validators.required]],
        start : [this.contrato.period.start.substring(0,10),[]],
        end : [this.contrato.period.end.substring(0,10),[]],
        single : [this.contrato.period.single,[]],
        client : [this.contrato.client,[Validators.required]],
        monto : [this.contrato.monto,[Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]],
        monto_actual : [this.contrato.monto_actual,[Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]],
        divisa : [this.contrato.divisa,[Validators.required]],
        conceptos : this.fb.array([
          this.fb.group(
            {
              codigo : ['',[Validators.required]],
              descripcion : ['',[Validators.required]],
              precio : ['',[Validators.required,Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]]
            }
          )
        ]),
        _id : [this.contrato._id,[]]
      }
    );
    this.setConceptos();
  }

  getServicio(id:string){
    this.agreementService.getContratoById(id).subscribe(
      res=>{
        this.contrato=res.detail;
        console.log(res);
        this.initForm();
      },err=>{
        console.error(err);
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
    
    tempc.period = {
      'start' : tempc.start,
      'end' : tempc.end,
      'single' : tempc.single
    };
    console.log(tempc);
    this.agreementService.actualizar(tempc).subscribe(
       res=>{
         console.log(res);
        this.alert.success("Contrato actualizado correctamente, serás redirigido en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },err=>{
        console.log(err);
        this.alert.error("Error durante la actualización");
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

  setConceptos(){
    let temp = [
      { 
        codigo : this.contrato.conceptos[0].codigo,
        descripcion : this.contrato.conceptos[0].descripcion,
        precio : this.contrato.conceptos[0].precio
      }
    ];
    for (let index = 1; index < this.contrato.conceptos.length; index++) {
      temp.push(
        { 
          codigo : this.contrato.conceptos[index].codigo,
          descripcion : this.contrato.conceptos[index].descripcion,
          precio : this.contrato.conceptos[index].precio
        }
      );
      this.addConcepto();
    }
    this.contratoForm.patchValue({conceptos : temp});

    this.loading = false;
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

