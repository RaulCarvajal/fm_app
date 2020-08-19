import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "../services/configuration.service";
import { AlertService } from '../services/alert.service';
import * as moment from 'moment';
import { namespace } from '../interfaces/namespaces.interface';
import { NamespacesService } from '../services/namespaces.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private configServices:ConfigurationService,
    private alert:AlertService,
    private nss:NamespacesService,
    private fb:FormBuilder
    ) { }

  addserv: boolean = false;
  fecAnt: boolean;
  tipos: any[];
  newTipo: String ;

  ngOnInit() {
    this.initFrom()
    this.fecExiste();
    this.getTipos();
    this.getNs();
  }

  addTipo(){
    this.addserv = !this.addserv;
  }
  getTipos(){
    this.configServices.getTipos().subscribe(
      res => {
        this.tipos = res.detail;
      },err => {
        console.log(err);
      }
    );
  }
  saveTipo(){
    this.configServices.existeTipo(this.newTipo).subscribe(
      res => {
        if(res.detail.length == 0){
          this.configServices.saveTipo({'name' : this.newTipo}).subscribe(
            res => {
              this.addserv = !this.addserv;
              this.getTipos();
              this.newTipo="";
            },err => {
              console.error(err);
            }
          );
        }else{
          this.configServices.actualizarTipo(this.newTipo).subscribe(
            res => {
              this.addserv = !this.addserv;
              this.getTipos();
              this.newTipo="";
            },
            err => console.log(err)
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  delTipo(id){
    this.configServices.deleteTipo(id).subscribe(
      res=>{ this.getTipos(); },err=>{}
    );
  }
  fecExiste(){
    this.configServices.getFec().subscribe(
      res => {
        console.log(res.detail.value)
        if(res.detail==null){
          this.configServices.setFec().subscribe(res=>{console.log(res)},err=>{});
          this.fecAnt = false;
        }else{
          this.fecAnt = res.detail.value;
        }
      },err => {
        console.log(err);
      }
    )
  }
  change(){
    console.log(!this.fecAnt);
    this.configServices.changeFec({ "value" : !this.fecAnt}).subscribe(
      res => {
      }, err => {
      }
    )
  }

  /** Jeraquia */
  ns:namespace = { _id : "", planta : "", linea : "", equipo : "", status : true};
  fns:FormGroup;

  initFrom(){
    this.fns = this.fb.group({
      planta : ['',[Validators.required]],
      linea : ['',[Validators.required]],
      equipo : ['',[Validators.required]],
      _id : ['']
    });
  }

  getNs(){
    this.nss.get().subscribe(
      res => {
        this.ns = res.detail
        this.fns.patchValue({planta : this.ns.planta, linea : this.ns.linea, equipo : this.ns.equipo, _id : this.ns._id})
      },
      err => {
        console.log(err)
      }
    );
  }

  update(){
    this.alert.message("Actualizando los nombres de espacio...")
    this.nss.upd(this.fns.value).subscribe(
      res => {
        this.alert.success("Actualizado correctamente... Recargar la página para ver los cambios...");
        this.nss.saveToLocalStorage(this.fns.value);
      },
      err => this.alert.error("Ocurrio un error, intentarlo más tarde...")
    );
  }
}
