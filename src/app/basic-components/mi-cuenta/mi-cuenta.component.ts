import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { Location } from "@angular/common";

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  constructor(private usuarios:UsuariosService, 
              private auth:AuthService, 
              public fb: FormBuilder,
              private empresaService:EmpresasService,
              private location: Location,
              private alert: AlertService,
              private activatedRoute: ActivatedRoute)
  {
    this.loadEmpresas();  
  }

  ngOnInit() {
    this.loadUser();
  }

  userForm:FormGroup;

  options = [
    { name: "Administrador", id : 0},
    { name: "Técnico", id : 1},
    { name: "Cliente", id : 2}
  ];

  user:User;
  isClient: boolean = false;
  empresas: empresa[];
  load:boolean = true;

  passtoggle:boolean = true;
  
  viewToggle(){
    this.passtoggle = !this.passtoggle;
  }
  initForm(){
    this.userForm=this.fb.group(
      {
        name: [this.user.info.name, [Validators.required]],
        email: [this.user.info.email, [Validators.required, Validators.email]],
        role: [this.user.role, [Validators.required]],
        empresa:[this.user.cliente,[]],
        usr:[this.user.username,[Validators.required]],
        psw:[this.user.password,[Validators.required]],
        _id:[this.user._id,[Validators.required]]
      }
    );
    this.load = false;
    this.isClientToggle();
  }
  loadUser(){
    this.usuarios.getUser(<string>this.auth.getId()).subscribe(
      (data)=>{
        this.user=data.detail;
        this.initForm();
      },
      (err)=>{
        console.log(err)
    });
  }
  regresar():void{
    this.location.back();
  }
  getRol(id){
    this.options.forEach(e=>{
      if(e.id=id){
        return e.name;
      }
    })
  }
  guardarUsuario(){
    let values=this.userForm.value;
    values.info = {
      "name" : values.name,
      "email" : values.email
    }
    console.log(values);
    this.usuarios.updateUser(values).subscribe(
      res => {
        this.alert.success("Actualización exítosa!. Se cerrará tu sesión en unos instantes.");
        this.auth.closeSession();
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },
      err => {
        console.error(err);
        this.alert.error("Ocurrio un error durante la actualización.");
        setTimeout(() => {
          this.regresar();
        }, 1500);
      }
    );
  }
  isClientToggle(){
    let temp = this.userForm.value.role;
    if(temp == 2){
      this.isClient = !this.isClient;
    }
  }
  loadEmpresas(){
    this.empresaService.get().subscribe(
      res => {
        this.empresas = res.detail;
      },
      err => {
        console.error(err)
      }
    );
  }
  existeUsuario(){
    if( this.userForm.value.usr != this.user.username ){
      this.usuarios.userExists(this.userForm.value.usr).subscribe(
        res => {
          if(res.detail){
            console.log('Existe usuario');
            this.alert.error('Este usuario ya existe, por favor seleccionar otro nombre de usuario');
            this.userForm.patchValue({ usr : null });
          }
        },
        err => {
          console.log(err)
        }
      );
    }
  }
  getButtonText(){
    if(this.passtoggle){
      return 'Ver';
    }else{
      return 'Ocultar'
    }
  }
}
