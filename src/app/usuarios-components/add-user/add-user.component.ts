import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "./../../interfaces/user.interface";
import { UsuariosService } from "./../../services/usuarios.service";
import { AuthService } from "./../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empresa } from 'src/app/interfaces/clients.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-user', 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private usuarios:UsuariosService, 
              private auth:AuthService, 
              public fb: FormBuilder,
              private empresaService:EmpresasService,
              private location: Location,
              private alert: AlertService){
      this.userForm=fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        empresa:['5ce73f462b1fdc4040de8003',[]]
      }
    );
  }

  ngOnInit() {
    this.loadEmpresas();
  }

  userForm:FormGroup;

  options = [
    //{ name: "Administrador", id : 0},
    { name: "Técnico", id : 1},
    { name: "Cliente", id : 2}
  ];

  user:User;
  u:string;
  isClient: boolean = false;
  empresas: empresa[];

  regresar():void{
    this.location.back();
  }
  genUsuCon(){
    let user =""+(Math.floor(Math.random()*1000000));
    this.usuarios.userExists(user).subscribe(
      res => {
        if(res.detail){
          console.log('Existe usuario');
          this.genUsuCon();
        }else{
          console.log('No existe usuario');
          this.u = user;
        }
      },
      err => {
        console.log(err)
      }
    );
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
    this.usuarios.newUser({"info" :{
                                  "name" : values.name,
                                  "email" : values.email
                              },
                              "permissions" : {
                                  "emg" :  true,
                                  "tecnicos" : true,
                                  "clientes" : true
                              },
                              "meta" : {
                                  "registred_by" : this.auth.getId()
                              },
                              "cliente" : values.empresa,
                              "username" : this.u,
                              "password" : this.u,
                              "role" : values.role
                          }).subscribe(
                              res=>{
                                this.alert.success("Usuario registrado exitosamente, será redireccionado en unos segundos.");
                                this.sendMail({
                                                "email" : res.detail.info.email,
                                                "username" : this.u,
                                                "password" : this.u,
                                                "name" : values.name,
                                                "id" : res.detail._id
                                              });
                                setTimeout(() => {
                                  this.regresar();
                                }, 4000);
                              },
                              err=>{
                                console.log(err);
                                this.alert.error("Ocurrio un error durante el registro")
                              }
                            );
  }
  sendMail(data){
    this.usuarios.sendMailNewUser(data).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
      this.alert.error("Ocurrio un error al enviar correo de notificación.");
    });
  }
  isClientToggle(){
    let temp = this.userForm.value.role;
    if(temp == 2){
      this.isClient = !this.isClient;
      if(this.empresas.length == 0){
        this.alert.alert('No existen empresas registradas, primero registra una empresa.');
      }
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
}
