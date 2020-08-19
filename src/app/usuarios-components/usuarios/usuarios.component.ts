import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/user.interface";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from "@angular/router";
import { empresa } from 'src/app/interfaces/clients.interface';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarios:UsuariosService, private router:Router, private empresasService:EmpresasService) { }

  users:User[];
  busq:string;

  load: boolean = false;

  empresas: empresa[];

  ngOnInit() {
    this.loadUsers();
    this.loadEmpresas();
  }

  loadUsers(){
    this.usuarios.getAllUsers().subscribe(
    (data)=>{
      this.users=data.detail;
      this.load = true;
    },
    (err)=>{
      console.log(err)
    });
  }
  loadEmpresas(){
    this.empresasService.get().subscribe(
      res => {
        this.empresas = res.detail;
      },
      err => {
        console.error(err)
      }
    );
  }
  getRol(r:number):string{
    switch (r) {
      case 0:
        return "Administrador"
        break;
      case 1:
        return "Técnico"
        break;
      case 2:
        return "Cliente"
        break;
    }
  }
  getStatus(s:any):string{
    if(s){
      return "Activo";
    }else{
      return "Inactivo";
    }
  }
  usuarioDet(id:string){
    this.router.navigateByUrl('usuarios/'+id);
  }
  goNewuser(){
    this.router.navigateByUrl('usuarios/nuevo');
  }
  goNewEmpresa(){
    this.router.navigateByUrl('usuarios/nuevaempresa');
  }
  busqueda(){
    if(this.busq==""){
      this.loadUsers();
    }else{
      var regex = new RegExp(this.busq.toLowerCase());
      let temp:User[]=this.users;
      this.users=temp.filter(pln=> pln.info.name.toLowerCase().match(regex))
    }
  }
}
